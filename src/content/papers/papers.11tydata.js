/* Applies to every file in this folder. Saves repeating it in each one.
   `permalink: false` means a draft is not built at all — no page, no URL. */
module.exports = {
  layout: "paper.njk",
  visibility: "public",
  eleventyComputed: {
    permalink: (data) =>
      data.visibility === "draft" ? false : `/papers/${data.page.fileSlug}/`
  }
};
