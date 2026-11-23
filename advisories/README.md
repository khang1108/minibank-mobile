# Advisories for `minibank-mobile`

## `GHSA-jf85-cpcp-j695.osv.json`
- **Advisory ID:** `GHSA-jf85-cpcp-j695` (`CVE-2019-10744`)
- **Official Sources:**
  - https://api.osv.dev/v1/vulns/GHSA-jf85-cpcp-j695
  - https://github.com/advisories/GHSA-jf85-cpcp-j695
- **Ecosystem / Package:** `npm` / `lodash`
- **Affected Range:** `>= 0, < 4.17.12` (fixture pins `lodash@4.17.11`)
- **Fixed Version:** `4.17.12` (offline cache provides `vendor/lodash-4.17.21.tgz`)
- **Vulnerable Symbol:** `defaultsDeep` (Prototype Pollution via `{ constructor: { prototype: { ... } } }`)
- **Severity:** `CRITICAL` (`CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:H/A:H`)

## Fixture setup (before demo / CI)
- `node_modules/` is gitignored: run `npm ci` in `backend/fixtures/targets/minibank-mobile/` on a fresh clone, otherwise the exploit/oracle steps cannot load `lodash`.
- `.env.sandbox` is optional and gitignored; the exploit step runs without it.
- Draft PR publishing needs this target to be its own git clone of the demo GitHub repo. Inside the AntFlow monorepo, `git` resolves to the AntFlow repo and a push would carry its full history.
