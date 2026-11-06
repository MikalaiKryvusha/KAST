# Research 04 — Real display specs of Android devices for the screenshot stand

> **Created:** 2026-11-06 · **Parent:** Super Artemis issue #14 (Custom Resolution dialog); owner's order to render the dialog at real device screen configs on Titan 1 · **Status:** recon done · **Outbound:** —

## How the numbers were obtained

- **Default density** comes from stock-firmware `vendor.build.prop` files in the public archive
  `https://github.com/xdaGari/tadiphone-buildprop-archive` (folder `<vendor>/<codename>/<build>/vendor.build.prop`, the newest build folder was read),
  and for Pixels from Google's AOSP device trees (`TARGET_SCREEN_DENSITY`). Where neither had the value: **not found**.
- **Resolution / diagonal / PPI**: Samsung's own Galaxy Emulator Skin pages, Google's Pixel tech-specs page, the vendor's page,
  or (marked "search") the snippet of a web search that was not opened. GSMArena refuses automated reads (paywall redirect), so it was not used.
- **unverified** = the number was not read from a source in this pass; fill it from a GSMArena page by hand before relying on it.
- sw dp = short side px × 160 / density. Titan 1 limit: 1600 × 2560. "Scaled pair" keeps the aspect and the sw dp: px and density are multiplied by the same factor k.

## Table

| # | Device | Class | Native px | Default px | Diagonal | PPI | Aspect | Default density | sw dp | Sources |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Samsung Galaxy S24 Ultra (SM-S928B) | phone | 1440 × 3120 | 1080 × 2340 (FHD+, factory) | 6.8" | ~505 | 19.5:9 | `ro.sf.lcd_density=450` (FHD+); `ro.sf.init.lcd_density=600` (QHD+) | 384 (both) | [Samsung skin](https://developer.samsung.com/galaxy-emulator-skin/galaxy-s.html) · [Wikipedia](https://en.wikipedia.org/wiki/Samsung_Galaxy_S24) · FHD+ default: [Tom's Guide](https://www.tomsguide.com/phones/samsung-phones/how-to-change-screen-resolution-on-samsung-galaxy-s24) · density: archive `samsung/e3q` (S928BXXU2AXE4) |
| 2 | Samsung Galaxy Tab S10 Ultra | tablet 14.6" | 1848 × 2960 | 1848 × 2960 | 14.6" | ~239 | 16:10 | 300 **from Tab S9 Ultra SM-X916B** (same panel); S10 Ultra's own prop not found | 985.6 | [Samsung Tab skin](https://developer.samsung.com/galaxy-emulator-skin/galaxy-tab.html) · same panel: [Wikipedia Tab S10](https://en.wikipedia.org/wiki/Samsung_Galaxy_Tab_S10) · density: archive `samsung/gts9u` (X916BXXU1BWL1) |
| 3 | Xiaomi 17 (base; there is no "Xiaomi 16": Xiaomi skipped 16, series = Xiaomi 17 / 17 Pro / 17 Pro Max, Sept 2025) | phone | 1220 × 2656 | 1220 × 2656 | 6.3" | ~464 (some list 460) | ~19.6:9 | **not found** | — | name: [TechNode](https://technode.com/2025/09/17/xiaomi-skips-16-to-launch-xiaomi-17-series-next-week-aims-to-take-on-iphone/), [PhoneArena](https://www.phonearena.com/news/there-will-be-no-xiaomi-16-series-xiaomi-will-skip-entire-phone-generation-to-fight-apple_id174025) · display (search): [teltarif](https://www.teltarif.de/h/xiaomi/17/), [Vodafone IE](https://deviceguides.vodafone.ie/xiaomi/17-android-16/specifications) |
| 4 | Samsung Galaxy Z Fold6 inner (SM-F956B) | foldable, near-square | 1856 × 2160 | 1856 × 2160 | 7.6" | ~374 | 20.9:18 | `ro.sf.lcd_density=420` | 707.0 | [Samsung Z skin](https://developer.samsung.com/galaxy-emulator-skin/galaxy-z.html) · aspect: [Samsung Mobile Press](https://samsungmobilepress.com/media-assets/galaxy-z-fold6?tab=specs) · density: archive `samsung/q6q` (F956BXXU1AXFD) |
| 4b | Galaxy Z Fold6 cover (optional) | cover | 968 × 2376 (search) | — | unverified | 410 (search) | ~22:9 | not found (no cover-density prop in the q6q dump) | — | search snippet of GSMArena only |
| 5 | Google Pixel 9 Pro Fold inner | foldable, near-square | 2076 × 2152 | 2076 × 2152 | 8" | 373 | ~1.04:1 | `TARGET_SCREEN_DENSITY := 390` (AOSP) | 851.7 | [Pixel tech specs](https://support.google.com/pixelphone/answer/7158570?hl=en) · density: [AOSP comet BoardConfig](https://android.googlesource.com/device/google/comet/+/refs/heads/main/comet/BoardConfig.mk) |
| 6 | Google Pixel 9 Pro | phone | 1280 × 2856 | 960 × 2142 (AOSP boot mode) | 6.3" | 495 | 20:9 | `TARGET_SCREEN_DENSITY := 480` (for 1280 wide) | 426.7 (user report: default 426) | [Pixel tech specs](https://support.google.com/pixelphone/answer/7158570?hl=en) · density: [AOSP caiman BoardConfig](https://android.googlesource.com/device/google/caimito/+/refs/heads/main/caiman/BoardConfig.mk) · boot mode: [device-caiman.mk](https://android.googlesource.com/device/google/caimito/+/refs/heads/main/device-caiman.mk) · 426 dp: [Android Central](https://forums.androidcentral.com/threads/pixel-9-pro-default-smallest-width-value.1076040) |
| 7 | Samsung Galaxy Z Flip6 main (SM-F741B) | flip, inner screen | 1080 × 2640 | 1080 × 2640 | 6.7" | ~426 | 22:9 | `ro.sf.lcd_density=480` | 360 | [Samsung Z skin](https://developer.samsung.com/galaxy-emulator-skin/galaxy-z.html) · density: archive `samsung/b6q` (F741BXXU1AXFD) |
| 8 | Samsung Galaxy A03 (SM-A035F) | compact low-res phone, HD+ | 720 × 1600 | 720 × 1600 | unverified | unverified | 20:9 | `ro.sf.lcd_density=300` | 384 | density: archive `samsung/a03` (A035FXXS5CWK1); resolution unverified |
| 9 | Sony Xperia 10 V (pdx237) | tall phone | 1080 × 2520 | 1080 × 2520 | unverified | unverified | 21:9 | `ro.sf.lcd_density=450` | 384 | density: archive `sony/pdx237` (67.1.A.2.229); resolution unverified (10 VI keeps 21:9) |
| 10 | Samsung Galaxy Tab A7 Lite (SM-T225) | small tablet 8.7" | 800 × 1340 | 800 × 1340 | unverified | unverified | ~15:9 | `ro.sf.lcd_density=213` | 600.9 | density: archive `samsung/gta7lite` (T225XXU6DWL9); resolution unverified |
| 11 | Lenovo Tab Extreme (TB570FU) | giant tablet 14.5" | 1876 × 3000 | 1876 × 3000 | unverified | unverified | 16:10 | `ro.sf.lcd_density=320` | 938 | density: archive `lenovo/tb570fu`; resolution unverified |
| 12 | Lenovo Legion Y700 2023 (TB320FC) | small tablet 8.8" | unverified | — | unverified | unverified | 16:10 | not found (no density line in the dump) | — | archive `lenovo/tb320fc` |
| 13 | Anbernic RG Cube | handheld, square | 720 × 720 | 720 × 720 | 3.95" | unverified | 1:1 | not found | — | [Anbernic spec sheet](https://win.anbernic.com/product/415.html) |
| 14 | AYN Odin 2 | handheld | 1080 × 1920 | 1080 × 1920 | 6" | unverified | 16:9 | not found | — | [iFixit](https://www.ifixit.com/Device/AYN_Odin_2) |
| — | Motorola Razr, 4:3 handheld, Android TV | — | not researched (time limit) | | | | | | | |

