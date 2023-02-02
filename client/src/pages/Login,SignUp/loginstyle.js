/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

export const LoginpageBg = css`
    overflow: auto;
    width: 100%;
    height: 100%;
`;

export const LoginpageContainer = css`
    display: flex;
    flex-direction: column;
    width: 60vw;
    min-width: 370px;
    max-width: 600px;
    margin: 15px auto;
`;

export const LoginLogoContainer = css`
    padding: 20px 0;

    a {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    img {
        width: 200px;
        height: 120px;
    }
`;

export const LoginContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 70px 20px;
    border-radius: 10px;
    background: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    small {
        color: rgba(248, 112, 112, 1);
        margin-bottom: 30px;
        font-size: 15px;
    }
`;

export const LoginLabelBox = css`
    width: 80%;
    margin: 10px;
    font-size: 1.1rem;
`;

export const LoginInputBox = css`
    width: 80%;
    height: 30px;
    font-size: 1rem;
    margin-bottom: 20px;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    outline: none;
`;
