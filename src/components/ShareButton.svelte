<script>
  import { onMount } from "svelte";  

  let shareSupported = false;

  // Runs on component mount
  onMount(() => {
    shareSupported = !!navigator.share;
  });

  async function shareLink() {
    try {
      await navigator.share({
        title: 'Taraweeh+',
        text: 'Shared a Dua',
        url: window.location.href, 
      });
      console.log('Shared successfully');
    } catch (err) {
      console.error('Error sharing:', err);
    }
  }
</script>

{#if shareSupported}
  <button on:click={shareLink} class="share-button">
    📤 Share
  </button>
{:else}
  <p>Your browser does not support sharing.</p>
{/if}

<style>
  .share-button {
    padding: 10px 20px;
    border-radius: 8px;
    background: #007aff;
    color: white;
    border: none;
    font-size: 16px;
  }
</style>
