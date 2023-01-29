import React, { useRef, useState, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PALETTE } from "../../Common";

import { TiDelete } from "react-icons/ti";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

const ImgUpload = (props) => {
    const { index, setValue, value } = props;

    const [previewList, setPreviewList] = useState([]);
    const inputRef = useRef(null);
    const uploadBtnClick = () => {
        console.log("버튼클릭");
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
            alert("최대 3장까지만 등록 가능합니다.");
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
        <div css={ImgUpload_Wrap}>
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleUploadImg}
                multiple
            />
            <button onClick={uploadBtnClick} css={uploadButton}>
                <MdOutlineAddPhotoAlternate size="20" /> <span>사진 업로드</span>

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
const ImgUpload_Wrap = css`
    height: 15vh;
    width: 82vw;
    margin: 0 auto;
    margin-left: 30px;

    input {
        display: none;
    }
    @media (min-width: 768px) {
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        border-radius: ${PALETTE.border_radius};
    }
`;

const PreviewContainer = css`
    display: flex;
    align-items: center;
    margin: 10px;
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

const uploadButton = css`
    display: flex;
    justify-content: space-between;
    background-color: white;
    width: fit-content;
    font-size: 0.875rem;
    padding: 7px;
    margin: auto;
    border: none;
    border-radius: ${PALETTE.border_radius};
    /* box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; */
    span {
        margin-left: 5px;
    }
`;

export default ImgUpload;
