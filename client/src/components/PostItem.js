/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { PALETTE } from "../Common";
import 경복궁 from "../assets/sampleImg/경복궁.png";

const PostItem = () => {
    return (
        <div>
            <div>
                <img
                    src={경복궁}
                    css={css`
                        width: 270px;
                        height: 340px;
                        margin: 10px 30px;
                        border-radius: ${PALETTE.border_radius};
                    `}
                />
            </div>
        </div>
    );
};

export default PostItem;
