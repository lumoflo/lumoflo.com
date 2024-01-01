import { auth, currentUser, useAuth, useSession } from "@clerk/nextjs";
import useSWR from "swr";

import { env } from "../env.mjs";

const baseUrl =
  env.ENV === "dev" ? "http://localhost:3002" : "https://lumoflo.xyz";

export default function useGetData({
  url,
  payload,
  options = {},
}: {
  url: string;
  payload?: any;
  options?: any;
}): {
  data: any;
  isLoading: boolean;
  error: any;
  mutate: (data: any, shouldRevalidate?: boolean | undefined) => Promise<any>;
  isValidating: boolean;
} {
  const mainUrl = baseUrl + URL;
  const method = payload ? "POST" : "GET";
  const { getToken } = auth();

  const fetcher = async () => {
    const headers = {
      Authorization: `Bearer ${await getToken()}`,
    };
    const requestOptions: RequestInit = {
      method,
      headers,
      ...(payload && { body: JSON.stringify(payload) }),
    };

    const response = await fetch(mainUrl, requestOptions);
    return response.json();
  };
  const defaultOptions = {
    // revalidateIfStale: false,
    // revalidateOnFocus: false,
    // revalidateOnReconnect: false,
  };
  const { data, mutate, error, isValidating, isLoading } = useSWR(
    url + method,
    fetcher,
    {
      ...defaultOptions,
      ...options,
    },
  );
  return { data, isLoading, error, mutate, isValidating };
}
