import React, { useRef, useState, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PALETTE } from "../../../Common";
import Swal from "sweetalert2";
import { TiDelete } from "react-icons/ti";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

const Toast = Swal.mixin({
    toast: true,
    position: "top",
    width: "380px",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});

const ImgUpload = (props) => {
    const { index, setValue, value } = props;

    const [previewList, setPreviewList] = useState([]);
    const inputRef = useRef(null);
    const uploadBtnClick = () => {
        inputRef.current.click();
    };

    useEffect(() => {
        setValue(`routes.${index}.image`, previewList);
    }, [previewList]);

    // img upload function
    const handleUploadImg = (event) => {
        const selectedImg = event.target.files;
        const maxImg = selectedImg.length > 3 ? 3 : selectedImg.length;

        // 사진 입력 제한 : 최대 3장
        if ((value && value.length + maxImg > 3) || selectedImg.length > 3) {
            Toast.fire({
                icon: "error",
                title: "사진은 3장까지 등록 가능합니다.",
            });
            return;
        }

        // img의 상대경로 반환
        for (let i = 0; i < selectedImg.length; i++) {
            const imgUrl = URL.createObjectURL(selectedImg[i]);
            setPreviewList((previewList) => [...previewList, imgUrl]);
        }
    };

    // img delete function
    const handleDeleteImg = (i) => {
        setPreviewList(value.filter((_, index) => index !== i));
    };

    return (
        <div css={ImgUploadWrap}>
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleUploadImg}
                multiple
            />
            <button type="button" onClick={uploadBtnClick} css={UploadButton}>
                <MdOutlineAddPhotoAlternate size="20" /> <span>사진 등록</span>
            </button>
            <div css={PreviewContainer}>
                {value &&
                    value.map((img, i) => (
                        <div css={PreviewImg} key={`${img}`}>
                            <img src={img} alt={`${img}.${i}`} />
                            <TiDelete onClick={() => handleDeleteImg(i)} />
                        </div>
                    ))}
            </div>
        </div>
    );
};
const ImgUploadWrap = css`
    height: 80px;
    width: 82vw;
    display: flex;

    input {
        display: none;
    }
    @media (min-width: 768px) {
        width: 20vw;
    }
`;

const PreviewImg = css`
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        width: 50px;
        aspect-ratio: 1/1;
        margin: 5px;
    }

    svg {
        cursor: pointer;
    }
`;

const UploadButton = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    width: fit-content;
    height: 40px;
    font-size: 0.875rem;
    padding: 3px;
    border: none;
    border-radius: ${PALETTE.border_radius};
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    cursor: pointer;
    span {
        margin-left: 5px;
    }
`;
const PreviewContainer = css`
    position: relative;
    display: flex;
    align-items: center;
    margin: 10px;
`;

export default ImgUpload;