Notes. Samsung phones ship at FHD+ with `ro.sf.lcd_density` for FHD+ and a separate `ro.sf.init.lcd_density` for QHD+; the dp size is the same at both.
Pixel: AOSP density is for the full panel; at the default 0.75 mode Android keeps the dp (a user reports 426 dp on a stock 9 Pro), so 960 × 2142 runs at 360.
Not found in the archive: Tab S10 Ultra (`gts10u`), Xiaomi 17, handhelds.

## Over Titan 1 (1600 × 2560) and scaled pairs

| Device | Over the panel? | Scaled pair (same aspect, same sw dp) |
|---|---|---|
| S24 Ultra | native 3120 long side, yes; factory FHD+ 1080 × 2340 fits | use FHD+ as is: 1080 × 2340 @ 450 |
| Tab S10 Ultra | yes (1848, 2960) | k = 259/300: **1596 × 2556 @ 259** → 986 dp |
| Z Fold6 inner | yes (1856) | k = 360/420: **1590 × 1852 @ 360** → 706.7 dp |
| Pixel 9 Pro Fold inner | yes (2076) | k = 300/390: **1596 × 1656 @ 300** → 851.2 dp |
| Pixel 9 Pro | native 2856, yes; default mode fits | 960 × 2142 @ 360 → 426.7 dp |
| Z Flip6 main | yes (2640) | k = 464/480: **1044 × 2552 @ 464** → 360 dp |
| Lenovo Tab Extreme | yes (1876, 3000) | k = 272/320: **1594 × 2550 @ 272** → 937.6 dp |

