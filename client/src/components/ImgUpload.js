import React, { useRef } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PALETTE } from "../Common";
import Button from "../components/Button";
import { useRecoilState } from "recoil";
import { imgState } from "../state/atom";

/*
해야할 일 
- 사진 개수 제한 (3개)
- 사진 삭제 버튼
- 압축......??

 */
const ImgUpload = () => {
    const [imgList, setImgList] = useRecoilState(imgState);
    const inputRef = useRef(null);
    const uploadBtnClick = () => {
        inputRef.current.click();
    };
    const handleUploadImg = (event) => {
        const selectedImg = event.target.files;
        let previewList = [...imgList];

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
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleUploadImg}
                multiple
            />
            <Button text="사진 업로드" width="150px" onClick={uploadBtnClick}></Button>
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
