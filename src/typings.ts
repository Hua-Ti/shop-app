// 配置 获取api的数据
/* 命名的时候记得把父类文件名放前面:
    eg: live-data 需要的配置
        export interface live.....{}
*/


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