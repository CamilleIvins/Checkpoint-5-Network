export class Post {
    constructor(data) {
        this.id = data.id
        this.body = data.body
        this.imgUrl = data.imgUrl
        this.CreatorId = data.CreatorId
        this.likeIds = data.id
        this.createdAt = data.createdAt
        this.updatedAt = data.updatedAt
    }
}

// "page": 1,
//   "totalPages": 13,
//   "newer": null,
//   "older": "https://bcw-sandbox.herokuapp.com/api/posts?page=2",
//   "posts": [
//     {
//       "_id": "64bffc3c07e2f6d07da0f221",
//       "body": "Test",
//       "imgUrl": "https://cdn.dribbble.com/users/5311927/screenshots/11643291/media/9329dee71837445df2ce7f53038309e1.gif",
//       "creatorId": "64be9abb10095c94051a6439",
//       "likeIds": [
//         "63922fd4274d85e20428e306"
//       ],
//       "createdAt": "2023-07-25T16:45:48.365Z",
//       "updatedAt": "2023-07-26T16:16:44.586Z",
//       "__v": 3,
//       "creator": {
//         "_id": "64be9abb10095c94051a6439",
//         "subs": [
//           "auth0|64be9aba3016e418b806c2c9"
//         ],
//         "email": "neonsamurai@twitch.tv",
//         "name": "The Neon Samurai",
//         "picture": "https://public.nftstatic.com/static/nft/res/nft-cex/S3/1678746609164_cfvrxp3om369m4l3u3gu1z9j35fz9gsk.gif",
//         "bio": "From my early days in the dense jungle, I felt an unyielding calling to transcend the limits imposed upon my species. Embracing the way of the samurai, I honed my skills with unwavering dedication, mastering the art of the blade and channeling the luminous energy of neon to illuminate the path of my destiny. In each electrifying stroke of my katana, I paint a vivid tapestry of courage and resilience, a testament to the boundless potential that lies within us all. As The Neon Samurai, I stand not only as a symbol of artistic innovation but also as a living testament to the power of determination, proving that the heart of a warrior beats fiercely within the soul of an ape.",
//         "coverImg": "https://cdn.dribbble.com/users/5311927/screenshots/11643291/media/9329dee71837445df2ce7f53038309e1.gif",
//         "github": "",
//         "linkedin": "",
//         "resume": "",
//         "class": "Summer '22",
//         "graduated": true,
//         "createdAt": "2023-07-24T15:37:34.395Z",
//         "updatedAt": "2023-07-25T16:36:00.738Z",
//         "__v": 0,
//         "id": "64be9abb10095c94051a6439"
//       },
//       "likes": [
//         {
//           "_id": "63922fd4274d85e20428e306",
//           "name": "Bing Chilling",
//           "picture": "https://pbs.twimg.com/media/E-c1f4-WEAYnXDf.png",
//           "id": "63922fd4274d85e20428e306"
//         }