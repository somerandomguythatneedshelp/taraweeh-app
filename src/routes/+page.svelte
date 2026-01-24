<script lang="ts">
        import { onMount } from 'svelte';
        import DropDownMenu from './DropDownMenu.svelte';
        import MainPage from './MainPage.svelte';

        // Getting the current date and time

        let currentDateTime = new Date();

        onMount(() => {
                const interval = setInterval(() => {
                        currentDateTime = new Date();
                }, 5000); // Update every 5 seconds

                return () => {
                        clearInterval(interval);
                };
        });

        function toMinutes(h, m) {
                // helper func
                return h * 60 + m;
        }

        function isBetween(now, start, end) {
                // helper func
                return now >= start && now < end;
        }

        // Set time of day depending on the users time

        $: timeDescripton = (() => {
                const c = currentDateTime;
                const hour = c.getHours();
                const minute = c.getMinutes();
                const month = c.getMonth(); // jan = 0
                const now = toMinutes(hour, minute);

                // JANUARY
                if (month == 0) {
                        const sunrise = toMinutes(7, 45);
                        const sunset = toMinutes(16, 0);

                        if (isBetween(now, sunrise - 30, sunrise)) {
                                return 'twilight';
                        } else if (isBetween(now, sunrise, sunrise + 15)) {
                                return 'sunrise';
                        } else if (isBetween(now, sunrise + 15, sunrise + 75)) {
                                return 'golden_hour';
                        } else if (isBetween(now, sunrise + 75, sunset - 60)) {
                                return 'sunlight';
                        } else if (isBetween(now, sunset - 60, sunset)) {
                                return 'golden_hour';
                        } else if (isBetween(now, sunset, sunset + 45)) {
                                return 'sunset';
                        } else if (isBetween(now, sunset + 45, sunset + 75)) {
                                return 'twilight';
                        } else {
                                return 'night';
                        }
                }

                // FEBRUARY
                else if (month == 1) {
                        const sunrise = toMinutes(7, 10);
                        const sunset = toMinutes(16, 45);

                        if (isBetween(now, sunrise - 30, sunrise)) {
                                return 'twilight';
                        } else if (isBetween(now, sunrise, sunrise + 15)) {
                                return 'sunrise';
                        } else if (isBetween(now, sunrise + 15, sunrise + 75)) {
                                return 'golden_hour';
                        } else if (isBetween(now, sunrise + 75, sunset - 60)) {
                                return 'sunlight';
                        } else if (isBetween(now, sunset - 60, sunset)) {
                                return 'golden_hour';
                        } else if (isBetween(now, sunset, sunset + 45)) {
                                return 'sunset';
                        } else if (isBetween(now, sunset + 45, sunset + 75)) {
                                return 'twilight';
                        } else {
                                return 'night';
                        }
                }

                // MARCH
                else if (month == 2) {
                        const sunrise = toMinutes(6, 10);
                        const sunset = toMinutes(17, 40);

                        if (isBetween(now, sunrise - 30, sunrise)) {
                                return 'twilight';
                        } else if (isBetween(now, sunrise, sunrise + 15)) {
                                return 'sunrise';
                        } else if (isBetween(now, sunrise + 15, sunrise + 75)) {
                                return 'golden_hour';
                        } else if (isBetween(now, sunrise + 75, sunset - 60)) {
                                return 'sunlight';
                        } else if (isBetween(now, sunset - 60, sunset)) {
                                return 'golden_hour';
                        } else if (isBetween(now, sunset, sunset + 45)) {
                                return 'sunset';
                        } else if (isBetween(now, sunset + 45, sunset + 75)) {
                                return 'twilight';
                        } else {
                                return 'night';
                        }
                }
        })();

        $: backgroundClass = (() => {
                switch (timeDescripton) {
                        case 'sunlight':
                                return 'sunlight';
                        case 'sunset':
                                return 'sunset';
                        case 'night':
                                return 'night';
                        case 'twilight':
                                return 'twilight';
                        case 'sunrise':
                                return 'sunrise';
                        case 'golden_hour':
                                return 'golden_hour';
                        default:
                                return 'default';
                }
        })();
</script>

{#if timeDescripton == 'sunlight'}
        <div class="sun-glow"></div>
{/if}

<div class="background app-container {backgroundClass}">
        <div class="date-time">
                <MainPage></MainPage>
        </div>
</div>

<style>
        .date-time {
                font-weight: 500;
        }

        .background {
                width: 100vw; /* full width */
                height: 100vh; /* full height */
                display: flex; /* center content */
                align-items: center;
                justify-content: center;
                transition: background 0.5s ease; /* smooth background changes */
                color: white; /* text color */
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
                max-width: 400px;
                margin: 0 auto;
                text-align: center;
        }

        div {
                transition: background 0.5s ease; /* smooth changes */
                width: max-content;
                height: max-content;
        }
</style>