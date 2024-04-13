import { USER_AGENT } from "../common.const";

export const BASE_URL = "https://app.toidispy.com/api/";
export const COOKIE = `g_state={"i_l":0}; user_id=3185; iat=1713024462; token=6ec27493d84cfd9e911fd93fbbf7c51ae4565a6b52264213d520bc2412bae4a1`;

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

