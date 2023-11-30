import axios from '../untils/axios'
import { type HomeTopNav,type gettimeRob } from '../typings'

//首页导航
export async function getHomeModuleRow() {
    let { data } = await axios.get<Array<HomeTopNav>>('https://apic.netstart.cn/mogujie/homeNav.json')
    return data
}
// 首页限时快抢
export async function gettimeLimitedQuickGrab() {
    let { data } = await axios.get<Array<gettimeRob>>('https://apic.netstart.cn/mogujie/shopNav.json')
    return data
}

