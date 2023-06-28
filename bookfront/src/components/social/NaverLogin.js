import React from "react";

const NaverLogin = () => {
    let client_id = process.env.REACT_APP_NAVER_LOGIN_CLIENT_ID;

    let naver_api_url =
        "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=" +
        client_id +
        "&redirect_uri=" +
        encodeURI("http://localhost:3000/NaverOauth") +
        "&state=" +
        Math.random().toString(36).substr(3, 14);

    return (
        <a href={naver_api_url}>
            <img height="60" width="250" src="img/naverLogin.png" />
        </a>
    );
};

export default NaverLogin;
