<script lang="ts">
  import DropDownMenu from './DropDownMenu.svelte';
  import * as m from '$lib/paraglide/messages.js';
  import DhikrPage from './dhikr/+page.svelte';
  import { localizeHref } from '$lib/paraglide/runtime';

  let active = $state('mosque');

  const mosques = [
    {
      id: 'brough-mosque',
      title: 'East Riding Community Foundation Centre',
      address: 'Welton craft, 6 Common Ln, Welton, Brough HU15 1PT',
      slug: 'brough-mosque'
    },
    {
      id: 'as-suffa',
      title: 'As-Suffa Education',
      address: 'As Suffa Education, Walker St, Hull HU3 2HD',
      slug: 'as-suffa'
    },
    {
      id: 'hull-mosque',
      title: 'Hull Mosque & Islamic Centre',
      address: '2 Berkeley St, Hull HU3 1PR',
      slug: 'hull-mosque'
    },
    {
      id: 'hull-jame-masjid',
      title: 'Hull Jame Masjid',
      address: '20 Pearson Park, Hull, HU5 2TD',
      slug: 'hull-jame-masjid'
    }
  ];

  let loading = $state(false);
</script>

{#if loading}
  <div class="loading-overlay">
    <div class="spinner"></div>
  </div>
{/if}

<!-- Acutal page content -->
{#if active == 'mosque'}
  <div>
    <div
      class="mosque-list settings-card"
      data-sveltekit-preload-data="hover"
    >
      {#each mosques as mosque, i (i)}
        <!-- website is hosted under / so no need for resolve
        see https://svelte.dev/docs/kit/%24app-paths#resolve 
        for details-->
        <!--eslint-disable-next-line svelte/no-navigation-without-resolve-->
        <a href={localizeHref(`/mosque?m=${mosque.slug}`)}
          on:click={() => (loading = true)}
          class="mosque border border-white/5 bg-white/[0.03]"
          id={mosque.id}
          data-sveltekit-noscroll
          data-sveltekit-preload-data="tap"
        >
          <span class="mosque-title">{mosque.title}</span>
          <br />
          <span class="mosque-address">{mosque.address}</span>
        </a>
      {/each}
    </div>
  </div>
{:else if active == 'dhikr'}
  <DhikrPage></DhikrPage>
{:else}
  <DropDownMenu></DropDownMenu>
{/if}

<!-- Bottom Nav Bar -->
<div class="bottom-nav border border-white/5 bg-black/50">
  <button
    class="nav-item {active === 'mosque' ? 'active' : ''}"
    on:click={() => (active = 'mosque')}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M2 20h20" />
      <path d="M12 11V7" />
      <path d="M12 7a5 5 0 0 0-5 5v8h10v-8a5 5 0 0 0-5-5Z" />
      <path d="M17 20v-7a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v7" />
      <path d="M7 20v-7a2 2 0 0 0-2-2h0a2 2 0 0 0-2 2v7" />
      <path d="M12 4v1" />
      <path d="M11 2.5a1.5 1.5 0 1 1 2 0" />
    </svg>
    <span>{m['mosques.mosque']()}</span>
    <span class="indicator"></span>
  </button>

  <button
    class="nav-item {active === 'dhikr' ? 'active' : ''}"
    on:click={() => (active = 'dhikr')}
  >
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="12"
        y="19"
        text-anchor="middle"
        font-size="21"
        fill="currentColor"
        font-family="serif"
        direction="rtl"
        unicode-bidi="bidi-override"
      >
        الله
      </text>
    </svg>
    <span>{m['dhikr.dhikr']()}</span>
  </button>

  <button
    class="nav-item {active === 'settings' ? 'active' : ''}"
    on:click={() => (active = 'settings')}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path
        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
      />
    </svg>
    <span>{m['settings.settings']()}</span>
    <span class="indicator"></span>
  </button>
</div>

<style>
  :global(html),
  :global(body) {
    height: 100%; /* Important for percentage heights to work */
    overflow: hidden; /* Prevents the whole body from scrolling if you want app-like feel */
  }

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

    border-radius: 24px;
    padding: 24px;
  }

  .bottom-nav {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 90%;
    max-width: 400px;
    height: 70px;
    border-radius: 35px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
    z-index: 100;
    padding: 0 10px;
  }

  .nav-item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #747272;
    background: none;
    border: none;
    flex: 1;
    font-size: 12px;
    transition: color 0.3s;
    cursor: pointer;
  }

  .nav-item svg {
    width: 28px;
    height: 28px;
    margin-bottom: -6px;
    transition: transform 0.3s;
  }

  .nav-item.active {
    color: #fff;
  }

  .nav-item.active svg {
    transform: translateY(-4px) scale(1.2);
  }

  .indicator {
    position: absolute;
    bottom: -7px;
    width: 25px;
    height: 6px;
    border-radius: 50%;
    opacity: 0;
    transition:
      opacity 0.3s,
      transform 0.3s;
  }

  .nav-item.active .indicator {
    opacity: 1;
    transform: translateY(0);
  }

  .nav-item span {
    pointer-events: none;
  }

  .nav-item:focus {
    outline: none;
  }

  .mosque-list {
    position: relative;
    border-radius: 14px;
    padding: 16px;
    width: 100%;
    height: 70vh;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 12px;
    overflow: auto;
    margin: 0 auto;
    -webkit-overflow-scrolling: touch;
  }

  .mosque {
    display: block; /* Links are inline by default, we need block */
    text-decoration: none; /* Remove underlines */
    color: inherit; /* Don't turn the text blue */
    position: relative;
    width: 100%;
    border-radius: 12px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    padding: 14px; /* Slightly more padding for easier tapping */
    box-sizing: border-box;

    /* Mobile Polish */
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition:
      transform 0.1s ease,
      background-color 0.2s ease;
  }

  /* Add a "pressed" feel since it's an app */
  .mosque:active {
    background-color: rgba(255, 255, 255, 0.1);
    transform: scale(0.98);
  }

  .mosque-title,
  .mosque-address {
    pointer-events: none;
    display: block; /* Ensure they wrap correctly */
  }

  .mosque-title {
    font-size: large;
    font-style: bold;
  }

  .mosque-address {
    font-size: small;
    font-weight: 500;
    font-style: italic;
    color: gray;
  }

  .loading-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  }

  .spinner {
    width: 42px;
    height: 42px;
    border: 3px solid rgba(255, 255, 255, 0.2);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.9s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
