import axios from "@/untils/axios";
// import type { liveTabHeaderData } from '../typings';

export const getLiveHome = async (curTabId: number, curPage = 1) => {
    let { data } = await axios.get(`https://apis.netstart.cn/mogujie/live/tabList?tabId=${curTabId}&pageIndex=${curPage}`)

    return data;
}