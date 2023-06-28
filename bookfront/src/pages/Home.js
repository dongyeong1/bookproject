import React, { useCallback, useState, useEffect } from "react";
import { Input, Space } from "antd";
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

const ImageWrapper = styled.div`
    margin-top: 90px;
`;

const SearchWrapper = styled(Input)`
    // margin: 40px auto;
    // border:solid 1px lightgray
    border-radius: 200px;
    height: 50px;
    width: 600px;
    font-size: 25px;
    margin: 30px auto;
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
        <div
            style={{
                position: "relative",
                width: "100%",
                height: 0,
                paddingBottom: "51%",
                overflow: "hidden",
                textAlign: "center",
            }}
        >
            {/* <main
                style={{
                    backgroundImage: `url("img/bookimage.png")`,
                    height: 100,
                }}
            >
                as
            </main> */}
            {/* <img
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                }}
                src="img/bookimage.png"
            ></img> */}
            <div style={{ marginTop: 120 }}>
                <img src="img/logo.png" width="500"></img>
            </div>
            <div>
                <SearchWrapper
                    onChange={onChangeBook}
                    prefix={<SearchOutlined style={{ fontSize: 30 }} />}
                    placeholder="  책을 검색해보세요"
                    size="large"
                    onPressEnter={bookSearch}
                />
            </div>
        </div>
    );
};

export default Home;
