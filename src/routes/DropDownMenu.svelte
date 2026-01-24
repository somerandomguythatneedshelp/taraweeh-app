<script lang="ts">
    import { getLocale, setLocale, locales } from "$lib/paraglide/runtime.js"; 
    import * as m from "$lib/paraglide/messages.js";

    // 1. Define a map for your display names
    // You can also use m.english() / m.arabic() here if you've defined them in your messages
    const languageNames: Record<string, string> = {
        en: "English",
        ar: "العربية",
        ur: "اردو",
        arz: "الْعَرَبِيَّةُ",
        sv: "svensk",
        hi: "नहीं",
    };

    function handleChange(event: Event) {
        const target = event.target as HTMLSelectElement;
        setLocale(target.value);
    }
</script>

<span class="text-white">{m["settings.select_language"]()}</span>
<br>

<select value={getLocale()} onchange={handleChange}>
    {#each locales as locale}
        <option value={locale} class="text-white">
            {languageNames[locale] ?? locale}
        </option>
    {/each}
</select>