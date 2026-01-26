<script>
  import { page } from '$app/stores';
    // import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
    // import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
    // import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
    // import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
    // import { getLocale, setLocale } from "$lib/paraglide/runtime.js";
    import * as m from "$lib/paraglide/messages.js";

  $: mosqueId = $page.url.searchParams.get('m');

    const mosques = {
        "brough-mosque": {
        name: "East Riding Community Foundation Centre",
        desc: [
            m["ercf.desc1"],
            m["ercf.desc2"],
            m["ercf.desc3"],
            m["ercf.desc4"]
        ]
        },
        "as-suffa": {
        name: "As-Suffa Education",
        desc: [m["as-suffa.desc"]]
        },
        "hull-mosque": {
        name: "Hull Mosque & Islamic Centre",
        desc: [m["hull-mosque.desc"]]
        }
    };

    $: mosque = mosques[mosqueId];
</script>

<div class="settings-card bg-black/50">
    {#if mosque}
  <span class="font-bold text-lg">{mosque.name}</span>
  <br><br>
  <!-- ^^ BRR
  BRuh im crine
  -->

  <div class="text-lg">
    {#each mosque.desc as line}
      <span>{line()}</span><br>
    {/each}
  </div>
{:else}
  <p class="text-lg opacity-70">Mosque not found</p> <!--TODO: localize ts-->
{/if}
</div>

<style>

.settings-card {
    position: absolute;
    top: 5vh;
    left: 16px;
    right: 16px;

    backdrop-filter: blur(12px);

    border-radius: 14px;
    padding: 16px;

    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}
</style>