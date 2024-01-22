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
