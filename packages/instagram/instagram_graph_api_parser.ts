import { z } from "zod";

enum MediaTypeEnum {
  CAROUSEL_ALBUM = "CAROUSEL_ALBUM",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
}
interface MediaData {
  id: string;
  permalink: string;
  media_url: string;
  caption: string;
  media_type: "CAROUSEL_ALBUM" | "IMAGE" | "VIDEO";
  timestamp: string;
}

export const CursorsSchema = z.object({
  before: z.string(),
  after: z.string(),
});   

export const ChildSchema = z.object({
  media_url: z.string(),
  media_type: z.string(),
});

export const DaumSchema = z.object({
  id: z.string(),
  timestamp: z.string(),
  media_url: z.string(),
  caption: z.string().default(""),
  media_type: z.nativeEnum(MediaTypeEnum),
  permalink: z.string(),
});

export const PagingSchema = z.object({
  cursors: CursorsSchema,
  next: z.string().optional(),
});

export const RootSchema = z.object({
  data: z.array(DaumSchema),
  paging: PagingSchema.optional(),
});

export const ChildRootSchema = z.object({
  data: z.array(DaumSchema),
});

// Function to extract data from the JSON response
function extractData(data: z.infer<typeof DaumSchema>[]) {
  const extractedData: MediaData[] = [];
  if (data && data.length > 0) {
    extractedData.push(...data);
  }

  return extractedData;
}

export async function getAllParentMediaFromInstagram({
  fields = [
    "id",
    "media_type",
    "media_url",
    "permalink",
    "caption",
    "timestamp",
  ],
  accessToken,
  postPermalink,
  limit = 100,
}: {
  fields?: string[];
  accessToken: string;
  postNumber?: number;
  postPermalink?: string;
  limit?: number;
}): Promise<MediaData[]> {
  const mediaData: MediaData[] = [];
  let nextPage:
    | string
    | null = `https://graph.instagram.com/me/media?fields=${fields.join(
    ",",
  )}&access_token=${accessToken}`;

  // If we have a postPermaLink, then we need to get the specific post instead of all posts
  let limitNumber = 0;
  while (nextPage) {
    const response = await fetch(nextPage);
    const dataFromApi = await response.json();
    const initialData = RootSchema.parse(dataFromApi);
    const { data } = initialData;
    const extractedData = extractData(data); // Extract data from the initial response
    if (data) {
      if (extractedData && extractedData.length > 0) {
        if (postPermalink && !limit) {
          const foundPost = extractedData.find(
            (item) => item.permalink === postPermalink,
          );
          if (foundPost) {
            return [foundPost];
          }
        } else {
          if (limitNumber <= limit) {
            mediaData.push(...extractedData.slice(0, limit - limitNumber));
            limitNumber += extractedData.length;
          } else {
            return mediaData;
          }
        }
      }
      if (initialData.paging && initialData.paging.next) {
        nextPage = initialData.paging.next;
      } else {
        nextPage = null;
      }
    } else {
      nextPage = null;
    }
  }
  return mediaData;
}

export async function getChildrenMediaFromInstagram({
  fields = ["id", "media_type", "media_url", "permalink", "timestamp"],
  accessToken,
  parentPostId,
  parentCaption = "",
}: {
  fields?: string[];
  accessToken: string;
  parentPostId: string;
  parentCaption?: string;
}): Promise<MediaData[]> {
  const mediaData: MediaData[] = [];
  let url = `https://graph.instagram.com/${parentPostId}/children?fields=${fields.join(
    ",",
  )}&access_token=${accessToken}`;
  const response = await fetch(url);
  const dataFromApi = await response.json();
  const initialData = ChildRootSchema.parse(dataFromApi);
  const { data } = initialData;
  const extractedData = extractData(data); // Extract data from the initial response

  if (data) {
    if (extractedData && extractedData.length > 0) {
      mediaData.push(...extractedData);
    }
  }
  if (parentCaption && parentCaption.length > 0) {
    mediaData.forEach((item) => {
      item.caption = parentCaption;
    });
  }
  return mediaData;
}

export const getSpecificNumberOfPostsFromInstagram = async ({
  accessToken,
  postLimit = 100,
}: {
  accessToken: string;
  postLimit?: number;
}) => {
  const parentMedia = await getAllParentMediaFromInstagram({
    accessToken,
    limit: postLimit,
  });
  return parentMedia;
};

export const searchPostsFromInstagram = async ({
  accessToken,
  postPermalink,
  includeChildren = false,
}: {
  accessToken: string;
  postPermalink: string;
  includeChildren?: boolean;
}) => {
  const parentMedia = await getAllParentMediaFromInstagram({
    accessToken,
    postPermalink,
  });
  if (!includeChildren) {
    return parentMedia;
  }
  const parentMediaWithChildren = await Promise.all(
    parentMedia.map(async (item) => {
      const childrenMedia = await getChildrenMediaFromInstagram({
        accessToken,
        parentPostId: item.id,
        parentCaption: item.caption,
      });
      return {
        ...item,
        childrenMedia,
      };
    }),
  );
  return parentMediaWithChildren;
};

export const getParentAndChildrenMediaFromInstagram = async ({
  accessToken,
}: {
  limit?: number;
  accessToken: string;
}) => {
  const parentMedia = await getAllParentMediaFromInstagram({
    accessToken,
  });
  const parentMediaWithChildren = await Promise.all(
    parentMedia.map(async (item) => {
      const childrenMedia = await getChildrenMediaFromInstagram({
        accessToken,
        parentPostId: item.id,
        parentCaption: item.caption,
      });
      return {
        ...item,
        childrenMedia,
      };
    }),
  );
  return parentMediaWithChildren;
};
