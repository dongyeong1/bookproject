import React, { useCallback, useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_REQUEST } from "../../reducer";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ButtonWrapper = styled.div`
    margin-top: 10px;
`;
const LoginForm = () => {
    const dispatch = useDispatch();

    const { loginError } = useSelector((state) => state);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeEmail = useCallback(
        (e) => {
            setEmail(e.target.value);
        },
        [email]
    );

    const onChangePassword = useCallback(
        (e) => {
            setPassword(e.target.value);
        },
        [password]
    );

    const onSubmit = useCallback(() => {
        dispatch({
            type: LOGIN_REQUEST,
            data: {
                email,
                password,
            },
        });
    }, [email, password]);

    useEffect(() => {
        if (loginError) {
            alert(loginError);
        }
    }, [loginError]);

    return (
        <Form onFinish={onSubmit}>
            <div>
                <label htmlFor="user-id">아이디</label>
                <br />
                <Input
                    type="email"
                    name="user-id"
                    value={email}
                    onChange={onChangeEmail}
                ></Input>
            </div>
            <ButtonWrapper>
                <label htmlFor="user-password">비밀번호</label>
                <br />
                <Input
                    type="password"
                    name="user-password"
                    value={password}
                    onChange={onChangePassword}
                ></Input>
            </ButtonWrapper>
            <Button type="primary" htmlType="submit">
                로그인
            </Button>
            <Link to="/signup">
                <Button type="primary">회원가입</Button>
            </Link>
        </Form>
    );
};

export default LoginForm;
