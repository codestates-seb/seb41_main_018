import React from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { PALETTE } from "../../../Common";
import Button from "../../components/Button";
import { deleteUser } from "../../../util/axiosUser";
import { userInfoState, loginState } from "../../../state/atom";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

const UserDeleteModal = (props) => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);
    const [isLogin, setIsLogin] = useRecoilState(loginState);

    // 모달 끄기
    const closeModal = () => {
        props.setModalOpen(false);
    };
    // 회원탈퇴 확인
    const deleteConfirm = () => {
        deleteUser(userInfo.userId).then(() => {
            setIsLogin(false);
            setUserInfo({});
            navigate("/");
        });
    };

    return (
        <div css={ModalBackground}>
            <div css={ModalContainer}>
                <h2>{props.text}</h2>
                <div css={ButtonArea}>
                    <Button
                        text="확인"
                        width="25%"
                        margin="20px"
                        color="white"
                        onClick={deleteConfirm}
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
    height: 200px;

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
    padding: 60px 5px 5px 5px;
`;

const ButtonArea = css`
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 15px;
`;

const ModalBackground = css`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.7);
`;
export default UserDeleteModal;
