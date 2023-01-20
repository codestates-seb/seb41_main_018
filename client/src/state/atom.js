import { atom } from "recoil";
/* import { recoilPersist } from "recoil-persist";*/

// const { persistAtom } = recoilPersist();

export const selectedRouteState = atom({
    key: "selectedRouteState",
    default: 1,
});

export const imgState = atom({
    key: "imgState",
    default: [],
    dangerouslyAllowMutability: true,
});
