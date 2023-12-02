import axios from "@/untils/axios";
import { type LiveBroadcastSort ,type LiveData} from '../typings'

//直播分类
export async function getLiveBroadcastSort() {
    let { data } = await axios.get<LiveBroadcastSort>('https://apic.netstart.cn/mogujie/live/tabHeader')
    return data
}
//直播列表
export async function getLiveList(tabId: number,page: number){
    let { data } = await axios.get<LiveData>(`https://apic.netstart.cn/mogujie/live/tabList?tabId=${tabId}&pageIndex=${page}`)
    return data
}