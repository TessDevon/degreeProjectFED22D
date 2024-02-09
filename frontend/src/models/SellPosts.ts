export class sellPost {
  constructor(
    public sellPostHeader: string,
    public sellPostDescription: string,
    public sellPostImg: File | undefined
  ) {}
}

export class DeletePost {
  constructor(
    public userId: number,
    public token: number,
    public deletePostId: number
  ) {}
}

export class ShowSellPost {
  constructor(
    public sellingPostID: number,
    public sellingPostHeader: string,
    public sellingPostDescription: string,
    public sellingPostImg: string,
    public sellingPostUserID: number,
    public sellingPostDate: string
  ) {}
}

export class SellingPostItem {
  constructor(
    public sellingItemDescription: string,
    public sellingItemImg: File | undefined
  ) {}
}

export class ShowSellingPostItem {
  constructor(
    public sellingItemDescription: string,
    public sellingItemImg: string,
    public sellingItemDate: string,
    public sellingItemID: number,
    public sellingItemUnserID: number,
    public sellingItemPostID: number
  ) {}
}

export class SellingCommentPost {
  constructor(
    public sellingCommentsDescription: string,
    public sellingCommentsUserID: number,
    public sellingCommentPostID: number
  ) {}
}

export class ShowSellingPostComment {
  constructor(
    public sellingPostItemCommentsID: number,
    public sellingPostItemCommentsDescription: string,
    public sellingPostItemCommentsDate: string,
    public sellingpostitemcommentsUserID: number,
    public sellingPostItemID: number
  ) {}
}
