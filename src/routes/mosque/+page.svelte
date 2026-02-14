<script lang="ts">
  import { page } from '$app/stores';
  import * as m from '$lib/paraglide/messages.js';
  import { slide } from 'svelte/transition';
  import { SvelteSet } from 'svelte/reactivity';
  import { SvelteDate } from 'svelte/reactivity';
  import { onMount } from 'svelte';
  import { surahId } from '$lib/stores.js';
  import SurahInfo from '../../components/SurahInfo.svelte';
  import { goto } from '$app/navigation';

  interface Surah {
    surah_number: number;
    surah_name: string;
    timestamp_start?: number;
    rakat_number?: number;
    detected_ayahs?: number;
  }

  interface Recording {
    id: string;
    date: string;
    nickname: string;
    audio_url: string;
    type: 'taraweeh' | 'other';
    surahs: Surah[];
  }

  export let data: { recordings: Recording[] };
  let recordings = data.recordings ?? [];

  let expandedRecs = new SvelteSet<string>();
  let activeRecordingId: string | null = null;

  function toggleDetails(id: string) {
    const newSet = new SvelteSet(expandedRecs);

    // the reason for using if statements instead of toggle
    // is because eslint doesn't recognize the toggle method
    // and throws an error, even though it works perfectly fine
    if (expandedRecs.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    expandedRecs = newSet;
  }

  function shouldCollapse(rec: Recording) {
    return (
      rec.type === 'taraweeh' ||
      (rec.surahs && rec.surahs.length > 4)
    );
  }

  $: mosqueId = $page.url.searchParams.get('m');
  $: surahInfo = $page.url.searchParams.get('s');

  /* 
  mosqueId contains the actual mosuqe information, typically
  selected from the home screen, an example would be 
  https://tune-mu.com/mosque?m=as-suffa 
  this would redirect the user to the as-suffa mosque page
  
  surahInfo on the other hand is used to display the surah
  information card, this is triggered when a user clicks
  on a specific surah in the recording details, an example url would be
  https://tune-mu.com/mosque?m=as-suffa&s=2
  the reason we keep the original mosque query parameter is so that we can 
  still show the mosque's page when the user clicks to go back to the previous
  page.
  */

  onMount(() => {
    if (surahInfo) {
      surahId.set(parseInt(surahInfo));
    }
  });

  const mosques = {
    'brough-mosque': {
      name: 'East Riding Community Foundation',
      desc: [m['ercf.desc1'], m['ercf.desc2'], m['ercf.desc3']]
    },
    'as-suffa': {
      name: 'As-Suffa Education',
      desc: [m['as-suffa.desc']]
    },
    'hull-mosque': {
      name: 'Hull Mosque & Islamic Centre',
      desc: [m['hull-mosque.desc']]
    },
    'hull-jame-masjid': {
      name: 'Hull Jame Masjid',
      desc: [m['hull-jame-masjid.desc']]
    }
  } as const;

  $: mosque = mosqueId
    ? mosques[mosqueId as keyof typeof mosques]
    : undefined;

  const getDateLabel = (dateStr: string) => {
    const date = new SvelteDate(dateStr);
    const today = new SvelteDate();
    const yesterday = new SvelteDate();
    yesterday.setDate(today.getDate() - 1);

    const isSameDay = (d1: SvelteDate, d2: SvelteDate) =>
      d1.toISOString().split('T')[0] ===
      d2.toISOString().split('T')[0];

    if (isSameDay(date, today)) return 'Tonight';
    if (isSameDay(date, yesterday)) return 'Yesterday';

    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long'
    });
  };

  let audioRefs: Record<string, HTMLAudioElement | null> = {};

  function seekTo(recId: string, seconds: number | undefined) {
    const player = audioRefs[recId];
    if (player && seconds !== undefined) {
      // Pause others if playing
      Object.values(audioRefs).forEach(
        (p) => p && p !== player && p.pause()
      );
      player.currentTime = seconds;
      player.play();
      activeRecordingId = recId;
    }
  }

  let groupedRecordings: Record<string, Recording[]> = {};

  /* 
    We ignore this reactive statement for eslint because the linter
    thinks that nothing in here CAN change, so it throws an error 
  */

  // eslint-disable-next-line svelte/no-immutable-reactive-statements
  $: {
    const groups: Record<string, Recording[]> = {};

    for (const rec of recordings) {
      (groups[rec.date] ??= []).push(rec);
    }

    groupedRecordings = Object.fromEntries(
      Object.keys(groups)
        .sort((a, b) => (a < b ? 1 : -1))
        .map((date) => [date, groups[date]])
    );
  }
</script>

