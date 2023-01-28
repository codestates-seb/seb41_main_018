import React, { useRef } from "react";

import axios from "axios";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import { BsPlusCircleFill } from "react-icons/bs";
import { RiDeleteBin5Fill } from "react-icons/ri";

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
    detailPosition,
    detailPositionTwo,
    detailPositionThree,
    detailPositionFour,
    detailPositionFive,
} from "../../state/atom";

const defaultValues = {
    title: "",
    themeType: "DOMESTIC",
    travelDate: new Date(),
    routes: [{}],
};

const AddInput = () => {
    const { control, register, watch, setValue } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "routes",
    });

    const [dpo, setDpo] = useRecoilState(detailPosition);
    const [dpo1, setDpo1] = useRecoilState(detailPositionTwo);
    const [dpo2, setDpo2] = useRecoilState(detailPositionThree);
    const [dpo3, setDpo3] = useRecoilState(detailPositionFour);
    const [dpo4, setDpo4] = useRecoilState(detailPositionFive);

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

    // console.log(watch(`routes.[${0}].place`))

    return (
        <ul css={FormContainer}>
            {fields.map((item, index) => (
                <form>
                    <div css={PlaceInputContainer}>
                        <Controller
                            control={control}
                            name={`routes.${index}.place`}
                            render={({ field }) => {
                                console.log("", field);
                                return (
                                    <input
                                        {...field}
                                        placeholder="장소를 입력해주세요"
                                        css={PlaceInput}
                                        autocomplete="off"
                                    />
                                );
                            }}
                        />
                    </div>
                    <li
                        key={item.id}
                        css={css`
                            display: flex;
                        `}
                    >
                        <div css={FieldContainer}>
                            <div css={RouteForm}>
                                <div className="listcontainer">
                                    <div className="listname">주소</div>
                                    <input
                                        {...register(`routes.${index}.address`)}
                                        css={ListInput}
                                        placeholder="지도목록을 선택해주세요"
                                        readOnly
                                    />
                                    <input
                                        {...register(`routes.${index}.x`)}
                                        css={css`
                                            display: none;
                                        `}
                                    />
                                    <input
                                        {...register(`routes.${index}.y`)}
                                        css={css`
                                            display: none;
                                        `}
                                    />
                                </div>
                                <div className="listcontainer">
                                    <div className="listname">경비</div>
                                    <input
                                        {...register(`routes.${index}.price`)}
                                        autocomplete="off"
                                        css={ListInput}
                                    />
                                </div>
                                <div className="listcontainer">
                                    <div className="listname">이동 수단</div>
                                    <input
                                        {...register(`routes.${index}.vehicle`)}
                                        autocomplete="off"
                                        css={ListInput}
                                    />
                                </div>
                                <div className="bodycontainer">
                                    <div className="listname">상세 설명</div>
                                    <textarea
                                        {...register(`routes.${index}.body`)}
                                        autocomplete="off"
                                        css={BodyInput}
                                        placeholder="후기를 적어주세요!"
                                    />
                                </div>
                                <ImgUpload id={index} />
                            </div>
                            <div css={MapStyle}>
                                {MapList(index, watch(`routes.${index}.place`))}
                            </div>
                        </div>
                        <button type="button" onClick={() => remove(index)} css={DeleteButton}>
                            <RiDeleteBin5Fill size="35" color="#497174" />
                        </button>
                    </li>
                </form>
            ))}
            <button
                type="button"
                onClick={() => {
                    append();
                }}
                css={AppendButton}
            >
                <BsPlusCircleFill size="35" color="#497174" />
            </button>
        </ul>
    );
};

const Title = () => {
    const { control } = useFormContext();

    // console.log("watch", watch("name"));

    return (
        <Controller
            control={control}
            name="title"
            render={({ field }) => {
                console.log(field);
                return (
                    <input
                        css={TitleInput}
                        onChange={field.onChange}
                        // onKeyUp={enterkey}
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
    const { control, watch } = useFormContext();

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

    console.log("watch", watch("themeType"));

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
                                value={options[0]}
                                placeholder="국내여행"
                                onChange={(option) => {
                                    // 1. 컴포넌트 동작 내에서 인풋의 값을 바꿔준다.
                                    // 2. 인자도 넘겨줌
                                    onChange(option.value);
                                }}
                            />
                        </div>
                        {console.log(value.value)}
                    </div>
                );
            }}
        />
    );
};

const TravelDate = () => {
    const { control } = useFormContext();

    return (
        <Controller
            control={control}
            name="travelDate"
            render={({ field: { onChange, value } }) => {
                return (
                    <div css={TitleSmallContainer}>
                        <div css={TravelDateTitle}>여행일</div>
                        <div css={TravelDateInput}>
                            <DatePicker selected={value} onChange={(date) => onChange(date)} />
                        </div>
                    </div>
                );
            }}
        />
    );
};

