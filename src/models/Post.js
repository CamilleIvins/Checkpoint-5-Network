export class Post {
    constructor(data) {
        this.id = data.id
        this.body = data.body
        this.imgUrl = data.imgUrl
        this.creator = data.creator
        this.likIds = data.likIds
        this.likes = data.likes
        this.createdAt = data.createdAt
        this.updatedAt = data.updatedAt
    }
}

