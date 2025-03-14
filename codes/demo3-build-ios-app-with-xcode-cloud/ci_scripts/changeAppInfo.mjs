#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

/**
 * Alert! Must pass Xcode project name as first param of the script.
 * ```sh
 * # app is Xcode project name
 * node changeAppInfo.mjs app
 * ```
 */
async function main() {
  try {
    const args = process.argv.slice(2);  // Skip the first two elements
    const projectName = args.at(0)
    if(projectName === undefined) {
      throw new Error("[changeAppInfo] Must pass Xcode project name as first param of the script");
    }

    const configPath = path.resolve(`../${projectName}.xcodeproj/project.pbxproj`)
    await increaseVersion(configPath)
  }
  catch (error) {
    console.error(error)
    process.exit(1)
  }
}

/**
 * Increase version automatically in project.pbxproj file
 * Build #26 1.2 -> 1.2.26
 * Build #27 1.2 -> 1.2.27
 */
async function increaseVersion(configPath) {
  const configText = await fs.readFile(configPath, { encoding: 'utf-8' })
  print(`Changing ${configPath}`)

  const regex = /MARKETING_VERSION = (.+?);/g
  const versionMatch = configText.match(regex)
  if (versionMatch === null) {
    throw new Error(`Cant get iOS bundle version in ${configPath}, terminate build`)
  }

  const bundleVersion = versionMatch[0].replace('MARKETING_VERSION = ', '').replace(';', '')

  const ciBuildNumber = process.env.CI_BUILD_NUMBER
  if(ciBuildNumber === undefined) {
    throw new Error("[changeAppInfo] CI_BUILD_NUMBER is required, but it's undefined");
  }

  const finalBundleVersion = `${bundleVersion}.${ciBuildNumber}`
  print(`Overwrite version: ${bundleVersion} -> ${finalBundleVersion}`)

  const updatedConfigText = configText
    .replace(regex, `MARKETING_VERSION = ${finalBundleVersion};`)

  await fs.writeFile(configPath, updatedConfigText, { encoding: 'utf-8' })
}

function print(message) {
  console.log(`[changeAppInfo] ${message}`)
}

main()
