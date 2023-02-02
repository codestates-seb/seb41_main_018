import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userInfoState = atom({
    key: "userInfoState",
    default: {},
    effects_UNSTABLE: [persistAtom],
});

export const loginState = atom({
    key: "loginState",
    default: false,
    effects_UNSTABLE: [persistAtom],
});

export const ContentsList = atom({
    key: "ContentsList",
    default: [],
    effects_UNSTABLE: [persistAtom],
});

export const selectedRouteState = atom({
    key: "selectedRouteState",
    default: 1,
});

export const addBtnClickState = atom({
    key: "addBtnClickState",
    default: 1,
});

export const getAuthorization = atom({
    key: "getAuthorization",
    default: "",
});

export const ContentDetail = atom({
    key: "ContentDetail",
    default: {},
});

export const ReviewListState = atom({
    key: "ReviewListState",
    default: [],
});

export const CategorySearchResultState = atom({
    key: "CategorySearchResultState",
    default: [],
});

export const KeywordFilterResultState = atom({
    key: "KeywordFilterResultState",
    default: [],
});

export const SearchKeywordState = atom({
    key: "SearchKeywordState",
    default: "",
});

export const TagsStringState = atom({
    key: "TagsStringState",
    default: "",
});

export const DetailContentIdState = atom({
    key: "DetailContentId",
    default: "",
    effects_UNSTABLE: [persistAtom],
});

export const DetailuserIdState = atom({
    key: "DetailuserIdState",
    default: "",
    effects_UNSTABLE: [persistAtom],
});

export const DetailTitleState = atom({
    key: "DetailTitleState",
    default: "",
    effects_UNSTABLE: [persistAtom],
});

export const DetailThemeTypeState = atom({
    key: "DetailThemeTypeState",
    default: "",
    effects_UNSTABLE: [persistAtom],
});

export const DetailTagState = atom({
    key: "DetailTagState",
    default: "",
    effects_UNSTABLE: [persistAtom],
});

export const DetailTravelDateState = atom({
    key: "TravelDateState",
    default: "",
    effects_UNSTABLE: [persistAtom],
});

export const DetailRouteState = atom({
    key: "DetailRouteState",
    default: "",
    effects_UNSTABLE: [persistAtom],
});
