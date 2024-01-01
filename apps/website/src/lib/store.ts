import { Provider, atom } from "jotai";

import { Store } from "~/types/app-types";

const selectedStoreAtom = atom<Store | null>(null);
export { selectedStoreAtom, Provider };
