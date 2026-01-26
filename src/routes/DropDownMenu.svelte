<script lang="ts">
	import { getLocale, setLocale, locales } from '$lib/paraglide/runtime.js';
	import * as m from '$lib/paraglide/messages.js';

	const languageNames: Record<string, string> = {
		en: 'English',
		ar: 'العربية',
		ur: 'اردو',
		arz: 'الْعَرَبِيَّةُ',
		sv: 'svensk',
		hi: 'नहीं',
		'ar-zi': 'Franco (Arabizi)'
	};

	function handleChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		setLocale(target.value, { reload: true });
	}
</script>

<div class="settings-card bg-black/50">
	<label class="settings-label">
		{m['settings.select_language']()}
	</label>

	<div class="select-wrapper">
		<select value={getLocale()} on:change={handleChange} class="bg-black/70">
			<!-- eslint-disable-next-line svelte/require-each-key -->
			{#each locales as locale}
				<option value={locale}>
					{languageNames[locale] ?? locale}
				</option>
			{/each}
		</select>

		<!-- Chevron -->
		<svg viewBox="0 0 24 24" class="chevron">
			<path d="M7 10l5 5 5-5" />
		</svg>
	</div>
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

	.settings-label {
		display: block;
		font-size: 14px;
		color: #bbb;
		margin-bottom: 8px;
	}

	.select-wrapper {
		position: relative;
	}

	select {
		width: 100%;
		height: 48px;

		appearance: none;
		-webkit-appearance: none;

		color: #fff;

		border: 1px solid #2a2a2a;
		border-radius: 12px;

		padding: 0 44px 0 14px;
		font-size: 16px;

		outline: none;
	}

	select:focus {
		border-color: #4f9cff;
	}

	.chevron {
		position: absolute;
		right: 14px;
		top: 50%;
		transform: translateY(-50%);
		width: 20px;
		height: 20px;
		pointer-events: none;
		fill: none;
		stroke: #aaa;
		stroke-width: 2;
	}
</style>
