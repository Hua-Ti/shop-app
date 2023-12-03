// 引入axios
import axios from "@/untils/axios";

import { type HotWords,type Optain,type searchByKeyword } from "../typings"

export const getHotSearch = async () => {
    let {data} = await axios.get<HotWords>(`https://apis.netstart.cn/mogujie/hotSearch.json`);
    console.log(data.data.hotWord.data);
    return data.data.hotWord.data;
}

export const getKeywordSearch = async (optain:Optain)=>{
    console.log(optain.q,optain.sort,optain.page);
    let {data} = await axios.get<searchByKeyword>(`https://apis.netstart.cn/mogujie/search/searchByKeyword?q=${optain.q}&sort=${optain.page}&page=${optain.page}&minPrice=${optain.minPrice}&maxPrice=${optain.maxPrice}`);
                                                    
    console.log(data);
    return data.result;
}

