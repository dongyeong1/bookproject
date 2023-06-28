import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { NAVER_ACCESS_TOKEN, NAVER_TOKEN_TYPE } from "../components/LoginToken";
import { instance } from "../sagas";

const NaverOauth = () => {
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

        let client_id = process.env.REACT_APP_NAVER_LOGIN_CLIENT_ID;
        let client_secret = process.env.REACT_APP_NAVER_LOGIN_CLIENT_SECRET;
        let redirectURI = encodeURI("http://localhost:3065/user/naverlogin");
        let code = new URL(window.location.href).searchParams.get("code");
        let callback_state = new URL(window.location.href).searchParams.get(
            "callback_state"
        );

        let api_url =
            "/oauth2.0/token?grant_type=authorization_code&client_id=" +
            client_id +
            "&client_secret=" +
            client_secret +
            "&redirect_uri=" +
            redirectURI +
            "&code=" +
            code +
            "&state=" +
            callback_state;

        axios
            .get(api_url, {
                Accept: "application/json",
                "X-Naver-Client-Id": client_id,
                "X-Naver-Client-Secret": client_secret,
            })

            .then((res) => {
                instance
                    .post("/user/naverlogin", res.data, {
                        Accept: "application/json",
                        "X-Naver-Client-Id": client_id,
                        "X-Naver-Client-Secret": client_secret,
                    })
                    .then((res) => {
                        sessionStorage.setItem(
                            NAVER_ACCESS_TOKEN,
                            res.data.access_token
                        );
                        sessionStorage.setItem(
                            NAVER_TOKEN_TYPE,
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

export default NaverOauth;
