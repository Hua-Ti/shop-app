// 引入axios
import axios from "@/untils/axios";

import { type HotWords,type Optain,type searchByKeyword } from "../typings"

export const getHotSearch = async () => {
    let {data} = await axios.get<HotWords>(`https://apis.netstart.cn/mogujie/hotSearch.json`);
    return data.data.hotWord.data;
}

export const getKeywordSearch = async (optain:Optain)=>{
    let {data} = await axios.get<searchByKeyword>(`https://apis.netstart.cn/mogujie/search/searchByKeyword?q=${optain.q}&sort=${optain.sort}&page=${optain.page}&minPrice=${optain.minPrice}&maxPrice=${optain.maxPrice}`);
    console.log(data);                                     
    return data.result;
}

