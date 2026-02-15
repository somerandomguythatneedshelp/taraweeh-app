<script lang="ts">
  import { page } from '$app/stores';
  import * as m from '$lib/paraglide/messages';
  import Dhikr from '$lib/dhikr';
  import ShareButton from '../../components/ShareButton.svelte';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';

  const dhikr = [
    { id: 'dhikr.morning' },
    { id: 'dhikr.evening' },
    { id: 'dhikr.eating' },
    { id: 'dhikr.postprayer' }
  ];

  var selectedDhikr: Record<
    string,
    { arabic: string; translationlocale: string }
  > | null = null;

  // difference between this and selectedDhikr
  // is that DhikrSelected will hold the actual
  // ID of which dhikr category is selected
  // whereas selectedDhikr is the actual data
  // that the UI displays. ;)
  var DhikrSelected: number;

  let sharedDuaIndex: number | null = null;
  let invalidParams = false;

  $: {
    const params = $page.url.searchParams;

    const catParam = params.get('category');
    const idParam = params.get('id');

    const cat = Number(catParam);
    const dua = Number(idParam);

    invalidParams = false;

    if (!isNaN(cat) && Dhikr[cat]) {
      selectedDhikr = Dhikr[cat];
      DhikrSelected = cat;

      const entries = Object.entries(Dhikr[cat]);

      if (idParam !== null) {
        if (!isNaN(dua) && entries[dua]) {
          sharedDuaIndex = dua;
        } else {
          invalidParams = true; // invalid dua index
        }
      } else {
        sharedDuaIndex = null; // show full category
      }
    } else if (catParam !== null) {
      invalidParams = true; // invalid category
    }
  }

  onMount(() => {
    if (invalidParams) {
      // cant even find the correct import
      // for resolve bro
      // eslint-disable-next-line svelte/no-navigation-without-resolve
      goto($page.url.pathname, { replaceState: true });
    }
  });

  function handleDhikrClick(id: number) {
    selectedDhikr = Dhikr[id];
    DhikrSelected = id;
  }

  type MessageMap = {
    [key in (typeof dhikr)[number]['id']]: () => string;
  };

  const messages = m as unknown as MessageMap;
</script>

<div class="dhikr-container">
  <div class="dhikr-grid">
    {#each dhikr as d, i (i)}
      <button class="dhikr-card" onclick={() => handleDhikrClick(i)}>
        <span class="card-label">{messages[d.id]()}</span>
      </button>
    {/each}
  </div>

  <div class="mt-4">
    {#if selectedDhikr}
      <div class="details-container">
        {#each Object.entries(selectedDhikr) as [key, value], i (i)}
          {#if sharedDuaIndex === null || i === sharedDuaIndex}
            <div class="dhikr-detail-item mb-2">
              <div class="detail-label-container">
                <span class="detail-label">
                  {messages[key] ? messages[key]() : key}
                </span>

                <ShareButton
                  url={`https://tune-mu.com/share?t=dua&category=${DhikrSelected}&id=${i}`}
                  ShareText="Shared a Dua"
                />
              </div>

              <p class="arabic-text" dir="rtl">
                {value.arabic}
              </p>

              <p class="translation-text">
                {messages[value.translationlocale]
                  ? messages[value.translationlocale]()
                  : value.translationlocale}
              </p>
            </div>
          {/if}
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .detail-label-container {
    display: flex;
    align-items: center; /* vertically center text and button */
    gap: 8px; /* spacing between text and button */
    margin-bottom: 4px; /* optional spacing below */
  }

  .detail-label {
    color: #0a84ff;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .dhikr-container {
    padding: 20px;
  }

  .dhikr-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .dhikr-card {
    background: #1c1c1e;
    border: none;
    border-radius: 16px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    cursor: pointer;
    transition:
      transform 0.1s ease,
      background 0.2s ease;
  }

  .dhikr-card:active {
    transform: scale(0.96);
    background: #2c2c2e;
  }

  .card-label {
    color: white;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .details-container {
    background: #1c1c1e;
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  .dhikr-detail-item {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .detail-label {
    color: #0a84ff;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 0;
  }

  .arabic-text {
    color: #ffffff;
    font-size: 1.75rem;
    line-height: 1.6;
    font-family: 'uthmanic', sans-serif;
    margin: 8px 0;
    text-align: right;
  }

  .translation-text {
    color: #8e8e93;
    font-size: 1rem;
    line-height: 1.4;
    font-style: italic;
    margin: 0;
  }

  .divider {
    border: none;
    border-top: 1px solid #38383a;
    margin: 20px 0;
    width: 100%;
  }

  .mt-4 {
    margin-top: 1.5rem;
  }

  @font-face {
    font-family: 'uthmanic';
    src: url('$lib/assets/fonts/quran/uthmanic-digital/qcf-uthmanic-digital.woff2')
      format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
</style>
