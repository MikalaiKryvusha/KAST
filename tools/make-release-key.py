"""make-release-key.py - creates the KAST release signing key once: keys/kast-release.jks + keys/release.env (outside git).

The owner's word (chat 2026-11-07 ≈ 09:00 +03:00): «по всем проектам, которые ещё не получили REALESE ключ и скрипт
подписи - делаем, как в KARTUN, вне гита, и мне папку открыть - я скопирую в секретное хранилище». Same recipe as
KARTUN/tools/make-release-key.py, but both files live in one folder keys/ so the owner copies one folder (the root .env of
KAST holds stand secrets that are not about signing). The password is random (secrets.token_urlsafe), written only to
keys/release.env and handed to keytool through a temporary file, never through argv; nothing secret is printed. Refuses
to run when the key already exists - a second key would make every installed release impossible to update.
RSA 4096, valid 30 years (Android asks for 25+ years: https://developer.android.com/studio/publish/app-signing).

Usage (from the project root): python -I tools/make-release-key.py
"""
import secrets
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
KEYS = ROOT / "keys"
ENV = KEYS / "release.env"
STORE = KEYS / "kast-release.jks"
ALIAS = "kast"
KEYTOOL = Path(r"C:\Program Files\Microsoft\jdk-21.0.11.10-hotspot\bin\keytool.exe")
DNAME = "CN=Mikalai Kryvusha, O=KAST, C=BY"
VALIDITY_DAYS = 365 * 30


def main():
    if ENV.exists() or STORE.exists():
        sys.exit(f"refused: {ENV.name} or {STORE.name} already exists - the release key is created once")
    for p in (ENV, STORE):
        # Ignore first: a secret that git could see is never written.
        if subprocess.run(["git", "check-ignore", "-q", str(p)], cwd=ROOT).returncode != 0:
            sys.exit(f"refused: {p.relative_to(ROOT)} is not ignored by git")
    KEYS.mkdir(exist_ok=True)
    store_pass = secrets.token_urlsafe(24)
    with tempfile.TemporaryDirectory() as tmp:
        sp = Path(tmp) / "sp"
        sp.write_text(store_pass, encoding="ascii")
        # PKCS12 keeps one password for the store and the key (keytool warns otherwise).
        r = subprocess.run([str(KEYTOOL), "-genkeypair", "-keystore", str(STORE), "-storetype", "PKCS12",
                            "-alias", ALIAS, "-keyalg", "RSA", "-keysize", "4096", "-validity", str(VALIDITY_DAYS),
                            "-dname", DNAME, "-storepass:file", str(sp), "-keypass:file", str(sp)],
                           capture_output=True, text=True)
        if r.returncode != 0:
            sys.exit("keytool failed: " + (r.stderr or r.stdout)[-400:])
    ENV.write_text(
        "# KAST release signing - never commit; the owner keeps a copy of this folder (keys/) in his secret store.\n"
        "# Paths are relative to the project root.\n"
        f"KAST_KEYSTORE=keys/kast-release.jks\nKAST_KEYSTORE_PASSWORD={store_pass}\n"
        f"KAST_KEY_ALIAS={ALIAS}\nKAST_KEY_PASSWORD={store_pass}\n", encoding="ascii", newline="\n")
    print(f"created keys/{STORE.name} (RSA 4096, {VALIDITY_DAYS} days, alias {ALIAS}) and keys/{ENV.name}; "
          "passwords not printed")


if __name__ == "__main__":
    main()
