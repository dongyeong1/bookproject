import React, { useCallback, useState, useEffect } from "react";
import { Input } from "antd";
import styled from "styled-components";
import { SearchOutlined } from "@ant-design/icons";
import {
    LOAD_MY_INFO_REQUEST,
    NAVER_LOGIN_REQUEST,
    SEARCH_BOOK_REQUEST,
} from "../reducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    KAKAO_ACCESS_TOKEN,
    NAVER_ACCESS_TOKEN,
} from "../components/LoginToken";

const SearchWrapper = styled(Input)`
    border-radius: 200px;
    height: 50px;
    width: 600px;
    font-size: 25px;
    margin: 30px auto;
    @media screen and (max-width: 700px) {
        width: 500px;
    }
`;

const ImageWrapper = styled.div`
    & > img {
        width: 500px;
    }
    margin-top: 120px;
    @media screen and (max-width: 700px) {
        margin-top: 25px;
    }
`;

const ContentWrpper = styled.div`
    position: "relative";
    width: 100%;
    height: 0;
    padding-bottom: 51%;
    overflow: "hidden";
    text-align: "center";
`;

const Home = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [bookName, setBookName] = useState("");

    const bookSearch = useCallback(() => {
        dispatch({
            type: SEARCH_BOOK_REQUEST,
            data: bookName,
        });

        navigate("/booksearch");
    }, [bookName]);

    const onChangeBook = useCallback(
        (e) => {
            setBookName(e.target.value);
        },
        [bookName]
    );

    useEffect(() => {
        if (sessionStorage.getItem(NAVER_ACCESS_TOKEN)) {
            dispatch({
                type: NAVER_LOGIN_REQUEST,
            });
        } else if (sessionStorage.getItem(KAKAO_ACCESS_TOKEN)) {
            dispatch({
                type: NAVER_LOGIN_REQUEST,
            });
        } else {
            dispatch({
                type: LOAD_MY_INFO_REQUEST,
            });
        }
    }, []);

    return (
        <ContentWrpper>
            <ImageWrapper>
                <img src="img/logo.png"></img>
            </ImageWrapper>
            <div>
                <SearchWrapper
                    onChange={onChangeBook}
                    prefix={<SearchOutlined style={{ fontSize: 30 }} />}
                    placeholder="  책을 검색해보세요"
                    size="large"
                    onPressEnter={bookSearch}
                />
            </div>
        </ContentWrpper>
    );
};

export default Home;
