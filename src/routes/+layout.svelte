<script lang="ts">
  import { page } from '$app/state';
  import {
    locales,
    localizeHref,
    getLocale
  } from '$lib/paraglide/runtime';
  import './layout.css';
  import favicon from '$lib/assets/favicon.ico';
  import favicon57x57 from '$lib/assets/favicon57x57.png';
  import favicon72x72 from '$lib/assets/favicon72x72.png';
  import favicon92x92 from '$lib/assets/favicon92x92.png';
  import favicon114x114 from '$lib/assets/favicon114x114.png';
  import favicon144x144 from '$lib/assets/favicon144x144.png';
  import { getTimeDescription } from '$lib/backgroundHelper';

  import { resolve } from '$app/paths';

  let { children } = $props();

  // state
  let currentDateTime = $state(new Date());

  // effect (replaces onMount)
  $effect(() => {
    const interval = setInterval(() => {
      currentDateTime = new Date();
    }, 5000);

    return () => clearInterval(interval);
  });

  // derived values (replaces `$:`)
  const timeDescription = $derived(
    getTimeDescription(currentDateTime)
  );

  const backgroundClass = $derived(timeDescription);

  $effect(() => {
    // removes previous class and applies
    // a new one
    document.body.className = backgroundClass;
  });

  let fontStyle = $state(
    getLocale() == 'ar' ||
      getLocale() == 'arz' ||
      getLocale() == 'ur'
      ? 'amiri-regular'
      : ''
  );
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Noto+Nastaliq+Urdu:wght@400..700&display=swap"
    rel="stylesheet"
  />

  <!--apple pwa shit-->
  <!--
        Source - https://stackoverflow.com/a
        Posted by Dinesh Vaghasia
        Retrieved 2026-01-25, License - CC BY-SA 3.0
        -->

  <meta name="full-screen" content="yes" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-title" content="Taraweeh+" />
  <meta
    name="apple-mobile-web-app-status-bar-style"
    content="automatic"
  />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, viewport-fit=cover"
  />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta
    name="apple-mobile-web-app-status-bar-style"
    content="black-translucent"
  />

  <link rel="manifest" href="/manifest.json" />

  <!--
        Source - https://stackoverflow.com/a
        Posted by Dinesh Vaghasia
        Retrieved 2026-01-25, License - CC BY-SA 3.0
        -->

  <link rel="apple-touch-icon" sizes="57x57" href={favicon57x57} />
  <link rel="apple-touch-icon" sizes="72x72" href={favicon72x72} />
  <link
    rel="apple-touch-icon"
    sizes="114x114"
    href={favicon114x114}
  />
  <link
    rel="apple-touch-icon"
    sizes="144x144"
    href={favicon144x144}
  />
  <link rel="apple-touch-icon" href={favicon92x92} />
</svelte:head>

<div class="fixed-wallpaper {backgroundClass}">
  <div class="stars-layer"></div>
  {#if timeDescription === 'sunlight'}
    <div class="sun-glow"></div>
  {/if}
</div>

<div class="content-scroller {fontStyle}">
  {@render children()}
</div>

<div style="display:none">
  <!-- eslint-disable-next-line svelte/require-each-key -->
  {#each locales as locale}
    <a
      href={resolve(
        localizeHref(page.url.pathname, { locale }) as
          | '/'
          | '/mosque'
          | '/mosque/'
      )}
    >
      {locale}
    </a>
  {/each}
</div>

<style>
  .noto-nastaliq-urdu-font {
    font-family: 'Noto Nastaliq Urdu', serif;
    font-optical-sizing: auto;
    font-weight: 500;
    font-style: normal;
  }

  .amiri-regular {
    font-family: 'Amiri', serif;
    font-weight: 400;
    font-style: normal;
  }

  .amiri-bold {
    font-family: 'Amiri', serif;
    font-weight: 700;
    font-style: normal;
  }

  .amiri-regular-italic {
    font-family: 'Amiri', serif;
    font-weight: 400;
    font-style: italic;
  }

  .amiri-bold-italic {
    font-family: 'Amiri', serif;
    font-weight: 700;
    font-style: italic;
  }

  .date-time {
    font-weight: 500;
  }

  .background {
    width: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 0;
    align-items: center;
    min-height: 100vh;
    color: white;
    height: 100%;
  }

  :global(html),
  :global(body) {
    margin: 0;
    padding: 0;
    width: 100%;
    overflow: hidden; /* Keeps the app locked */
    position: fixed;
    height: 100%;
    /* This prevents the white 'flash' during navigation */
    transition: background-color 0.8s ease-in-out;
  }

  /* GLOBAL THEME COLORS 
     These target the <body> tag to fix the safe area 'white bar'
  */
  :global(body.sunlight) {
    background-color: #8c92ac;
  } /* Match bottom color */
  :global(body.sunset) {
    background-color: #0d0d1f;
  }
  :global(body.golden_hour) {
    background-color: #ff9a42;
  }
  :global(body.night) {
    background-color: #12122b;
  }
  :global(body.twilight) {
    background-color: #83664a;
  }
  :global(body.sunrise) {
    background-color: #697b9c;
  }

  /* FIXED WALLPAPER
     This layer covers the viewport and provides the gradient.
  */
  .fixed-wallpaper {
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    overflow: hidden;
  }

  /* Gradients */
  .sunlight {
    background: linear-gradient(#8c92ac, lightblue);
  }
  .sunset {
    background: linear-gradient(
      180deg,
      #1b1b3a 0%,
      #12122b 50%,
      #0d0d1f 100%
    );
  }
  .golden_hour {
    background: linear-gradient(
      180deg,
      #2b102f 0%,
      #7d3450 50%,
      #ff9a42 100%
    );
  }
  .night {
    background:
      radial-gradient(
        circle at 50% 100%,
        rgba(95, 61, 123, 0.4) 0%,
        transparent 50%
      ),
      linear-gradient(180deg, #12122b 0%, #1c1c3d 100%);
  }

  /* CONTENT SCROLLER
     Handles Safe Area Insets for iOS.
  */
  .content-scroller {
    position: relative;
    z-index: 1;

    display: flex;
    flex-direction: column;
    height: 100dvh;

    min-height: 100svh;
    width: 100%;
    box-sizing: border-box;
    color: white;

    overflow-y: auto;
    -webkit-overflow-scrolling: touch; 

    padding-top: calc(40px + env(safe-area-inset-top));
    padding-bottom: 40px;
    padding-left: calc(20px + env(safe-area-inset-left));
    padding-right: calc(20px + env(safe-area-inset-right));
  }

  :global(html) {
  height: 100%;
}

:global(body) {
  /* This allows the content to actually touch the bottom edge */
  padding-bottom: 0 !important;
  margin-bottom: 0 !important;
}
</style>
