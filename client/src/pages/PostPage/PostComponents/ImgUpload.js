import React, { useRef, useState, useEffect } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PALETTE } from "../../../Common";
import Swal from "sweetalert2";
import { TiDelete } from "react-icons/ti";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import imageCompression from "browser-image-compression";

import Compressor from "compressorjs";
import { GachiGalleImgSrc, SampleImgSrc } from "../../../sampleImage";

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
    const uploadBtnClick = (compressedFile) => {
        inputRef.current.click(compressedFile);
        console.log("이미지 업로드 완료");
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

            new Compressor(selectedImg[i], {
                quality: 0.6,
                minHeight: 500, //최소 높이
                maxHeight: 700, //최대 높이
                mimeType: "image/jpeg",
                success(result) {
                    //이미지 크기가 어떻게 변했는지 콘솔에 찍어주는 코드, 나중에 삭제
                    const img = new Image();
                    img.onload = () => {
                        console.log("Width:", img.width);
                        console.log("Height:", img.height);
                    };
                    img.src = URL.createObjectURL(result);
                },
                error(err) {
                    console.log(err.message);
                },
            });
        }
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
