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

// 直播回放相关
export interface livePlayBackData {
    "mbook": string,
    "list": Array<livePlayBackList>
}

export interface livePlayBackList {
    "explainItemType": number,
    "link": string,
    "itemIdUrl": string,
    "liveId": number,
    "itemImage": string,
    "similarityUrl": string,
    "actorIdUrl": string,
    "type": number,
    "showDiscountPrice": string,
    "sale": string,
    "itemId": number,
    "actorName": string,
    "videoId": number,
    "lefttop_taglist": Array<livePlayBackListLefttop_taglistItem>,
    "firstFrame": string,
    "id": string,
    "liveStatus": number,
    "actorId": number,
    "videoH265Url": string,
    "liveLink": string,
    "actorAvatar": string,
    "orgPrice": number,
    "isSecKillItem": number,
    "hasSimilarity": boolean,
    "originItemImage": string,
    "imageAdapt": boolean,
    "pcLink": string,
    "discountPrice": string
    "explainId": number,
    "itemType": number,
    "title": string,
    "showOrgPrice": string,
    "useVideoUrl": boolean,
    "clientUrl": string,
    "itemMarks": string
}

// 直播的小图标
export interface livePlayBackListLefttop_taglistItem {
    "styleType": number,
    "img": string,
    "w": number,
    "h": number,
    "sort": string,
    "pagani_system_tagType": string
}


// 搜索的相关接口
export interface HotWords {
    data: {
        hotWord: {
            data: Array<HotWord>
        }
    }
}

export interface HotWord {
    color: string;
    query: string;
    acm: string;
    frontword: string;
}

export interface Optain {
    q: string,
    sort: string,
    page: number,
    minPrice: number,
    maxPrice: number,
}

export interface searchByKeyword {
    result: {
        sortFilter: Array<sortFilterList>,
        priceFilter: Array<priceFilterList>,
        wall:{
            docs:Array<wallDocsList>
        }
    }
}

export interface sortFilterList {
    sortKey: string,
    title: string,
}
export interface priceFilterList {
    max: string,
    min: string,
}
export interface wallDocsList{
    tradeItemId:string,
    img:string,
    title:string,
    leftbottom_taglist:Array<leftbottomTagList>
    cfav:number,
    price:69,
}

export interface leftbottomTagList{
    color:string,
    bgColor:string,
    content:string,
}