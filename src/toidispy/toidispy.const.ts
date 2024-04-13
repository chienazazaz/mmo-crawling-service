import { USER_AGENT } from "../common.const";

export const BASE_URL = "https://app.toidispy.com/api/";
export const COOKIE = `g_state={"i_l":0}; user_id=3185; iat=1713020251; token=68f1faee15895cd6e061f7ddb77aa0458f21ba5360688f9a6fc18f452b8d7b0d`;

export const RequestHeaders = {
    "User-Agent": USER_AGENT,
    Cookie: COOKIE,
    "X-Requested-With": "XMLHttpRequest",
    "Sec-Ch-Ua-Platform": "macOS",
  }
;

export type ToiDiSpyParams = {
  q?: string;
  sort:
    | "created_time"
    | "added_time"
    | "trending"
    | "reactions"
    | "likes"
    | "share";
  cursor?: string;
  search_on?: "content" | "page_id" | "domain" | "pixel";
  date?: string;
  type?: "photo" | "video" | "link";
  comment?: 10 | 50 | 100 | 500 | 1000;
  like?: 10 | 50 | 100 | 500 | 1000;
  share?: 10 | 50 | 100 | 500 | 1000;
};
