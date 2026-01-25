<script>
    import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
    import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
    import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';
    import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
    import { getLocale, setLocale } from "$lib/paraglide/runtime.js";
    import * as m from "$lib/paraglide/messages.js";

    
</script>

<div class="settings-card bg-black/50">
    <span class="font-bold text-lg">East Riding Community Foundation Centre</span>
    <br> <!--BRRR-->
    <br> <!--im crine 😭-->
    <div class="text-lg">
        <span>{m["ercf.desc1"]()}</span><br>
        <span>{m["ercf.desc2"]()}</span><br>
        <span>{m["ercf.desc3"]()}</span><br>
        <span>{m["ercf.desc4"]()}</span><br>
    </div>

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