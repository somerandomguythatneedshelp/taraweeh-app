<script lang="ts">
  import * as m from '$lib/paraglide/messages';
  import Dhikr from '$lib/dhikr';

  const dhikr = [
    { id: 'dhikr.morning' },
    { id: 'dhikr.evening' },
    { id: 'dhikr.eating' },
    { id: 'dhikr.postprayer' }
  ];

  function handleDhikrClick(id: number) {
    const selectedDhikr = Dhikr[id];

    Object.entries(selectedDhikr).forEach(([key, value]) => {
        console.log("Title:", m[key] ? m[key]() : key);
        console.log("Arabic:", value.arabic);
        console.log("Translation: ", m[value.translationlocale] ? m[value.translationlocale]() : value.translationlocale);
    });
}

</script>

<div class="dhikr-container">
  <p class="section-title">DHIKRS</p>

  <div class="dhikr-grid">
    {#each dhikr as d, i (i)}
      <button class="dhikr-card" onclick={() => handleDhikrClick(i)}>
        <span class="card-label">{(m as any)[d.id]()}</span>
      </button>
    {/each}
  </div>
</div>

<style>
  /* Container & Typography */
  .dhikr-container {
    padding: 20px;
  }

  .section-title {
    color: #8e8e93;
    font-size: 0.75rem;
    font-weight: 600;
    margin-bottom: 12px;
    letter-spacing: 0.5px;
  }

  /* Grid Layout */
  .dhikr-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  /* Button/Card Styling */
  .dhikr-card {
    background: #1c1c1e; /* iOS Dark Gray */
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
</style>
