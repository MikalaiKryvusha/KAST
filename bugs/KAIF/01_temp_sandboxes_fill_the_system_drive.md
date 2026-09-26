# KAIF bug: test sandboxes and dry-run bodies are never pruned — ~62 GB in the OS temp in three days, the owner's system drive filled

kaif-fp: tools/lib/temp-root.mjs + kaif-core report --dry-run :: temp-leak :: v2.8
**Delivered upstream:** https://github.com/MikalaiKryvusha/KAIF/issues/110
**Autocapture** (from `.kaif/kaif.json` + update receipt): KAIF 2.8 · project KAST · sphere programming · language ru ·
i18n translated · tracking origin · agent system claude-code · OS Windows 11 Pro 10.0.26200 · Node v24.15.0
**Dedup attestation:** searched `bugs/KAIF/` (`ls bugs/KAIF` → the directory did not exist) and origin issues
(`gh issue list --repo MikalaiKryvusha/KAIF --state all --search "<q>"` for "temp sandbox", "sandbox cleanup",
"tmpdir leak", "disk space" → no issue about temp retention; hits #72 #79 #11 #63 #48 #65 #43 #50 are unrelated).
No match found.

## Expected per canon

> «зелёный прогон убирает свой корень — мусор в temp не копится; КРАСНЫЙ прогон корень ОСТАВЛЯЕТ и печатает путь —
> улика лежит там, где она нужна» — `tools/lib/temp-root.mjs`, header (KAIF source tree).

The promise is "garbage does not accumulate in temp". Nothing bounds what the red and the interrupted runs leave.

## Got in the field

The owner's machine (the KAIF source project and several deployed projects are developed on it), 2026-09-26:
the owner: «что-то заняло опять много места на дистке C» ("something took a lot of space on drive C again").

`du -s --block-size=1M` over `%LOCALAPPDATA%\Temp`, grouped by name prefix (MB · count · prefix):

```
   19914 MB   168  kaif-sbx-scanners
   17411 MB   106  kaif-sbx-update-route
   11682 MB   245  kaif-sbx-voicelint
    5897 MB   464  kaif-sbx-budgets
    1374 MB    25  kaif-sbx-s27
    1301 MB    15  kaif-sbx-symmetries
    1220 MB    14  kaif-sbx-anon
    1031 MB     1  kaif-judge
     482 MB    72  kaif-sbx-hooks
     436 MB   436  kaif     (kaif-report-*)
     341 MB     1  kaif-court
```

≈ 62 GB of 68 GB in the temp dir. Age of the leftovers (`Get-ChildItem -Directory -Filter 'kaif-*'`, LastWriteTime):
every group lies between 2026-09-24 and 2026-09-26 — about 20 GB a day. 58 new `kaif-*` entries appeared within two
hours of the observation; free space on C fell from 22.0 GB to 18.8 GB within one hour.

The second source is in the shipped core itself (`dist/KAIF-CORE.mjs:3984–3988`, `report`):

```js
const bodyDir = mkdtempSync(join(tmpdir(), 'kaif-report-'));   // unique by construction (bugs/59)
...
if (dryRun) { log(`DRY-RUN: would run \`gh issue create ... --body-file ${bodyPath}\` — nothing sent; the body is kept there for inspection
```

Every `report --dry-run` (and every OUTCOME UNKNOWN exit) leaves a `kaif-report-*` directory; 437 of them are on disk.

## Repro (deterministic)

1. In any deployment on `tracking: origin`: `node .kaif/kaif-core.mjs report bugs/KAIF/<ticket>.md --dry-run`.
2. `ls -d "$TMP"/kaif-report-*` — one more directory per run; nothing ever removes it.
3. For `kaif-sbx-*`: any suite run through `tempRoot()` that ends red, or is killed before its cleanup (an agent's
   background-task limit, a timeout, Ctrl+C), leaves its root; a selftest that proves a guard red by design leaves one
   on every run.

## Cost and violated invariant

The owner's system drive — the machine that also runs his streaming server — lost ~62 GB; the owner cleaned it by hand
(an agent's sweep of the shared temp was refused by the agent system's safety layer). Invariant: **owner-work-safety**
(the machine is harmed by the framework's own tooling). Severity by the ladder: S1 (the machine).

## What in KAIF led to this

"Keep the red root as evidence" has no retention bound, and interrupted runs never reach their cleanup; the dry-run
body is kept "for inspection" with no owner of its deletion. Each rule is reasonable alone; together they make temp a
write-only store.

## Proposed change (smallest that closes it)

- `tempRoot()` prunes ITS OWN prefix on entry: roots older than 24 h (or beyond the newest 5 red roots) are removed,
  with `rmdir`-style link-safe deletion (the sandboxes hold symlink fixtures such as `broken-note.md -> no-such-note.md`).
- `report --dry-run` writes its body to one fixed per-project path (overwritten each run) or prunes old
  `kaif-report-*` the same way.
- A guard in the suite: after a full run, count `kaif-*` entries in the temp dir older than 24 h → red above zero.

## Local remediation

None in the framework. The owner got a one-off cleanup script (`kaif-*` older than 3 h, `rmdir /s /q`) to run by hand.
