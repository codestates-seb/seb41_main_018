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

import NewPost from "./PostPage/NewPost";


import ImgUpload from "../components/Post_components/ImgUpload";

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
        <div css={container}>
            <NewPost />
        </div>
    );
};

const container = css`
    justify-content: center;
    align-items: center;
    width: 1500px;
    border-radius: ${PALETTE.border_radius};
    box-shadow: 2px 2px 10px 2px rgb(0, 0, 0, 0.2);
    margin: auto;
    margin-top: 50px;
    padding: 20px;
`;
export default Post;
