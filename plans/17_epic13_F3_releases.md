# Plan 17 (epic 13, Ф3) — релизы x.x.+1 всех четырёх приложений, подписанные своими ключами

> **Created:** 2026-11-07 · **Parent:** `plans/13_EPIC_distribution_freedom.md` → «Ф3 Версии и релизы — KAST 20.2.6→20.2.7 (code 58), KrinikCam
> 0.9→0.9.1…, KARTUN 1.0→1.0.1…, KrinikTribitApp 0.1→0.1.1…» · **Owner's words:** «всех приложений собрать релизы, поднять минорную версию на 1
> x.x.+1», «повыпускать релизы», «собираем стабильные релизы», «работай автономно» · **Tests:** `testcases/TC_distribution_freedom.md` → REL-1…REL-5, KEY-1

## Goal vector

Achieve: на GitHub Releases каждого проекта — релиз `vX.Y.Z`, APK подписан своим постоянным ключом, `versionName` = `X.Y.Z` (Obtainium видит версию).
Maintain: обновление поверх прошлого релиза там, где ключ тот же (KARTUN 1.0 → 1.0.1). Avoid: APK с debug-подписью; пре-релиз как latest; тег ≠ versionName.

## Acceptance criteria

REL-1…REL-4 (×4) и KEY-1 (×4) из тест-кейсов; REL-5 — KrinikCam 0.9 (debug-ключ CI) → 0.9.1 поверх НЕ встаёт, в заметках релиза сказано «переустановить один раз».

## Versions (решения агента по мандату «работай автономно», схема владельца x.x.+1)

| | было | станет | versionCode | как |
|---|---|---|---|---|
| KAST | 20.2.6 / 57 | **20.2.7** | 58 | `app/build.gradle`; в релиз — 4 APK nonRoot_game по ABI, имена `KAST-20.2.7-nonRoot-<abi>.apk`; ссылка Obtainium в приложении — фильтр `nonRoot.*arm64-v8a`, как в README |
| KrinikCam | 0.9 (0) / 90001 | **0.9.1** | 90002 | `version.json` build 0→1, `versionName` = `major.minor.build`; `release.yml` больше не публикует по тегу (подписывал debug-ключом) — выпуск локально своим ключом |
| KARTUN | «1.0 (N)» / N | **1.0.1** | число коммитов | `versionName` чистый `1.0.1` (число сборок остаётся в versionCode) |
| KrinikTribitApp | «0.1 (1)» / 1 | **0.1.1** | 2 | первый релиз |

Иконка приложения KAST: утверждённый розовый логотип — это и есть исходник иконки приложения (`assets/logo/kast-icon.svg`, bugs/05) → исходник
заменяется розовым (синий сохраняется как `kast-icon-blue.svg`), слои Android — `node tools/make-launcher-icon.mjs`.

## Steps

- [ ] 1. Версии ×4 + иконка KAST + `release.yml` KrinikCam; debug-сборка ×4 зелёная. *(anchor: «Ф3 Версии и релизы»)*
- [ ] 2. Судья по диффу версий.
- [ ] 3. Release-сборки ×4 своими ключами (KAST `assembleNonRoot_gameRelease`, KrinikCam `assembleRelease` с `.env`, KARTUN — сначала проверка
      `engine/third_party` и моделей, затем `assembleRelease`, KrinikTribitApp `assembleRelease`).
- [ ] 4. REL-2/REL-3 до публикации: `apksigner verify --print-certs` (не `CN=Android Debug`), versionCode > прошлого; KEY-1.
- [ ] 5. Установка релизных APK на Titan поверх (KARTUN — поверх 1.0, REL-4) и чистая (остальные) — запуск, окно FreeDroidWarn.
- [ ] 6. Commit + tag `vX.Y.Z` + push; `gh release create vX.Y.Z <apk…> --title … --notes-file …` (заметки EN: FreeDroidWarn, Obtainium; KrinikCam —
      переустановить один раз; KrinikTribitApp — первый релиз). REL-1 — `gh release view`.
- [ ] 7. Судья по фазе; отметка в плане 13.

## Risks

- KrinikCam: у тех, кто ставил 0.9, поверх не встанет — сказано в заметках (REL-5).
- KARTUN: release-сборка требует собранный ncnn и модели в `engine/third_party` / assets (скрипты Node) — проверить наличие до сборки.
- KAST на паузе владельцем, но в списке эпика — релиз 20.2.7 выпускается.
