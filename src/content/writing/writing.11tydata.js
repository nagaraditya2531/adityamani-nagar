module.exports = {
  layout: "post.njk",
  visibility: "public",
  eleventyComputed: {
    permalink: (data) =>
      data.visibility === "draft" ? false : `/writing/${data.page.fileSlug}/`
  }
};
