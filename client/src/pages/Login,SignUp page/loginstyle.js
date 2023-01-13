/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const LoginpageBg = css`
    width: 100%;
    height: 100vh;
    background-color: hsl(210,8%,95%);
    overflow: scroll;
`

export const LoginpageContainer = css`
    width: 38rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: grid;
`;

export const LoginLogoContainer = css`
    a{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    padding: 20px 0;

    img{
        width: 60%;
    }
`;

export const LoginContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px 20px;
    border-radius: 10px;
    background: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    height: 100%;
    padding-top: 100px;
    padding-bottom: 100px;
    small{
        color: rgba(248, 112, 112, 1);
        margin-bottom: 30px;
        font-size: 15px;
    }
`;

export const LoginLabelBox = css`
    margin: 10px;
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