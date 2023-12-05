import axios from "@/untils/axios";
import { type LiveBroadcastSort ,type LiveData,type liveRoom , type liveRoomGood} from '../typings'

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
//直播间
export async function getLiveRoom(roomId:number,actorId:string){
    let { data } = await axios.get<liveRoom>(`https://apic.netstart.cn/mogujie/live/actorLiveInfo?roomId=${roomId}&actorId=${actorId}`)
    return data
}
//直播间促销商品
export async function getLiveGoods(roomId:number,actorId:string){
    let { data } = await axios.get<liveRoomGood>(`https://apis.netstart.cn/mogujie/live/queryDiscountPrice?roomId=${roomId}&actorId=${actorId}`)
    return data
}
//直播间评论
export async function getComment(){
    let { data } = await axios.get(`https://apis.netstart.cn/mogujie/live/comments`)
    return data
}