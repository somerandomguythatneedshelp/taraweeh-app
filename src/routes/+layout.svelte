<script lang="ts">
	import { page } from '$app/state';
	import { locales, localizeHref, getLocale } from '$lib/paraglide/runtime';
	import './layout.css';
	import favicon from '$lib/assets/favicon.ico';
        import favicon57x57 from '$lib/assets/favicon57x57.png';
        import favicon72x72 from '$lib/assets/favicon72x72.png';
        import favicon92x92 from '$lib/assets/favicon92x92.png';
        import favicon114x114 from '$lib/assets/favicon114x114.png';
        import favicon144x144 from '$lib/assets/favicon144x144.png';
	import { getTimeDescription } from '$lib/backgroundHelper';

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

        let fontStyle =  $state(getLocale() == "ar" || getLocale() == "arz" || getLocale() == "ur" ? "amiri-regular" : "")
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Noto+Nastaliq+Urdu:wght@400..700&display=swap" rel="stylesheet">

        <!--apple pwa shit-->
        <!--
        Source - https://stackoverflow.com/a
        Posted by Dinesh Vaghasia
        Retrieved 2026-01-25, License - CC BY-SA 3.0
        -->

        <meta name="full-screen" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-title" content="Taraweeh+">
        <meta name="apple-mobile-web-app-status-bar-style" content="automatic">
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"/>
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">


        <link rel="manifest" href="/manifest.json">


        <!--
        Source - https://stackoverflow.com/a
        Posted by Dinesh Vaghasia
        Retrieved 2026-01-25, License - CC BY-SA 3.0
        -->

        <link rel="apple-touch-icon" sizes="57x57" href={favicon57x57} />
        <link rel="apple-touch-icon" sizes="72x72" href={favicon72x72} />
        <link rel="apple-touch-icon" sizes="114x114" href={favicon114x114} />
        <link rel="apple-touch-icon" sizes="144x144" href={favicon144x144} />
        <link rel="apple-touch-icon" href={favicon92x92} />


</svelte:head>

