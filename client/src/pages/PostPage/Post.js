import React from "react";
import Postform from "../../components/Post_components/Postform";
import TitleCard from "../../components/TitleCard";
import Map from "./searchMap";

const Post = () => {
    return (
        <>
            <Map />
            <Postform />
            <TitleCard />
        </>
    );
};

export default Post;
