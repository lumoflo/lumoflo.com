"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrdersApi } from "@server/ts-rest/orders";
import { PostsApi } from "@server/ts-rest/posts";
import { initQueryClient } from "@ts-rest/react-query";
import { Loader2, RefreshCcw } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button, Input, Loader } from "@lumoflo/ui";

import { Icons } from "~/components/icons";
import useAuthToken from "~/hooks/use-auth-token";

type ModifiedFormDataType = {
  selectedSlideIds: (string | undefined)[] | undefined;
  link: string;
  price: string;
}[];

type OrderPostDataType = {
  slides: string[];
  prices: string[];
};

type Product = {
  link: string;
  price: string;
};
const formSchema = z.object({
  product: z.array(
    z.object({
      link: z
        .string({
          required_error: "Please enter a link",
          invalid_type_error: "Please enter a valid link",
        })
        .min(1),
      price: z
        .string({
          required_error: "Please enter a price",
          invalid_type_error: "Please enter a valid price",
        })
        .min(1), // Validation for the new "price" field
    }),
  ),
});

interface PostsData {
  loading: boolean;
  slides: string[];
  slideIds: string[];
  selectedSlides: number[];
  active: boolean;
  ready: boolean;
  url: string;
}

// make a get request to get to "/api/slides" to fetch the slides using the post link using react query
// export const SizeSelection = ({
//   setPackageSize,
//   packageSize,
// }: {
//   setPackageSize: Dispatch<SetStateAction<string>>;
//   packageSize: string;
// }) => {
//   return (
//     <>
//       <div className="grid w-fit grid-cols-1 gap-3 ">
//         {Object.keys(AppConfig.DefaultPackageDetails).map((size) => {
//           console.log(packageSize);
//           //@ts-ignore
//           const order = AppConfig.DefaultPackageDetails[size];
//           return (
//             <RecordDisplay
//               onClick={() => setPackageSize(size)}
//               className={cn(
//                 "cursor-pointer",
//                 packageSize === size && "border-blue-500",
//               )}
//               label={size}
//               value={`${order.length} cm x ${order.breadth} cm x ${order.height} cm @ ${order.weight} gm`}
//             />
//           );
//         }) || []}
//       </div>
//     </>
//   );
// };

function extractNumberFromLink(link: string): number | null {
  const regex = /product\.(\d+)\.link/;
  const match = link.match(regex);

  if (match && match[1]) {
    return parseInt(match[1], 10);
  } else {
    return null;
  }
}

