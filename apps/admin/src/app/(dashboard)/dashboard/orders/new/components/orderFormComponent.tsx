"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowLeft, Loader2, RefreshCcw } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { SlidesModel } from "@gramflow/db/prisma/zod";
import { Button, Input, Loader } from "@gramflow/ui";

import { Icons } from "~/components/icons";

type Product = {
  link: string;
  price: string; // New field "price"
};
const formSchema = z.object({
  product: z.array(
    z.object({
      link: z.string().min(1),
      price: z.string().min(1), // Validation for the new "price" field
    }),
  ),
});

interface PostsData {
  loading: boolean;
  slides: string[];
  slideIds: string[];
  selectedSlides: number[];
  active: boolean;
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

export default function OrderForm() {
  //const [postLink, setPostLink] = useState<string>("");

  const [postsData, setPostsData] = useState<PostsData[]>([]);

  const [activePostLinkIndex, setActivePostLinkIndex] = useState<number>(0);
  //   const [activePostLinkIndex, setActivePostLinkIndex] = useState<number>(0);
  //   const [postLinksArray, setPostLinksArray] = useState<string[]>([]);
  //   const [selectedSlideIndices, setSelectedSlideIndices] = useState<
  //     Record<string, number[]>
  //   >({});

  const {
    refetch: refetchSlides,
    data: slidesData,
    isFetching: areSlidesLoading,
    isRefetching: areSlidesRefetching,
    error: slidesError,
  } = useQuery<z.infer<typeof SlidesModel>[]>(
    ["slidesFetch", postsData[activePostLinkIndex]?.url],
    async () => {
      const response = await fetch(
        `/api/slides?post_link=${postsData[activePostLinkIndex]?.url}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log({ response });
      if (!response.ok) {
        throw new Error("Something went wrong while fetching prices");
      }
      const data = await response.json();

      return data;
    },
    {
      enabled: false,
      onSuccess: (data) => {
        console.log({ activePostLinkIndex, postsData });
        const slideLinks: string[] = [];
        data.forEach((slide) => {
          slideLinks.push(slide.slide_image_url);
        });
        setPostsData((prevData) => {
          const updatedData = [...prevData];
          updatedData[activePostLinkIndex] = {
            ...updatedData[activePostLinkIndex],
            slides: slideLinks,
            slideIds: data.map((slide) => slide.id),
          };
          return updatedData;
        });
        console.log({ data });
      },
      onError: (error) => {
        console.log({ error });
        toast.error("Failed to fetch slides");
      },
    },
  );

  const [packageSize, setPackageSize] = useState("MEDIUM");
  const router = useRouter();
  const form = useForm({
    resolver: async (values) => {
      try {
        const validData = formSchema.parse(values);
        return {
          values: validData,
          errors: {},
        };
      } catch (error) {
        return {
          values: {},
          // @ts-ignore
          errors: error.formErrors.fieldErrors,
        };
      }
    },
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
  const {
    mutate: createOrderMutate,
    isLoading: createOrderLoading,
    error: createOrderError,
  } = useMutation(
    async (orders: string[]) => {
      // Transform the orders array into the format expected by your API

      const requestBody = {
        instagram_post_urls: orders,
        images: [],
        //@ts-ignore
        size: AppConfig.DefaultPackageDetails[packageSize],
      };

      const req = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      if (req.ok) return req.text();
      else
        throw `Request Failed ${req.statusText} ${
          req.status
        } ${await req.text()}`;
    },
    {
      onSuccess: async (data) => {
        form.reset();
        console.log({ data });
        try {
          await navigator.clipboard.writeText(data);
        } catch (e) {
          console.log({ e });
        }
        toast.success("Order has been created! Link has been copied.");
        setGeneratedOrderId(data);
      },
      onError: async (error) => {
        toast.error(
          `Error occurred during the creating of the order. ${error}`,
        );
        console.log(error);
      },
    },
  );

  useEffect(() => {
    console.log({ postsData });
  }, [postsData]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "product",
  });
  const [generatedOrderId, setGeneratedOrderId] = useState<string | null>(null);

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      console.log({
        value,
        name,
        type,
      });
      if (type === "change") {
        if (name?.includes(".link")) {
          function extractNumberFromLink(link: string): number | null {
            const regex = /product\.(\d+)\.link/;
            const match = link.match(regex);

            if (match && match[1]) {
              return parseInt(match[1], 10);
            } else {
              return null;
            }
          }
          const index = extractNumberFromLink(name);
          console.log({ index, value, prod: value.product });
          if (
            index !== null &&
            value !== null &&
            value.product &&
            value.product.length > 0 &&
            value.product[index]?.link
          ) {
            const link = value.product[index]?.link ?? "";
            const regex = /\/p\/([^/?]+)(?:\/\?.*img_index=(\d+))?/;
            const regexResult = regex.exec(link);
            console.log({
              link,
              regexResult,
            });
            if (regexResult) {
              const [, postId] = regexResult;
              console.log({
                postId,
              });
              form.setValue(
                `product.${index}.link`,
                `https://www.instagram.com/p/${postId}/`,
              );
              setActivePostLinkIndex(index);
              console.log({
                indexoinfd: index,
              });
              setPostsData((prevData) => {
                const updatedData = [...prevData];
                updatedData[index] = {
                  loading: true,
                  slides: [],
                  slideIds: [],
                  selectedSlides: [],
                  active: true,
                  url: `https://www.instagram.com/p/${postId}/`,
                };
                return updatedData;
              });
              toast.success(
                "Post link has been set to " +
                  "https://www.instagram.com/p/C0McuL0y4cD/",
              );
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

    const dataToSend = values.product.map((product) => {
      const selectedSlides = postsData.find(
        (post) => post.url === product.link,
      )?.selectedSlides;
      const selectedSlideIds = selectedSlides?.map((slideIndex) => {
        const data = postsData.find((post) => post.url === product.link);
        return data?.slideIds[slideIndex];
      });
      return {
        ...product,
        selectedSlideIds,
      };
    });
    //createOrderMutate(dataToSend);
    console.log({ dataToSend });
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
            <Button
              className="w-fit"
              onClick={handleShareButton}
              variant="outline"
            >
              Copy Template Message
            </Button>
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
      {createOrderLoading && (
        <div className="flex items-center">
          <Loader />
        </div>
      )}
      {!createOrderLoading && !generatedOrderId && (
        // @ts-ignore
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {fields.map((field, index) => (
            <div key={field.id} className="flex flex-col space-y-4">
              <div className="items-centers flex">
                <p className="p-2 text-lg font-semibold">{`Product ${
                  index + 1
                }`}</p>
                <Button
                  disabled={createOrderLoading}
                  variant="ghost"
                  className="-mr-3 text-red-400"
                  type="button"
                  onClick={() => remove(index)}
                >
                  <Icons.trash className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-start gap-2">
                <Input
                  className="w-1/2 lg:max-w-md"
                  disabled={createOrderLoading}
                  type="text"
                  placeholder={`Post Link`}
                  {...form.register(`product.${index}.link` as const)}
                />
                <Button
                  type="button"
                  onClick={() => {
                    if (form.getValues(`product.${index}.link` as const)) {
                      //fetch the slides
                      refetchSlides();
                    }
                  }}
                  variant={"outline"}
                >
                  Fetch Slides
                </Button>
              </div>
              {
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
                                updatedData[index] = {
                                  ...updatedData[index],
                                  selectedSlides: [
                                    ...updatedData[index].selectedSlides,
                                    slidesIndex,
                                  ],
                                };
                                return updatedData;
                              });
                            } else {
                              setPostsData((prevData) => {
                                const updatedData = [...prevData];
                                updatedData[index] = {
                                  ...updatedData[index],
                                  selectedSlides: [
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
              }
              {(areSlidesRefetching || areSlidesLoading) && <Loader />}
              <Input
                className="w-1/2 lg:max-w-md"
                disabled={createOrderLoading}
                type="number"
                placeholder={`Price`}
                {...form.register(`product.${index}.price` as const)}
              />
            </div>
          ))}

          <div className="flex space-x-4">
            <Button
              disabled={createOrderLoading}
              variant="outline"
              type="button"
              onClick={() => {
                append({ link: "", price: "" });
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
            <Button disabled={createOrderLoading} type="submit">
              {createOrderLoading && (
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
