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
                min-width: ${props.minWidth || null};
                max-width: ${props.maxWidth || null};
                height: ${props.height || "50px"};
                min-height: ${props.maxWidth || null};
                max-width: ${props.maxWidth || null};
                margin: ${props.margin || "0px"};

                background-color: ${props.bgColor || `${PALETTE.white}`};
                background-image: ${props.bgImg || "none"};
                border-radius: ${props.bdradius || "5px"};
                border: ${props.border || `${PALETTE.border_default}`};
                box-shadow: ${props.boxShadow || null};

                transition: ${props.transition || "all 0.2s"};

                cursor: pointer;

                &:hover {
                    transform: scale(1.1, 1.1);
                    -ms-transform: scale(1.1, 1.1);
                    -webkit-transform: scale(1.1, 1.1);
                    background-color: ${PALETTE.default_hover};
                    color: ${PALETTE.white};
                    transition-duration: 250ms;
                }

                &:active {
                    background-color: rgba(251, 181, 181, 1);
                }
            `}
        >
            <div
                css={css`
                    font-size: ${props.ftsize || "1rem"};
                    font-weight: ${props.ftweight || "400"};
                    align-items: center;
                    color: ${props.color || "black"};

                    &:hover {
                        color: white;
                    }
                `}
            >
                {props.text}
            </div>
        </button>
    );
};

export default Button;
