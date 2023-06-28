import React, { useCallback, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import {
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    SEARCH_BOOK_REMOVE,
} from "../reducer";
import { MenuOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import ReviewModal from "./Modal/ReivewModal";

import { Modal } from "antd";
import {
    KAKAO_ACCESS_TOKEN,
    KAKAO_TOKEN_TYPE,
    NAVER_ACCESS_TOKEN,
    NAVER_TOKEN_TYPE,
} from "./LoginToken";

const NavWrapper = styled.div`
    // position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    border: 20 //
        .cuaAeS {
        height: 300px;
    }
    border-bottom: 1px solid black;
    padding: 20px 20px;

    span {
        font-family: Belanosima, sans-serif;

        color: #457abf;
        text-decoration: none;
    }
    .nav_logo {
        font-size: 20px;
    }

    .nav_menu {
        margin-right: 100px;
        display: flex;
        list-style: none;
        padding-left: 0;
    }

    .menuactive {
        display: flex;
        list-style: none;
        padding-left: 0;
    }

    .nav_menu > li {
        padding: 8px 36px;
        margin: 0 20px 0 20px;
    }

    .menuactive > li {
        padding: 8px 12px;
        margin: 0 20px 0 20px;
    }

    .nav_link > span {
        padding: 8px 12px;
    }

    .linkactive > span {
        padding: 8px 12px;
    }

    .nav_menu > li:hover {
        background-color: #457abf;
        border-radius: 10px;
    }

    .sc:hover {
        color: white;
    }
    .rv:hover {
        color: white;
    }
    .mp:hover {
        color: white;
    }

    .menuactive > li:hover {
        background-color: #457abf;

        border-radius: 10px;
    }

    .nav_ham {
        position: absolute;
        font-size: 25px;
        display: none;
        right: 30px;
    }
    @media screen and (max-width: 700px) {
        flex-direction: column;
        align-items: flex-start;
        padding: 8px 24px;

        .nav_menu {
            display: none;
        }

        .menuactive {
            flex-direction: column;
            align-items: center;
            width: 100%;
            display: flex;
        }

        .menuactive > li {
            text-align: center;
            width: 100%;
            list-style: none;
        }

        .nav_link {
            display: none;
        }

        .linkactive {
            display: flex;
            justify-content: center;
            width: 100%;
        }

        .nav_ham {
            display: block;
        }
    }
`;

const TopLayout = ({ children }) => {
    const [showModal, setShowModal] = useState(false);

    const { user } = useSelector((state) => state);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const success = () => {
        Modal.success({
            content: (
                <div>
                    <h3>로그아웃 성공</h3>
                </div>
            ),
            centered: true,
            fontSize: 20,
        });
    };

    const loginModal = () => {
        Modal.info({
            content: (
                <div>
                    <h3>로그인 해주세요!</h3>
                </div>
            ),
            centered: true,
            fontSize: 20,
        });
    };

    const logOut = useCallback(() => {
        if (sessionStorage.getItem(NAVER_ACCESS_TOKEN)) {
            sessionStorage.removeItem(NAVER_ACCESS_TOKEN);
            sessionStorage.removeItem(NAVER_TOKEN_TYPE);
            dispatch({
                type: LOG_OUT_SUCCESS,
            });
            success();
        } else if (sessionStorage.getItem(KAKAO_ACCESS_TOKEN)) {
            sessionStorage.removeItem(KAKAO_ACCESS_TOKEN);
            sessionStorage.removeItem(KAKAO_TOKEN_TYPE);
            dispatch({
                type: LOG_OUT_SUCCESS,
            });
            success();
        } else {
            dispatch({
                type: LOG_OUT_REQUEST,
            });
        }

        navigate("/");
    }, []);

    const modalHandle = useCallback(() => {
        if (!user) {
            console.log("asdasd");
            loginModal();
        } else {
            dispatch({
                type: SEARCH_BOOK_REMOVE,
            });
            setShowModal(true);
        }
    }, [user]);

    const bookRemove = useCallback(() => {
        dispatch({
            type: SEARCH_BOOK_REMOVE,
        });
    }, []);

    const [menuActive, setMenuActive] = useState(false);
    const [linkActive, setLinkActive] = useState(false);

    const menuHandle = useCallback(() => {
        setMenuActive((prev) => !prev);

        setLinkActive((prev) => !prev);
    }, []);

    return (
        <div>
            <ReviewModal
                modal={showModal}
                setModal={setShowModal}
            ></ReviewModal>

            <NavWrapper className="navbar">
                <div className="nav_logo">
                    <Link to="/">
                        <img src="img/logo.png" width="200"></img>
                    </Link>
                </div>
                <ul className={menuActive ? "menuactive" : "nav_menu"}>
                    <li>
                        <Link to="/booksearch">
                            <span
                                onClick={bookRemove}
                                style={{ fontSize: 22, fontWeight: 600 }}
                                className="sc"
                            >
                                책검색
                            </span>
                        </Link>
                    </li>
                    <li>
                        {user && (
                            <Link>
                                {" "}
                                <span
                                    className="rv"
                                    style={{ fontSize: 22, fontWeight: 600 }}
                                    onClick={modalHandle}
                                >
                                    리뷰쓰기
                                </span>
                            </Link>
                        )}
                    </li>
                    <li>
                        {" "}
                        {user && (
                            <Link to="/mypage">
                                <span
                                    className="mp"
                                    style={{ fontSize: 22, fontWeight: 600 }}
                                >
                                    마이페이지
                                </span>
                            </Link>
                        )}
                    </li>
                </ul>

                <div className={linkActive ? "linkactive" : "nav_link"}>
                    {sessionStorage.getItem(NAVER_ACCESS_TOKEN) ||
                    sessionStorage.getItem(KAKAO_ACCESS_TOKEN) ||
                    user ? (
                        <Link to="/">
                            <span
                                onClick={logOut}
                                style={{ fontSize: 22, fontWeight: 600 }}
                            >
                                <span style={{ fontSize: 15, marginRight: 20 }}>
                                    {user && user.nickname}님 환영합니다!{" "}
                                </span>
                                로그아웃
                            </span>
                        </Link>
                    ) : (
                        <Link to="/login">
                            <span style={{ fontSize: 22, fontWeight: 600 }}>
                                로그인
                            </span>
                        </Link>
                    )}
                </div>

                <div className="nav_ham">
                    <i onClick={menuHandle}>
                        <MenuOutlined />
                    </i>
                </div>
            </NavWrapper>
        </div>
    );
};

export default TopLayout;
