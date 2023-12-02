// 配置 获取api的数据
/* 命名的时候记得把父类文件名放前面:
    eg: live-data 需要的配置
        export interface live.....{}
*/

// 首页导航 （数组（字符串））
export interface HomeTopNav {
    image: string
    sort: number
    _system_record_entry_id: number
    link: string
    // _material_end_time: Number
    title: string
    titleColor: string
    // description?:String
    // acm: String
    h5Link: string
    // material_start_time: Number
}

// 首页限时快抢
export interface gettimeRob {
    timestamp: number
    _system_record_entry_id: string
    tagTitle: string
    link: string
    title: string
    _material_start_time: number
    countdown: number
    w: number
    backgroundImage: string
    _material_end_time: number
    acm: string
    categoryId?: number
}


// live-data相关配置
export interface LiveBroadcastSort {
    api: string
    v: number
    ret: string
    data: LiveSortData
}
export interface LiveSortData {
    banners?: string
    // tabs: Array<LiveSortTabs>
    tabs: {
        items: Array<LiveSortTabs>
    }
}
export interface LiveSortTabs {
    id: number
    name: string
    active: boolean
    platform: number
}
//直播分类项具体数据
export interface LiveData {
    data: {
        lives: Array<LiveList>
    }
}
// 每个直播间的数据
export interface LiveList {
    "visitorCount": number,
    "shopCarts": {
        "goods": Array<liveHomeShopCartsGoodsItem>
    },
    "avatar": string,
    "bgImg": string,
    "recommended": boolean,
    "intro": string,
    "actUserId": string,
    "userName": string,
    "comments": Array<liveHomeShopCartsCommentsItem>,
    "roomId": number,
    "living": true,
    "roomTag": ""
}
// 直播间推荐商品数据
export interface liveHomeShopCartsGoodsItem {
    "itemId": string,
    "cover": string,
    "title": string,
    "type": number,
    "price": string,
    "discountPrice": string,
    "isNewItem": number
}
//直播间评论数据
export interface liveHomeShopCartsCommentsItem {
    "commentId": string,
    "type": number,
    "content": string,
    "avatar": string,
    "uid": string
}