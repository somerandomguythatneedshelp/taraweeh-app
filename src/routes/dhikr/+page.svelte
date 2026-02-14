<script lang="ts">
  import * as m from '$lib/paraglide/messages';
  import Dhikr from '$lib/dhikr';

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

  function handleDhikrClick(id: number) {
    selectedDhikr = Dhikr[id];
  }
</script>

<div class="dhikr-container">
  <div class="dhikr-grid">
    {#each dhikr as d, i (i)}
      <button class="dhikr-card" onclick={() => handleDhikrClick(i)}>
        <span class="card-label">{(m as any)[d.id]()}</span>
      </button>
    {/each}
  </div>

  <div class="mt-4">
    {#if selectedDhikr}
      <div class="details-container">
        {#each Object.entries(selectedDhikr) as [key, value], i}
          <div class="dhikr-detail-item">
            <p class="detail-label">
              {(m as any)[key] ? (m as any)[key]() : key}
            </p>

            <p class="arabic-text" dir="rtl">
              {value.arabic}
            </p>

            <p class="translation-text">
              {(m as any)[value.translationlocale]
                ? (m as any)[value.translationlocale]()
                : value.translationlocale}
            </p>

            {#if i < Object.entries(selectedDhikr).length - 1}
              <hr class="divider" />
            {/if}
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
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
