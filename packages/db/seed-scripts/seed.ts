import { db } from "../index";

const postArray = [
  "https://www.instagram.com/p/C0McrIcyf6N/",
  "https://www.instagram.com/p/C0McuL0y4cD/",
];

const slideArray = [
  ["https://pub-8ba4b31dc1c244bf935276c7cc3adca0.r2.dev/70a83bac-33b9-4652-9192-acf895cbb657_0.jpg"],
  [
    "https://pub-8ba4b31dc1c244bf935276c7cc3adca0.r2.dev/519fd3bf-5a9c-4dfe-86c9-87fb0d0a94ad_0.jpg",
    "https://pub-8ba4b31dc1c244bf935276c7cc3adca0.r2.dev/d440931a-81a8-4eae-bdbb-5c9e5dd96c0c_1.jpg",
  ],
];

console.log("seeding...");
try {
  await (async () => {
    for (const [index, post] of postArray.entries()) {
      const postCreated = await db.posts.upsert({
        where: { post_link: post },
        update: {},
        create: {
          post_link: post,
          caption: "kajshgfjkhawgh 2525235",
          post_created_at: new Date(),
        },
      });

      console.log(postCreated);

      for (const [slideIndex, slide] of slideArray[index].entries()) {
        await db.slides.upsert({
          where: {
            post_id_index: {
              post_id: postCreated.id,
              index: slideIndex,
            },
          },
          update: {},
          create: {
            index: slideIndex,
            slide_image_url: slide,
            post_caption: "kajshgfjkhawgh 2525235",
            post_link: post,
            post_id: postCreated.id,
            post_timestamp: new Date(),
          },
        });

        console.log(
          `slide ${slideIndex} of post ${postCreated.id} created successfully`,
        );
      }
    }
  })();
} catch (error) {
  console.error(error);
}
