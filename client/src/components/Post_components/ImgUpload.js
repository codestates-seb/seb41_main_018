import React, { useState, useRef, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PALETTE } from "../../Common";
import Button from "../Button";
import { useRecoilState } from "recoil";
import { imgState } from "../../state/atom";
import { TiDelete } from "react-icons/ti";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

const ImgUpload = () => {
    const [imgList, setImgList] = useRecoilState(imgState);
    const [previewList, setPreviewList] = useState([]);
    const inputRef = useRef(null);
    const uploadBtnClick = () => {
        console.log("버튼클릭");
        inputRef.current.click();
    };

    useEffect(() => {
        setImgList(previewList);
    }, [previewList]);

    // img upload function
    const handleUploadImg = (event) => {
        const selectedImg = event.target.files;
        const maxImg = selectedImg.length > 3 ? 3 : selectedImg.length;

        // 사진 입력 제한 : 최대 3장
        if (imgList.length + maxImg > 3 || selectedImg.length > 3) {
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
        setImgList(imgList.filter((_, index) => index !== i));
        setPreviewList(imgList.filter((_, index) => index !== i));
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
            <button css={PhotoButton} onClick={uploadBtnClick}>
                <MdOutlineAddPhotoAlternate size="20" color="#fff" />
            </button>
            {/* <Button
                text="사진 업로드"
                width="130px"
                margin="15px"
                onClick={uploadBtnClick}
            ></Button> */}
            <div css={PreviewContainer}>
                {imgList.map((img, i) => (
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
    input {
        display: none;
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

const PhotoButton = css`
    width: 30px;
    margin: 15px;
    border: none;
    border-radius: ${PALETTE.border_radius};
    background-color: ${PALETTE.default_color};
`;

export default ImgUpload;
