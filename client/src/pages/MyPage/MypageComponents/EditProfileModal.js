import React, { useRef, useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PALETTE } from "../../../Common";

import { useRecoilState, useSetRecoilState } from "recoil";
import { userInfoState } from "../../../state/atom";

import Button from "../../components/Button";
import { getUserInfo, editProfileImage } from "../../../util/axiosUser";

const EditProfileModal = (props) => {
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [previewImage, setPreviewImage] = useState(props.profileImage);
    const [profileImage, setProfileImage] = useState(props.profileImage);
    const inputRef = useRef(null);
    const clickProfile = () => {
        inputRef.current.click();
    };

    const inputImage = (event) => {
        const selectedImage = event.target.files[0];
        setProfileImage(selectedImage);
        // img의 상대경로 반환
        const imageUrl = URL.createObjectURL(selectedImage);
        setPreviewImage(imageUrl);
    };

    // 수정 버튼 클릭
    const clickEditButton = () => {
        const formData = new FormData();
        formData.append("imgFile", profileImage);

        /* 이미지 삽입 확인 
		  for (var pair of formData.entries()) {
            console.log(pair[0] + ", " + pair[1]);
        } */

        editProfileImage(userInfo.userId, formData).then((data) => {
            if (data) {
                getUserInfo(userInfo.userId).then((data) => {
                    setUserInfo(data.data);
                    closeModal();
                });
            }
        });
    };

    // 모달 끄기
    const closeModal = () => {
        props.setOpenModal(false);
    };

    return (
        <div css={ModalBackground}>
            {console.log(userInfo)}
            <div css={ModalContainer}>
                <div css={ImageArea}>
                    <input type="file" accept="image/*" ref={inputRef} onChange={inputImage} />
                    {console.log(previewImage)}
                    <img src={previewImage} alt="프로필 미리보기" onClick={clickProfile} />
                </div>
                <div css={ButtonArea}>
                    <Button
                        text="수정"
                        width="25%"
                        margin="20px"
                        color="white"
                        onClick={clickEditButton}
                    ></Button>
                    <Button
                        text="취소"
                        width="25%"
                        margin="20px"
                        color="white"
                        onClick={closeModal}
                    ></Button>
                </div>
            </div>
        </div>
    );
};

/* 모달창을 화면 중앙. 최상단에 노출 */
const ModalContainer = css`
    /* 모달창 크기 */
    width: 500px;
    height: 400px;

    /* 최상단 위치 */
    z-index: 999;

    /* 중앙 배치 */
    /* top, bottom, left, right: 브라우저 기준 */
    /* translate: 본인 크기 기준 */
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);

    /* 모달창 디자인 */
    background-color: white;
    border: ${PALETTE.border};
    border-radius: ${PALETTE.border_radius};
    box-shadow: 5px 5px 10px ${PALETTE.gray};

    /* 내부 요소 정렬 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px 5px 5px 5px;
`;

const ImageArea = css`
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
        display: none;
    }

    img {
        width: 200px;
        height: 200px;
        border: ${PALETTE.border};
        border-radius: ${PALETTE.border_round};
    }
`;
const ButtonArea = css`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 30px;
`;

const ModalBackground = css`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.7);
`;

export default EditProfileModal;
