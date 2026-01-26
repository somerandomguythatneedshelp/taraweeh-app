<script lang="ts"> // ts giving me a headache
	import { page } from '$app/stores';
    import { derived } from 'svelte/store';
	import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
	import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
	import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
	import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
	import * as m from '$lib/paraglide/messages.js';

    import {
    PUBLIC_AWS_REGION,
    PUBLIC_COGNITO_IDENTITY_POOL_ID,
    PUBLIC_S3_BUCKET_NAME
    } from '$env/static/public';

	$: mosqueId = $page.url.searchParams.get('m');


	const mosques = {
		'brough-mosque': {
			name: 'East Riding Community Foundation Centre',
			desc: [m['ercf.desc1'], m['ercf.desc2'], m['ercf.desc3'], m['ercf.desc4']]
		},
		'as-suffa': {
			name: 'As-Suffa Education',
			desc: [m['as-suffa.desc']]
		},
		'hull-mosque': {
			name: 'Hull Mosque & Islamic Centre',
			desc: [m['hull-mosque.desc']]
		}
	};

	 $: mosque = mosqueId ? mosques[mosqueId] : undefined;
    
const region = PUBLIC_AWS_REGION;

const credentials = fromCognitoIdentityPool({
  identityPoolId: PUBLIC_COGNITO_IDENTITY_POOL_ID,
  clientConfig: { region }
});

interface SurahMeta {
  surah_number: number;
  surah_name: string;
  short_description: string;
  detected_ayahs: string;
  long_description?: string;
  fun_fact?: string;
}

interface FinalRecording {
  id: string;
  audio_url: string; // Matches your JSON snake_case
  surahs: SurahMeta[];
  nickname: string;
  date: string;
}

const s3Client = new S3Client({ region, credentials });
export let data;
    let recordings = data.recordings ?? [];

  const refreshFinalGallery = async () => {
    const prefix = `final_recordings/${mosqueId}/`;

    try {
      const listCommand = new ListObjectsV2Command({
        Bucket: PUBLIC_S3_BUCKET_NAME,
        Prefix: prefix,
      });

      const { Contents } = await s3Client.send(listCommand);
      if (!Contents) return recordings = ([]);

      const wavFiles = Contents.filter(f => f.Key?.endsWith(".wav"));
      
      const galleryData = await Promise.all(wavFiles.map(async (wav) => {
      const baseName = wav.Key!.replace(".wav", "");
      const jsonKey = `${baseName}.json`;

      const audio_url = await getSignedUrl(s3Client, new GetObjectCommand({ 
        Bucket: PUBLIC_S3_BUCKET_NAME, Key: wav.Key 
      }));

      // UPDATED FALLBACK: Ensure surahs is an array
      let metadata: Partial<FinalRecording> = { 
        surahs: [{ 
          surah_name: "AI Processing...", 
          short_description: "Identifying recitation...", 
          detected_ayahs: "..." ,
          surah_number: 0
        }], 
        nickname: "User" 
      };

        const parts = wav.Key!.split("/");
        const date = parts[2]; // YYYY-MM-DD

        
        try {
  const jsonUrl = await getSignedUrl(s3Client, new GetObjectCommand({ 
    Bucket: PUBLIC_S3_BUCKET_NAME, Key: jsonKey 
  }));
  
  const res = await fetch(jsonUrl);
  if (res.ok) {
    metadata = await res.json();
  } else {
    // THIS WILL TELL YOU IF S3 IS REJECTING THE FETCH
    console.error(`Fetch failed for ${jsonKey}: ${res.status} ${res.statusText}`);
  }
} catch (e) {
  console.error("Error fetching metadata JSON:", e);
}

        return { ...metadata, audio_url, id: wav.Key!, date };
      }));

      recordings = (galleryData as FinalRecording[]);
    } catch (err) {
      console.error("Gallery Refresh Error:", err);
    }
  };

   const isSameDay = (a: Date, b: Date) => // helper func
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const getDateLabel = (dateStr: string) => { // helper func
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (isSameDay(date, today)) return "Tonight";
  if (isSameDay(date, yesterday)) return "Yesterday";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
  });
};


    // Reactive grouping
    $: groupedRecordings = (recordings ?? [])
        .sort((a,b) => b.date.localeCompare(a.date))
        .reduce<Record<string, typeof recordings[0][]>>((groups, rec) => {
            if (!groups[rec.date]) groups[rec.date] = [];
            groups[rec.date].push(rec);
            return groups;
        }, {});



</script>

<div class="settings-card bg-black/50">
	{#if mosque}
		<span class="text-lg font-bold">{mosque.name}</span>
		<br /><br />
		<!-- ^^ BRR
  BRuh im crine
  -->

		<div class="text-lg">
			<!-- eslint-disable-next-line svelte/require-each-key -->
			{#each mosque.desc as line}
				<span>{line()}</span><br />
			{/each}
		</div>

        <div class="space-y-4 max-h-[500px] overflow-y-auto pr-2">
  {#if Object.keys(groupedRecordings).length > 0}
    {#each Object.entries(groupedRecordings) as [date, recordings]}
      <div class="space-y-3">
        
        <!-- DATE HEADER -->
        <div class="sticky top-0 z-10 bg-black/80 backdrop-blur px-3 py-2 rounded-lg border border-white/10">
          <h3 class="text-sm font-bold text-blue-300">
            {getDateLabel(date)}
          </h3>
        </div>

        <!-- RECORDINGS -->
        {#each recordings as rec (rec.id)}
          <div class="bg-black/20 p-4 rounded-xl border border-white/20 hover:border-emerald-500/40 transition-all mb-4">
            <div class="flex justify-between items-start mb-2">
              <div class="flex flex-col gap-1">
                
                {#each rec.surahs ?? [] as s, idx}
                  <h4 class="font-bold text-emerald-300 text-lg leading-tight">
                    {s.surah_name}
                    <span class="text-xs text-emerald-100/60 ml-2 font-normal">
                      Ayahs {s.detected_ayahs}
                    </span>
                  </h4>
                {/each}

              </div>

              <span class="text-[10px] bg-emerald-500/20 px-2 py-1 rounded text-emerald-200 text-right">
                Recited by {rec.nickname}
                <br />
                <span class="text-[9px] text-emerald-300/80">
                  {getDateLabel(rec.date)}
                </span>
              </span>
            </div>

            <!-- Descriptions -->
            <div class="space-y-2 mb-4">
              {#each rec.surahs ?? [] as s}
                <p class="text-xs text-slate-400 italic">
                  <span class="text-emerald-500/50 not-italic font-bold mr-1">
                    {s.surah_name}:
                  </span>
                  "{s.short_description}"
                </p>
              {/each}
            </div>

            <audio
              controls
              src={rec.audio_url}
              class="w-full h-10 accent-emerald-500"
            />
          </div>
        {/each}
      </div>
    {/each}
  {:else}
    <p class="text-center py-10 text-slate-500 text-sm italic">
      No processed recordings yet.
    </p>
  {/if}

  <footer class="mt-6 text-xs text-center text-slate-600">
    Powered by AI, results may not always be accurate.
  </footer>
</div>

        

	{:else}
		<p class="text-lg opacity-70">Mosque not found</p>
		<!--TODO: localize ts-->
	{/if}
</div>

<style>
	.settings-card {
		position: absolute;
		top: 5vh;
		left: 16px;
		right: 16px;

		backdrop-filter: blur(12px);

		border-radius: 14px;
		padding: 16px;

		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
	}
</style>
