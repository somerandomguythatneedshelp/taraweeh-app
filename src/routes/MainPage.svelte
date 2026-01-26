<script lang="ts">
	import DropDownMenu from "./DropDownMenu.svelte";
    import * as m from "$lib/paraglide/messages.js";
    
    import { resolve } from '$app/paths';

    let active = 'mosque';
</script>

<!-- Acutal page content -->
{#if active == "mosque"}
    <div>
        <div class="mosque-list bg-black/30"> <!-- a list containing all of the mosques/masjids -->
            <a href={resolve("/mosque?m=brough-mosque")}>
                <button class="mosque bg-black/50" id="brough-mosque">
                    <span class="mosque-title">East Riding Community Foundation Centre</span>
                    <br>
                    <span class="mosque-address">Welton craft, 6 Common Ln, Welton, Brough HU15 1PT</span>
                </button>
            </a>
            <a href={resolve("/mosque?m=as-suffa")}>
                <button class="mosque bg-black/50" id="as-suffa">
                    <span class="mosque-title">As-Suffa Education</span>
                    <br>
                    <span class="mosque-address">As Suffa Education, Walker St, Hull HU3 2HD</span>
                </button>
            </a>
            <a href={resolve("/mosque?m=as-suffa")}>
                <button class="mosque bg-black/50" id="hull-mosque">
                <span class="mosque-title">Hull Mosque & Islamic Centre</span>
                <br>
                <span class="mosque-address">2 Berkeley St, Hull HU3 1PR</span>
            </button>
            </a>
        </div>
    </div>

{:else}

    <DropDownMenu></DropDownMenu>
{/if}

    <!-- Bottom Nav Bar -->
<div class="bottom-nav bg-white/20"> 
    <button class="nav-item {active === 'mosque' ? 'active' : ''}" on:click={() => active = 'mosque'}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M2 20h20" />
  <path d="M12 11V7" />
  <path d="M12 7a5 5 0 0 0-5 5v8h10v-8a5 5 0 0 0-5-5Z" />
  <path d="M17 20v-7a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v7" />
  <path d="M7 20v-7a2 2 0 0 0-2-2h0a2 2 0 0 0-2 2v7" />
  <path d="M12 4v1" />
  <path d="M11 2.5a1.5 1.5 0 1 1 2 0" />
</svg>
        <span>{m["mosques.mosque"]()}</span>
        <span class="indicator"></span>
    </button>

    <button class="nav-item {active === 'settings' ? 'active' : ''}" on:click={() => active = 'settings'}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="3" />
  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
</svg>
        <span>{m["settings.settings"]()}</span>
        <span class="indicator"></span>
    </button>
</div>

<style>
    /* Floating pill container */
    .bottom-nav {
        position: fixed;
        bottom: 20px; /* floating above bottom edge */
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 90%;
        max-width: 400px;
        height: 70px;
        border-radius: 35px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        z-index: 100;
        padding: 0 10px;
    }

    /* Each button inside the nav */
    .nav-item {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #888;
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

    /* Active state */
    .nav-item.active {
        color: #000;
    }

    .nav-item.active svg {
        transform: translateY(-4px) scale(1.2);
    }

    /* Active indicator (little pill under icon) */
    .indicator {
        position: absolute;
        bottom: -7px;
        width: 25px;
        height: 6px;
        border-radius: 50%;
        background-color: #000;
        opacity: 0;
        transition: opacity 0.3s, transform 0.3s;
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
        position: fixed;
        border-radius: 14px;
        padding: 16px;
        top: 5vh;
        width: 90vw;
        transform: translateX(-50%);
        height: 75vh;
        box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        z-index: 100;
        margin: 0 auto;
        display: flex;
        flex-direction: column;   /* stack mosque items vertically */
        gap: 12px;                /* spacing between items */
        overflow: auto;           /* scroll if contents exceed 75vh */
    }

.mosque {
  position: static;         /* regular flow inside .mosque-list */
  width: 100%;
  max-width: none;
  border-radius: 12px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.08);
  padding: 10px;
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

</style>
