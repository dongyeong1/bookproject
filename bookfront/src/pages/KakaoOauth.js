import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { KAKAO_ACCESS_TOKEN, KAKAO_TOKEN_TYPE } from "../components/LoginToken";
import { instance } from "../sagas";

const KakaoOauth = () => {
    const navigate = useNavigate();

    const success = () => {
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
        success();

        let client_id = process.env.REACT_APP_KAKAO_REST_API;
        let redirectURI = encodeURI("http://localhost:3000/KakaoOauth");
        let code = new URL(window.location.href).searchParams.get("code");

        let api_uri =
            "/oauth/token?grant_type=authorization_code&client_id=" +
            client_id +
            "&redirect_uri=" +
            redirectURI +
            "&code=" +
            code;

        axios
            .post(
                api_uri,
                {},
                {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            )

            .then((res) => {
                instance
                    .post("/user/kakaologin", res.data, {
                        "Content-Type": "application/x-www-form-urlencoded",
                    })
                    .then((res) => {
                        sessionStorage.setItem(
                            KAKAO_ACCESS_TOKEN,
                            res.data.access_token
                        );
                        sessionStorage.setItem(
                            KAKAO_TOKEN_TYPE,
                            res.data.token_type
                        );
                        Modal.destroyAll();
                        navigate("/");
                        Loginsuccess();
                    });
            })
            .catch((err) => {
                console.log("error", err);
            });
    }, []);
    return <div></div>;
};

export default KakaoOauth;
