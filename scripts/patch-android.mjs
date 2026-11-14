// Chạy sau "cap add android": thêm quyền camera và đặt versionCode tăng dần để cài đè lên bản cũ mà không mất dữ liệu.
import fs from 'node:fs';

const manifestPath = 'android/app/src/main/AndroidManifest.xml';
let manifest = fs.readFileSync(manifestPath, 'utf8');
for (const line of [
  '<uses-permission android:name="android.permission.CAMERA" />',
  '<uses-feature android:name="android.hardware.camera" android:required="false" />',
]) {
  if (!manifest.includes(line)) manifest = manifest.replace('</manifest>', `    ${line}\n</manifest>`);
}
fs.writeFileSync(manifestPath, manifest);

const gradlePath = 'android/app/build.gradle';
let gradle = fs.readFileSync(gradlePath, 'utf8');
const run = process.env.GITHUB_RUN_NUMBER || '1';
if (!/versionCode\s+\d+/.test(gradle) || !/versionName\s+"[^"]*"/.test(gradle)) throw new Error('Không tìm thấy versionCode/versionName trong build.gradle');
gradle = gradle.replace(/versionCode\s+\d+/, `versionCode ${run}`).replace(/versionName\s+"[^"]*"/, `versionName "1.${run}"`);
fs.writeFileSync(gradlePath, gradle);
console.log(`OK: quyền camera, versionCode=${run}`);
