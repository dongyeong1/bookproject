import { Button, Input, Modal } from "antd";
import styled from "styled-components";
import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SIGNUP_REQUEST } from "../reducer";
import { useEffect } from "react";

const InputWrapper = styled.div`
margin:auto;
width:340px;
margin-top:100px;
  .ant-input{
      margin-top:40px;
    display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center ;
  border-radius:100px;
  width:340px;
    


 
`;

const ErrorWrapper = styled.div`
    color: red;
    margin-top: 10px;
`;

const Buttons = styled(Button)`
    width: 100px;
    height: 40px;
    border-radius: 100px;
    margin: 50px auto;
`;

const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const { signupError, signUpData } = useSelector((state) => state);
    const [emailError, setEmailError] = useState(false);
    const [nicknameError, setNicknameError] = useState(false);
    const [pwError, setPwError] = useState(false);
    // const [checkPassword,setCheckPassword]=useState('')
    const [passwordError, setPasswordError] = useState(false);

    const success = () => {
        Modal.success({
            content: (
                <div>
                    <h3>회원가입 성공</h3>
                </div>
            ),
            centered: true,
            fontSize: 20,
        });
    };

    const onChangeEmail = useCallback(
        (e) => {
            setEmail(e.target.value);
            setEmailError(false);
        },
        [email]
    );
    const onChangeNickname = useCallback(
        (e) => {
            setNickname(e.target.value);
            setNicknameError(false);
        },
        [nickname]
    );
    const onChangePassword = useCallback(
        (e) => {
            setPassword(e.target.value);
            setPasswordError(false);
        },
        [password]
    );
    const onChangeCheckPassword = useCallback(
        (e) => {
            setPasswordError(e.target.value !== password);
        },
        [password]
    );

    const signUp = useCallback(() => {
        if (email && nickname && password) {
            dispatch({
                type: SIGNUP_REQUEST,
                data: {
                    email,
                    password,
                    nickname,
                },
            });
        } else {
            if (!email) {
                setEmailError(true);
            }
            if (!password) {
                setPwError(true);
            }
            if (!nickname) {
                setNicknameError(true);
            }
        }
    }, [email, nickname, password]);

    useEffect(() => {
        if (signupError) {
            alert(signupError);
        }
    }, [signupError]);
    useEffect(() => {
        if (signUpData) {
            success();
            navigate("/Login");
        }
    }, [signUpData]);

    return (
        <div>
            <InputWrapper>
                <Input
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
                    value={nickname}
                    onChange={onChangeNickname}
                    size="large"
                    placeholder="닉네임을 입력해주세요"
                />
                {nicknameError ? (
                    <ErrorWrapper>닉네임을 입력해주세요!</ErrorWrapper>
                ) : null}
                <Input
                    type="password"
                    value={password}
                    onChange={onChangePassword}
                    size="large"
                    placeholder="비밀번호를 입력해주세요"
                />
                {pwError ? (
                    <ErrorWrapper>비밀번호를 입력해주세요!</ErrorWrapper>
                ) : null}
                <Input
                    type="password"
                    onChange={onChangeCheckPassword}
                    size="large"
                    placeholder="비밀번호를 한번더 입력해주세요"
                />
                {passwordError && (
                    <div style={{ color: "red" }}>비밀번호가 맞지않습니다</div>
                )}
                <Buttons type="primary" className="btn" onClick={signUp}>
                    회원가입
                </Buttons>
            </InputWrapper>
            <div style={{ width: 140, margin: "auto", marginTop: 30 }}>
                {" "}
                이미회원이라면?{" "}
                <Link to="/Login">
                    <span> 로그인</span>
                </Link>
            </div>
        </div>
    );
};

export default SignUp;
