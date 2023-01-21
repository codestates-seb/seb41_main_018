import react, { useState, forwardRef } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PALETTE } from "../Common";
import format from "date-fns/format";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";

export const Calendar = () => {
    const [startDate, setStartDate] = useState(new Date());
    console.log(startDate);

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button css={buttonStyle} onClick={onClick} ref={ref}>
            {format(startDate, "yyyy년 MM월 dd일")}
            <FaRegCalendarAlt css={iconStyle} />
        </button>
    ));
    return (
        <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            customInput={<ExampleCustomInput />}
        />
    );
};

const buttonStyle = css`
    width: 160px;
    height: 30px;
    border: none;
    font-size: 1rem;
    background-color: white;
    border-radius: ${PALETTE.border_radius};
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const iconStyle = css`
    font-size: 1rem;
`;
