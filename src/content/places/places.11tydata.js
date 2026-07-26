module.exports = {
  layout: "place.njk",
  visibility: "public",
  eleventyComputed: {
    permalink: (data) =>
      data.visibility === "draft" ? false : `/places/${data.page.fileSlug}/`
  }
};
