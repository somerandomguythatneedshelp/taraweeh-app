import { useState, useRef, useEffect } from 'react';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';

import { ListObjectsV2Command } from '@aws-sdk/client-s3';

async function getRecordingChunks(mosqueId: string, dateStr: string) {
  const command = new ListObjectsV2Command({
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
    Prefix: `uploads/${mosqueId}/${dateStr}/`,
  });

  try {
    const response = await s3Client.send(command);
    if (!response.Contents) return [];

    // Sort by Key (which includes our timestamp HH-mm-ss)
    return response.Contents
      .map(item => item.Key)
      .sort(); 
  } catch (err) {
    console.error("Error fetching chunks:", err);
    return [];
  }
}

// 1. Move the client OUTSIDE the function so it persists
const region = process.env.NEXT_PUBLIC_AWS_REGION;
const s3Client = new S3Client({
  region,
  requestChecksumCalculation: "WHEN_REQUIRED",
  credentials: fromCognitoIdentityPool({
    identityPoolId: process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID!,
    clientConfig: { region }
  })
});

export function useRecorder(mosqueId: string, nickname: string) {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null); // Track the mic stream
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);

  // Helper to keep screen awake
  const requestWakeLock = async () => {
    if ('wakeLock' in navigator) {
      try {
        wakeLockRef.current = await navigator.wakeLock.request('screen');
        console.log("💡 Screen Wake Lock Active");
      } catch (err) {
        console.warn("Could not lock screen:", err);
      }
    }
  };

  const releaseWakeLock = async () => {
    if (wakeLockRef.current) {
      await wakeLockRef.current.release();
      wakeLockRef.current = null;
      console.log("💡 Screen Wake Lock Released");
    }
  };

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });

    await requestWakeLock(); // keeps ios screen awawke while recording

    recorder.onstop = () => {
       // Only kill the mic AFTER the recorder has fully stopped processing
       if (streamRef.current) {
         streamRef.current.getTracks().forEach(track => track.stop());
         streamRef.current = null;
       }
       releaseWakeLock(); // release wake lock when recording stops
    };

    recorder.ondataavailable = async (e) => {
      // FIX 1: Filter out fragments smaller than 75KB
      if (e.data && e.data.size > 75000) {
        const now = new Date();
        const timeStr = now.toISOString().replace(/[:.]/g, '-');
        const dateStr = now.toISOString().split('T')[0];
        
        const fileName = `uploads/${mosqueId}/${dateStr}/${timeStr}_${nickname}.webm`;
        
        try {
          const arrayBuffer = await e.data.arrayBuffer();
          await s3Client.send(new PutObjectCommand({
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
            Key: fileName,
            Body: new Uint8Array(arrayBuffer),
            ContentType: 'audio/webm', // FIX 2: Explicitly set for decoding
          }));
          console.log("Chunk uploaded:", fileName);
        } catch (err) {
          console.error("S3 Upload Error:", err);
        }
      }
    };

    // Slice every 30 seconds
    recorder.start(30000);
    mediaRecorder.current = recorder;
    setIsRecording(true);
  };

  const stop = () => {
    // 1. Stop the recorder
    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.stop(); 
    }
    
    // 2. Stop the Microphone hardware (turns off the green dot)
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    setIsRecording(false);
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isRecording) {
        requestWakeLock();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isRecording]);

  return { isRecording, start, stop };
}

async function uploadToS3(key: string, blob: Blob) {
  try {
    // 2. Convert Blob to Uint8Array to bypass the "getReader" stream error
    const arrayBuffer = await blob.arrayBuffer();
    const body = new Uint8Array(arrayBuffer);

    await s3Client.send(new PutObjectCommand({
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      Key: key,
      Body: body,
      ContentType: 'audio/webm', // Crucial for browser decoding
      Metadata: {
        'bits-per-second': '128000'
      }
    }));
    
    console.log(`Chunk uploaded: ${key}`);
  } catch (err) {
    console.error("S3 Upload Error:", err);
  }
}