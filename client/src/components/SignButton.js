/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

const SignButton = (props) => {
    console.log(props);
    return (
        <button
            css={css`
                border: solid 2px #055e8e;
                background-color: white;
                border-radius: 5px;
                width: ${props.width};
                height: 60px;
                margin: 10px;
                &:hover {
                    background-color: #eee;
                    border: solid 2px #003f62;
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
    color: #055e8e;
    &:hover {
        color: #003f62;
    }
`;
