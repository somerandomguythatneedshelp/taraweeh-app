<script lang="ts">
  import * as m from '$lib/paraglide/messages.js';
  import { surahId } from '$lib/stores.js';
  import { ArrowLeft, Sparkles, BookOpen } from 'lucide-svelte'; // Optional: icons make a big difference
</script>

<div
  class="flex min-h-screen flex-col items-center p-6 backdrop-blur-sm"
>
  <nav class="mb-8 w-full max-w-2xl">
    <button
      on:click={() => window.history.back()}
      class="group flex items-center gap-2 font-medium text-emerald-600 transition-colors hover:text-emerald-700"
    >
      <ArrowLeft
        size={18}
        class="transition-transform group-hover:-translate-x-1"
      />
      Return Home
    </button>
  </nav>

  <main class="w-full max-w-2xl overflow-hidden rounded-3xl">
    <header class="text-center">
      <h1 class="mt-2 font-serif text-4xl font-bold text-slate-800">
        {m['s' + $surahId + '.surah_name']()}
      </h1>
      <p class="mt-4 text-sm text-slate-500 italic">
        Note: Information is currently available in English only.
      </p>
    </header>

    <div class="space-y-8 p-8">
      <section class="group relative py-2">
        <div class="flex flex-col">
          <div class="flex items-center gap-2 text-amber-600">
            <Sparkles size={16} />
            <span class="text-xs font-bold tracking-widest uppercase"
              >Did you know?</span
            >
          </div>
          <p class="leading-relaxed text-slate-600 italic">
            {m['s' + $surahId + '.fun_fact']()}
          </p>
        </div>
      </section>

      <section class="space-y-4">
        <div class="flex items-center gap-2 text-slate-800">
          <BookOpen size={20} class="text-emerald-500" />
          <h2 class="text-lg font-bold">About this Surah</h2>
        </div>
        <div class="prose leading-7 text-slate-600 prose-slate">
          {m['s' + $surahId + '.long_description']()}
        </div>
      </section>
    </div>
  </main>
</div>

<style>
  /* Adding a serif font for the titles adds a traditional, scholarly feel */
  :global(h1) {
    font-family: 'Times New Roman', serif;
  }
</style>
