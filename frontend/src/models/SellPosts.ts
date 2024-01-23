export class sellPost {
    constructor (
        public sellPostHeader: string,
        public sellPostDescription: string,
        public sellPostImg: File|undefined, 
    ) {}
}

export class ShowSellPost {
    constructor (
        public sellingPostID: number,
        public sellingPostHeader: string,
        public sellingPostDescription: string,
        public sellingPostImg: string,
        public sellingPostUserID: number,
        public sellingPostDate: string,
    ) {}       
} 

export class SellingPostItem {
    constructor (
        public sellingItemDescription: string,
        public sellingItemImg: File|undefined,
    ) {}
}

export class SellingCommentPost {
    constructor (
        public sellingCommentsDescription: string,
        public sellingCommentsUserID: number,
        public sellingCommentPostID: number,
    ) {}       
} 

export class ShowSellingPostComment {
    constructor (    
        public sellingCommentsID: string,
        public sellingCommentsDescription: string,
        public sellingCommentsDate: string,
        public sellingCommentsUserID: number,
        public sellingCommentsPostID: number,
    ) {}
}