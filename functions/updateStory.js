const sanityClient = require("@sanity/client");
const { projectId, dataSet, SANITY_TOKEN } = process.env;

const client = sanityClient({
  projectId: projectId,
  dataset: dataSet,
  token: SANITY_TOKEN,
  apiVersion: "2021-06-07", // use a UTC date string
  useCdn: false, // `false` if you want to ensure fresh data
});

exports.handler = async function (event) {
  const meal = JSON.parse(event.body);
  const result = await client.createOrReplace(meal);
  return {
    statusCode: 200,
    body: JSON.stringify({ data: result }),
    headers: {
      /* Required for CORS support to work */
      "Access-Control-Allow-Origin": "*",
      /* Required for cookies, authorization headers with HTTPS */
      "Access-Control-Allow-Credentials": true,
    },
  };
};