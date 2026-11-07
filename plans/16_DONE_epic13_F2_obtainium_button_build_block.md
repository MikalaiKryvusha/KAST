# Plan 16 (epic 13, Ф2) — розовая кнопка Obtainium и стандартный блок «Build it yourself» в README

> **Created:** 2026-11-07 · **Parent:** `plans/13_DONE_EPIC_distribution_freedom.md` → «Ф2 Кнопка и блок — `docs/get-it-on-obtainium-{en,ru}.svg`…»
> · **Owner's words:** «большие красивые кнопки-ссылки на README»; «кнопки … рядом в горизонтальный список, или вертикальный, в кислом розовом
> стиле Криника»; «лого Алмаза Обтейниума можно нарисовать розовым»; «только Обтейниум делаем»; «во все README … стандартный блок с руководством
> по сборке» · **Tests:** `testcases/TC_distribution_freedom.md` → OBT-1, BLD-1, BLD-2 · **Owner gate:** макет показан до коммита в README

## Goal vector

Achieve: в README каждого приложения одна большая розовая кнопка «Get it on Obtainium» (EN-раздел) / «Скачать через Obtainium» (RU-раздел),
по нажатию Obtainium открывает карточку этого приложения; ниже — одинаковый по шапке и порядку блок «Build it yourself».
Maintain: существующая кнопка DOWNLOAD APK (KARTUN, KrinikCam) остаётся рядом — в один ряд (правило владельца «рядом»); языковые кнопки и бейджи не трогаем.
Avoid: hotlink на raw.githubusercontent чужого репозитория; чужой логотип без указания источника и лицензии; CSS (GitHub его вырезает).

## Design

- Кнопка — SVG-пилюля по образцу `KARTUN/docs/download-en.svg` (440×96, rx 46, градиент `#FF3D9E`→`#E0007A`, белая обводка 25 %, жирный белый текст,
  подстрока), слева — алмаз Obtainium из `ImranR98/Obtainium` `assets/graphics/icon.svg`, перекрашенный в розовую гамму бренда (`#FF1A8C` /
  `#FF6BBD` / `#CC0070`). Файлы в каждом репозитории: `docs/get-it-on-obtainium-en.svg`, `docs/get-it-on-obtainium-ru.svg`; рядом
  `docs/OBTAINIUM-BADGE-NOTICE.md` — источник алмаза и GPL-3.0.
- Ссылка — `https://apps.obtainium.imranr.dev/redirect?r=obtainium://app/<url-encoded JSON>`; JSON: `id` (пакет релиза), `url` (репозиторий),
  `author` `MikalaiKryvusha`, `name`, `additionalSettings` (`apkFilterRegEx` где нужно — KAST: `nonRoot.*arm64-v8a|universal`, решается в Ф3).
- Раскладка: `<p align="center">` — кнопки в один ряд `height="72"`, на узком экране GitHub переносит их столбцом (оба варианта владельца).
- Блок «Build it yourself» (шапка и порядок одинаковы): Requirements (JDK, Android SDK, NDK если есть) → Get the code (`git clone`, сабмодули) →
  Build (`gradlew assembleDebug` / `assembleRelease`) → Signing (свой ключ вне git: где лежит, как сделать) → Project-specific notes
  (KAST: ndk-build, флейворы; KARTUN: `tools/build-ncnn.mjs`, модели; KrinikCam: JitPack; KrinikTribitApp: только Gradle). EN + RU (+ ZH у KrinikTribitApp).

## Owner's additions 2026-11-07

- Кнопка утверждена («вот теперь идеально»): `reports/distribution/mockup/get-it-on-obtainium-{en,ru}.svg`, алмаз `translate(50.9 48.4)`.
- Шапка витрины — как у KrinikCam (иконка, название, черта, строка назначения, строка фактов); пустые подписи вроде «Short name: KCam» убрать
  (из README KrinikCam тоже), «Open source» и главное назначение оставить.
- **KAST:** такая же шапка + **новый логотип** в кислотно-розовом стиле Криника — 3 концепции (`reports/distribution/kast-logo/`), показ владельцу,
  его выбор → README KAST (и финальная картинка Ф4.5). Иконку приложения KAST заменить тем же логотипом — предложить владельцу при показе.

## Steps

- [ ] 1. Макет (агент-дизайнер, параллельно Ф1): SVG-кнопки EN/RU с розовым алмазом + страница `reports/distribution/mockup/index.html` — README-шапка
      каждого из четырёх приложений с кнопкой в тёмной и светлой теме GitHub, ряд и столбец. *(anchor: «макет — страница в новом окне Chrome»)*
- [ ] 2. Шаблон блока «Build it yourself» EN/RU — `reports/distribution/build-block-template.md`; начинка по каждому проекту из разведки 05, раздел 3.
- [ ] 3. Показ владельцу: страница макета в новом окне Chrome на этой машине; его правки → повтор; слово «да» → шаг 4.
- [ ] 4. README ×4: кнопка (EN/RU) + блок; SVG и NOTICE в `docs/`; KrinikTribitApp — в одном коммите с планом 14 (раздел сборки).
- [ ] 5. BLD-1: блок выполнен буквально на чистом клоне каждого проекта во временной папке → debug-сборка зелёная (KAST — с сабмодулем и NDK;
      KARTUN — с `tools/build-ncnn.mjs`). Расхождение → правка блока.
- [ ] 6. Судья по README-диффам; commit + push ×4.
- [ ] 7. OBT-1: README на GitHub отрисован — снимок страницы (CDP, WebP) EN и RU; ссылка кнопки ведёт на redirect с верным JSON.

## Risks

- Кнопка ведёт на релиз, которого ещё нет (KAST, KrinikTribitApp) — до Ф3 Obtainium скажет «нет релизов». Порядок: README с кнопкой коммитится
  в Ф2, релизы — Ф3 в тот же день; К2 проверяется в Ф4.
- Редирект apps.obtainium.imranr.dev несёт аналитику сайта (BADGING.md) — это официальный путь Obtainium; альтернатива `obtainium://` из браузера
  не кликается на GitHub. Принимаем.
