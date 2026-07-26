# COOKBOOK — how to do the ten things you'll actually do

Everything below is done in the browser at `yoursite.com/admin/`.
No terminal, no installing anything.

---

## Log in

Go to `/admin/`. Sign in with GitHub. That's the whole security model —
if you have GitHub two-factor turned on, the site has two-factor.

---

## Add a paper

Publications → **New Publication** → fill the form → Publish.
The five boxes (problem / why it mattered / what we found / my contribution /
what's next) are the point. Skip the abstract; it's on the journal's site.

## Add an essay

Writing → New Essay. The big box is Markdown:

```
## A heading

A paragraph. Blank line between paragraphs.

**bold**   *italic*   [link](https://example.com)

- a list
- another item
```

## Add a book you've read

Reading → New. One honest line in the note field. Thirty seconds of work,
and the most-read page on most researchers' sites.

## Add a trip

Places → New Trip. Upload one photo. Two hundred words is plenty.

---

## Hide something without deleting it

Open it, change **Visibility** to Draft, Publish. Gone from the site,
still in the repository, restorable any time.

Use **Unlisted** instead when you want a link you can send someone but no
public listing.

---

## Change the menu

Settings → Site → Menu. Add a row with a label and a URL.
It updates on every page at once — that's the whole reason we moved off
hand-written HTML.

## Update the "Now" block

Settings → Now block. Do this monthly. It matters more than it looks.

## Add or close an open question

Settings → Open questions. To close one, set State to `closed` and paste the
URL of the paper that answered it.

---

## Change a colour or a font

`src/css/style.css`, the block at the very top:

```css
--paper:  #E4E6E1;   /* page background */
--ink:    #151C19;   /* text */
--accent: #4A2FA8;   /* links and highlights */
```

Change one value, every page follows.

## Add a whole new page

1. Copy `src/reading.njk` to `src/teaching.njk`
2. Change `permalink: /teaching/` and the title at the top
3. Add it to the Menu in Settings → Site

---

## When something breaks

1. Repo → **Actions** tab. Red X = the build failed; click it to see why.
2. Nine times out of ten it's a typo in a `.yaml` or `.njk` file.
3. Every change is a commit. Repo → History → revert. Nothing is ever lost.
