import axios from "axios";
import { USER_AGENT } from "../../src/common.const";

const TRUSTPILOT_COOKIE = process.env.TRUSTPILOT_COOKIE || "";
const API_VERSION = "2.54.0";
const getTrustPilotClient = () => {
  return axios.create({
    baseURL: `https://www.trustpilot.com/_next/data/categoriespages-consumersite-${API_VERSION}/categories`,
    headers: {
      "Content-Type": "application/json",
      Cookie: TRUSTPILOT_COOKIE,
      "User-Agent": USER_AGENT
    },
  });
};

export const getTrustPilotData = async (category: string, page?: number) => {
  let results: Record<string, any>[] = [];
  const _get = async (
    category: string,
    _page?: number
  ): Promise<Record<string, any>[]> => {
    const client = getTrustPilotClient();
    try {
      const response = await client.request({
        url: `${category}.json`,
        method: "GET",
        params: {
          page: _page ? _page : undefined,
          sort: "reviews_count",
        },
      });
      const data = response.data;
      //   console.log(JSON.stringify(data.pageProps))
      const {
        businessUnits,
        newestBusinessUnits,
        recentlyReviewedBusinessUnits,
        page,
      } = data.pageProps;

      // console.log(JSON.stringify(businessUnits))

      const { totalHits, businesses, totalPages, perPage } = businessUnits;
      results.push(...businesses);
      console.log({ length: results.length, totalHits });
      console.log({ category, page, totalPages });
      // await Promise.resolve(() => setTimeout(()=>{},200))
      // if (results.length >= 5000 || page === totalPages) {
      //   fs.writeFileSync(
      //     `./${category}__${page}.json`,
      //     JSON.stringify(results),
      //     { encoding: "utf-8" }
      //   );
      //   results = [];
      // }
      if (page < totalPages) {
        return await _get(category, page + 1);
      } else {
        return results;
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.status === 403) {
        await Promise.resolve(() => setTimeout(() => {}, 5000));
        return await _get(category, _page);
      }
      // fs.writeFileSync(`./${category}__${page}.json`, JSON.stringify(results), {
      //   encoding: "utf-8",
      // });
      throw err;
    }
  };
  return await _get(category, page);
};
