"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import { StoresApi } from "@server/ts-rest/stores";
import { initQueryClient } from "@ts-rest/react-query";
import { useAtom } from "jotai";
import { InstagramIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  Loader,
  LoadingButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@lumoflo/ui";
import { cn } from "@lumoflo/utils";

import { env } from "~/env.mjs";
import useAuthToken from "~/hooks/use-auth-token";
import { selectedStoreAtom } from "~/lib/store";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {}

export const StoreSwitcher = ({ className }: StoreSwitcherProps) => {
  const { token, authLoading, userId } = useAuthToken();
  const client = initQueryClient(StoresApi, {
    baseUrl: env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:3002",
    baseHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  const newStoreZodSchema = z.object({
    name: z.string(),
    username: z.string(),
    instagram_token: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(newStoreZodSchema),
  });

  const { mutate: addStoreMutate, isLoading: isAddingOrder } =
    client.addStore.useMutation({
      onSuccess: () => {
        toast.success("Successfully added store");
      },
      onError: () => {
        toast.error("Failed to add store");
      },
    });

  const {
    data: stores,
    isLoading,
    error,
  } = client.getStores.useQuery(
    ["stores"],
    {},
    {
      enabled: !!userId,
    },
  );

  const [open, setOpen] = React.useState(false);
  const [showNewStoreDialog, setShowNewStoreDialog] = React.useState(false);
  const [selectedStore, setSelectedStore] = useAtom(selectedStoreAtom);

  //if there is no selected store, select the first one
  React.useEffect(() => {
    if (stores?.body && !selectedStore && stores.body[0]) {
      setSelectedStore(stores.body[0]);
    }
  }, [stores, selectedStore, setSelectedStore]);

  function onSubmit(values: z.infer<typeof newStoreZodSchema>) {
    console.log(values);
    addStoreMutate({
      body: values,
    });
  }

  return (
    <>
      {!authLoading && !userId && null}
      {(isLoading || authLoading) && <Loader />}
      {error && <div>Failed to load stores {error.status}</div>}
      {stores && (
        <Dialog open={showNewStoreDialog} onOpenChange={setShowNewStoreDialog}>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                aria-label="Select a store"
                className={cn("w-[200px] justify-between", className)}
              >
                <Avatar className="mr-2 h-5 w-5">
                  <AvatarImage
                    src={`https://avatar.vercel.sh/${
                      selectedStore?.id ?? ""
                    }.png`}
                    className="grayscale"
                  />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                {selectedStore?.name}
                <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandList>
                  <CommandInput placeholder="Search store..." />
                  <CommandEmpty>No store found.</CommandEmpty>
                  {stores.body?.map((store) => (
                    <CommandItem
                      key={store.username}
                      onSelect={() => {
                        setSelectedStore(store);
                        setOpen(false);
                      }}
                      className="text-sm"
                    >
                      <Avatar className="mr-2 h-5 w-5">
                        <AvatarImage
                          src={`https://avatar.vercel.sh/${
                            selectedStore?.id ?? ""
                          }.png`}
                          alt={store.name}
                          className="grayscale"
                        />
                        <AvatarFallback>SC</AvatarFallback>
                      </Avatar>
                      {store.name}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedStore?.name === store.name
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandList>
                <CommandSeparator />
                <CommandList>
                  <CommandGroup>
                    <DialogTrigger asChild>
                      <CommandItem
                        onSelect={() => {
                          setOpen(false);
                          setShowNewStoreDialog(true);
                        }}
                      >
                        <PlusCircledIcon className="mr-2 h-5 w-5" />
                        Add Store
                      </CommandItem>
                    </DialogTrigger>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Store</DialogTitle>
              <DialogDescription>
                Add a new store to your account.
              </DialogDescription>
            </DialogHeader>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <div className="space-y-4 py-2 pb-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Store Name</FormLabel>
                          <FormDescription>
                            This is your publically displayed name on the
                            website.
                          </FormDescription>
                          <FormControl>
                            <Input {...field} placeholder="XYZ Clothing" />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Store Username</FormLabel>
                          <FormDescription>
                            Please enter the instagram username of your store.
                          </FormDescription>
                          <FormControl>
                            <Input {...field} placeholder="@xyz_clothing" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="instagram_token"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Instagram Token</FormLabel>
                          <FormDescription>
                            For testing purposes, please enter your instagram
                            token.
                          </FormDescription>
                          <FormControl>
                            <Input {...field} placeholder="IGXX...." />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col space-y-2">
                      <Label htmlFor="plan" clasName="mb-2">
                        Instagram Login
                      </Label>
                      <Button disabled={true} className="w-fit">
                        <span className="pr-3">
                          <InstagramIcon />
                        </span>
                        Login with Instagram
                      </Button>
                    </div>
                    <div className="flex items-center justify-end space-x-2 pt-3">
                      <Button
                        variant="outline"
                        onClick={() => setShowNewStoreDialog(false)}
                      >
                        Cancel
                      </Button>
                      <LoadingButton disabled={isAddingOrder} type="submit">
                        Continue
                      </LoadingButton>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
            <DialogFooter></DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
