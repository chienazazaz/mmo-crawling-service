//@ts-nocheck
import dayjs from "dayjs";
import * as playwright from "playwright";

type Post = {
  page: {
    picture_id: string;
    name: string;
  };
  call_to_action: {
    type: string;
    value: {
      link: string;
      link_title: string;
      link_description: string;
    };
  };
  comments: number;
  content: string;
  created_time: string;
  is_published: number;
  link: string;
  pictures: {
    thumb: string;
    original: string;
  }[];
  reaction_detail: Record<string, number>;
  reactions: number;
  shares: number;
  type: string;
  update: {
    value: {
      r: string;
      c: string;
      s: string;
    };
  };
  video: {
    url: string;
    length: string;
    status: number;
  };
  website: {
    status: number;
  };
  _id: string;
};
type QueryParams = {
  query: string;
  startDate: string;
  endDate: string;
};

const searchAction = async (page: playwright.Page, param: QueryParams) => {
  const dateString = `${dayjs(param.startDate).format('MM/DD/YYYY')}-${dayjs(param.endDate).format('MM/DD/YYYY')}`;
  const queryURL = `https://app.toidispy.com/?q=${param.query}&date=${dateString}&sort_by=added_time&tab=post`;
  await page.goto(queryURL)
  return
};

const parseSearchResult = async (page: playwright.Page): Promise<string[]> => {
  await page.waitForTimeout(1000);
  let performance: any;
  const requests: Record<string, any>[] = await page.evaluate(() =>
    performance.getEntriesByType("resource").filter(
      (resource: Record<string, any>) =>
        ["xmlhttprequest", "fetch"].includes(resource.initiatorType) &&
        // resource.name.includes("home.voucher")
        (resource.name.includes("app.toidispy.com/api/lib?") ||
          resource.name.includes("app.toidispy.com/api/post?") ||
          resource.name.includes("app.spybadao.com/api/v2/posts?"))
    )
  );
  const urls = requests.map((request) => request.name);
  return urls;
};

export const scrape = async (param: QueryParams) => {
  const browser = await playwright.chromium.launch({
    headless: false,
    args: ["--disable-blink-features=AutomationControlled"],
  });
  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
    storageState: ".auth/storage-state.json",
  });

  const page = await context.newPage();
  await page.goto("https://app.toidispy.com");
  await page.waitForLoadState();
  await searchAction(page, param);
  const urls = [];
  while (true) {
    const scrollHeight = Math.max(await page.evaluate(() => {
      return document.documentElement.scrollHeight;
    }),15000);
    // console.log({scrollHeight,offset:window.pageYOffset,height: window.innerHeight})
    const offset = await page.evaluate(() => {
      return document.body.scrollTop;
    });
    const innerHeight = await page.evaluate(() => {
      return window.innerHeight;
    });
    console.log({ scrollHeight:Math.max(scrollHeight,10000), offset, innerHeight });
    await page.evaluate((scrollHeight) => {
      window.scrollTo(0, scrollHeight);
    }, scrollHeight);

    if (offset + innerHeight >= scrollHeight) {
      break;
    }
  }
  urls.push(...(await parseSearchResult(page)));

  console.log(urls.length);
  return urls;
};
