import * as ogs from "open-graph-scraper";
import { USER_AGENT } from "./common.const";

export const getMetaData = async (url: string) => {
  const data = await ogs
    .default({
      url,
      timeout: 5000,
      fetchOptions: { headers: { "user-agent": USER_AGENT } },
    })
    .then((metadata) => {
      console.log(metadata.result);
      return { ...metadata.result, url };
    })
    .catch((error) => {
      console.log(error);
    });
  return data;
};