<div class="settings-card border border-white/10 shadow-2xl">
  {#if surahInfo}
    <SurahInfo></SurahInfo>
  {:else if mosque}
    <button
      class="mb-4 flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white"
      on:click={() => {
        goto('/'); // eslint-disable-line svelte/no-navigation-without-resolve
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M15 18l-6-6 6-6" />
      </svg>
      Go back
    </button>
    <header class="mb-6 border-b border-white/10 pb-4">
      <h1
        class="bg-gradient-to-r from-white to-white/60 bg-clip-text text-2xl font-bold text-transparent"
      >
        {mosque.name}
      </h1>
      <div
        class="mt-2 space-y-1 text-sm leading-relaxed text-slate-400"
      >
        {#each mosque.desc as line (line)}
          <p>{line()}</p>
        {/each}
      </div>
    </header>

    <div
      class="recording-list custom-scrollbar mt-5 max-h-[60vh] space-y-6 overflow-y-auto pr-2"
    >
      {#if Object.keys(groupedRecordings).length > 0}
        {#each Object.entries(groupedRecordings) as [date, dateGroup], i (i)}
          <section class="space-y-3">
            <div class="sticky top-0 z-20 -mx-1 px-1">
              <div
                class="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1 backdrop-blur-md"
              >
                <h3
                  class="text-xs font-bold tracking-widest text-emerald-400 uppercase"
                >
                  {getDateLabel(date)}
                </h3>
              </div>
            </div>

            {#each dateGroup as rec (rec.id)}
              {@const isCollapsed =
                shouldCollapse(rec) && !expandedRecs.has(rec.id)}

              <div
                class="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition-all hover:border-white/20 hover:bg-white/[0.06]"
              >
                <div class="mb-4 flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div
                      class="h-2 w-2 rounded-full {activeRecordingId ===
                      rec.id
                        ? 'animate-pulse bg-emerald-500'
                        : 'bg-white/20'}"
                    ></div>
                    <span class="font-medium text-white"
                      >{rec.nickname}</span
                    >
                  </div>

                  {#if rec.type === 'taraweeh'}
                    <span
                      class="rounded-md border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[10px] font-black tracking-tighter text-indigo-300 uppercase"
                    >
                      {m['quran.taraweeh']()}
                    </span>
                  {/if}
                </div>

                <audio
                  bind:this={audioRefs[rec.id]}
                  on:play={() => (activeRecordingId = rec.id)}
                  controls
                  src={rec.audio_url}
                  class="mb-4 h-10 w-full opacity-80 transition-opacity hover:opacity-100"
                ></audio>

                {#if shouldCollapse(rec)}
                  <button
                    on:click={() => toggleDetails(rec.id)}
                    class="flex w-full items-center justify-between rounded-xl bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10"
                  >
                    <span
                      >{isCollapsed
                        ? m['quran.view_surahs']()
                        : m['quran.hide_surahs']()}</span
                    >
                    <span class="text-slate-500"
                      >{rec.surahs?.length || 0}
                      {m['quran.rakats']()}</span
                    >
                  </button>
                {/if}

                {#if !isCollapsed}
                  <div
                    transition:slide={{ duration: 300 }}
                    class="mt-3 grid gap-2"
                  >
                    {#each rec.surahs ?? [] as s, i (i)}
                      <div class="flex w-full items-center gap-2">
                        <button
                          on:click={() =>
                            seekTo(rec.id, s.timestamp_start)}
                          class="group/item flex items-center gap-4 rounded-xl p-2 transition-all hover:bg-emerald-500/10"
                        >
                          <div
                            class="font-surah flex h-10 items-center justify-center rounded-lg bg-black/40 pr-2 text-2xl text-white/40 group-hover/item:text-emerald-400"
                          >
                            {s.surah_number
                              .toString()
                              .padStart(3, '0')}
                          </div>

                          <div class="flex-grow text-left">
                            <div
                              class="text-sm font-bold text-slate-200 group-hover/item:text-white"
                            >
                              {s.surah_name}
                            </div>
                            <div
                              class="flex items-center gap-2 text-[10px] text-slate-500"
                            >
                              {#if s.rakat_number}
                                <span class="text-emerald-500/60"
                                  >{m['quran.rakat']()}
                                  {s.rakat_number}</span
                                >
                              {/if}
                            </div>
                          </div>
                        </button>

                        <!--
                      add an empty title tag otherwise warnings 
                      would clutter the UI of the IDE and build
                      logs
                      -->
                        <button
                          class="rounded-lg p-2 text-slate-500 transition-colors hover:bg-emerald-500/10 hover:text-emerald-400"
                          title=""
                          on:click={() => {
                            surahId.set(s.surah_number);
                            // ignore eslint here because resolve throws
                            // an internal 500 error for some reason,
                            // even though the navigation works perfectly fine
                            // eslint-disable-next-line svelte/no-navigation-without-resolve
                            goto(`/mosque?m=${mosqueId}&s=${s.surah_number}`);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          >
                            <circle cx="12" cy="12" r="10" /><path
                              d="M12 16v-4"
                            /><path d="M12 8h.01" />
                          </svg>
                        </button>
                      </div>
                    {/each}
                  </div>
                {/if}
              </div>
            {/each}
          </section>
        {/each}
      {:else}
        <div
          class="flex flex-col items-center justify-center py-20 text-slate-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mb-4 h-12 w-12 opacity-20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
          <p class="text-sm italic">{m['errors.no_recordings']()}</p>
        </div>
      {/if}

      <footer
        class="mt-8 border-t border-white/5 pt-6 pb-4 text-center text-[10px] tracking-widest text-slate-600 uppercase"
      >
        {m['mosques.ai_warning']()}
      </footer>
    </div>
  {:else}
    <div
      class="flex h-64 flex-col items-center justify-center space-y-4"
    >
      <p class="text-lg font-medium text-slate-400">
        Mosque not found
      </p>
      <button class="text-sm text-emerald-500 underline"
        >Return Home</button
      >
    </div>
  {/if}
</div>

<style>
  .settings-card {
    position: relative;
    margin-top: 5vh;
    margin-left: 16px;
    margin-right: 16px;
    background: linear-gradient(
      135deg,
      rgba(15, 15, 15, 0.8),
      rgba(0, 0, 0, 0.9)
    );
    backdrop-filter: blur(20px);
    border-radius: 24px;
    padding: 24px;
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }

  .font-surah {
    font-family: 'surahnames', sans-serif;
  }

  @font-face {
    font-family: 'surahnames';
    src: url('$lib/assets/fonts/quran/surah-names/sura_names.woff2')
      format('woff2');
    font-display: swap;
  }
</style>
