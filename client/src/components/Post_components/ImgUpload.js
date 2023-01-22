import React, { useRef } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PALETTE } from "../../Common";
import Button from "../Button";
import { useRecoilState } from "recoil";
import { imgState } from "../../state/atom";

const ImgUpload = () => {
    const [imgList, setImgList] = useRecoilState(imgState);
    const inputRef = useRef(null);
    const uploadBtnClick = () => {
        inputRef.current.click();
    };
    const handleUploadImg = (event) => {
        const selectedImg = event.target.files;
        const maxImg = selectedImg.length > 3 ? 3 : selectedImg.length;
        let previewList = [...imgList];

        // 사진 입력 제한 : 최대 3장
        if (imgList.length + maxImg > 3 || selectedImg.length > 3) {
            alert("최대 3장까지만 등록 가능합니다.");
            return;
        }

        // img의 상대경로 반환
        for (let i = 0; i < selectedImg.length; i++) {
            const imgUrl = URL.createObjectURL(selectedImg[i]);
            previewList.push(imgUrl);
        }

        setImgList(previewList);
    };
    return (
        <div css={ImgUpload_Wrap}>
            <input
                css={ImgInput}
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleUploadImg}
                multiple
            />
            <Button
                text="사진 업로드"
                width="90px"
                height="40px"
                margin="15px"
                onClick={uploadBtnClick}
            ></Button>
            <div css={PreviewContainer}>
                {imgList.map((img, i) => (
                    <div key={`${img}`}>
                        <img src={img} alt={`${img}.${i}`} />
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
const ImgInput = css``;

const PreviewContainer = css`
    display: flex;
    align-items: center;
    margin: 10px;

    img {
        width: 50px;
        aspect-ratio: 1/1;
        margin: 5px;
    }
`;

export default ImgUpload;
