/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PALETTE } from "../../Common";

export const LoginpageBg = css`
    overflow: auto;

    width: 100vw;
    height: 100vh;
`;

export const LoginpageContainer = css`
    display: flex;
    flex-direction: column;
    width: 600px;
    margin: 100px auto;
`;

export const LoginLogoContainer = css`
    padding: 20px 0;

    a {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    img {
        width: 60%;
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
    height: 100%;
    width: 100%;

    small {
        color: rgba(248, 112, 112, 1);
        margin-bottom: 30px;
        font-size: 15px;
    }
`;

export const LoginLabelBox = css`
    margin: 10px;
    padding-left: 40px;
    align-self: flex-start;
`;

export const LoginInputBox = css`
    width: 80%;
    height: 50px;
    margin-bottom: 20px;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    outline: none;
    font-size: 20px;
`;
