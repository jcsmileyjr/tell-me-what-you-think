const sanityClient = require("@sanity/client");
const { projectId, dataSet } = process.env;

/**
 * This object is used when making a database API call to Sanity.io.
 * @param {string} projectId - environment varible from Netlify that identify which project to pull data from Sanity.io.
 * @param {string} dataSet - environment variable from Netlify that identify which dataset to pull data from Sanity.io.
 */
const client = sanityClient({
  projectId: projectId,
  dataset: dataSet,
  apiVersion: "2021-06-07", // use a UTC date string
  useCdn: true, // `false` if you want to ensure fresh data
});

/**
 * Function that query a database at Sanity.io for an array of article objects and adds an "end of array" object to this array
 * @returns an array of article objects to be used by the app
 */
const getArticles = async () => {
  const query = '*[_type == "article"]';
  let onlineData = await client.fetch(query).then((articles) => {
    return articles;
  });

  let updatedData = moveWarningArticleToEndOfArray(onlineData);

  return await updatedData;
};

// function that finds the "end of article" object and place it at the end of the array.
const moveWarningArticleToEndOfArray = (articles) => {
  let foundWarningArticleIndex;
  articles.forEach((article, index) => {
    if(article.title === "Warning"){
      foundWarningArticleIndex = index;
      return
    }
  })

  let warningArticle = articles.splice(foundWarningArticleIndex, 1);
  articles.push(warningArticle[0]);
  return articles
}

/**
 * Netlify API endpoint
 * @returns an data object with the array of article objects within the data property.
 */
exports.handler = async function () {
  var testData = await getArticles();
  return {
    statusCode: 200,
    body: JSON.stringify({ data: testData }),
    headers: {
      /* Required for CORS support to work */
      "Access-Control-Allow-Origin": "*",
      /* Required for cookies, authorization headers with HTTPS */
      "Access-Control-Allow-Credentials": true,
    },
  };
};

