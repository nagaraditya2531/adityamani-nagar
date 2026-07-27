/* Free-standing pages made from the CMS.

   The URL comes from the `slug` field you type in the form, so you control
   the address exactly. Leave it blank and it falls back to the filename. */
module.exports = {
  layout: "page.njk",
  visibility: "public",
  eleventyComputed: {
    permalink: (data) => {
      if (data.visibility === "draft") return false;
      const slug = (data.slug || data.page.fileSlug || "")
        .toString().trim().replace(/^\/+|\/+$/g, "");
      return slug ? `/${slug}/` : false;
    }
  }
};
