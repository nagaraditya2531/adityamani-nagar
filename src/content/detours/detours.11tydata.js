/* Everything else: day trips, walks, food, small moments. */
module.exports = {
  layout: "trip.njk",
  visibility: "public",
  kind: "detour",
  eleventyComputed: {
    permalink: (data) =>
      data.visibility === "draft" ? false : `/detours/${data.page.fileSlug}/`
  }
};
