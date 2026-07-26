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

  eleventyConfig.addCollection("places", (c) =>
    visible(c.getFilteredByGlob("src/content/places/*.md")).sort(newestFirst)
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
      .concat(c.getFilteredByGlob("src/content/places/*.md"))
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
