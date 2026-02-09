// +page.server.ts
import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import {
  PUBLIC_AWS_REGION,
  PUBLIC_COGNITO_IDENTITY_POOL_ID,
  PUBLIC_S3_BUCKET_NAME
} from '$env/static/public';

export async function load({ url }) {
  const mosqueId = url.searchParams.get('m');
  if (!mosqueId) return { recordings: [] };

  const region = PUBLIC_AWS_REGION;
  const credentials = fromCognitoIdentityPool({
    identityPoolId: PUBLIC_COGNITO_IDENTITY_POOL_ID,
    clientConfig: { region }
  });

  const s3 = new S3Client({ region, credentials });
  const prefix = `final_recordings/${mosqueId}/`;

  const { Contents } = await s3.send(
    new ListObjectsV2Command({
      Bucket: PUBLIC_S3_BUCKET_NAME,
      Prefix: prefix
    })
  );

  if (!Contents) return { recordings: [] };

  const recordings = await Promise.all(
    Contents.filter((f) => f.Key?.endsWith('.wav')).map(
      async (wav) => {
        const audio_url = await getSignedUrl(
          s3,
          new GetObjectCommand({
            Bucket: PUBLIC_S3_BUCKET_NAME,
            Key: wav.Key!
          })
        );
        const jsonKey = wav.Key!.replace('.wav', '.json');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let metadata: any = {
          surahs: [
            {
              surah_name: '...',
              short_description: '...',
              detected_ayahs: '...',
              surah_number: 0
            }
          ],
          nickname: 'Undefined'
        };

        try {
          const jsonUrl = await getSignedUrl(
            s3,
            new GetObjectCommand({
              Bucket: PUBLIC_S3_BUCKET_NAME,
              Key: jsonKey
            })
          );
          const res = await fetch(jsonUrl);
          if (res.ok) metadata = await res.json();
        } catch (e) {
          console.error('Error fetching metadata JSON:', e);
        }

        const parts = wav.Key!.split('/');
        const date = parts[2];

        return { ...metadata, audio_url, id: wav.Key!, date };
      }
    )
  );

  return { recordings };
}
