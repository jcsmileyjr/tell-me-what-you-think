const sanityClient = require("@sanity/client");
const { projectId, dataSet } = process.env;

const client = sanityClient({
  projectId: projectId,
  dataset: dataSet,
  apiVersion: "2021-06-07", // use a UTC date string
  useCdn: true, // `false` if you want to ensure fresh data
});

const getArticles = async () => {
  const query = '*[_type == "article"]';
  let onlineData = await client.fetch(query).then((articles) => {
    return articles;
  });

  return await onlineData;
};


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

