export class InspirationPost {
    constructor (
        public inspirationPostHeader: string,
        public inspirationPostDescription: string,
        public inspirationPostImg: File|undefined, 
    ) {}
}

export class ShowInspirationPost {
    constructor (
        public inspirationPostDate: string,
        public inspirationPostDescription: string,
        public inspirationPostHeader: string,
        public inspirationPostID: number,
        public inspirationPostImg: string,
        public inspirationPostUserID: number
    ) {}       
} 

export class InspirationCommentPost {
    constructor (
        public inspirationCommentsDescription: string,
        public inpirationCommentsUserID: number,
        public inspirationCommentPostID: number,
    ) {}       
} 

export class ShowInspirationPostComment {
    constructor (    
        public inspirationCommentsID: string,
        public inspirationCommentsDescription: string,
        public inspirationCommentsDate: string,
        public inpirationCommentsUserID: number,
        public inspirationCommentsPostID: number,
    ) {}
}