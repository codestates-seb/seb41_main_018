import React from "react";

/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';

const Button = (props) => {  
    return (
        <button
            onClick={props.onClick}
            css={css`
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    width: ${props.width || '85%'};
                    height: ${props.height || '50px'};
                    margin: ${props.margin || '25px 0 40px 0'};

                    color: ${props.color || '#fff'};
                    background-color: ${props.bgColor || 'rgba(248, 112, 112, 1)'};
                    font-size: ${props.ftsize || '17px'};
                    border-radius: ${props.bdradius || '5px'};
                    border: none;

                    transition: all 0.2s ;

                    cursor: pointer;

                    &:hover {
                        transform: scale(1.1,1.1);
                        -ms-transform: scale(1.1,1.1);
                        -webkit-transform: scale(1.1,1.1);
                        background-color: rgba(228, 78, 78, 1);
                        transition-duration: 250ms;
                    }

                    &:active {
                        background-color: rgba(251, 181, 181, 1);
                    }
                `
            }>
            {props.text}
        </button>
    );
};

export default Button;