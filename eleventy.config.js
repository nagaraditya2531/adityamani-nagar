/* =========================================================================
   Eleventy configuration — the only "programming" file in the project.
   It answers three questions:
     1. Which files get copied straight through, untouched?
     2. What lists of content exist, and in what order?
     3. Where do things go in and come out?
   You will rarely need to change it. Read MAP.md first if you're unsure.
   ========================================================================= */

const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {

  /* --- 0. Let data files be written in YAML, which humans can read -------
     Without this line, files in src/_data must be JSON (no comments,
     fussy commas). With it, .yaml works. --------------------------------- */
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  /* --- 1. Copied through untouched (not processed as templates) --------- */
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/css": "css" });
  eleventyConfig.addPassthroughCopy({ "src/js": "js" });
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });

  // The CMS lives at /admin. Eleventy must not try to render it.
  eleventyConfig.ignores.add("src/admin/**");

  /* --- 2. Visibility ---------------------------------------------------
     Every piece of content has a `visibility` field:
       public   → built, and listed on index pages          (the default)
       unlisted → built and has a URL, but appears in no list
       draft    → not built at all
     `visible()` below is what keeps unlisted/draft items out of lists.
     -------------------------------------------------------------------- */
  const visible = (items) =>
    items.filter((item) => (item.data.visibility || "public") === "public");

  /* Dates arrive in two shapes: a real Date (from a plain YAML date) or a
     string (which is what the CMS writes). This turns either into a Date,
     or null if it can't. Everything below goes through it. */
  const toDate = (value) => {
    if (!value) return null;
    if (value instanceof Date) return isNaN(value.getTime()) ? null : value;
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? null : parsed;
  };

  const stamp = (item) => {
    const d = toDate(item.data.date);
    return d ? d.getTime() : 0;
  };

  const newestFirst = (a, b) => stamp(b) - stamp(a);

  /* --- 3. Content lists (Eleventy calls these "collections") ------------ */
  eleventyConfig.addCollection("papers", (c) =>
    visible(c.getFilteredByGlob("src/content/papers/*.md")).sort(newestFirst)
  );

  eleventyConfig.addCollection("writing", (c) =>
    visible(c.getFilteredByGlob("src/content/writing/*.md")).sort(newestFirst)
  );

  eleventyConfig.addCollection("reading", (c) =>
    visible(c.getFilteredByGlob("src/content/reading/*.md")).sort(newestFirst)
  );

  /* Writing and reading in one list — the Notebook page.
     Two thin sections look emptier than one that always has something in it. */
  eleventyConfig.addCollection("notebook", (c) => {
    const all = []
      .concat(c.getFilteredByGlob("src/content/writing/*.md"))
      .concat(c.getFilteredByGlob("src/content/reading/*.md"));
    return visible(all).sort(newestFirst);
  });

  /* ---- The shared category vocabulary ----------------------------------
     Categories are metadata, not folders. Retagging an item never changes
     its URL — only the /topics/<name>/ listing is affected. -------------- */
  eleventyConfig.addCollection("categories", (c) =>
    visible(c.getFilteredByGlob("src/content/categories/*.md")).sort((a, b) =>
      (a.data.label || a.fileSlug || "").localeCompare(b.data.label || b.fileSlug || "")
    )
  );

  /* Free-standing pages made in the CMS. Not listed automatically —
     you point a menu or sub-menu item at one. */
  eleventyConfig.addCollection("pages", (c) =>
    visible(c.getFilteredByGlob("src/content/pages/*.md"))
  );

  eleventyConfig.addCollection("conferences", (c) =>
    visible(c.getFilteredByGlob("src/content/conferences/*.md")).sort(newestFirst)
  );

  eleventyConfig.addCollection("detours", (c) =>
    visible(c.getFilteredByGlob("src/content/detours/*.md")).sort(newestFirst)
  );

  eleventyConfig.addCollection("chapters", (c) =>
    visible(c.getFilteredByGlob("src/content/chapters/*.md")).sort(
      (a, b) => (b.data.started || 0) - (a.data.started || 0)
    )
  );

  // Papers + writing + places together, newest first — the home page feed.
  eleventyConfig.addCollection("everything", (c) => {
    const all = []
      .concat(c.getFilteredByGlob("src/content/papers/*.md"))
      .concat(c.getFilteredByGlob("src/content/writing/*.md"))
      .concat(c.getFilteredByGlob("src/content/conferences/*.md"))
      .concat(c.getFilteredByGlob("src/content/detours/*.md"))
      .concat(c.getFilteredByGlob("src/content/reading/*.md"));
    return visible(all).sort(newestFirst);
  });

  /* --- 4. Small helpers used inside templates --------------------------- */

  // Group a list by year, so index pages can print a year down the side.
  eleventyConfig.addFilter("byYear", (items) => {
    const groups = {};
    (items || []).forEach((item) => {
      const d = toDate(item.data.date);
      const y = d ? d.getFullYear() : "Undated";
      (groups[y] = groups[y] || []).push(item);
    });
    return Object.keys(groups)
      .sort((a, b) => b - a)
      .map((year) => ({ year, items: groups[year] }));
  });

  // Turn a date into "July 2026".
  eleventyConfig.addFilter("monthYear", (value) => {
    const d = toDate(value);
    return d
      ? d.toLocaleDateString("en-GB", { month: "long", year: "numeric" })
      : "";
  });

  /* ---- Chemical notation -------------------------------------------------
     Lets you write subscripts and superscripts in any CMS field:

        H~2~O        ->  H<sub>2</sub>O
        Nd^3+^       ->  Nd<sup>3+</sup>
        4f^3^        ->  4f<sup>3</sup>
        10^-6^ M     ->  10<sup>-6</sup> M

     Use it in a template as:  {{ title | chem | safe }}
     The text is escaped first, so nothing else in the field can inject HTML.
     -------------------------------------------------------------------- */
  const escapeHtml = (str) =>
    String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  eleventyConfig.addFilter("chem", (value) => {
    if (value === undefined || value === null || value === "") return "";
    return escapeHtml(value)
      .replace(/\^([^\s^]+)\^/g, "<sup>$1</sup>")
      .replace(/~([^\s~]+)~/g, "<sub>$1</sub>");
  });

  /* ---- Which top-level menu item is the current page under? ------------
     Used to decide whether to show a sub-menu, and which one.
     Checks, in order: an exact match, a match on one of its sub-items,
     then the longest URL prefix (so /work/some-paper/ matches /work/).
     -------------------------------------------------------------------- */
  eleventyConfig.addFilter("activeNav", (nav, url) => {
    if (!nav || !url) return null;

    const exact = nav.find((i) => i.url === url);
    if (exact) return exact;

    const viaChild = nav.find((i) =>
      (i.children || []).some((c) => c.url && url.startsWith(c.url))
    );
    if (viaChild) return viaChild;

    const byPrefix = nav
      .filter((i) => i.url && i.url !== "/" && url.startsWith(i.url))
      .sort((a, b) => b.url.length - a.url.length)[0];

    return byPrefix || null;
  });

  /* Everything tagged with a given category. Used by the topic pages. */
  eleventyConfig.addFilter("withCategory", (items, slug) =>
    (items || []).filter((i) =>
      (i.data.categories || []).map(String).includes(String(slug))
    )
  );

  /* Turn a category's slug into its display label. */
  eleventyConfig.addFilter("categoryLabel", (slug, categories) => {
    const hit = (categories || []).find((c) => c.fileSlug === String(slug));
    return hit ? hit.data.label || hit.fileSlug : slug;
  });

  // Take the first N of a list.
  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));

  // Turn a date into "26 July 2026".
  eleventyConfig.addFilter("fullDate", (value) => {
    const d = toDate(value);
    return d
      ? d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
      : "";
  });

  // 2026-07-26 — the format search engines want in a sitemap.
  eleventyConfig.addFilter("isoDate", (value) => {
    const d = toDate(value);
    return d ? d.toISOString().slice(0, 10) : "";
  });

  /* When the site was last built. Because every content change triggers a
     rebuild, this is the same thing as "when the site last changed".
     Available in any template as {{ buildTime }}. */
  eleventyConfig.addGlobalData("buildTime", () => new Date());

  /* --- 5. Where things live -------------------------------------------- */
  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"]
  };
};
