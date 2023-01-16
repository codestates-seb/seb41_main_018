/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import React from "react";
import { PALETTE } from "../Common";

const Button = (props) => {
    return (
        <button
            onClick={props.onClick}
            css={css`
                position: ${props.position || "relative"};
                top: ${props.top || null};
                left: ${props.left || null};
                right: ${props.right || null};
                bottom: ${props.bottom || null};
                display: flex;
                justify-content: center;
                align-items: center;

                width: ${props.width || "85%"};
                height: ${props.height || "50px"};
                margin: ${props.margin || "25px 0 40px 0"};

                color: ${props.color || `${PALETTE.default_color}`};
                background-color: ${props.bgColor || `${PALETTE.white}`};
                font-size: ${props.ftsize || "17px"};
                border-radius: ${props.bdradius || "5px"};
                border: ${props.border || `${PALETTE.border_default}`};
                box-shadow: ${props.boxShadow || null};

                transition: ${props.transition || "all 0.2s"};

                cursor: pointer;

                &:hover {
                    transform: scale(1.1, 1.1);
                    -ms-transform: scale(1.1, 1.1);
                    -webkit-transform: scale(1.1, 1.1);
                    background-color: rgba(228, 78, 78, 1);
                    transition-duration: 250ms;
                }

                &:active {
                    background-color: rgba(251, 181, 181, 1);
                }
            `}
        >
            <div css={text}>{props.text}</div>
        </button>
    );
};

const text = css`
    font-size: 1rem;
    color: ${PALETTE.default_color};
    &:hover {
        color: ${PALETTE.default_hover};
    }
`;

export default Button;
