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
});

export const addBtnClickState = atom({
    key: "addBtnClickState",
    default: 1,
});

export const getAuthorization = atom({
    key: "getAuthorization",
    default: "",
});

export const getRefresh = atom({
    key: "getRefresh",
    default: "",
});

export const ContentDetail = atom({
    key: "ContentDetail",
    default: {},
});

export const PostFormIndex = atom({
    key: "PostFormIndex",
    default: 0,
});

export const PostFormData = atom({
    key: "PostFormData",
    default: {
        title: "",
        body: "",
        themeType: "",
        date: new Date(),
        routeName: "",
        routes: [
            {
                price: Number(),
                vehicle: "",
                place: "",
                body: "",
                x: "",
                y: "",
            },
        ],
    },
});

export const PostFormData2 = atom({
    key: "PostFormData2",
    default: {
        title: "",
        body: "",
        themeType: "",
        date: new Date(),
        routeName: "",
        routes: [
            {
                price: Number(),
                vehicle: "",
                place: "",
                body: "",
                x: "",
                y: "",
            },
        ],
    },
});

export const CategoryData = atom({
    key: "CategoryData",
    default: "",
});
