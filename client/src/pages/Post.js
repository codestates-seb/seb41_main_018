import React from "react";
import { useState, useRef, useEffect } from "react";

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import PostformItems from "../components/Post_components/PostformItems";
import TitleCard from "../components/TitleCard";
import Button from "../components/Button";
import Tag from "../components/Post_components/Tag";
import Map from "./PostPage/searchMap";
import { PALETTE } from "../Common";
import { Route } from "../util/UseForm";

import { FiShare } from "react-icons/fi";
import { BsFillHeartFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

import axios from "axios";

const Post = () => {
    const defaultValues = {
        title: "자동차",
        body: "강남역",
    };

    const putdate = async () => {
        const jsonData = JSON.stringify(defaultValues);
        await axios
            .post(
                "http://ec2-54-180-87-83.ap-northeast-2.compute.amazonaws.com:8080/users",
                jsonData,
                {
                    headers: {
                        "Content-Type": `application/json`,
                    },
                }
            )
            .then((res) => {
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
                alert("error");
            });
    };

    return (
        <>
            <>
                <div css={container}>
                    <TitleCard />
                    <Route />
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
                        onClick={putdate}
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
