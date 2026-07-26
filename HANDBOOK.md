# HANDBOOK

Everything you need to change anything on this site.

This file sits at the repository root and is **never built into the website** —
Eleventy only reads the `src/` folder, so nothing here can affect what visitors
see. Edit it, add to it, ignore it. It's for you.

Written July 2026. If you're reading this years later and something doesn't
match, trust the code over this document — then update this document.

---

## Contents

1. [How the site works](#1-how-the-site-works)
2. [Where everything lives](#2-where-everything-lives)
3. [The daily loop: editing content](#3-the-daily-loop-editing-content)
4. [Changing colours](#4-changing-colours)
5. [Changing fonts](#5-changing-fonts)
5a. [The portrait photo is cropped](#5a-the-portrait-photo-is-cropped)
6. [Changing spacing and sizes](#6-changing-spacing-and-sizes)
7. [Adding a whole new section](#7-adding-a-whole-new-section) ← worked example
7a. [Subscripts and superscripts](#7a-subscripts-and-superscripts-chemical-formulae)
8. [Adding a field to something that exists](#8-adding-a-field-to-something-that-exists)
9. [Changing the menu](#9-changing-the-menu)
10. [Public, unlisted, draft](#10-public-unlisted-draft)
11. [Images](#11-images)
12. [Search engines](#12-search-engines)
13. [The domain](#13-the-domain)
14. [When something breaks](#14-when-something-breaks)
15. [Rules that must never be broken](#15-rules-that-must-never-be-broken)
16. [Glossary](#16-glossary)

---

## 1. How the site works

Three moving parts. That's all.

```
   YOU                    THE BUILDER              THE VISITOR
   ───                    ───────────              ───────────

   /admin/          →     Eleventy          →      plain HTML
   (a web form)           (turns Markdown          served free by
                          into web pages)          GitHub Pages
        │                       │
        └── writes ──→   Markdown files
                        in src/content/
```

**Nothing runs when someone visits your site.** There's no server, no database.
The pages were built in advance and are just sitting there. That's why it's
fast, free, and effectively impossible to hack or take offline.

**What happens when you press Publish:**

1. The CMS saves a Markdown file into your GitHub repository
2. GitHub notices the change and runs the build (see `.github/workflows/build.yml`)
3. Eleventy reads `src/`, produces finished HTML into a folder called `_site`
4. GitHub Pages serves `_site`

Total time: about a minute. You can watch it happen in the repo's **Actions** tab.

**Why it's built this way.** Your writing lives in plain text files, separate
from the design and the tools. In ten years you can throw away Eleventy, throw
away the CMS, redesign everything — and every word you wrote is still sitting
there in readable files. The tools are disposable. The content isn't.

---

## 2. Where everything lives

```
(repository root)
├── eleventy.config.js      Build rules: collections, filters, folders
├── package.json            The two tools the builder needs
├── .github/workflows/      The robot that rebuilds the site
├── HANDBOOK.md             This file
├── MAP.md, COOKBOOK.md, README.md
│
└── src/                    EVERYTHING THAT BECOMES THE WEBSITE
    ├── index.njk           Home page
    ├── research.njk        Research page
    ├── publications.njk    Publications index
    ├── writing.njk         Writing index
    ├── reading.njk         Reading index
    ├── places.njk          Places index
    ├── about.njk           About page
    ├── sitemap.njk         Generates /sitemap.xml (for Google)
    ├── robots.njk          Generates /robots.txt  (for Google)
    │
    ├── _includes/          PAGE SHELLS — not pages themselves
    │   ├── base.njk        The nav, <head>, footer. Used by every page.
    │   ├── icons.njk       Brand logos for profile links
    │   ├── paper.njk       Layout for ONE publication
    │   ├── post.njk        Layout for ONE essay
    │   └── place.njk       Layout for ONE trip
    │
    ├── _data/              SITE-WIDE SETTINGS (all editable in the CMS)
    │   ├── site.json       Name, email, menu, profile links, facts
    │   ├── now.yaml        The "Now" block
    │   ├── questions.yaml  Open questions
    │   └── about.yaml      About page text
    │
    ├── content/            YOUR WRITING — one file per thing
    │   ├── papers/
    │   ├── writing/
    │   ├── reading/
    │   ├── places/
    │   └── chapters/       Research areas
    │
    ├── admin/
    │   ├── index.html      Loads the CMS
    │   └── config.yml      Describes every form in the CMS
    │
    ├── css/style.css       ALL styling. One file.
    ├── js/site.js          Dark mode, filters, scroll reveals
    └── assets/             Images and PDFs
```

**The naming pattern**, which trips everyone up once:

| Plural, in `src/` | Singular, in `src/_includes/` |
|---|---|
| `publications.njk` — the list | `paper.njk` — one paper's page |
| `writing.njk` — the list | `post.njk` — one essay's page |
| `places.njk` — the list | `place.njk` — one trip's page |

Folder tells you which: `_includes` = shells, `src` = pages.

---

## 3. The daily loop: editing content

Go to **`yoursite.com/admin/`**, sign in with GitHub, fill in a form, press
**Publish**. Live in about a minute.

You never need this handbook for that. It's only for changing how things
*look* or adding new *kinds* of thing.

If the login asks for a token: GitHub → Settings → Developer settings →
Personal access tokens → Tokens (classic) → tick `repo` → generate → paste.
Store it in your password manager; it's shown once.

---

## 4. Changing colours

**File:** `src/css/style.css`
**Where:** the very top, and a second block further down for dark mode.

Every colour on the site comes from these nine values. Change one, and every
page follows — that's the entire point of doing it this way.

```css
:root{
  --paper:#E4E6E1;      /* page background */
  --surface:#F1F3EE;    /* cards, panels, code blocks */
  --ink:#151C19;        /* main text and headings */
  --ink-soft:#5B6660;   /* secondary text, descriptions */
  --ink-faint:#8A938D;  /* labels, dates, small print */
  --accent:#4A2FA8;     /* links, highlights, active nav */
  --accent-warm:#C4436E;/* second accent: "open" pills, kind labels */
  --line:rgba(21,28,25,.16);   /* borders */
  --line-soft:rgba(21,28,25,.08); /* fainter borders */
}
```

**Dark mode has its own set.** Search the file for `data-theme="dark"`:

```css
:root[data-theme="dark"]{
  --paper:#141815;
  --ink:#E6E9E4;
  --accent:#A99BFF;     /* lighter — dark violet is unreadable on dark */
  ...
}
```

**If you change a colour, change both.** A colour that works on a pale
background usually fails on a dark one. Rule of thumb: accents get *lighter*
and less saturated in dark mode.

**How to change the accent to, say, deep green:**

1. In `:root`, set `--accent:#1F6F4A;`
2. In `:root[data-theme="dark"]`, set `--accent:#6FCF9B;`
3. Commit. Done — links, nav underline, buttons, DOIs, pills all follow.

**Checking contrast.** Text must be readable. Paste a background and text
colour into any online contrast checker; aim for a ratio of 4.5 or higher for
body text. This isn't pedantry — low contrast is the single most common way a
personal site becomes unpleasant to read.

---

## 5. Changing fonts

**File:** `src/css/style.css` (the variables) **and** `src/_includes/base.njk`
(the line that loads them). Both, or the font won't arrive.

```css
--display:"Spectral",Georgia,serif;        /* headings */
--body:"IBM Plex Sans",system-ui,sans-serif; /* paragraphs */
--mono:"IBM Plex Mono",ui-monospace,monospace; /* labels, dates, DOIs */
```

**To swap a font:**

1. Go to fonts.google.com, pick one, copy the `<link>` tag it gives you
2. In `src/_includes/base.njk`, replace the existing `fonts.googleapis.com` line
3. In `style.css`, change the variable to match the new font's name exactly

The names must match precisely — `"IBM Plex Sans"` not `"IBM plex sans"`.

**Always keep the fallbacks** (`Georgia, serif`). If Google Fonts is slow or
blocked, the page still reads properly instead of collapsing.

**Advice, having seen many personal sites:** two fonts is plenty, three is the
ceiling. The current pairing is a serif for headings and a sans for body, which
is a conventional, safe combination. Changing both at once usually makes things
worse; change one and live with it for a week.

---

## 5a. The portrait photo is cropped

The photo is fitted into a fixed box, so anything outside that shape is
trimmed. Three ways to deal with it, in `src/css/style.css`, at the top:

The four settings, at the top of `src/css/style.css`:

```css
--portrait-ratio:1/1;      /* the box shape. Must be 1/1 for a circle. */
--portrait-focus:50% 30%;  /* which part survives the crop */
--portrait-width:16rem;    /* size (diameter, if circular) */
--portrait-radius:50%;     /* 50% = circle, 0 = square corners, 1rem = rounded */
```

**1. Move the crop.** Most common problem is the top of the head being cut off,
because the default keeps the middle. The second number is vertical position —
lower means keep more of the top:

```css
--portrait-focus:50% 25%;   /* default, favours the face */
--portrait-focus:50% 0%;    /* keep the very top */
--portrait-focus:50% 50%;   /* dead centre */
--portrait-focus:30% 25%;   /* if you're off to one side of the frame */
```

**2. Change the shape.** For a circle, the ratio must stay `1/1` — a circle
needs a square box, or you get an oval. To go back to a rectangle, set
`--portrait-radius:0` and pick a ratio:

```css
--portrait-ratio:4/5;   /* upright */
--portrait-ratio:1/1;   /* square */
--portrait-ratio:3/4;   /* taller */
```

Note that a circle crops more aggressively than a rectangle — the corners of
your photo are always lost. Frame accordingly.

**3. Show the whole photo, always.** Find the commented block just below
`.portrait img` in the stylesheet and uncomment it. The photo is never cropped,
but the card's height then varies with the image.

**Best fix of all:** crop the photo yourself before uploading, to roughly 4:5
upright with your face in the upper half. You control the result exactly, and
the file is smaller.

---

## 6. Changing spacing and sizes

**File:** `src/css/style.css`

```css
--gutter:clamp(1.15rem,4vw,3rem);  /* left/right page margin */
--wide:70rem;                       /* max width of the content area */
```

`clamp(min, preferred, max)` means "never smaller than the first, never larger
than the third, scale with the screen in between." It's how the site adapts to
phones without separate mobile rules.

**Common adjustments:**

| Want | Change |
|---|---|
| Wider pages | `--wide:78rem` |
| Narrower, more classical | `--wide:62rem` |
| More breathing room at the edges | raise the last number in `--gutter` |
| Wider reading column on paper pages | `.article--paper{max-width:...}` |
| Bigger body text | `body{font-size:...}` near the top |

Text columns are capped on purpose. Lines longer than about 75 characters are
genuinely harder to read — the eye loses its place on the return. Widening the
container is usually right; widening the *text* usually isn't.

---

## 7. Adding a whole new section

**Worked example: "Upcoming projects", sitting alongside Research and Reading.**

Six steps. Follow them in order and it will work. About twenty minutes.

### Step 1 — Make the content folder

**Add file → Create new file**, name it exactly:

```
src/content/projects/projects.11tydata.js
```

Contents:

```js
/* Applies to every file in this folder.
   permalink: false means these have no page of their own — they only
   appear in the list. Delete that line if you want individual pages. */
module.exports = { visibility: "public", permalink: false };
```

### Step 2 — Add one example so the page isn't empty

Create `src/content/projects/example-project.md`:

```markdown
---
title: Name of the project
date: 2026-09-01
status: planned
summary: One or two sentences about what it is and why.
visibility: public
---
```

### Step 3 — Tell the builder this collection exists

In `eleventy.config.js`, beside the other `addCollection` lines:

```js
  eleventyConfig.addCollection("projects", (c) =>
    visible(c.getFilteredByGlob("src/content/projects/*.md")).sort(newestFirst)
  );
```

### Step 4 — Make the page

Create `src/projects.njk`. Copy the shape of `src/reading.njk`:

```njk
---
layout: base.njk
permalink: /projects/
title: Upcoming projects
description: What I'm planning to work on next.
---
<div class="wrap">
  <div class="pagehead rise">
    <span class="mono">Upcoming</span>
    <h1>What's next.</h1>
    <p>Things I intend to start, and roughly when.</p>
  </div>
</div>

<section class="section">
  <div class="wrap">
    <ul class="qlist rise">
      {% for item in collections.projects %}
      <li>
        <span class="q">{{ item.data.title }}</span>
        <span class="q-meta">
          <span class="pill" data-state="open">{{ item.data.status }}</span>
        </span>
      </li>
      {% endfor %}
    </ul>
  </div>
</section>
```

Reusing existing classes (`qlist`, `pill`, `pagehead`) means it matches the rest
of the site with no new CSS.

### Step 5 — Put it in the menu

CMS → **Settings → Site → Menu** → add a row:
label `Projects`, url `/projects/`.

It appears in the header *and* the footer automatically. No code.

### Step 6 — Add it to the CMS so you can edit it in the browser

In `src/admin/config.yml`, alongside the other collections:

```yaml
  - name: projects
    label: Upcoming projects
    label_singular: Project
    folder: "src/content/projects"
    create: true
    slug: "{{slug}}"
    fields:
      - { name: title,   label: Title, widget: string }
      - { name: date,    label: Date, widget: datetime }
      - { name: summary, label: Summary, widget: text, required: false }
      - name: status
        label: Status
        widget: select
        options: [planned, started, paused]
        default: planned
      - name: visibility
        label: Visibility
        widget: select
        default: public
        options:
          - { label: "Public", value: public }
          - { label: "Draft", value: draft }
```

Indentation in YAML is meaningful. Copy an existing block and edit it rather
than typing from scratch.

**Done.** Commit, wait a minute, and `/projects/` exists, is in the menu, is in
the sitemap, and is editable from `/admin/`.

---

## 7a. Subscripts and superscripts (chemical formulae)

CMS fields are plain text, so `Nd3+` stays flat. Two ways to fix it.

**1. Unicode characters — works everywhere, nothing to learn.**
Paste them straight into any field, including page titles:

```
subscripts    ₀ ₁ ₂ ₃ ₄ ₅ ₆ ₇ ₈ ₉ ₊ ₋
superscripts  ⁰ ¹ ² ³ ⁴ ⁵ ⁶ ⁷ ⁸ ⁹ ⁺ ⁻
examples      H₂O    Nd³⁺    10⁻⁶ M    4f³
```

Best choice for titles, because it also appears correctly in Google results
and browser tabs, where HTML formatting can't reach.

**2. Notation, for anything longer.** Type these in any field and they render
properly on the page:

```
H~2~O        →  H₂O        (tildes = subscript)
Nd^3+^       →  Nd³⁺       (carets = superscript)
Ce^4+^/Ce^3+^ couple
10^-6^ M
```

This works in titles, abstracts, the five question boxes, summaries, reading
notes and research descriptions. It's the `chem` filter in
`eleventy.config.js`, applied in the templates as `{{ title | chem | safe }}`.

**In the Markdown body of an essay or trip**, write plain HTML instead —
`H<sub>2</sub>O` — which Markdown passes straight through.

**If you add a new field and it needs formulae**, put `| chem | safe` after it
in the template. Without it, the notation shows literally.

---

## 8. Adding a field to something that exists

Say you want a "Conference" field on papers.

1. **`src/admin/config.yml`** — in the `papers` collection's `fields:` list:
   ```yaml
      - { name: conference, label: Conference, widget: string, required: false }
   ```
2. **`src/_includes/paper.njk`** — print it wherever it belongs:
   ```njk
   {% if conference %}<div><dt>Presented at</dt><dd>{{ conference }}</dd></div>{% endif %}
   ```

Always wrap new fields in `{% if %}`. Older entries won't have the field, and
without the guard they'd render an empty heading.

---

## 9. Changing the menu

**CMS → Settings → Site → Menu.** The header and footer both read this one list,
so they can never disagree.

### Sub-menus

Each menu item can carry its own second row of links. Entirely optional — leave
it off and the site looks exactly as it does now.

To turn one on:

1. Settings → Site → Menu → open the item (say, Research)
2. Tick **"Show a sub-menu for this section?"**
3. Under **Sub-menu items**, add as many rows as you want — label and URL each

The sub-menu appears beneath the main navigation on that section's page and on
any page underneath it. Elsewhere it doesn't render at all.

**How the site decides you're "in" a section:** an exact URL match first, then a
match on one of the sub-items, then the longest matching URL prefix. So
`/work/some-paper/` counts as being inside `/work/`, and the parent stays lit.

**This is the answer to running out of menu space.** Rather than adding an
eighth top-level item in 2032, give an existing one a sub-menu. The top row
stays at seven forever; everything grows underneath.

Sub-items can point anywhere — a page, or an anchor like `/research/#questions`.

### Everything else

**CMS → Settings → Site → Menu.** Nothing else. The header and footer both read
from the same list in `src/_data/site.json`, so they can never disagree.

Same for **Profile links** — and those automatically become logos via
`src/_includes/icons.njk`. GitHub, LinkedIn, ORCID, Scholar, ResearchGate and
Bluesky have marks; anything else shows as a small text label. To add a new
logo, add another `{% elif %}` branch in that file with the brand's SVG path.

---

## 10. Public, unlisted, draft

Every item has a **Visibility** dropdown.

| Setting | Has its own page? | Appears in lists? | Use for |
|---|---|---|---|
| Public | yes | yes | normal |
| Unlisted | yes | no | a link you send someone privately |
| Draft | no | no | unfinished |

**Important and often misunderstood:** drafts still exist as files in a public
GitHub repository. Anyone who looks can read them. They are hidden from the
*website*, not secret. For anything genuinely confidential, don't put it here.

The machinery: `visible()` in `eleventy.config.js` filters lists;
`permalink: false` in each folder's `.11tydata.js` file suppresses the page.

---

## 11. Images

Upload through the CMS — it drops them in `src/assets/uploads/` and inserts the
path for you.

**Before uploading, do two things:**

1. **Resize to about 1600px wide.** Phone photos are 4000px and several
   megabytes. A repository full of them becomes slow and unpleasant within a
   year, and it's irreversible — Git keeps every version forever.
2. **Rename the file to something descriptive.** `adityamani-nagar.jpg`, not
   `IMG_4471.jpg`. Filenames are a real signal in image search.

Alt text is generated automatically from titles and includes your name. If you
add images in new templates, follow the same pattern — never leave `alt=""`.

---

## 12. Search engines

**Already handled by the code:** page titles carry your name, `Person`
structured data with alternate spellings, canonical URLs, link previews,
`/sitemap.xml` including images, `/robots.txt` excluding `/admin/`.

**Only you can do these, and they matter more than everything above:**

1. **Google Search Console** — verify the site, submit `/sitemap.xml`, then use
   URL Inspection → Request Indexing on the home page. Without this, Google may
   not find you for months.
2. **Put your site URL in your ORCID, Google Scholar, LinkedIn and ResearchGate
   profiles.** Links from trusted sites are the strongest ranking factor there
   is. Four links beats every technical tweak combined.
3. **Use one spelling of your name everywhere** — the site, your profiles, your
   CV, future submissions. Consistency is what builds the association.

**One setting you must not forget:** CMS → Settings → Site → **Site address**.
Every canonical URL and sitemap entry is built from it. The day you attach a
domain, change this field or Google keeps being pointed at the old address.

---

## 13. The domain

The site currently lives at `nagaraditya2531.github.io`. That address is
borrowed. A domain you own is the only thing that makes the site genuinely
permanent — hosting, framework and design can all change behind it while every
link people have saved keeps working.

**Setting one up:**

1. Buy from Cloudflare, Porkbun or Namecheap. Avoid GoDaddy's renewal pricing.
2. GitHub → your profile → Settings → Pages → verify the domain first
   (this prevents someone else claiming it)
3. Repo → Settings → Pages → Custom domain
4. At the registrar, four `A` records on `@`:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   and one `CNAME` on `www` pointing to `nagaraditya2531.github.io`
5. Wait — up to 24 hours, usually far less — then tick **Enforce HTTPS**
6. Update **Site address** in the CMS

**Then two settings that matter more than the choice of registrar:** turn on
**auto-renew**, and set the renewal contact to an email you'll still control in
ten years — not a university address. Expired domains get taken by squatters.
That, not hacking, is how personal sites actually die.

---

## 14. When something breaks

**Always start here: the repository's Actions tab.** A red X means the build
failed and the site is unchanged. Click it, scroll to the red line.

| Message | What it means | Fix |
|---|---|---|
| `layout that does not exist` | A layout file is missing or misspelled | Check `src/_includes/` for the exact filename, including capitals |
| `circular reference` | Front matter isn't on line 1 of a file | `---` must be the very first thing. No comments above it. |
| `Unknown tag 'elif'` | Jekyll is building instead of Eleventy | Settings → Pages → Source → **GitHub Actions** |
| `toLocaleDateString is not a function` | A date field holds something that isn't a date | Re-save the entry in the CMS |
| `js-yaml` not found | `package.json` is missing a dependency | Compare with the copy in this repo's history |
| Site loads with no styling | Paths are resolving wrongly | Repo must be named `nagaraditya2531.github.io`, or a domain must be attached |
| Nothing happens at all | The workflow isn't where GitHub looks | It must be at `.github/workflows/build.yml` at the **root** |

**Three habits worth having:**

- **Change one thing at a time.** If you replace six files and the build breaks,
  you have six suspects.
- **Read the first error, not the last.** Errors cascade; only the first is real.
- **Nothing is ever lost.** Every change is a commit. Repo → History → find the
  last working version → revert. Two minutes, and complete.

---

## 15. Rules that must never be broken

1. **Front matter (`---`) must be line 1** of any `.njk` or `.md` file that has
   it. Not a comment, not a blank line. This has caused more breakage on this
   site than everything else combined.
2. **Never rename a file under `content/papers/`** once it's been linked or
   cited. The filename is the URL. Breaking it breaks other people's references.
3. **Capitals matter.** The build server is Linux. `Base.njk` and `base.njk` are
   different files.
4. **Never commit the token** the CMS gave you, or any password, to the
   repository. It's public and permanent.
5. **`_site/` is generated.** Never edit it, never commit it.
6. **Keep `.github/workflows/build.yml` at the repository root.** A workflow in
   a subfolder is silently ignored.

---

## 16. Glossary

**Eleventy (11ty)** — the program that turns your Markdown into web pages.
Runs on GitHub, never on your computer.

**Nunjucks / `.njk`** — the template language. Ordinary HTML with `{{ holes }}`
for values and `{% for %}` / `{% if %}` for logic.

**Front matter** — the block between `---` lines at the top of a file. Settings
for that one page: title, date, visibility.

**Markdown / `.md`** — plain text with light formatting. `**bold**`,
`## heading`, `[link](url)`. That's most of it.

**YAML / `.yaml`** — an indented settings format. Used for data files and the
CMS configuration. Indentation is meaningful; tabs break it, spaces don't.

**Collection** — a group of content of one kind. `collections.papers` is every
publication, in order.

**Layout** — a page shell in `_includes/`. Content gets poured into it.

**Passthrough copy** — files copied to the finished site unchanged: CSS,
JavaScript, images, the CMS.

**GitHub Actions** — the robot that rebuilds the site when anything changes.

**Commit** — one saved change, with a message and a timestamp, kept forever.

**Sveltia CMS** — the editor at `/admin/`. Writes Markdown files to GitHub on
your behalf. If it ever stops working, your content is untouched — it's just
files, editable directly on github.com.

---

## A closing note

The most valuable thing about this setup isn't the design, which you'll replace
several times. It's that everything you write is stored as plain text, in files
you own, separate from the software that displays them.

That means no future decision is expensive. New design, different generator,
different host, a mobile app in 2040 — none of it requires rewriting a single
word. The tools are disposable. The record is the point.

Keep the Now block current. That one habit does more to keep a site alive than
any feature.
