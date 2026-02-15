<script lang="ts">
  import { onMount } from 'svelte';

  export let url: string;
  export let ShareText: string;
  let shareSupported = true;

  onMount(() => {
    // Check if the Web Share API is available
    shareSupported = !!navigator.share;
  });

  async function shareLink() {
    try {
      await navigator.share({
        title: 'Taraweeh+',
        text: ShareText,
        url: url
      });
      // using 'any' here is okay and intentional
      // because there isnt a type that i can find
      // (for now) that will go with err
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      // User cancelled or share failed
      if (err.name !== 'AbortError') {
        console.error('Error sharing:', err);
      }
    }
  }
</script>

{#if shareSupported}
  <button
    on:click={shareLink}
    class="share-button"
    aria-label="Share"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="icon"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" y1="2" x2="12" y2="15" />
    </svg>
  </button>
{/if}

<style>
  .share-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 10px; /* Squircle-ish radius */
    background: #252525;
    color: white;
    border: none;
    cursor: pointer;
    transition:
      background 0.2s,
      transform 0.1s;
    -webkit-tap-highlight-color: transparent;
  }

  .share-button:active {
    background: #121212;
    transform: scale(0.95); /* Feedback on tap */
  }

  .icon {
    width: 22px;
    height: 22px;
  }
</style>
