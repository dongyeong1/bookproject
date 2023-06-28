import { Button, Empty, Modal } from "antd";
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
const CardWrapper = styled(Card)`
    width: 500px;
    height: 110px;
    border-radius: 20px;
    margin: 20px auto;
    background-color: lightgray;
`;
const ButtonWrapper = styled.div`
    margin-left: 320px;
    .ant-btn {
        border-radius: 20px;
        margin-left: 20px;
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
        border: 1px solid lightgray;
        color: black;
        cursor: pointer;
    }
    .paginationBttns a:hover {
        color: white;
        background-color: lightgray;
    }
    .paginationActive a {
        color: white;
        background-color: lightgray;
    }
`;
const Book = () => {
    const { id } = useParams();
    const { posts, book, ratePostLoading, bookPostsLoading } = useSelector(
        (state) => state
    );
    const dispatch = useDispatch();

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
    }, [id]);

    const rateSort = useCallback(() => {
        dispatch({
            type: RATE_BOOK_POSTS_REQUEST,
            data: id,
        });
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
                <Card.Meta
                    avatar={<img src={book && book.image} width="50px"></img>}
                    description={book && book.title}
                />
            </CardWrapper>
            <ButtonWrapper>
                <Button
                    size="large"
                    onClick={dateSort}
                    loading={bookPostsLoading}
                >
                    최신순
                </Button>
                <Button
                    size="large"
                    onClick={rateSort}
                    loading={ratePostLoading}
                >
                    평점순
                </Button>
            </ButtonWrapper>
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
                {posts && (
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
