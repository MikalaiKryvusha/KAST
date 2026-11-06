# Research 03 — custom resolution input: how other clients, games and editors do it

> **Created:** 2026-11-06 (owner's word in chat ≈21:21 +03:00: «иде погуглить разведку в интернете, лучшие практики») · **Parent:** `ideas/17`, Super Artemis PR #13 review by the maintainer (2026-11-06 21:04 +03:00) · **Status:** done 2026-11-06; variants built on it — `reports/sa-sliders/custom_resolution_variants.html` · **Outbound:** the owner's choice of a variant → a PR to Super Artemis

## Why

The maintainer of Super Artemis kept the Resolution LIST and rejected the slider (resolution is categorical; the list shows native and
cutout modes at a glance; one tap beats dragging). The owner's original pain is the CUSTOM resolution row: a text field where the user
must type `1920x1080` with a Latin `x` (code: `value.split("x")`, `InputType.TYPE_CLASS_TEXT`, Super Artemis 1.1.0 `StreamSettings.java`).
This recon asks how the industry lets a user enter a custom size and pick an aspect ratio, before any mockup.

## Findings (pattern · where · source)

### Streaming clients
- **Two numeric fields with a fixed "x" label** · moonlight-qt (upstream Moonlight PC): "Custom" in the resolution list opens a dialog —
  width field, bold "x", height field; digits only, max 5 chars, range 256–8192, placeholders = current W/H, OK disabled while invalid;
  the list then reads "Custom (WxH)". No even-number check, no aspect logic. · https://github.com/moonlight-stream/moonlight-qt/blob/master/app/gui/SettingsView.qml
- **Custom resolution by aspect ratio** · moonlight-android PR #1349 (open, no maintainer answer): a 20:9 phone needs 1920×864 to fill the
  screen. · https://github.com/moonlight-stream/moonlight-android/pull/1349
- **Default / Match this device / Custom** · Windows App (Android): Custom = a list + scaling percent; macOS adds custom Width and Height
  fields. · https://learn.microsoft.com/en-us/windows-app/display-settings · Users complained when Android RD offered ONLY the device's
  ratio: https://techcommunity.microsoft.com/discussions/windowsserver/custom-resolution-on-android-remote-desktop-app-only-offers-fixed-ratios-connect/3044038
- **Presets only / match client** · Parsec (https://support.parsec.app/hc/en-us/articles/32361400566804), Shadow
  (https://support.shadow.tech/hc/en-us/articles/32731802970001), GeForce NOW (named ultrawide and 16:10 entries,
  https://9to5google.com/2023/01/24/switch-to-ultrawide-geforce-now/), PS Remote Play (https://www.sony.ca/en/electronics/support/articles/SX365201),
  Steam Link (secondary source).
- **No streaming client checked uses a slider for resolution.**

### Games, OS, emulators
- **Aspect ratio first, then the size list filtered by it** · PC game menus (community evidence): https://gamedev.net/forums/topic/712586-choose-video-game-resolutions-for-graphics-settings-ie-provide-choices-for-the-user/ ·
  https://forums.unrealengine.com/t/my-notes-on-improving-your-typical-video-settings-screen-ui-ux/260500
- **Aspect ratio dropdown + custom width/height** · RetroArch: https://forums.libretro.com/t/how-to-make-the-retroarch-window-larger-than-my-monitor/30582
- **Screen size presets + Custom W/H; guides pick sizes by the phone's ratio** · Winlator: https://k3v53.github.io/mobile-emu-example-wiki-for-dammit-jeff/Guides/Step-by-step-rundown-of-the-Settings-in-Winlator
- **Native mode marked "(Recommended)"** · Windows display settings: https://support.microsoft.com/en-us/windows/change-your-screen-resolution-and-layout-in-windows-5effefe3-2eac-e306-0b5d-2073b765876b

### Material / Android Slider
- Discrete slider needs an even `stepSize`; uneven stops (1280→1920→2560) → an index slider 0..n-1 with a `LabelFormatter`. · https://developer.android.com/reference/com/google/android/material/slider/Slider
- Ticks are unlabelled dots and get thinned when dense ("drawn ticks may not match the actual snap values") → labels are our own views, ≤ 8 stops. · https://developer.android.com/reference/com/google/android/material/slider/TickVisibilityMode
- Sliders are for intensity-like values; an exact value pairs the slider with an editable field (M2/M1 guidance; M3 page not loadable — unverified). · https://m2.material.io/components/sliders
- Segmented buttons hold about 2–5 options (16:9 · 16:10 · 21:9 · 4:3 · device = 5). · https://developer.android.com/develop/ui/compose/components/segmented-button

### Two-dimension input
- **Two fields + chain/lock toggle between them** · Photoshop Image Size (https://community.adobe.com/t5/photoshop-ecosystem-discussions/quot-constrain-proportions-quot-checkbox-not-in-image-size-dialog-box/m-p/15314702),
  Canva Android custom size (https://www.canva.com/help/article/use-custom-dimensions-android), Figma — rounding to whole pixels breaks an exact
  ratio (https://forum.figma.com/suggest-a-feature-11/launched-true-aspect-ratio-lock-36138/index21.html).

### Encoder / decoder constraints
- 4:2:0 encoding rejects odd sizes (https://trac.ffmpeg.org/ticket/309); H.264 codes 16×16 blocks, 1080 → 1088 cropped
  (https://forum.videohelp.com/showthread.php?p=2341340); NVENC HEVC 2160 → 2176 (https://forums.developer.nvidia.com/t/nvenc-hevc-encoding-of-3840x2160-results-in-coded-size-of-3840x2176/60107).
- Android: `MediaCodecInfo.VideoCapabilities.getWidthAlignment()/getHeightAlignment()`, `isSizeSupported(w,h)`, `areSizeAndRateSupported(w,h,fps)`
  — the authoritative runtime check. · https://developer.android.com/reference/android/media/MediaCodecInfo.VideoCapabilities
- Hosts may reject unusual sizes (forum level, cause unverified): https://github.com/orgs/LizardByte/discussions/1041 · https://github.com/ClassicOldSong/Apollo/issues/838

## Implications (strongest evidence first)

1. Two numeric fields with a fixed "×" — the upstream moonlight-qt pattern; digits keyboard, range check, OK disabled while invalid.
2. Snap W and H to the decoder alignment (at least even, prefer multiples of 8); validate with `isSizeSupported` before OK.
3. The list stays the main control, Custom is secondary — no streaming client uses a slider; this is also the maintainer's position.
4. A ratio selector, if added: 5 options with the device's own screen as default, never the only choice.
5. A ratio lock (chain) is a recognized pattern: W typed → H computed and rounded, ratio shown as "≈".
6. A stepped slider, if added: index-based, ≤ 8 stops, labels drawn by us; it only fills the fields, never replaces them. No precedent among streaming clients.
7. Clamp to a range (moonlight-qt 256–8192) and to the decoder's maximum; mark the native size as recommended.

Unverified: chiaki-ng and Xbox app UIs; M3 slider wording; Sunshine/Apollo handling of odd sizes.
