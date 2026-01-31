<script lang="ts">
	// ts giving me a headache
	import { page } from '$app/stores';
	import * as m from '$lib/paraglide/messages.js';

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

	$: mosque = mosqueId ? mosques[mosqueId as keyof typeof mosques] : undefined;

	export let data;
	let recordings = data.recordings ?? [];

	const isSameDay = (
		a: Date,
		b: Date // helper func
	) =>
		a.getFullYear() === b.getFullYear() &&
		a.getMonth() === b.getMonth() &&
		a.getDate() === b.getDate();

	const getDateLabel = (dateStr: string) => {
		// helper func
		const date = new Date(dateStr);
		const today = new Date();
		// eslint-disable-next-line svelte/prefer-svelte-reactivity
		const yesterday = new Date();
		yesterday.setDate(today.getDate() - 1);

		if (isSameDay(date, today)) return 'Tonight';
		if (isSameDay(date, yesterday)) return 'Yesterday';

		return date.toLocaleDateString('en-GB', {
			day: '2-digit',
			month: 'long'
		});
	};

	function formatSurahNumber(num: number): string {
		return num.toString().padStart(3, '0');
	}

	let audioRefs: Record<string, HTMLAudioElement | null> = {};

	function seekTo(recId: string, seconds: number | undefined) {
		const player = audioRefs[recId];
		if (player && seconds !== undefined) {
			player.currentTime = seconds;
			player.play(); // Auto-play when they click a Surah
		}
	}

	// Reactive grouping
	// eslint-disable-next-line svelte/no-immutable-reactive-statements
	$: groupedRecordings = (recordings ?? [])
		.sort((a, b) => b.date.localeCompare(a.date))
		.reduce<Record<string, (typeof recordings)[0][]>>((groups, rec) => {
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

		<div class="mt-5 max-h-[500px] space-y-4 overflow-y-auto pr-2">
			{#if Object.keys(groupedRecordings).length > 0}
				<!-- eslint-disable-next-line svelte/require-each-key -->
				{#each Object.entries(groupedRecordings) as [date, recordings]}
					<div class="space-y-3">
						<!-- DATE HEADER -->
						<div
							class="sticky top-0 z-10 rounded-lg border border-white/10 bg-black/80 px-3 py-2 backdrop-blur"
						>
							<h3 class="text-sm font-bold text-blue-300">
								{getDateLabel(date)}
							</h3>
						</div>

						<!-- RECORDINGS -->
						{#each recordings as rec (rec.id)}
							<div
								class="mb-4 rounded-xl border border-white/20 bg-black/20 p-4 transition-all hover:border-emerald-500/40"
							>
								<span
									class="shrink-0 self-start rounded bg-black/50 px-2 py-1 text-right text-[17px] text-white"
								>
									{rec.nickname}
								</span>
								<div class="mb-2 flex items-start justify-between">
									<div class="flex w-full flex-col gap-4">
										{#each rec.surahs ?? [] as s (s.surah_number)}
											<button
												on:click={() => seekTo(rec.id, s.timestamp_start)}
												class="group flex w-full items-center gap-4 rounded-lg p-2 text-left transition-all hover:bg-white/5"
											>
												<div
													class="flex h-16 w-20 items-center justify-center rounded-lg bg-white/5 text-4xl text-white/50 transition-colors group-hover:text-emerald-400"
												>
													<span class="mr-2" style="font-family: 'surahnames', sans-serif;">
														{formatSurahNumber(s.surah_number)}
													</span>
												</div>

												<div class="flex flex-grow flex-col justify-center">
													<h4
														class="text-lg font-semibold tracking-wide text-white transition-colors group-hover:text-emerald-400"
													>
														{s.surah_name}
													</h4>
													<div class="flex items-center gap-2 text-xs font-medium text-slate-400">
														<span class="text-white-700 tracking-widest"
															>Surah {s.surah_number}</span
														>
														<span class="h-1 w-1 rounded-full bg-slate-700"></span>
														<span>{s.detected_ayahs} Ayahs</span>
														{#if s.timestamp_start !== undefined}
															<span class="h-1 w-1 rounded-full bg-slate-700"></span>
															<!-- <span class="text-emerald-500/80">Jump to {Math.floor(s.timestamp_start / 60)}:{(s.timestamp_start % 60).toString().padStart(2, '0')}</span> -->
															<span class="text-emerald-500/80">Jump to Rak'at</span>
															<!--localize-->
														{/if}
													</div>
												</div>

												<div class="pr-4 opacity-0 transition-opacity group-hover:opacity-100">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														class="h-6 w-6 text-emerald-500"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
														/>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
														/>
													</svg>
												</div>
											</button>
										{/each}
									</div>
								</div>

								<div class="mt-4">
									<audio
										bind:this={audioRefs[rec.id]}
										controls
										src={rec.audio_url}
										class="h-10 w-full accent-black/20"
									></audio>
								</div>
							</div>
						{/each}
					</div>
				{/each}
			{:else}
				<p class="py-10 text-center text-sm text-slate-500 italic">{m['errors.no_recordings']()}</p>
			{/if}

			<footer class="mt-6 text-center text-xs text-slate-600">
				{m['mosques.ai_warning']()}
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

	@font-face {
		font-family: 'surahnames';
		/* Use relative paths to your lib folder */
		src:
			url('$lib/assets/fonts/quran/surah-names/sura_names.woff2') format('woff2'),
			url('$lib/assets/fonts/quran/surah-names/sura_names.woff') format('woff');
		font-weight: normal;
		font-style: normal;
		font-display: swap;
	}
</style>
