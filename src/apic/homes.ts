import axios from '../untils/axios'
import { type HomeTopNav,type gettimeRob,type gettimeRobItem,type getHomeC } from '../typings'

//首页导航
export async function getHomeModuleRow() {
    let { data } = await axios.get<Array<HomeTopNav>>('https://apis.netstart.cn/mogujie/homeNav.json')
    return data
}
// 首页女装尖货榜
export async function gettimeLimitedQuickGrab() {
    let { data } = await axios.get<Array<gettimeRob>>('https://apis.netstart.cn/mogujie/shopNav.json')
    return data
}
//首页限时快抢
export async function getTimeProg() {
    let { data } = await axios.get<gettimeRobItem>('https://apis.netstart.cn/mogujie/actor/itemInfo?actorId=1721pi2&page=2&sortBy=1&tagName=%E4%B8%8A%E8%A1%A3')
    return data
}
//首页内容数据
// export async function getHomeContent(count:number) {
//     let { data } = await axios.get<Array<getHomeC>>(`https://apis.netstart.cn/mogujie/video/item?page=${count}`)
//     return data
// }
export async function getHomeContent() {
    let { data } = await axios.get<Array<getHomeC>>(`https://apis.netstart.cn/mogujie/video/item?page=2`)
    return data
}

