/* Professional travel: conferences, symposia, workshops, visits. */
module.exports = {
  layout: "trip.njk",
  visibility: "public",
  kind: "conference",
  eleventyComputed: {
    permalink: (data) =>
      data.visibility === "draft" ? false : `/conferences/${data.page.fileSlug}/`
  }
};
