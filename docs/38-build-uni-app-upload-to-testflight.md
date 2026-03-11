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
4. Processing: Wait for App Store Connect background processing (approx. 10-30 minutes).
