/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { PALETTE } from "../Common";

const Banner = () => {
    return (
        <div
            css={css`
                margin: 0 auto;
                height: 300px;
                width: 90vw;
                background-color: red;
                border-radius: ${PALETTE.border_radius};
            `}
        ></div>
    );
};

export default Banner;
