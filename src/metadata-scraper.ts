import * as ogs from "open-graph-scraper";
const userAgent =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36";

export const getMetaData = async (url: string) => {
  const data = await ogs
    .default({
      url,
      timeout: 5000,
      fetchOptions: { headers: { "user-agent": userAgent } },
    })
    .then((metadata) => {
      console.log(metadata.result);
      return {...metadata.result, url}
    })
    .catch((error) => {
      console.log(error);
    });
    return data
};