const NewPost = () => {
    const methods = useForm({ defaultValues });
    const { control, handleSubmit, watch } = methods;

    const submit = async (data) => {
        console.log(data);

        const jsonData = JSON.stringify(data);
        console.log(jsonData);

        await axios
            .post(
                "http://ec2-54-180-87-83.ap-northeast-2.compute.amazonaws.com:8080/contents",
                jsonData,
                {
                    headers: {
                        "Content-Type": `application/json`,
                        Authorization: sessionStorage.getItem("accessToken"),
                    },
                }
            )
            .then((res) => {
                navigate(`/`);
            })
            .catch((err) => {
                console.log(err);
                // alert('회원가입에 실패했습니다.');
            });
    };

    console.log(watch("routes"));
    return (
        <FormProvider {...methods}>
            <form
                css={css`
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                `}
            >
                <div css={TitleContainer}>
                    <Title />
                    <Category />
                    <TravelDate />
                </div>
                <AddInput />
                <div
                    css={css`
                        align-self: flex-start;
                        margin-left: 200px;
                    `}
                >
                    <Tag />
                </div>
                <button
                    type="button"
                    onClick={() => handleSubmit(submit, console.log)()}
                    css={SubmitButton}
                >
                    작성완료
                </button>
            </form>
        </FormProvider>
    );
};

const FormContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 30px;
`;

const TitleContainer = css`
    display: flex;
    height: 50px;
    margin: 20px 0;
`;

const TitleSmallContainer = css`
    display: flex;
    align-items: center;
    min-width: 200px;
    font-size: 1.1rem;
`;

const TitleInput = css`
    min-width: 400px;
    padding-left: 20px;
    font-size: 1.1rem;
    border: ${PALETTE.border};
    border-radius: ${PALETTE.border_radius};
    font-weight: bold;
    color: #497174;

    ::placeholder {
        font-weight: bold;
        color: #497174;
    }
`;

const CategoryTitle = css`
    min-width: 70px;
    padding: 0 20px 0 40px;
    font-weight: bold;
    color: #ff6e30;
`;

const CategoryInput = css`
    max-width: 10px;

    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 50px;
        min-width: 120px;
        font-size: 1.1rem;
        font-weight: bold;
        color: #497174;

        .Dropdown-menu {
            min-height: 220px;
            overflow-x: hidden;
        }

        .Dropdown-control {
            padding: 14px 52px 10px 15px;
        }

        .Dropdown-arrow {
            margin-top: 8px;
        }
    }
`;

const TravelDateTitle = css`
    min-width: 70px;
    padding: 0 20px 0 90px;
    font-weight: bold;
    color: #ff6e30;
`;

const TravelDateInput = css`
    input {
        padding: 10px;
        height: 50px;
        width: 130px;
        font-size: 1.1rem;
        border: ${PALETTE.border};
        border-radius: ${PALETTE.border_radius};
        font-weight: bold;
        color: #497174;
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
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 20px;
    background-color: #eff5f5;
    padding-left: 40px;
    margin: 10px 0 -10px 0;
    height: 50px;
    width: 1300px;
    z-index: 2;
`;

const PlaceInput = css`
    background-color: rgba(0, 0, 0, 0);
    border: none;
    font-weight: bold;
    font-size: 1rem;
    color: #497174;
    width: 100%;
    height: 40px;
    z-index: 2;

    ::placeholder {
        color: #497174;
    }
`;

const FieldContainer = css`
    display: flex;
    border: ${PALETTE.border};
    border-radius: ${PALETTE.border_radius};
    width: 1250px;
    height: 800px;
    margin: 0 20px 20px 20px;
`;

const RouteForm = css`
    display: flex;
    flex-direction: column;
    padding: 20px 30px 20px 20px;

    .listcontainer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    .bodycontainer {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    .listname {
        color: #ff6e30;
        padding: 0px 7px 0px 7px;
        text-align: center;
        font-weight: bold;
        font-size: 1rem;
        margin: 10px;
        width: max-content;
    }
`;

const ListInput = css`
    width: 250px;
    height: 40px;
    padding: 10px;
    border: none;
    border-bottom: solid 1px black;
    font-size: 1rem;
    font-weight: bold;
    color: #497174;

    ::placeholder {
        color: #497174;
    }
`;

const BodyInput = css`
    width: 250px !important;
    height: 100px !important;
    padding: 10px;
    border: none;
    font-size: 1rem;
    font-weight: bold;
    color: #497174;
    resize: none;

    ::placeholder {
        color: #497174;
    }
`;

const MapStyle = css`
    margin: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const AppendButton = css`
    border: none;
    margin-left: -30px;
    cursor: pointer;
    background-color: #fff;

    svg {
        background-color: #fff;
    }
`;

const DeleteButton = css`
    border: none;
    cursor: pointer;
    background-color: #fff;

    svg {
        background-color: #fff;
    }
`;

const SubmitButton = css`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 1200px;
    height: 50px;

    background-color: ${PALETTE.default_color};
    border-radius: 5px;
    border: ${PALETTE.border_default};
    color: ${PALETTE.text_default};

    transition: all 0.2s;

    cursor: pointer;

    /* &:hover {
        transform: scale(1.1, 1.1);
        -ms-transform: scale(1.1, 1.1);
        -webkit-transform: scale(1.1, 1.1);
        background-color: ${PALETTE.default_hover};
        color: ${PALETTE.white};
        transition-duration: 250ms;
    }

    &:active {
        background-color: rgba(251, 181, 181, 1);
    } */
`;
export default NewPost;
