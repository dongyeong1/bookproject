import { Button, Col, Empty, List, Modal, Row, Typography } from "antd";
// import Card from 'antd/lib/card/Card'
import { Card } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import {
    BOOK_LOAD_REQUEST,
    BOOK_POSTS_REQUEST,
    LOAD_MY_INFO_REQUEST,
    NAVER_LOGIN_REQUEST,
    RATE_BOOK_POSTS_REQUEST,
} from "../reducer";
import ReactPaginate from "react-paginate";
import { CaretRightOutlined, CaretLeftOutlined } from "@ant-design/icons";
import styled from "styled-components";
import {
    KAKAO_ACCESS_TOKEN,
    NAVER_ACCESS_TOKEN,
} from "../components/LoginToken";
const CardWrapper = styled.div`
    width: 1000px;
    height: 350px;
    border-radius: 30px;
    margin: 20px auto;
    border: 2px solid lightgray;
    display: flex;
    @media screen and (max-width: 700px) {
        .img {
            margin-top: 30px;
        }
        .list {
            width: 350px;
        }
        display: flex;
        flex-direction: column;
        height: 800px;
        width: 480px;
        margin: auto;
    }
    .font {
        widht: 100px;
    }
`;
const ButtonWrapper = styled.div`
    display: flex;
    width: 800px;
    margin: auto;
    .ant-btn {
        border-radius: 20px;
        margin-left: 20px;
    }

    @media screen and (max-width: 700px) {
        width: 450px;
        margin-top: 10px;
        margin-bottom: 10px;
    }
`;

const EmptyWrapper = styled.div`
    margin-top: 50px;
`;

const Pagination = styled.div`
    margin-top: 80px;
    margin-bottom: 10px;
    .paginationBttns {
        margin: 0 auto;
        width: 500px;
        height: 30px;
        list-style: none;
        display: flex;
        justify-content: center;
    }

    .paginationBttns a {
        padding: 10px;
        margin: 8px;
        border-radius: 5px;
        border: 1px solid #457abf;
        color: black;
        cursor: pointer;
    }
    .paginationBttns a:hover {
        color: white;
        background-color: #457abf;
    }
    .paginationActive a {
        color: white;
        background-color: lightgray;
    }
`;

const Lists = styled(List)``;
const Book = () => {
    const [dateButtonType, setDateButtonType] = useState("primary");
    const [rateButtonType, setRateButtonType] = useState("");

    const { id } = useParams();
    const { posts, book, ratePostLoading, bookPostsLoading } = useSelector(
        (state) => state
    );
    const dispatch = useDispatch();

    const textCut = (txt, len, lastTxt) => {
        if (len == "" || len == null) {
            len = 50;
        }
        if (lastTxt == "" || lastTxt == null) {
            lastTxt = "...";
        }
        if (txt.length > len) {
            txt = txt.substr(0, len) + lastTxt;
        }
        return txt;
    };

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

    useEffect(() => {
        dispatch({
            type: BOOK_LOAD_REQUEST,
            data: id,
        });
    }, [id]);

    useEffect(() => {
        dispatch({
            type: BOOK_POSTS_REQUEST,
            data: id,
        });
    }, [id]);

    const dateSort = useCallback(() => {
        dispatch({
            type: BOOK_POSTS_REQUEST,
            data: id,
        });
        setDateButtonType("primary");
        setRateButtonType("");
    }, [id]);

    const rateSort = useCallback(() => {
        dispatch({
            type: RATE_BOOK_POSTS_REQUEST,
            data: id,
        });
        setDateButtonType("");
        setRateButtonType("primary");
    }, [id]);

    const [pageNumber, setPageNumber] = useState(0);

    const PerPage = 5;
    const pagesVisited = pageNumber * PerPage;
    const pageCount = Math.ceil(posts && posts.length / PerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    return (
        <div>
            <CardWrapper>
                <div>
                    <img
                        className="img"
                        src={book && book[0].image}
                        style={{ width: 220, marginLeft: 20, marginTop: 20 }}
                    ></img>
                </div>
                {book && (
                    <Lists
                        itemLayout="horizontal"
                        style={{ marginLeft: 80 }}
                        dataSource={book}
                        renderItem={(item) => (
                            <div className="list">
                                <List.Item>
                                    <h2 style={{ marginTop: 10 }}>제목</h2>
                                    <div
                                        style={{
                                            marginRight: "auto",
                                            marginLeft: 20,

                                            width: 500,
                                        }}
                                    >
                                        {textCut(item.title, 50, "...")}
                                    </div>
                                </List.Item>
                                <List.Item>
                                    <h2 style={{ marginTop: 10 }}>저자</h2>
                                    <div
                                        style={{
                                            marginRight: "auto",
                                            marginLeft: 20,
                                            width: 500,
                                        }}
                                    >
                                        {item.author}
                                    </div>
                                </List.Item>
                                <List.Item>
                                    <h2 style={{ marginTop: 10 }}>가격</h2>
                                    <div
                                        style={{
                                            marginRight: "auto",
                                            marginLeft: 20,
                                            width: 500,
                                        }}
                                    >
                                        {item.discount}
                                    </div>
                                </List.Item>
                                <List.Item>
                                    <h2 style={{ marginTop: 10 }}>출판</h2>
                                    <div
                                        style={{
                                            marginRight: "auto",
                                            marginLeft: 20,
                                            width: 500,
                                        }}
                                    >
                                        {item.publisher}
                                    </div>
                                </List.Item>
                            </div>
                        )}
                    ></Lists>
                )}

                {/* <Card.Meta
                           
                            description={book && book.title}
                        /> */}
            </CardWrapper>

            {posts && (
                <ButtonWrapper>
                    <div style={{ marginLeft: "auto", marginRight: 10 }}>
                        <Button
                            type={dateButtonType}
                            size="large"
                            onClick={dateSort}
                            loading={bookPostsLoading}
                        >
                            최신순
                        </Button>
                        <Button
                            type={rateButtonType}
                            size="large"
                            onClick={rateSort}
                            loading={ratePostLoading}
                        >
                            평점순
                        </Button>
                    </div>
                </ButtonWrapper>
            )}
            {posts ? (
                posts.slice(pagesVisited, pagesVisited + PerPage).map((v) => (
                    <div>
                        <PostCard bookpost={v}></PostCard>
                    </div>
                ))
            ) : (
                <EmptyWrapper>
                    <Empty description="등록된 독후감이 없습니다"></Empty>
                </EmptyWrapper>
            )}

            <Pagination>
                {posts && posts.length > 5 && (
                    <ReactPaginate
                        previousLabel={<CaretLeftOutlined />}
                        nextLabel={<CaretRightOutlined />}
                        pageCount={pageCount}
                        onPageChange={changePage}
                        containerClassName={"paginationBttns"}
                    ></ReactPaginate>
                )}
            </Pagination>
        </div>
    );
};

export default Book;
