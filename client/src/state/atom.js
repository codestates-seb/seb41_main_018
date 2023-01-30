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

export const AddedLikeState = atom({
    key: "AddedLikeState",
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

export const getRefresh = atom({
    key: "getRefresh",
    default: "",
});

export const ContentDetail = atom({
    key: "ContentDetail",
    default: {},
});

export const TabIndex = atom({
    key: "TabIndex",
    default: 0,
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
        themeType: "DOMESTIC",
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

export const TitleData = atom({
    key: "TitleData",
    default: "",
});

export const DateData = atom({
    key: "DateData",
    default: "",
});

export const detailPosition = atom({
    key: "detailPosition",
    default: 1,
});

export const detailPositionTwo = atom({
    key: "detailPositionTwo",
    default: 2,
});

export const detailPositionThree = atom({
    key: "detailPositionThree",
    default: 3,
});
export const detailPositionFour = atom({
    key: "detailPositionFour",
    default: 4,
});
export const detailPositionFive = atom({
    key: "detailPositionFive",
    default: 5,
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
    default: '',
    effects_UNSTABLE: [persistAtom],
})

export const DetailuserIdState = atom({
    key: "DetailuserIdState",
    default: '',
    effects_UNSTABLE: [persistAtom],
})

export const DetailTitleState = atom({
    key: "DetailTitleState",
    default: '',
    effects_UNSTABLE: [persistAtom],
})

export const DetailThemeTypeState = atom({
    key: "DetailThemeTypeState",
    default: '',
    effects_UNSTABLE: [persistAtom],
})

export const DetailTagState = atom({
    key: "DetailTagState",
    default: '',
    effects_UNSTABLE: [persistAtom],
})

export const DetailTravelDateState = atom({
    key: "TravelDateState",
    default: '',
    effects_UNSTABLE: [persistAtom],
})

export const DetailRouteState = atom({
    key: "DetailRouteState",
    default: '',
    effects_UNSTABLE: [persistAtom],
})
