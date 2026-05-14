---
title: Uploading uni-app to TestFlight
lang: en
description: Build an ipa package using HBuilderX cloud packaging and upload it to TestFlight
---

# {{ $frontmatter.title }}

{{ $frontmatter.description }}

## App Icon

Note: You must configure the App icon (1024x1024) in `manifest.json` before packaging; otherwise, an error will occur when uploading to TestFlight.

## Update Version Number

You must update the version number before packaging; otherwise, an error will occur when uploading to TestFlight.

- **Version Name (versionName)**: The version number visible to users, e.g., `1.0.1`. It must be **greater than the version currently live on the App Store**. It can remain unchanged for multiple TestFlight submissions within the same release cycle.
- **Version Code (versionCode)**: An internally incrementing integer. Every single **submission (upload)** to TestFlight **must** have a `versionCode` higher than the previous one (e.g., from 1 to 2). This is required even if the version name remains the same or if the previous upload failed.

## Certificates and Provisioning Profiles

How to obtain certificates and provisioning profiles:

> [iOS Certificate (.p12) and Provisioning Profile (.mobileprovision) Application | DCloud](https://ask.dcloud.net.cn/article/152)

Functions of certificates and provisioning profiles:

| File Type | Extension | Function |
| :--- | :--- | :--- |
| Public Key | `.cer` | Proves "who I am", combined with the private key can sign the App |
| Private Key Certificate | `.p12` | Public key + private key, used to sign the App, usually password protected. If leaked, others can sign Apps with your identity. |
| Provisioning Profile | `.mobileprovision` | Cannot sign the App, just records who signed this App, what capabilities it used, and which devices it can be installed on |

Certificate type selection:

| Certificate Type | Usage Scenario | Real Device | TestFlight |
| :--- | :--- | :--- | :--- |
| iOS App Development | Development and debugging | ✅ (Registered device) | ❌ |
| Apple Distribution | Submit to App Store | ❌ | ✅ |

## Generate ipa package (Cloud Packaging)

This is the most convenient build method. In HBuilderX, click `Distribute` > `Native App - Cloud Packaging`.

| HBuilderX Packaging Config | Certificate File Info |
| :--- | :--- |
| Private Key Certificate | `.p12` file |
| Private Key Password | Password of the `.p12` file |
| Certificate Profile File | `.mobileprovision` file |

## Upload ipa package

1. Install tool: Download **Transporter** from the Mac App Store.
2. Login: Use your Apple Developer Account (App Store Connect account).
3. Deliver: Drag the Distribution `.ipa` package into Transporter and click "Deliver".
4. Monitor: After the upload is complete, log in to [App Store Connect](https://appstoreconnect.apple.com/), go to "My Apps" > select your App > **TestFlight** to see the uploaded package.
5. Processing: The status will be "Processing" initially, usually taking 10-30 minutes. You (as a developer) will receive a notification email once processing is complete.

## Next Steps: Compliance and Testing

After successful upload and processing, you might see "Missing Compliance" on the "TestFlight" page in App Store Connect.

1. Click "Missing Compliance".
2. Answer whether the App uses encryption based on its actual situation (usually select "No").
3. Once completed, you can start internal testing or invite external testers.
