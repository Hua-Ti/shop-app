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

// 首页女装尖货榜
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
// 首页限时快抢 
export interface gettimeRobItem {
    cover: string
    actorId: string
    livePrice:number
}
// 首页内容
export interface getHomeC {
    itemImage:string 
    actorName:string
    showDiscountPrice:number
    bottomIcon?:string
    firstFrame:string
    actorId: string
    id:number
    actorAvatar:string
    sale:string
    title:string
    lefttop_taglist:Array<{
        img:string
    }>
}


// live-data相关配置
export interface liveHomeLivesItem {
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
    "roomId": 12445518,
    "living": true,
    "roomTag": ""
}

export interface liveHomeShopCartsGoodsItem {
    "itemId": string,
    "cover": string,
    "title": string,
    "type": number,
    "price": string,
    "discountPrice": string,
    "isNewItem": number
}

export interface liveHomeShopCartsCommentsItem {
    "commentId": string,
    "type": number,
    "content": string,
    "avatar": string,
    "uid": string
}