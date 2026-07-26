# MAP — what every folder is for

Read this first if you've been away for a while. Nothing here changes often.

```
site/
├── src/                     EVERYTHING YOU EDIT lives under here
│   ├── content/             Your actual writing, as Markdown files
│   │   ├── papers/          One file per publication
│   │   ├── writing/         One file per essay
│   │   ├── reading/         One file per book or paper you've read
│   │   ├── places/          One file per trip
│   │   └── chapters/        One file per area of research
│   ├── _data/               Site-wide settings
│   │   ├── site.json        Your name, email, the MENU, profile links
│   │   ├── now.yaml         The "Now" block on the home page
│   │   └── questions.yaml   Open questions
│   ├── _includes/           Page shells (templates)
│   │   ├── base.njk         The nav, head and footer. Defined ONCE.
│   │   ├── paper.njk        How one paper page looks
│   │   ├── post.njk         How one essay page looks
│   │   └── place.njk        How one trip page looks
│   ├── admin/               The CMS
│   │   ├── index.html       Loads the editor
│   │   └── config.yml       Describes the forms you fill in
│   ├── assets/              Images and PDFs
│   │   ├── uploads/         Anything added through the CMS lands here
│   │   ├── papers/          Paper PDFs
│   │   └── places/          Trip photos
│   ├── css/style.css        All styling. One file.
│   ├── js/site.js           Scroll reveals and list filtering
│   └── *.njk                The seven pages (index, research, publications…)
│
├── .eleventy.js             Build rules. Rarely touched. Commented throughout.
├── package.json             Lists the two tools used to build the site
├── .github/workflows/       The robot that rebuilds and publishes the site
└── _site/                   Generated output. Never edit. Never commit.
```

## The one sentence version

You write Markdown in `src/content/`. Eleventy pours it into the templates in
`src/_includes/`. GitHub Actions runs that build and publishes the result.

## How a change reaches the live site

```
You press Publish in /admin
        ↓
CMS saves a Markdown file to GitHub
        ↓
GitHub Actions notices and runs the build
        ↓
Site is live, usually within a minute
```

If it doesn't appear: open the repo's **Actions** tab. A red X shows what failed.

## Visibility

Every item has a `visibility` field with three settings:

| Setting  | Has a page? | Shows in lists? | Use for |
|----------|-------------|-----------------|---------|
| public   | yes         | yes             | normal |
| unlisted | yes         | no              | something you want to link privately |
| draft    | no          | no              | unfinished |

Note: `draft` and `unlisted` items still exist as files in a public repository.
Anyone determined can read them there. They just don't appear on the website.
That's fine for tidying; don't use it for anything actually confidential.

## Things that must never change

- File names under `content/papers/` once a paper has been cited or linked
- The `CNAME` file (it holds your domain)
- The folder names in this map — the config and the CMS both refer to them
