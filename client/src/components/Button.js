import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
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

                width: ${props.width || "fit-contents"};
                height: ${props.height || "fit-contents"};
                min-width: ${props.minWidth || null};
                max-width: ${props.maxWidth || null};
                min-height: ${props.minheight || null};
                max-height: ${props.maxheight || null};
                margin: ${props.margin || "0px"};
                padding: ${props.padding || "0px"};

                background-color: ${props.bgColor || `${PALETTE.default_color}`};
                background-image: ${props.bgImg || "none"};
                border-radius: ${props.bdradius || "5px"};
                border: ${props.border || `${PALETTE.border_default}`};
                box-shadow: ${props.boxShadow || null};

                transition: ${props.transition || "all 0.2s ease"};

                cursor: pointer;

                :hover {
                    box-shadow: -7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9,
                        7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001;
                }
            `}
        >
            <div
                css={css`
                    font-size: ${props.ftsize || "1rem"};
                    font-weight: ${props.ftweight || "400"};
                    align-items: center;
                    color: ${props.color || "black"};
                `}
            >
                {props.text}
            </div>
        </button>
    );
};

export default Button;
