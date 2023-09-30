// @ts-nocheck
import express from "express";
import lodash from "lodash";
import fetch from "node-fetch";

const router = express.Router();

const fetchBlogs = async () => {
  try {
    const options = {
      method: "GET",
      headers: {
        "x-hasura-admin-secret":
          "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
      },
    };

    const res = await fetch(
      "https://intent-kit-16.hasura.app/api/rest/blogs",
      options
    );

    const data = await res.json();

    return data;
  } catch (error) {
    return error;
  }
};

router.get("/blog-stats", async (req, res, next) => {
  try {
    const getblogs = await fetchBlogs();

    const total = lodash.size(getblogs.blogs);

    // const longestTitle = getblogs.blogs.reduce((longest, blog) =>
    //   blog.title.length > longest.length ? blog.title : longest
    // );
    // console.log(longestTitle);

    const loggestTitleBlog = lodash.maxBy(
      getblogs.blogs,
      (blog) => blog.title.length
    );

    // const totalprivacyblogs = getblogs.blogs.filter((blog) =>
    //   blog.title.toLowerCase().includes("privacy")
    // ).length;

    // console.log(totalprivacyblogs);

    const privacyBlogs = lodash.filter(getblogs.blogs, (blog) =>
      lodash.includes(blog.title.toLowerCase(), "privacy")
    ).length;

    // const uniqueTile = [];

    // getblogs.blogs.forEach((blog) => {
    //   if (!uniqueTile.includes(blog.title)) {
    //     uniqueTile.push(blog);
    //   }
    // });

    const uniqueTitles = lodash.uniqBy(getblogs.blogs, "title");

    res.json({
      total,
      loggestTitle: loggestTitleBlog.title,
      privacyBlogs,
      uniqueTitles,
    });
  } catch (error) {
    next(error);
  }
});

const memoizedFetchBlogs = lodash.memoize(fetchBlogs);

router.get("/blog-search", async (req, res, next) => {
  try {
    const searchTerm = req.query.query;

    const getblogs = await memoizedFetchBlogs();

    const searchedBlogs = lodash.filter(getblogs.blogs, (blog) =>
      lodash.includes(blog.title.toLowerCase(), searchTerm.toLowerCase())
    );

    res.json({
      searchedBlogs,
    });
  } catch (error) {
    next(error);
  }
});

export default router;

// const options = {
//     method: 'GET',
//     headers: {
//       'x-hasura-admin-secret': '32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
//     }
//   };

//   fetch('https://intent-kit-16.hasura.app/api/rest/blogs', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

//   curl --request GET \
//     --url https://intent-kit-16.hasura.app/api/rest/blogs \
//     --header 'x-hasura-admin-secret: 32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'
