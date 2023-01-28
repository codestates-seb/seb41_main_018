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

export const CategoryData = atom({
    key: "CategoryData",
    default: "",
});

export const xPosition = atom({
    key: "xPosition",
    default: 37.365264512305174,
})

export const xPositionTwo = atom({
    key: "xPositionTwo",
    default: 37.365264512305174,
})

export const xPositionThree = atom({
    key: "xPositionThree",
    default: 37.365264512305174,
})

export const xPositionFour = atom({
    key: "xPositionFour",
    default: 37.365264512305174,
})

export const xPositionFive = atom({
    key: "xPositionFive",
    default: 37.365264512305174,
})

export const yPosition = atom ({
    key: "yPosition",
    default: 127.10676860117488,
})

export const yPositionTwo = atom ({
    key: "yPositionTwo",
    default: 127.10676860117488,
})

export const yPositionThree = atom ({
    key: "yPositionThree",
    default: 127.10676860117488,
})

export const yPositionFour = atom ({
    key: "yPositionFour",
    default: 127.10676860117488,
})

export const yPositionFive = atom ({
    key: "yPositionFive",
    default: 127.10676860117488,
})

export const detailPosition = atom({
    key: "detailPosition",
    default: 1,
})

export const detailPositionTwo = atom({
    key: "detailPositionTwo",
    default: 2,
})
export const detailPositionThree = atom({
    key: "detailPositionThree",
    default: 3,
})
export const detailPositionFour = atom({
    key: "detailPositionFour",
    default: 4,
})
export const detailPositionFive = atom({
    key: "detailPositionFive",
    default: 5,
})

