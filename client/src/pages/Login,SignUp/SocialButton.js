import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { WidthWideTwoTone } from "@mui/icons-material";
import KaKaoLogin from "./KaKaoLogin";

const SocialButton = () => {
    return (
        <div css={SocialLogin}>
            <KaKaoLogin />
            <button type="button" css={NaverLogo}>
                <img alt="naver" src="https://i.postimg.cc/tCQVzXs1/btn-G.png" />
            </button>
            <button type="button" css={GoogleLogo}>
                <img
                    alt="google"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                />
            </button>
        </div>
    );
};

const SocialLogin = css`
    display: flex;
    justify-content: center;
    align-items: center;

    margin: 20px;

    button,
    a {
        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: 40px;
        border: none;

        cursor: pointer;

        :hover {
            transform: scale(1.1, 1.1);
            -ms-transform: scale(1.1, 1.1);
            -webkit-transform: scale(1.1, 1.1);
            transition-duration: 250ms;
        }
    }
`;

const NaverLogo = css`
    background: none;

    margin-left: 15px;

    img {
        width: 40px;
        height: 40px;
    }
`;

const GoogleLogo = css`
    width: 40px;
    height: 40px;

    margin-left: 15px;

    background-color: rgb(249 249 249);

    img {
        width: 20px;
        height: 20px;
    }
`;

export default SocialButton;