{#if timeDescription === 'sunlight'}
	<div class="sun-glow"></div>
{/if}

<div class="background app-container {fontStyle} {backgroundClass}">
	{@render children()}
</div>

<div style="display:none">
	{#each locales as locale}
		<a href={localizeHref(page.url.pathname, { locale })}>
			{locale}
		</a>
	{/each}
</div>

<style>
.noto-nastaliq-urdu-font {
  font-family: "Noto Nastaliq Urdu", serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
}

.amiri-regular {
  font-family: "Amiri", serif;
  font-weight: 400;
  font-style: normal;
}

.amiri-bold {
  font-family: "Amiri", serif;
  font-weight: 700;
  font-style: normal;
}

.amiri-regular-italic {
  font-family: "Amiri", serif;
  font-weight: 400;
  font-style: italic;
}

.amiri-bold-italic {
  font-family: "Amiri", serif;
  font-weight: 700;
  font-style: italic;
}

        .date-time {
                font-weight: 500;
        }

        .background {
                width: 100%;
                height: 100vh;
                display: flex; /* center content */
                align-items: center;
                justify-content: center;
                transition: background 0.5s ease; /* smooth background changes */
                color: white; /* text color */
                  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
    margin: 0;
  padding: 0;
        }

        .sunlight {
                background: linear-gradient(#8c92ac, lightblue);
        }

        .sunset {
                margin: 0;
                min-height: 100vh;
                background-color: #0d0d1f;
                /* Vertical gradient: Midnight Blue -> Near Black -> Charcoal */
                background: linear-gradient(180deg, #1b1b3a 0%, #12122b 50%, #0d0d1f 100%);
                font-family:
                        system-ui,
                        -apple-system,
                        sans-serif;
                color: white;
                overflow-x: hidden; /* Prevents scrollbars from star overflow */
                position: relative;
        }

        .sunset::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;

                background-image:
                        radial-gradient(1px 1px at 25px 5px, white, rgba(255, 255, 255, 0)),
                        radial-gradient(1px 1px at 50px 25px, white, rgba(255, 255, 255, 0)),
                        radial-gradient(1px 1px at 125px 20px, white, rgba(255, 255, 255, 0)),
                        radial-gradient(1.5px 1.5px at 200px 100px, #ddd, rgba(255, 255, 255, 0)),
                        radial-gradient(1px 1px at 20px 200px, #ccc, rgba(255, 255, 255, 0)),
                        radial-gradient(1px 1px at 100px 250px, white, rgba(255, 255, 255, 0));

                background-size: 550px 550px;
                opacity: 0.3; /* Base brightness */
                pointer-events: none;
                z-index: 0;
        }

        .sunset::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;

                background-image:
                        radial-gradient(1px 1px at 75px 125px, white, rgba(255, 255, 255, 0)),
                        radial-gradient(1px 1px at 100px 50px, white, rgba(255, 255, 255, 0)),
                        radial-gradient(1.5px 1.5px at 300px 200px, white, rgba(255, 255, 255, 0)),
                        radial-gradient(1px 1px at 10px 10px, white, rgba(255, 255, 255, 0));

                background-size: 400px 400px;

                animation: twinkle 4s infinite ease-in-out;
                pointer-events: none;
                z-index: 0;
        }

        @keyframes twinkle {
                0% {
                        opacity: 0.2;
                }
                50% {
                        opacity: 0.8;
                }
                100% {
                        opacity: 0.2;
                }
        }

        .golden_hour {
                margin: 0;
                min-height: 100vh;
                background-color: #ffb347;
                /* Vertical gradient: Deep Purple (Top) -> Soft Pink -> Golden Orange (Horizon) */
                background: linear-gradient(180deg, #2b102f 0%, #7d3450 50%, #ff9a42 100%);
                font-family:
                        system-ui,
                        -apple-system,
                        sans-serif;
                color: white;
                /* Adding a subtle text shadow ensures white text is readable against the bright orange bottom */
                text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
                overflow-x: hidden;
                position: relative;
        }

        /* 2. Layer 1: Faint Background Stars */
        .golden_hour::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;

                /* Scattered stars */
                background-image:
                        radial-gradient(1px 1px at 25px 5px, white, rgba(255, 255, 255, 0)),
                        radial-gradient(1px 1px at 50px 25px, white, rgba(255, 255, 255, 0)),
                        radial-gradient(1px 1px at 125px 20px, white, rgba(255, 255, 255, 0)),
                        radial-gradient(1.5px 1.5px at 200px 100px, #ffeebb, rgba(255, 255, 255, 0)),
                        /* Slightly yellow stars */
                        radial-gradient(1px 1px at 20px 200px, #ffddee, rgba(255, 255, 255, 0)),
                        radial-gradient(1px 1px at 100px 250px, white, rgba(255, 255, 255, 0));

                background-size: 550px 550px;
                /* Lower opacity because stars are faint at sunset */
                opacity: 0.25;
                pointer-events: none;
                z-index: 0;
        }

        /* 3. Layer 2: Twinkling Stars */
        .golden_hour::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;

                background-image:
                        radial-gradient(1px 1px at 75px 125px, white, rgba(255, 255, 255, 0)),
                        radial-gradient(1px 1px at 100px 50px, white, rgba(255, 255, 255, 0)),
                        radial-gradient(1.5px 1.5px at 300px 200px, #fff5d7, rgba(255, 255, 255, 0));

                background-size: 400px 400px;
                animation: twinkle 5s infinite ease-in-out; /* Slower twinkle for a calm sunset */
                pointer-events: none;
                z-index: 0;
        }

        @keyframes twinkle {
                0% {
                        opacity: 0.1;
                }
                50% {
                        opacity: 0.5;
                } /* Max opacity is lower than night mode */
                100% {
                        opacity: 0.1;
                }
        }

        .sun-glow {
                position: fixed;
                bottom: -50px;
                left: 50%;
                transform: translateX(-50%);
                width: 100%;
                height: 200px;
                background: radial-gradient(circle, rgba(255, 220, 150, 0.4) 0%, rgba(255, 154, 66, 0) 70%);
                pointer-events: none;
                z-index: 0;
        }

        .night {
                background:
                        radial-gradient(circle at 50% 100%, rgba(95, 61, 123, 0.4) 0%, transparent 50%),
                        linear-gradient(180deg, #12122b 0%, #1c1c3d 100%);
                background-color: #12122b; /* Fallback */
                background-attachment: fixed;
        }

        .twilight {
                background: linear-gradient(#697b9c, #83664a);
        }
        .sunrise {
                background: linear-gradient(#83664a, #697b9c);
        }

        .app-container {
                position: relative;
                z-index: 1;
                padding: 40px 20px;
                margin: 0 auto;
                text-align: center;
        }

        div {
                transition: background 0.5s ease; /* smooth changes */
                width: max-content;
                height: max-content;
        }
</style>