import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { BsPlusCircleFill } from "react-icons/bs";
import { IoMdRemove } from "react-icons/io";

import { PALETTE } from "../../Common";

import { useForm, FormProvider, useFormContext, Controller, useFieldArray } from "react-hook-form";

import Tag from "../../components/Post_components/Tag";

import PostMap from "./PostMap/PostMap";
import PostMapTwo from "./PostMap/PostMapTwo";
import PostMapThree from "./PostMap/PostMapThree";
import PostMapFour from "./PostMap/PostMapFour";
import PostMapFive from "./PostMap/PostMapFive";

import ImgUpload from "../../components/Post_components/ImgUpload";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useRecoilState } from "recoil";
import {
    TagsStringState,
    DetailContentIdState,
    DetailuserIdState,
    DetailTitleState,
    DetailThemeTypeState,
    DetailTagState,
    DetailTravelDateState,
    DetailRouteState,
} from "../../state/atom";
import { patchContent } from "../../util/axiosContents";

import dayjs from "dayjs";

let defaultValues = {
    title: "",
    themeType: "DOMESTIC",
    travelDate: "",
    routes: [{}],
};

const AddInput = () => {
    const [fieldIndex, setFieldIndex] = useState(0);

    const [DetailRoute, setDetailRoute] = useRecoilState(DetailRouteState);

    const { control, register, watch, setValue } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "routes",
    });

    defaultValues = {
        title: "",
        themeType: "DOMESTIC",
        travelDate: new Date(),
        routes: [{}],
    };

    const MapList = (index) => {
        if (index === 0) {
            return <PostMap placeword={place1.current} index={index} setValue={setValue} />;
        } else if (index === 1) {
            return <PostMapTwo placeword={place2.current} index={index} setValue={setValue} />;
        } else if (index === 2) {
            return <PostMapThree placeword={place3.current} index={index} setValue={setValue} />;
        } else if (index === 3) {
            return <PostMapFour placeword={place4.current} index={index} setValue={setValue} />;
        } else if (index === 4) {
            return <PostMapFive placeword={place5.current} index={index} setValue={setValue} />;
        }
    };

    const place1 = useRef();
    place1.current = watch(`routes.${0}.place`);

    const place2 = useRef();
    place2.current = watch(`routes.${1}.place`);

    const place3 = useRef();
    place3.current = watch(`routes.${2}.place`);

    const place4 = useRef();
    place4.current = watch(`routes.${3}.place`);

    const place5 = useRef();
    place5.current = watch(`routes.${4}.place`);

    const indexNum = useRef();
    indexNum.current = watch(`routes.${1}.place`);

    return (
        <ul css={FormContainer}>
            {fields.map((item, index) =>
                index < 5 ? (
                    <form>
                        <li
                            key={item.id}
                            css={css`
                                display: flex;
                            `}
                        >
                            <div css={FieldContainer}>
                                <div css={MapStyle}>
                                    {MapList(index, watch(`routes.${index}.place`))}
                                </div>
                                <div css={RouteForm}>
                                    <div
                                        css={css`
                                            display: flex;
                                        `}
                                    >
                                        <div className="listname">주소</div>
                                        <div css={PlaceInputContainer}>
                                            <Controller
                                                control={control}
                                                name={`routes.${index}.place`}
                                                render={({ field }) => {
                                                    return (
                                                        <input
                                                            {...field}
                                                            defaultValue={
                                                                DetailRoute[index] === {}
                                                                    ? Object.values(
                                                                          DetailRoute[index]
                                                                      )[4]
                                                                    : ""
                                                            }
                                                            placeholder="장소를 입력해주세요"
                                                            css={PlaceInput}
                                                            autocomplete="off"
                                                        />
                                                    );
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="listcontainer">
                                        <div className="listname"></div>
                                        <input
                                            {...register(`routes.${index}.address`)}
                                            defaultValue={
                                                DetailRoute[index] === {}
                                                    ? Object.values(DetailRoute[index])[8]
                                                    : ""
                                            }
                                            placeholder="지도에서 장소를 선택해주세요!"
                                            css={ListInput}
                                            readOnly
                                        />
                                        <input
                                            {...register(`routes.${index}.x`)}
                                            defaultValue={
                                                DetailRoute[index] === {}
                                                    ? Object.values(DetailRoute[index])[6]
                                                    : ""
                                            }
                                            css={css`
                                                display: none;
                                            `}
                                        />
                                        <input
                                            {...register(`routes.${index}.y`)}
                                            defaultValue={
                                                DetailRoute[index] === {}
                                                    ? Object.values(DetailRoute[index])[7]
                                                    : ""
                                            }
                                            css={css`
                                                display: none;
                                            `}
                                        />
                                    </div>
                                    <div className="listcontainer">
                                        <div className="listname">경비</div>
                                        <Controller
                                            control={control}
                                            name={`routes.${index}.price`}
                                            render={({ field }) => {
                                                return (
                                                    <input
                                                        {...field}
                                                        defaultValue={
                                                            DetailRoute[index] === {}
                                                                ? Object.values(
                                                                      DetailRoute[index]
                                                                  )[2]
                                                                : ""
                                                        }
                                                        type="number"
                                                        placeholder="사용한 금액을 입력해주세요!"
                                                        autocomplete="off"
                                                        step="1000"
                                                        css={ListInput}
                                                    />
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className="listcontainer">
                                        <div className="listname">이동 수단</div>
                                        <Controller
                                            control={control}
                                            name={`routes.${index}.vehicle`}
                                            render={({ field }) => {
                                                return (
                                                    <input
                                                        {...field}
                                                        defaultValue={
                                                            DetailRoute[index] === {}
                                                                ? Object.values(
                                                                      DetailRoute[index]
                                                                  )[3]
                                                                : ""
                                                        }
                                                        placeholder="이동수단을 입력해주세요!"
                                                        autocomplete="off"
                                                        css={ListInput}
                                                    />
                                                );
                                            }}
                                        />
                                    </div>
                                    <div className="bodycontainer">
                                        <div className="listname">상세 설명</div>
                                        <Controller
                                            control={control}
                                            name={`routes.${index}.body`}
                                            render={({ field }) => {
                                                return (
                                                    <textarea
                                                        {...field}
                                                        defaultValue={
                                                            DetailRoute[index] === {}
                                                                ? Object.values(
                                                                      DetailRoute[index]
                                                                  )[3]
                                                                : ""
                                                        }
                                                        placeholder="후기를 적어주세요!"
                                                        autocomplete="off"
                                                        css={BodyInput}
                                                    />
                                                );
                                            }}
                                        />
                                    </div>
                                    <ImgUpload
                                        index={index}
                                        setValue={setValue}
                                        value={watch(`routes.${index}.image`)}
                                    />
                                    <input
                                        {...register(`routes.${index}.image`)}
                                        name="image"
                                        css={css`
                                            display: none;
                                        `}
                                    />
                                </div>
                            </div>
                            <button type="button" onClick={() => remove(index)} css={DeleteButton}>
                                <IoMdRemove size="30" />
                            </button>
                        </li>
                    </form>
                ) : (
                    <></>
                )
            )}
            {fieldIndex < 4 ? (
                <button
                    type="button"
                    onClick={() => {
                        append();
                        setFieldIndex(fieldIndex + 1);
                    }}
                    css={AppendButton}
                >
                    <BsPlusCircleFill size="20" />
                    Add Route
                </button>
            ) : (
                <></>
            )}
        </ul>
    );
};

const Title = () => {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name="title"
            render={({ field }) => {
                return (
                    <input
                        css={TitleInput}
                        onChange={field.onChange}
                        value={field.value}
                        placeholder="제목을 입력해주세요."
                        autocomplete="off"
                    ></input>
                );
            }}
        />
    );
};

const Category = () => {
    const { control } = useFormContext();

    const [DetailThemeType, setDetailThemeType] = useRecoilState(DetailThemeTypeState);

    const options = [
        { value: "DOMESTIC", label: "국내여행" },
        { value: "ABROAD", label: "해외여행" },
        { value: "FAMILY", label: "가족여행" },
        { value: "COUPLE", label: "커플여행" },
        { value: "FRIENDS", label: "친구여행" },
        { value: "ALONE", label: "혼자여행" },
        { value: "CAFE", label: "카페투어" },
        { value: "FOOD", label: "맛집투어" },
    ];

    return (
        <Controller
            control={control}
            name="themeType"
            render={({ field: { onChange, value } }) => {
                return (
                    <div css={TitleSmallContainer}>
                        <div css={CategoryTitle}>카테고리</div>
                        <div css={CategoryInput}>
                            <Dropdown
                                options={options}
                                value={DetailThemeType}
                                placeholder="국내여행"
                                onChange={(option) => {
                                    onChange(option.value);
                                }}
                            />
                        </div>
                    </div>
                );
            }}
        />
    );
};

const TravelDate = () => {
    const { control } = useFormContext();

    const [DetailTravelDate, setDetailTravelDate] = useRecoilState(DetailTravelDateState);

    return (
        <Controller
            control={control}
            name="travelDate"
            render={({ field: { onChange, value } }) => {
                return (
                    <div css={TitleSmallContainer}>
                        <div css={TravelDateTitle}>여행일</div>
                        <div css={TravelDateInput}>
                            <DatePicker
                                value={
                                    value === undefined
                                        ? dayjs(DetailTravelDate).format("MM/DD/YYYY")
                                        : value
                                }
                                selected={value}
                                onChange={(date) => onChange(date)}
                            />
                        </div>
                    </div>
                );
            }}
        />
    );
};

const Edit = () => {
    const navigate = useNavigate();

    const [tagsStr, setTagsStr] = useRecoilState(TagsStringState);
    const [DetailContentId, setDetailContentId] = useRecoilState(DetailContentIdState);
    const [DetailuserId, setDetailuserId] = useRecoilState(DetailuserIdState);
    const [DetailTitle, setDetailTitle] = useRecoilState(DetailTitleState);
    const [DetailThemeType, setDetailThemeType] = useRecoilState(DetailThemeTypeState);
    const [DetailTag, setDetailTag] = useRecoilState(DetailTagState);
    const [DetailTravelDate, setDetailTravelDate] = useRecoilState(DetailTravelDateState);
    const [DetailRoute, setDetailRoute] = useRecoilState(DetailRouteState);

    const methods = useForm({
        defaultValues: {
            contentId: DetailContentId,
            routes: DetailRoute,
            title: DetailTitle,
            themeType: DetailThemeType,
            userId: DetailuserId,
            travelDate: new Date(DetailTravelDate),
        },
    });

    const { handleSubmit } = methods;

    const submit = async (data) => {
        data.tag = tagsStr;
        for (let obj of data && data.routes) {
            delete obj.image;
        }
        patchContent(data).then((res) => {
            if (res) {
                navigate("/");
            }
        });
    };

    return (
        <FormProvider {...methods}>
            <div css={providerWrap}>
                <div css={TitleContainer}>
                    <Title />
                </div>
                <div css={TitleContainer}>
                    <Category />
                    <TravelDate />
                </div>
            </div>

            <div css={FormWrap}>
                <AddInput />

                <div css={TagStyle}>
                    <Tag detailTags={DetailTag} />
                </div>
                <button type="button" onClick={() => handleSubmit(submit)()} css={SubmitButton}>
                    작성완료
                </button>
            </div>
        </FormProvider>
    );
};

const providerWrap = css`
    display: flex;
    flex-direction: column;
    margin: 30px auto 0;
    width: 90vw;
    @media (min-width: 768px) {
        flex-direction: row;
        margin: 30px auto 0;
        width: 90vw;
    }
`;
const FormWrap = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px auto;
    width: 90vw;
`;

const TitleContainer = css`
    display: flex;
    width: 100%;
    margin-top: 10px;
    @media (min-width: 768px) {
        align-items: center;
        justify-content: center;
        margin: 20px 0 0 0;
    }
`;
const FormContainer = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding-left: 30px;
`;

const FieldContainer = css`
    display: flex;
    margin: 10px 0;
    width: 90vw;
    height: 100%;
    flex-direction: column;
    border: ${PALETTE.border};
    border-radius: ${PALETTE.border_radius};
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    @media (min-width: 768px) {
        flex-direction: row;
        height: 550px;
    }
`;

const TitleSmallContainer = css`
    display: flex;
    align-items: center;
    font-size: 0.975rem;
    margin-right: 10px;
`;

const TitleInput = css`
    width: 55.5vw;
    height: 40px;
    padding: 10px;
    font-size: 0.975rem;
    border: ${PALETTE.border};
    border-radius: ${PALETTE.border_radius};
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    @media (min-width: 768px) {
        width: 45vw;
    }
`;

const CategoryTitle = css`
    display: none;
    min-width: 70px;
    padding: 0 20px 0 40px;
    font-weight: bold;
    color: #ff6e30;
`;

const CategoryInput = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 27vw;
    font-size: 0.975rem;
    text-align: center;
    border-radius: ${PALETTE.border_radius};
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    @media (min-width: 768px) {
        width: 20vw;
    }
`;

const TravelDateTitle = css`
    display: none;
    min-width: 70px;
    padding: 0 20px 0 90px;
    font-weight: bold;
    color: #ff6e30;
`;

const TravelDateInput = css`
    input {
        padding: 10px;
        height: 40px;
        width: 27vw;
        font-size: 0.975rem;
        text-align: center;
        border: ${PALETTE.border};
        border-radius: ${PALETTE.border_radius};
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        @media (min-width: 768px) {
            width: 20vw;
        }
    }

    .react-datepicker-popper {
        z-index: 3;
    }

    .react-datepicker__header {
        background-color: #eff5f5;
    }

    .react-datepicker__day--selected {
        background-color: #497174;
    }
`;

const PlaceInputContainer = css`
    width: 35vw;
    margin-bottom: 10px;

    @media (min-width: 768px) {
        width: 20vw;
    }
    ::placeholder {
        font-size: 0.475rem;
    }
`;

const PlaceInput = css`
    background-color: rgba(0, 0, 0, 0);
    font-size: 0.975rem;
    border: ${PALETTE.border};
    border-radius: ${PALETTE.border_radius};
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    padding: 15px;
    width: 60vw;
    height: 40px;
    z-index: 2;
    @media (min-width: 768px) {
        width: 25vw;
    }
`;

const RouteForm = css`
    display: flex;
    flex-direction: column;
    height: 510px;
    margin: 50px auto;

    @media (min-width: 768px) {
        position: absolute;
        right: 7vw;
        width: 40vw;
    }
    @media (min-width: 1200px) {
        position: absolute;
        right: 7vw;
        width: 35vw;
    }

    .listcontainer {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        @media (min-width: 768px) {
            width: 100%;
        }
    }

    .bodycontainer {
        display: flex;
        margin-bottom: 10px;
    }

    .listname {
        width: 80px;
        font-size: 1rem;
        margin: 10px;
    }
`;

const ListInput = css`
    width: 60vw;
    height: 40px;
    padding: 15px;
    font-size: 1rem;
    border: ${PALETTE.border};
    border-radius: ${PALETTE.border_radius};
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    @media (min-width: 768px) {
        width: 25vw;
    }
`;

const BodyInput = css`
    padding: 10px;
    border: none;
    font-size: 1rem;
    width: 60vw;
    height: 170px;
    resize: none;
    border: ${PALETTE.border};
    border-radius: ${PALETTE.border_radius};
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    @media (min-width: 768px) {
        width: 25vw;
    }
`;

const MapStyle = css`
    margin: 20px auto;
`;

const AppendButton = css`
    display: flex;
    align-items: cetner;
    justify-content: space-between;
    width: 145px;
    margin: 20px auto;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    position: relative;
    border-radius: 50px;
    color: white;
    cursor: pointer;
    /* background: #00f0b5; */
    background: ${PALETTE.default_color};
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    &:hover {
        transform: scale(1.1, 1.1);
        text-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        transform: translateY(-3px);
        color: ${PALETTE.white};
        transition-duration: 250ms;
    }
`;

const DeleteButton = css`
    position: relative;
    right: 40px;
    top: 20px;
    height: 30px;
    border: none;
    cursor: pointer;
    background-color: #ffffff;

    svg {
        background-color: #ffffff;
    }
`;

const SubmitButton = css`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 90vw;
    height: 50px;

    background: ${PALETTE.default_color};
    border-radius: 5px;
    border: ${PALETTE.default_color};
    color: white;

    transition: all 0.2s;

    cursor: pointer;

    &:hover {
        text-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        color: ${PALETTE.white};
    }
`;

const TagStyle = css`
    display: flex;
    width: 100%;
    margin-top: 10px;
    @media (min-width: 768px) {
        align-items: center;
        justify-content: start;
        margin-left: 40px;
    }
`;
export default Edit;
