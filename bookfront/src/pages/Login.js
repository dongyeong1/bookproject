import { Button, Modal, Input } from "antd";
import styled from "styled-components";
import { useCallback, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import NaverLogin from "../components/social/NaverLogin";
import KakaoLogin from "../components/social/KakaoLogin";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN_REQUEST } from "../reducer";

const NaverLoginWrapper = styled.div`
    margin-top: 10px;
`;
const KakaoLoginWrapper = styled.div`
    margin-top: 10px;
`;

const InputWrapper = styled.div`
margin:auto;
width:340px;
margin-top:180px;
  .ant-input{
      margin-top:40px;
    display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center ;
  border-radius:100px;
  width:340px;

`;

const SignUpWrapper = styled.div`
    width: 180px;
    margin: auto;
    margin-top: 30px;
`;
const Buttons = styled(Button)`
    width: 100px;
    height: 40px;
    border-radius: 100px;
    margin: 30px auto;
`;

const ErrorWrapper = styled.div`
    color: red;
    margin-top: 10px;
`;

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const inputRef = useRef();
    const { loginLoading, user } = useSelector((state) => state);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
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
        inputRef.current.focus();
    }, []);
    useEffect(() => {
        if (user) {
            navigate("/booksearch");
            Loginsuccess();
        }
    }, [user]);

    const onChangeEmail = useCallback(
        (e) => {
            setEmail(e.target.value);
            setEmailError(false);
        },
        [email]
    );

    const onChangePassword = useCallback(
        (e) => {
            setPassword(e.target.value);
            setPasswordError(false);
        },
        [password]
    );

    const onSubmit = useCallback(() => {
        console.log("asdsa");
        if (email && password) {
            dispatch({
                type: LOGIN_REQUEST,
                data: {
                    email,
                    password,
                },
            });
        } else {
            if (!email) {
                setEmailError(true);
            }
            if (!password) {
                setPasswordError(true);
            }
        }
    }, [email, password, emailError, passwordError]);

    return (
        <div>
            <InputWrapper>
                <Input
                    ref={inputRef}
                    type="email"
                    name="user-email"
                    value={email}
                    onChange={onChangeEmail}
                    size="large"
                    placeholder="이메일을 입력해주세요"
                />
                {emailError ? (
                    <ErrorWrapper>이메일을 입력해주세요!</ErrorWrapper>
                ) : null}
                <Input
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                    size="large"
                    placeholder="비밀번호를 입력해주세요"
                />
                {passwordError ? (
                    <ErrorWrapper>비밀번호를 입력해주세요!</ErrorWrapper>
                ) : null}
                <Buttons
                    type="primary"
                    htmlType="submit"
                    className="btn"
                    loading={loginLoading}
                    onClick={onSubmit}
                >
                    로그인
                </Buttons>
                <NaverLoginWrapper>
                    <NaverLogin></NaverLogin>
                </NaverLoginWrapper>
                <KakaoLoginWrapper>
                    <KakaoLogin></KakaoLogin>
                </KakaoLoginWrapper>
            </InputWrapper>
            <SignUpWrapper>
                아직 회원이 아니라면?
                <Link to="/signup">
                    <a> 회원가입</a>
                </Link>
            </SignUpWrapper>
        </div>
    );
};

export default Login;
