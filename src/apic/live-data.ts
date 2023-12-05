import axios from "@/untils/axios";
import { type LiveBroadcastSort, type LiveData, type getPlaybackData } from '../typings'

//直播分类
export async function getLiveBroadcastSort() {
    let { data } = await axios.get<LiveBroadcastSort>('https://apic.netstart.cn/mogujie/live/tabHeader')
    return data
}
//直播列表
export async function getLiveList(tabId: number, page: number) {
    let { data } = await axios.get<LiveData>(`https://apic.netstart.cn/mogujie/live/tabList?tabId=${tabId}&pageIndex=${page}`)
    return data
}

// 直播回放相关
export async function getPlaybackData(itemUrlId: string, actorUrlId: string) {
    let { data } = await axios.get<getPlaybackData>(`https://apis.netstart.cn/mogujie/video/detail?itemId=${itemUrlId}&actorId=${actorUrlId}`)

    return data
}