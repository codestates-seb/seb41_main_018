import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PALETTE } from "../../Common";

const Footer = () => {
    return (
        <div
            css={css`
                height: 250px;
                width: 100%;
                background-color: ${PALETTE.gray};
            `}
        >
            Footer
        </div>
    );
};

export default Footer;