## Recommended 10–12 profiles

Spread: aspect 1:1 … 22:9; density 213 … 480; size 3.95" … 14.6". Apply with `adb shell wm size WxH` and `adb shell wm density D`, reset with `wm size reset` and `wm density reset`.

| # | Profile | `wm size` | `wm density` | sw dp | Shoot | Density basis |
|---|---|---|---|---|---|---|
| 1 | S24 Ultra, factory FHD+ | 1080x2340 | 450 | 384 | portrait + landscape | build.prop |
| 2 | Tab S10 Ultra (scaled) | 1596x2556 | 259 | 986 | landscape (two-pane settings) + portrait | build.prop of Tab S9 Ultra |
| 3 | Xiaomi 17 | 1220x2656 is over 2560: use 1176x2560 | **density not found**: stand uses 440 until read from a device | ~428 (stand) | portrait + landscape | assumption, verify with `adb shell wm density` |
| 4 | Pixel 9 Pro, default mode | 960x2142 | 360 | 426.7 | portrait | AOSP |
| 5 | Z Flip6 inner (scaled), 22:9 | 1044x2552 | 464 | 360 | portrait + landscape | build.prop |
| 6 | Xperia 10 V, 21:9 | 1080x2520 | 450 | 384 | portrait + landscape | build.prop |
| 7 | Galaxy A03, compact HD+ | 720x1600 | 300 | 384 | portrait | build.prop |
| 8 | Z Fold6 inner (scaled), near-square | 1590x1852 | 360 | 706.7 | portrait + landscape | build.prop |
| 9 | Pixel 9 Pro Fold inner (scaled), ~1:1 | 1596x1656 | 300 | 851.2 | portrait + landscape | AOSP |
| 10 | Tab A7 Lite, small low-density tablet | 800x1340 | 213 | 600.9 | portrait + landscape | build.prop |
| 11 | Lenovo Tab Extreme (scaled), 14.5" | 1594x2550 | 272 | 937.6 | landscape | build.prop |
| 12 | RG Cube 1:1 handheld | 720x720 | **density not found** | — | as is (square) | needs a device read; until then, skip or mark the shot "density assumed" |

AYN Odin 2 (1080 × 1920, 16:9) can join as a 13th profile once its density is read from a device or a dump.

## Added 2026-11-06 ≈23:57 — owner's extra devices, and densities by calculation

Owner's order for devices with no sourced density: «ЗНАЧИТ ... ВОЗЬМИ КАЛЬКУЛЯТОР, И ПОСЧИТАЙ» (chat 2026-11-06 ≈23:56).
**Method:** density = panel PPI × the median density/PPI ratio of the sourced tablets in this file —
Tab S10 Ultra 300/239 = 1.26 · Yoga Tab 13 240/196 = 1.22 · Tab A7 Lite 213/179 = 1.19 · Tab Extreme 320/244 = 1.31 → median **1.24**.
A computed density is marked `densityComputed: true` in `tools/stand/device-profiles.json`.

| Device | px | Diag | PPI | Density | How | Sources |
|---|---|---|---|---|---|---|
| Lenovo Yoga Tab 13 (YT-K606F) | 1350×2160 | 13" | 196 | 240 | build.prop line 66 | [build.prop](https://github.com/xdaGari/tadiphone-buildprop-archive/blob/main/lenovo/k606f/qssi-user-11-RKQ1.201217.002-YT-K606F_USR_S200253_2111200005_Q00218_ROW-release-keys/vendor.build.prop) · [smartworld](https://www.smartworld.it/schede/lenovo-yoga-tab-13/) |
| Motorola Edge 50 Pro (eqe) | 1220×2712 | 6.7" | 445 | 450 | build.prop, two Android 14 builds | [archive](https://github.com/xdaGari/tadiphone-buildprop-archive/tree/main/motorola/eqe) · [smartworld](https://www.smartworld.it/schede/motorola-edge-50-pro/) |
| RedMagic Astra | 1504×2400 | 9.06" | 312.6 (computed) | 388 | computed: 312.6 × 1.24 | [liliputing](https://liliputing.com/redmagic-astra-gaming-tablet-has-a-165-hz-oled-display-snapdragon-8-elite-and-up-to-24gb-ram/) · [slashgear](https://www.slashgear.com/2037491/redmagic-astra-gaming-tablet-review-ipad-alternative) |
| Teclast P85T | 800×1280 | 8" | 188.7 (computed) | 234 | computed: 188.7 × 1.24 | [notebookcheck](https://www.notebookcheck.net/Teclast-P85T-New-budget-Android-13-tablet-arrives-with-8-inch-display-for-under-US-100.753452.0.html) |

Dropped by the owner: Xiaomi 17, RG Cube («НУ и хуй с ними»), Lenovo Legion Y700 2025 — 1600×2560 like Titan 1 («такой же, как у титана, отпадает»).
