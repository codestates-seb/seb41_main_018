import React from "react";
import { useState, useRef, useEffect } from "react";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import PostformItems from "../components/Post_components/PostformItems";
import TitleCard from "../components/TitleCard";
import Button from "../components/Button";
import Tag from "../components/Post_components/Tag";
import Map from "./PostPage/Map";
import { PALETTE } from "../Common";
import { AddRoute } from "../util/UseForm";

import { FiShare } from "react-icons/fi";
import { BsFillHeartFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

import { PostFormData } from "../state/atom";
import { useRecoilState } from "recoil";
import axios from "axios";

const Post = () => {
    const [postFormData, setPostFormData] = useRecoilState(PostFormData);
    const defaultValues = {
        title: "자동차",
        body: "강남역",
    };

    /*  console.log(`postFormData`, data); */

    const putdate = async () => {
        const JsonData = JSON.stringify(postFormData);
        await axios
            .post("/post", JsonData, {
                headers: {
                    "Content-Type": `application/json`,
                },
            })
            .then((res) => {
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
                alert("error");
            });
    };
    // const putdate = async () => {
    //     await axios
    //         .post("/post", JsonData, {
    //             headers: {
    //                 "Content-Type": `application/json`,
    //             },
    //         })
    //         .then((res) => {
    //             navigate("/");
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             alert("error");
    //         });
    // };

    return (
        <>
            <>
                <div css={container}>
                    <TitleCard />
                    <AddRoute />
                    <Tag />
                </div>
                <div
                    css={css`
                        display: flex;
                    `}
                >
                    <Button
                        width="23.5vw"
                        minWidth="240px"
                        maxWidth="340px"
                        height="50px"
                        margin="10px 10px 10px 40px"
                        bgImg="linear-gradient(15deg, #008080 0%, #00AEAE 100%)"
                        text={[
                            <BsFillHeartFill
                                css={css`
                                    position: relative;
                                    top: 5px;
                                    right: 10px;
                                `}
                            />,
                            "작성완료!",
                        ]}
                        ftweight="700"
                        ftsize="1.4rem"
                        color="white"
                        /* onClick={putdata} */
                    />
                    <Button
                        width="5vw"
                        minWidth="50px"
                        maxWidth="100px"
                        height="50px"
                        margin="10px 5px"
                        color="white"
                        ftsize="1.4rem"
                        ftweight="700"
                        bgImg="linear-gradient(15deg, #008080 0%, #00AEAE 100%)"
                        text=<FiShare />
                    />
                </div>
            </>
        </>
    );
};

const container = css`
    width: 90vw;
    border-radius: ${PALETTE.border_radius};
    box-shadow: 2px 2px 10px 2px rgb(0, 0, 0, 0.2);
    margin: 10px auto;
    padding: 20px;
`;
export default Post;