export default function OrderForm() {
  const [postsData, setPostsData] = useState<PostsData[]>([]);
  const [activePostLinkIndex, setActivePostLinkIndex] = useState<number>(0);

  const baseUrl = "http://localhost:3002";

  // const slideFetcher: Fetcher<Slide[], string> = async () => {
  //   toast.info("Fetching slides");

  //   return fetch(
  //     `${baseUrl}/posts/${postsData[activePostLinkIndex]?.url}/slides`,
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${await getToken()}`,
  //       },
  //     },
  //   ).then((res) => res.json());
  // };

  const { authLoading, token, userId } = useAuthToken();
  const client = initQueryClient(PostsApi, {
    baseUrl: baseUrl,
    baseHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  const orderClient = initQueryClient(OrdersApi, {
    baseUrl: baseUrl,
    baseHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  const {
    data: slides,
    error: postsError,
    isLoading: postsLoading,
  } = client.getSlides.useQuery(
    ["slide", postsData[activePostLinkIndex]?.url],
    {
      params: {
        id: postsData[activePostLinkIndex]?.url,
      },
    },
    {
      enabled: postsData[activePostLinkIndex]?.ready === true,
      onSuccess: (data) => {
        const res = data.body;
        console.log({ res });
        //set the loading state on the form for the currentIndex to false
        setPostsData((prevData) => {
          const updatedData = [...prevData];
          //@ts-ignore
          updatedData[activePostLinkIndex] = {
            ...updatedData[activePostLinkIndex],
            loading: false,
          };
          return updatedData;
        });

        console.log({ activePostLinkIndex, postsData });
        const slideLinks: string[] = [];
        res.forEach((slide) => {
          slideLinks.push(slide.slide_image_url);
        });
        setPostsData((prevData) => {
          const updatedData = [...prevData];
          //@ts-ignore
          updatedData[activePostLinkIndex] = {
            ...updatedData[activePostLinkIndex],
            slides: slideLinks,
            slideIds: res.map((slide) => slide.id),
          };
          return updatedData;
        });
        console.log({ data });
      },
      onError: (error) => {
        toast.error(`Error occurred during the fetching of slides. ${error}`);
        setPostsData((prevData) => {
          const updatedData = [...prevData];
          //@ts-ignore
          updatedData[activePostLinkIndex] = {
            ...updatedData[activePostLinkIndex],
            loading: false,
          };
          return updatedData;
        });
      },
    },
  );

  const { mutate: createOrder, isLoading: isCreatingOrder } =
    orderClient.createOrder.useMutation({
      onSuccess: async (res) => {
        const order_id = res.body.id;
        form.reset();
        console.log({ order_id });
        try {
          await navigator.clipboard.writeText(order_id);
        } catch (e) {
          console.log({ e });
        }
        toast.success("Order has been created! Link has been copied.");
        setGeneratedOrderId(order_id);
      },
      onError: (error) => {},
    });

  useEffect(() => {
    console.log({ slides });
  }, [slides]);

  const [packageSize, setPackageSize] = useState("MEDIUM");
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product: [
        {
          link: "",
          price: "", // New field "price"
        },
      ],
    },
  });

  const { formState } = form;

  const { errors } = formState;
  // const {
  //   mutate: createOrderMutate,
  //   isLoading: createOrderLoading,
  //   error: createOrderError,
  // } = useMutation(
  //   async ({}: {}) => {
  //     // Transform the orders array into the format expected by your API

  //     const requestBody = {
  //       //@ts-ignore
  //       instagram_post_urls: orders,
  //       images: [],
  //       //@ts-ignore
  //       size: AppConfig.DefaultPackageDetails[packageSize],
  //     };

  //     const req = await fetch("/api/order", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(requestBody),
  //     });
  //     if (req.ok) return req.text();
  //     else
  //       throw `Request Failed ${req.statusText} ${
  //         req.status
  //       } ${await req.text()}`;
  //   },

  //   {
  //     onSuccess: async (data) => {
  //       form.reset();
  //       console.log({ data });
  //       try {
  //         await navigator.clipboard.writeText(data);
  //       } catch (e) {
  //         console.log({ e });
  //       }
  //       toast.success("Order has been created! Link has been copied.");
  //       setGeneratedOrderId(data);
  //     },
  //     onError: async (error) => {
  //       toast.error(
  //         `Error occurred during the creating of the order. ${error}`,
  //       );
  //       console.log(error);
  //     },
  //   },
  // );

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "product",
  });
  const [generatedOrderId, setGeneratedOrderId] = useState<string | null>(null);

  useEffect(() => {
    console.log({ postsData });
    console.log({ activePostLinkIndex });
  }, [postsData]);
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (type === "change") {
        if (name?.includes(".link")) {
          const index = extractNumberFromLink(name);
          console.log({ index, value, prod: value.product });
          if (
            index !== null &&
            value.product &&
            value.product.length > 0 &&
            value.product[index]?.link
          ) {
            const link = value.product[index]?.link ?? "";
            const regex = /\/p\/([^/?]+)(?:\/\?.*img_index=(\d+))?/;
            const regexResult = regex.exec(link);
            if (regexResult) {
              const [_, postId] = regexResult;
              form.setValue(
                `product.${index}.link`,
                `https://www.instagram.com/p/${postId}/`,
              );
              setActivePostLinkIndex(index);
              setPostsData((prevData) => {
                const updatedData = [...prevData];
                updatedData[index] = {
                  loading: true,
                  ready: true,
                  slides: [],
                  slideIds: [],
                  selectedSlides: [],
                  active: true,
                  url: `${postId}`,
                };
                return updatedData;
              });
              toast.success(
                "Post link has been set to " +
                  "https://www.instagram.com/p/C0McuL0y4cD/",
              );
            } else {
              toast.error("Failed to set post link");
            }
          } else {
            toast.error("Failed to set post link");
          }
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  function onSubmit(values: { product: Product[] }, e: React.FormEvent) {
    console.log({ values });
    e.preventDefault();

    const dataToSend: ModifiedFormDataType = values.product.map((product) => {
      const selectedSlides = postsData.find(
        //since the url is the postId and the product id is the post link we need to find the post with the url
        (post) => {
          console.log({ post: post.url, product: product.link.split("/")[4] });
          return post.url === product.link.split("/")[4];
        },
      )?.selectedSlides;

      const selectedSlideIds = selectedSlides?.map((slideIndex) => {
        const data = postsData.find(
          (post) => post.url === product.link.split("/")[4],
        );
        return data?.slideIds[slideIndex];
      });
      console.log({ selectedSlides, selectedSlideIds });
      return {
        ...product,
        selectedSlideIds,
      };
    });

    console.log({ dataToSend });

    const invalidProductPrice = dataToSend.some((product, index) => {
      return !product.price || product.price === "";
    });

    const invalidProductLink = dataToSend.some((product, index) => {
      return !product.link || product.link === "";
    });
    const invalidProductSlide = dataToSend.some((product, index) => {
      return !product.selectedSlideIds || product.selectedSlideIds.length === 0;
    });

    console.log({
      invalidProductPrice,
      invalidProductLink,
      invalidProductSlide,
    });

    if (invalidProductPrice) {
      toast.error(`Please enter price for products.}`);
      return;
    }
    if (invalidProductLink) {
      toast.error(`Please enter link for products`);
      return;
    }
    if (invalidProductSlide) {
      toast.error(`Please select slide for products`);
      return;
    }

    //make a single array for prices and slides
    const prices: string[] = [];
    const slides: string[] = [];
    dataToSend.forEach((product) => {
      product.selectedSlideIds?.map(() => prices.push(product.price));
      //@ts-ignore
      slides.push(...product.selectedSlideIds);
    });

    //createOrderMutate(dataToSend);
    createOrder({
      body: {
        slides,
        prices,
      },
    });
    console.log({ slides, prices });
    return;
  }

  const handleShareButton = async () => {
    const text = `Thank you for your order love 🥰. Please fill up the details by clicking the following link- ${generatedOrderId}. This is a one time process and the details will be saved for future orders. You can visit the link anytime to track your order.`;
    if (navigator.share) {
      try {
        await navigator
          .share({ text })
          .then(() =>
            console.log("Hooray! Your content was shared to tha world"),
          );
      } catch (error) {
        console.log(`Oops! I couldn't share to the world because: ${error}`);
      }
    } else {
      // fallback code
      //copy the text
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
      } else {
        console.log("Clipboard API not available");
      }
    }
  };

  const ErrorMessage = ({ error }: { error: any }) => {
    console.log("Error:", error); // Add this line
    console.log("Error Message:", error?.message); // Add this line
    return <p className="mt-1 text-sm text-red-500">{error?.message}</p>;
  };
  return (
    <div className="p-1">
      {generatedOrderId && (
        <div className="flex w-fit cursor-pointer flex-col space-y-4 py-4">
          <p
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(generatedOrderId);
                toast.success("Copied to clipboard");
              } catch (e) {
                console.log({ e });
                toast.error("Failed to copy to clipboard");
              }
            }}
            className="text-lg font-semibold"
          >
            Order ID: {generatedOrderId}
          </p>
          <div className="mb-5 flex gap-x-3 pb-5">
            {/*@ts-ignore*/}
            <Button
              className="w-fit"
              onClick={handleShareButton}
              variant="outline"
            >
              Copy Template Message
            </Button>
            {/*@ts-ignore*/}
            <Button
              onClick={() => {
                if (window) window.location.reload();
              }}
              variant={"outline"}
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
      {isCreatingOrder && (
        <div className="flex items-center">
          <Loader />
        </div>
      )}
      {!isCreatingOrder && !generatedOrderId && (
        // @ts-ignore
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-col space-y-4">
              <div className="items-centers flex">
                <p className="p-2 text-lg font-semibold">{`Product ${
                  index + 1
                }`}</p>
                {/*@ts-ignore*/}
                <Button
                  disabled={isCreatingOrder}
                  variant="ghost"
                  className="-mr-3 text-red-400"
                  type="button"
                  onClick={() => {
                    remove(index);
                    //remove the slides data as well
                    setPostsData((prevData) => {
                      const updatedData = [...prevData];
                      updatedData.splice(index, 1);
                      return updatedData;
                    });
                  }}
                >
                  <Icons.trash className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-start gap-2 ">
                {/*@ts-ignore*/}
                <Input
                  className="w-1/2 lg:max-w-md"
                  disabled={isCreatingOrder}
                  type="text"
                  placeholder={`Post Link`}
                  {...form.register(`product.${index}.link` as const)}
                />
              </div>
              {errors.product && errors.product[index]?.link && (
                <ErrorMessage error={errors.product[index]?.link} />
              )}
              {postsData[index] && (
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                  {postsData[index]?.slides?.map((slides, slidesIndex) => {
                    return (
                      <div className="relative rounded">
                        <div
                          onClick={() => {
                            if (
                              !postsData[index]?.selectedSlides?.includes(
                                slidesIndex,
                              )
                            ) {
                              setPostsData((prevData) => {
                                const updatedData = [...prevData];
                                //@ts-ignore
                                updatedData[index] = {
                                  ...updatedData[index],
                                  selectedSlides: [
                                    //@ts-ignore
                                    ...updatedData[index].selectedSlides,
                                    slidesIndex,
                                  ],
                                };
                                return updatedData;
                              });
                            } else {
                              setPostsData((prevData) => {
                                const updatedData = [...prevData];
                                //@ts-ignore
                                updatedData[index] = {
                                  ...updatedData[index],
                                  selectedSlides: [
                                    //@ts-ignore
                                    ...updatedData[index].selectedSlides.filter(
                                      (slideIndex) =>
                                        slideIndex !== slidesIndex,
                                    ),
                                  ],
                                };
                                return updatedData;
                              });
                            }
                          }}
                          className={`${
                            postsData[index]?.selectedSlides?.includes(
                              slidesIndex,
                            )
                              ? "border-4 border-blue-500 transition-transform duration-300 ease-in-out"
                              : "transition-transform duration-300 ease-in-out"
                          }`}
                        >
                          <div className="relative">
                            <img className="opacity-80" src={slides} alt="" />
                          </div>
                          {/* {selectedSlideIndex === slide_index && (
                            <Icons.checkCircle className="absolute top-2 right-2 h-4 w-4 text-green-500" />
                          )} */}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              {postsData[index]?.loading && <Loader />}

              {/*@ts-ignore*/}
              <Input
                className="w-1/2 lg:max-w-md "
                disabled={isCreatingOrder}
                type="number"
                placeholder={`Price`}
                {...form.register(`product.${index}.price` as const)}
              />
              {errors.product && errors.product[index]?.price && (
                <ErrorMessage error={errors.product[index]?.price} />
              )}
            </div>
          ))}

          <div className="flex space-x-4">
            {/*@ts-ignore*/}
            <Button
              disabled={isCreatingOrder}
              variant="outline"
              type="button"
              onClick={() => {
                append({
                  link: "",
                  price: "",
                });
                setActivePostLinkIndex(fields.length);
              }}
            >
              Add Product
            </Button>
          </div>
          <div className="mt-5">
            {/* <SizeSelection
              setPackageSize={setPackageSize}
              packageSize={packageSize}
            /> */}
          </div>
          {fields.length > 0 && (
            // @ts-ignore
            <Button disabled={isCreatingOrder} type="submit">
              {isCreatingOrder && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Generate Order
            </Button>
          )}
        </form>
      )}
    </div>
  );
}
