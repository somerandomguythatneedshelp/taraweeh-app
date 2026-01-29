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

	$: mosque = mosqueId ? mosques[mosqueId] : undefined;

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
		const yesterday = new Date();
		yesterday.setDate(today.getDate() - 1);

		if (isSameDay(date, today)) return 'Tonight';
		if (isSameDay(date, yesterday)) return 'Yesterday';

		return date.toLocaleDateString('en-GB', {
			day: '2-digit',
			month: 'long'
		});
	};

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

		<div class="max-h-[500px] space-y-4 overflow-y-auto pr-2 mt-5">
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
								<div class="mb-2 flex items-start justify-between">
									<div class="flex flex-col gap-1">
										<!-- eslint-disable-next-line svelte/require-each-key -->
										{#each rec.surahs ?? [] as s}
											<h4 class="text-lg leading-tight font-bold text-emerald-300">
												{s.surah_name}
												<span class="ml-2 text-xs font-normal text-emerald-100/60">
													Ayahs {s.detected_ayahs}
												</span>
											</h4>
										{/each}
									</div>

									<span
										class="rounded bg-emerald-500/20 px-2 py-1 text-right text-[10px] text-emerald-200"
									>
										{rec.nickname}
										<br />
										<span class="text-[9px] text-emerald-300/80">
											{getDateLabel(rec.date)}
										</span>
									</span>
								</div>

								<!-- Descriptions -->
								<div class="mb-4 space-y-2">
									<!-- eslint-disable-next-line svelte/require-each-key -->
									{#each rec.surahs ?? [] as s}
										<p class="text-xs text-slate-400 italic">
											<span class="mr-1 font-bold text-emerald-500/50 not-italic">
												{s.surah_name}:
											</span>
											"{s.short_description}"
										</p>
									{/each}
								</div>

								<audio controls src={rec.audio_url} class="h-10 w-full accent-emerald-500" />
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
</style>
