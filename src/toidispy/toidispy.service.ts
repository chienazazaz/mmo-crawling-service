import axios from "axios";
import { BASE_URL, RequestHeaders, ToiDiSpyParams } from "./toidispy.const";

const client = axios.create({
  baseURL: BASE_URL,
  headers: RequestHeaders,
});

export const getData = async (params: ToiDiSpyParams) => {
  const results: Record<string, any>[] = [];
  const _get = async (
    params: ToiDiSpyParams
  ): Promise<Record<string, any>[]> => {
    const response = await client.request({
      url: "/post",
      method: "GET",
      params,
    });
    const { data, cursor, code } = response.data;

    if (code !== 200) {
      throw { error: new Error("Something went wrong"), data: response.data };
    }
    results.push(data);
    if (cursor) {
      return _get(Object.assign(params, { cursor }));
    } else {
      return data;
    }
  };

  return await _get(params);
};
