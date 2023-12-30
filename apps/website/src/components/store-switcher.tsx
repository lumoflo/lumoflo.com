"use client";

import * as React from "react";
import { useAuth } from "@clerk/nextjs";
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";
import { useAtom } from "jotai";
import { toast } from "sonner";
import useSWR, { Fetcher } from "swr";

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
  Input,
  Label,
  Loader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@lumoflo/ui";
import { cn } from "@lumoflo/utils";

import { selectedStoreAtom } from "~/lib/store";
import { Store } from "~/types/app-types";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {}
const baseUrl = "http://localhost:3002";

export const StoreSwitcher = ({ className }: StoreSwitcherProps) => {
  const { getToken, userId } = useAuth();
  const fetcher: Fetcher<Store[], string> = async () => {
    const token = await getToken();
    console.log(`${baseUrl}/users/${userId}/stores`);
    return fetch(`${baseUrl}/users/${userId}/stores`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => res.json());
  };

  const {
    data: stores,
    error,
    isLoading,
  } = useSWR(userId ? "stores" : null, fetcher);

  const [open, setOpen] = React.useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);
  const [selectedStore, setSelectedStore] = useAtom(selectedStoreAtom);

  //if there is no selected store, select the first one
  React.useEffect(() => {
    if (stores && !selectedStore && stores[0]) {
      setSelectedStore(stores[0]);
    }
  }, [stores, selectedStore, setSelectedStore]);

  return (
    <>
      {isLoading && <Loader />}
      {error && <div>Failed to load stores {error.message}</div>}
      {stores && (
        <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                aria-label="Select a team"
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
                  <CommandInput placeholder="Search team..." />
                  <CommandEmpty>No team found.</CommandEmpty>
                  {stores?.map((store) => (
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
                          setShowNewTeamDialog(true);
                        }}
                      >
                        <PlusCircledIcon className="mr-2 h-5 w-5" />
                        Create Team
                      </CommandItem>
                    </DialogTrigger>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create team</DialogTitle>
              <DialogDescription>
                Add a new team to manage products and customers.
              </DialogDescription>
            </DialogHeader>
            <div>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Team name</Label>
                  <Input id="name" placeholder="Acme Inc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plan">Subscription plan</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="free">
                        <span className="font-medium">Free</span> -{" "}
                        <span className="text-muted-foreground">
                          Trial for two weeks
                        </span>
                      </SelectItem>
                      <SelectItem value="pro">
                        <span className="font-medium">Pro</span> -{" "}
                        <span className="text-muted-foreground">
                          $9/month per user
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowNewTeamDialog(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Continue</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
