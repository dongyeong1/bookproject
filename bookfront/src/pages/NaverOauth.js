import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { NAVER_ACCESS_TOKEN, NAVER_TOKEN_TYPE } from "../components/LoginToken";
import { instance } from "../sagas";
import { useDispatch, useSelector } from "react-redux";
import { NAVER_TOKEN_LOGIN_REQUEST } from "../reducer";

const NaverOauth = () => {
    const { user } = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = () => {
        Modal.success({
            content: (
                <div>
                    <h3>로딩중...</h3>
                </div>
            ),
            centered: true,
            icon: <LoadingOutlined />,
        });
    };

    const Loginsuccess = () => {
        Modal.success({
            content: (
                <div>
                    <h3>로그인 성공</h3>
                </div>
            ),
            centered: true,
            fontSize: 20,
        });
    };

    useEffect(() => {
        if (user) {
            Modal.destroyAll();
            navigate("/");
            Loginsuccess();
        }
    }, [user]);

    useEffect(() => {
        loading();

        let code = new URL(window.location.href).searchParams.get("code");
        let callback_state = new URL(window.location.href).searchParams.get(
            "state"
        );

        dispatch({
            type: NAVER_TOKEN_LOGIN_REQUEST,
            data: {
                code,
                callback_state,
            },
        });
    }, []);

    return <div></div>;
};

export default NaverOauth;
