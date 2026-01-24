<script lang="ts">
	import DropDownMenu from "./DropDownMenu.svelte";
    import { getLocale, setLocale, locales } from "$lib/paraglide/runtime.js"; 
    import * as m from "$lib/paraglide/messages.js";

    let active = 'mosque';
</script>

<!-- Acutal page content -->
{#if active == "mosque"}
    <div>
        Thumb
    </div>

{:else}

    <DropDownMenu></DropDownMenu>
{/if}

    <!-- Bottom Nav Bar -->
<div class="bottom-nav bg-white/20"> 
    <button class="nav-item {active === 'mosque' ? 'active' : ''}" on:click={() => active = 'mosque'}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 9h3v9h14V9h3L12 2zM7 18v-5h10v5H7z"/>
        </svg>
        <span>{m["mosques.mosque"]()}</span>
        <span class="indicator"></span>
    </button>

    <button class="nav-item {active === 'settings' ? 'active' : ''}" on:click={() => active = 'settings'}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 8a4 4 0 100 8 4 4 0 000-8zm8.94 4a6.97 6.97 0 01-.11 1l2.07 1.61-2 3.46-2.45-1a6.92 6.92 0 01-1 .58l-.38 2.6h-4l-.38-2.6a6.92 6.92 0 01-1-.58l-2.45 1-2-3.46 2.07-1.61a6.97 6.97 0 01-.11-1 6.97 6.97 0 01.11-1L2.07 9.39l2-3.46 2.45 1a6.92 6.92 0 011-.58L8.9 3h4l.38 2.6a6.92 6.92 0 011 .58l2.45-1 2 3.46-2.07 1.61c.07.33.11.66.11 1z"/>
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
</style>
