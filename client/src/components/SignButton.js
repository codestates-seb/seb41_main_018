/** @jsxImportSource @emotion/react */
import React from "react";
import { PALETTE } from "../Common";
import { css } from "@emotion/react";

const SignButton = (props) => {
    return (
        <button
            css={css`
                background-color: white;
                color: ${props.color};
                border: solid 2px ${PALETTE.default_color};
                border-radius: 5px;
                width: ${props.width};
                height: ${props.height};
                margin: 10px;
                box-shadow: ${props.boxShadow};
                &:hover {
                    background-color: #eee;
                    border: solid 2px ${PALETTE.default_hover};
                    cursor: pointer;
                }
            `}
        >
            <div css={text}>{props.text}</div>
        </button>
    );
};

export default SignButton;

const text = css`
    font-size: 1rem;
    color: ${PALETTE.default_color};
    &:hover {
        color: ${PALETTE.default_hover};
    }
`;