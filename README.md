# Sihaab landing page

Static site for [sihaab.com](https://sihaab.com). No build step: plain HTML/CSS/JS, one page.

Bilingual English/Arabic (header toggle, full RTL via CSS logical properties) with dark and light themes (header toggle, defaults to system preference). Both choices persist in `localStorage`.

## Files

- `index.html` - the landing page (styles, scripts and both languages' copy inline)
- `terms.html` / `privacy.html` - legal pages, both languages in the markup, same theme/language toggles
- `logo.png` - brand mark (transparent)
- `favicon.png` - small favicon

## Push to GitHub

The repo is already initialized with a first commit. From this folder:

```bash
gh repo create sihaab-site --public --source . --push
# or manually:
git remote add origin git@github.com:alilibx/sihaab-site.git
git branch -M main
git push -u origin main
```

## Deploy on Cloudflare Pages

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**
2. Select `alilibx/sihaab-site`
3. Build settings: **Framework preset: None**, build command *empty*, output directory `/`
4. Deploy; you get `sihaab-site.pages.dev`
5. **Custom domains → add `sihaab.com`** (and `www.sihaab.com`). If the domain's DNS is already on Cloudflare, it wires up automatically; otherwise move nameservers first.

Every `git push` to `main` redeploys automatically.

## Later

- Replace the mailto waitlist with a real form (Cloudflare Pages Functions + KV, or Tally/Formspark) once volume justifies it.
- Add a crawlable Arabic entry point (`ar/index.html` generated from the same strings, plus `hreflang` alternates) so Arabic search engines and link unfurls see Arabic content; the JS toggle only serves human visitors.
