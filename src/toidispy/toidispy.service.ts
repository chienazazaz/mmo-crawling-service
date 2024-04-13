import axios from "axios";
import { BASE_URL, RequestHeaders, ToiDiSpyParams } from "./toidispy.const";
import dayjs from "dayjs";

const client = axios.create({
  baseURL: BASE_URL,
  headers: RequestHeaders,
});

const generateDateParam = (datePeriod: string,start?:string,end?:string) => {
  const curentDate = dayjs().format("MM/DD/YYYY");
  switch (datePeriod) {
    case "7 days":
      return `${dayjs().subtract(7, "day").format("MM/DD/YYYY")}-${curentDate}`;

    case "this month":
      return `${dayjs().startOf("day").format("MM/DD/YYYY")}-${curentDate}`;

    case "last month":
      return `${dayjs()
        .subtract(30, "day")
        .startOf("month")
        .format("MM/DD/YYYY")}-${dayjs()
        .subtract(30, "day")
        .endOf("month")
        .format("MM/DD/YYYY")}`;

    case "last 3 months":
      return `${dayjs()
        .subtract(90, "day")
        .startOf("month")
        .format("MM/DD/YYYY")}-${dayjs()
        .subtract(90, "day")
        .endOf("month")
        .format("MM/DD/YYYY")}`;

    case "last 6 months":
      return `${dayjs()
        .subtract(180, "day")
        .startOf("month")
        .format("MM/DD/YYYY")}-${dayjs()
        .subtract(180, "day")
        .endOf("month")
        .format("MM/DD/YYYY")}`;
    case 'custom':
      return `${dayjs(start).format("MM/DD/YYYY")}-${dayjs(end).format("MM/DD/YYYY")}`

    default:
      return `${dayjs()
        .subtract(30, "day")
        .format("MM/DD/YYYY")}-${curentDate}`;
  }
};

export const getData = async (params: any) => {
  const generatedParams: ToiDiSpyParams = {
    ...params,
    date: generateDateParam(params.datePeriod,params.startDate,params.endDate),
  };
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
      console.log(response.data);
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
