
# Atlas

Personal research site. Markdown content, built by Eleventy, edited in the
browser, hosted free on GitHub Pages.

- **Read `MAP.md` first** — what every folder is for
- **`COOKBOOK.md`** — how to add a paper, hide a page, change the menu

## First-time setup (about fifteen minutes, once)

1. Put these files in your `nagaraditya2531.github.io` repository.
2. In `src/admin/config.yml`, check the `repo:` line matches your repo name.
3. Repo → **Settings → Pages → Source: GitHub Actions**.
   (Not "Deploy from a branch" — that was the old way.)
4. Push anything. Watch the **Actions** tab; the first build takes a minute or two.
5. Visit `/admin/` and sign in with GitHub.

## Editing from then on

Go to `/admin/`, fill in a form, press Publish. Live in about a minute.

## The stack, and why

| Piece | Choice | Why |
|---|---|---|
| Content | Markdown + YAML | Plain text. Readable by anything, forever. |
| Generator | Eleventy | Templates look like HTML with `{{ holes }}` in them. |
| CMS | Sveltia | Browser editing, no server, logs in with GitHub. |
| Auth | GitHub | No passwords stored anywhere. Your 2FA protects the site. |
| Hosting | GitHub Pages | Free, fast, and every change is version-controlled. |

Hugo was the other candidate. Its advantage is being a single binary with
nothing to install — irrelevant here, because GitHub builds the site, not you.
What's left is readability, and Eleventy's templates win that easily.

## The honest caveat

Sveltia CMS is in beta. If it ever breaks, your content is unaffected — it's
plain Markdown in your repository. You could swap in Decap CMS, or edit files
directly on github.com, and lose nothing. That is the whole reason the content
is kept separate from the tools.
