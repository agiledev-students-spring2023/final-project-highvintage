// mocking db calls in this file
// using dummy users and posts, conglomerating them all together
// to make a fake database

const dummyUsers = [
  {
    id: 1,
    followers: [3, 4, 5],
    following: [2, 3, 6],
    isLoggedIn: true,
    username: "user1",
    photo:
      "https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1335&q=80",
    posts: [
      {
        postId: 1,
        date: new Date("2023-3-20"),
        postLoc: "bklyn thrift",
        postMedia: [
          "https://ln-site.nyc3.cdn.digitaloceanspaces.com/public/prod/2021/08/image/metcha_OnlyThrift_internal_18-custom.min.jpg",
          "https://ln-site.nyc3.cdn.digitaloceanspaces.com/public/prod/2021/08/image/metcha_OnlyThrift_internal_18-custom.min.jpg",
        ],
        postLike: [2, 3,1,1,1,1,1,1,1,1,1,1,1,1,1],
        postText: "I love thrifting!",
        comments: [],
      },
    ],
    discussion: [
      {
        id: 1,
        title: "I love this place!",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercit ation ullamco laboris nisi ut aliquip ex ea commodo consequat?",
        date: new Date("2023-3-20"),
        comments: [],
      },
    ],
  },
  {
    id: 2,
    followers: [3, 4, 5],
    following: [1, 3, 6],
    username: "thriftlover",
    photo:
      "https://images.unsplash.com/photo-1630208232589-e42b29428b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1538&q=80",
    posts: [
      {
        postId: 2,
        date: new Date("2023-3-23"),
        postLoc: "",
        postMedia: [
          "https://images.squarespace-cdn.com/content/v1/5726544ef85082b93e0f14c1/1584913604452-VFGS28EV3HZ2QGZOOA6G/men+thrift+store?format=1000w",
          "https://images.squarespace-cdn.com/content/v1/5726544ef85082b93e0f14c1/1584913604452-VFGS28EV3HZ2QGZOOA6G/men+thrift+store?format=1000w",
        ],
        postLike: [3, 4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        postText: "I love thrifting!",
        comments: [],
      },
    ],
    discussion: [
      {
        id: 2,
        title: "Second Street is OVERRATED!",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercit ation ullamco laboris nisi ut aliquip ex ea commodo consequat?",
        date: new Date("2023-4-20"),
        comments: [],
      },
    ],
  },
  {
    id: 3,
    followers: [2, 4, 5],
    following: [2, 4, 6],
    username: "kate7725",
    photo:
      "https://images.unsplash.com/photo-1622842182823-28bfbfba47e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fHByb2ZpbGUlMjBwaG90b3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1400&q=60",
    posts: [
      {
        postId: 3,
        date: new Date("2023-1-20"),
        postLoc: "cool thrift",
        postMedia: [
          "https://cdn.cliqueinc.com/posts/276545/winter-thrift-store-finds-276545-1548447304321-main.700x0c.jpg",
          "https://cdn.cliqueinc.com/posts/276545/winter-thrift-store-finds-276545-1548447304321-main.700x0c.jpg"
        ],
        postLike: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        postText: "I love thrifting!",
        comments: [],
      },
    ],
    discussion: [
      {
        id: 3,
        title: "This new thrift shop it's amazing!",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercit ation ullamco laboris nisi ut aliquip ex ea commodo consequat?",
        date: new Date("2023-3-21"),
        comments: [],
      },
    ],
  },
  {
    id: 4,
    followers: [3, 2, 5],
    following: [2, 3, 6],
    username: "big_dinner",
    photo:
      "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1317&q=80",
    posts: [
      {
        postId: 4,
        date: new Date("2023-3-24"),
        postLoc: "hi thrift",
        postMedia: [
          "https://i0.wp.com/theurbandarling.com/wp-content/uploads/2021/09/IMG_2812-3.jpg",
          "https://i0.wp.com/theurbandarling.com/wp-content/uploads/2021/09/IMG_2812-3.jpg"
        ],
        postLike: [1,1,1,1,1,1,1,1,1],
        postText: "I love thrifting!",
        comments: [],
      },
    ],
    discussion: [
      {
        id: 4,
        title: "this new thrift shop it's BAD!",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercit ation ullamco laboris nisi ut aliquip ex ea commodo consequat?",
        date: new Date("2023-5-21"),
        comments: [],
      },
    ],
  },
  {
    id: 5,
    username: "user2309",
    photo:
      "https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
    posts: [
      {
        postId: 5,
        date: new Date("2023-02-20"),
        postLoc: "great thrift",
        postMedia: [
          "https://i0.wp.com/static1.squarespace.com/static/5a93aadf36099bbdddfe2c35/t/5ebbed4f3f8d853f2163bfb5/1589375352017/thrift+store+style+thrift+store+clothing+finds+.jpg?resize=360%2C480&ssl=1",
          "https://i0.wp.com/static1.squarespace.com/static/5a93aadf36099bbdddfe2c35/t/5ebbed4f3f8d853f2163bfb5/1589375352017/thrift+store+style+thrift+store+clothing+finds+.jpg?resize=360%2C480&ssl=1",
        ],
        postLike: [1,1,1,1,1],
        postText: "I love thrifting!",
        comments: [],
      },
    ],
    discussion: [
      {
        id: 5,
        title: "I found this new thrift shop!",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercit ation ullamco laboris nisi ut aliquip ex ea commodo consequat?",
        date: new Date("2021-5-21"),
        comments: [],
      },
    ],
  },
  {
    id: 6,
    followers: [3, 4, 5],
    following: [2, 3, 4],
    username: "user30943",
    photo:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1200&q=60",
    posts: [
      {
        postId: 6,
        date: new Date("2023-02-10"),
        postLoc: "thrift cool",
        postMedia: [
          "https://images.squarespace-cdn.com/content/v1/5726544ef85082b93e0f14c1/1594409397034-493NXIBKFQZO7STH338L/second+hand+stores?format=1000w",
          "https://images.squarespace-cdn.com/content/v1/5726544ef85082b93e0f14c1/1594409397034-493NXIBKFQZO7STH338L/second+hand+stores?format=1000w",
        ],
        postLike: [1,1,1,1,1,1,1,1],
        postText: "I love thrifting!",
        comments: [],
      },
    ],
    discussion: [
      {
        id: 6,
        title: "I found this new thrift shop!",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercit ation ullamco laboris nisi ut aliquip ex ea commodo consequat?",
        date: new Date("2021-5-21"),
        comments: [],
      },
    ],
  },
  {
    id: 7,
    followers: [3, 4, 5],
    following: [2, 3, 6],
    username: "iloveshopping",
    photo:
      "https://images.unsplash.com/photo-1670272504471-61a632484750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    posts: [
      {
        postId: 7,
        date: new Date("2023-01-07"),
        postLoc: "vintage cool",
        postMedia: [
          "https://www.ispo.com/sites/default/files/styles/listicle_header_square_phone/public/2021-09/Athleisure%20Wear.jpg?h=c4dd14e7&itok=h5DuMdom",
          "https://www.ispo.com/sites/default/files/styles/listicle_header_square_phone/public/2021-09/Athleisure%20Wear.jpg?h=c4dd14e7&itok=h5DuMdom"
        ],
        postLike: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,11,1,1,1,1,1,1,1,1,1,1,1,1,1,1,11,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        postText: "I love thrifting!",
        comments: [],
      },
    ],
    discussion: [
      {
        id: 7,
        title: "what do you think about ...",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercit ation ullamco laboris nisi ut aliquip ex ea commodo consequat?",
        date: new Date("2023-1-21"),
        comments: [],
      },
    ],
  },
  {
    id: 8,
    followers: [3, 4, 5],
    following: [2, 3, 6],
    username: "awesomesauce8384",
    photo:
      "https://images.unsplash.com/photo-1467043237213-65f2da53396f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y2xvdGhlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1200&q=60",
    posts: [
      {
        postId: 8,
        date: new Date("2023-3-11"),
        postLoc: "yes thrift",
        postMedia: [
          "https://i.pinimg.com/736x/53/06/f8/5306f88a58b8577fa57675ad83b1771c.jpg",
          "https://i.pinimg.com/736x/53/06/f8/5306f88a58b8577fa57675ad83b1771c.jpg",
        ],
        postLike: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        postText: "I love thrifting!",
        comments: [],
      },
    ],
    discussion: [
      {
        id: 8,
        title: "This is cool...",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercit ation ullamco laboris nisi ut aliquip ex ea commodo consequat?",
        date: new Date("2020-1-21"),
        comments: [],
      },
    ],
  },
  {
    id: 9,
    followers: [3, 4, 5],
    following: [2, 3, 6],
    username: "krunker",
    photo:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    posts: [
      {
        postId: 9,
        date: new Date("2023-3-20"),
        postLoc: "best thrift",
        postMedia: [
          "https://cdn.lookastic.com/looks/olive-long-sleeve-t-shirt-khaki-dress-pants-white-high-top-sneakers-large-59230.jpg",
          "https://cdn.lookastic.com/looks/olive-long-sleeve-t-shirt-khaki-dress-pants-white-high-top-sneakers-large-59230.jpg",
        ],
        postLike: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        postText: "I love thrifting!",
        comments: [],
      },
    ],
    discussion: [
      {
        id: 9,
        title: "This is nice...",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercit ation ullamco laboris nisi ut aliquip ex ea commodo consequat?",
        date: new Date("2019-1-21"),
        comments: [],
      },
    ],
  },
  {
    id: 10,
    followers: [3, 4, 5],
    following: [2, 3, 6],
    username: "wiizii",
    photo:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    posts: [
      {
        postId: 10,
        date: new Date("2023-3-20"),
        postLoc: "thrift nyc",
        postMedia: [
          "https://40plusstyle.com/wp-content/uploads/2022/07/nikkiclassicstyle.jpg",
          "https://40plusstyle.com/wp-content/uploads/2022/07/nikkiclassicstyle.jpg",
        ],
        postLike: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        postText: "Thrift classic!",
        comments: [],
      },
    ],
    discussion: [
      {
        id: 10,
        title: "How's my fit y'all",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercit ation ullamco laboris nisi ut aliquip ex ea commodo consequat?",
        date: new Date("2018-1-21"),
        comments: [],
      },
    ],
  },
  {
    id: 11,
    followers: [3, 4, 5],
    following: [2, 3, 6],
    username: "sassiii",
    photo:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    posts: [
      {
        postId: 11,
        date: new Date("2023-3-20"),
        postLoc: "how2thrift",
        postMedia: [
          "https://i.pinimg.com/564x/2b/70/e0/2b70e0a63689425f8bde1acdc7bdf291.jpg",
          "https://i.pinimg.com/564x/2b/70/e0/2b70e0a63689425f8bde1acdc7bdf291.jpg",
        ],
        postLike: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
        postText: "Gems found this weekend!",
        comments: [],
      },
    ],
    discussion: [
      {
        id: 11,
        title: "I need store recs!",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercit ation ullamco laboris nisi ut aliquip ex ea commodo consequat?",
        date: new Date("2020-1-21"),
        comments: [],
      },
    ],
  }
];

export default dummyUsers;
