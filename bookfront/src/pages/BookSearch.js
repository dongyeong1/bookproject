import { Input, Empty, List, Card, Row, Col, Spin } from "antd";
import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    LOAD_MY_INFO_REQUEST,
    NAVER_LOGIN_REQUEST,
    SEARCH_BOOK_REQUEST,
} from "../reducer";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
    SearchOutlined,
    CaretRightOutlined,
    CaretLeftOutlined,
    LoadingOutlined,
} from "@ant-design/icons";
import ReactPaginate from "react-paginate";
import {
    KAKAO_ACCESS_TOKEN,
    NAVER_ACCESS_TOKEN,
} from "../components/LoginToken";

const EmptyWrapper = styled.div`
    // margin-top: 100px;
    width: 300px;
    margin: 100px auto;
`;

const ListWrapper = styled(List)`
    width: 700px;
    margin: 30px auto;
`;

const Pagination = styled.div`
    width: 700px;
    margin: 20px auto;
    margin-top: 30px;
    .paginationBttns {
        width: 700px;
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

const SearchWrapper = styled(Input)`
    margin: 30px auto 0 auto;
    border-radius: 20px;
    height: 50px;
    width: 500px;
    font-size: 25px;
`;

const BookSearch = () => {
    const dispatch = useDispatch();

    const [bookName, setBookName] = useState("");

    const [showComponent, setShowComponent] = useState(false);

    const { books, user } = useSelector((state) => state);

    const onChangeBook = useCallback(
        (e) => {
            setBookName(e.target.value);
            console.log(e.target.value);
        },
        [bookName]
    );

    useEffect(() => {
        if (books) {
        }
    }, [books]);

    const bookSearch = useCallback(() => {
        dispatch({
            type: SEARCH_BOOK_REQUEST,
            data: bookName,
        });
        setShowComponent(true);
        setTimeout(() => {
            setShowComponent(false);
        }, 1000);
    }, [bookName, books, showComponent]);

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

    const [pageNumber, setPageNumber] = useState(0);

    const PerPage = 8;
    const pagesVisited = pageNumber * PerPage;
    const pageCount = Math.ceil(books && books.length / PerPage); //올림

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const Icon = (
        <LoadingOutlined
            style={{
                fontSize: 40,
            }}
            spin
        />
    );

    return (
        <div style={{ width: 1000, margin: "auto" }}>
            <div>
                <SearchWrapper
                    onChange={onChangeBook}
                    prefix={<SearchOutlined />}
                    placeholder="책을 입력해주세요"
                    size="large"
                    onPressEnter={bookSearch}
                />

                {/* {books ? (
                    <ListWrapper
                        itemLayout="horizontal"
                        dataSource={books.slice(
                            pagesVisited,
                            pagesVisited + PerPage
                        )}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta
                                    style={{ height: 80 }}
                                    avatar={
                                        <Link to={`/book/${item.isbn}`}>
                                            <img
                                                src={item.image}
                                                width="60px"
                                            ></img>
                                        </Link>
                                    }
                                    title={item.title}
                                    description={item.author}
                                ></List.Item.Meta>
                            </List.Item>
                        )}
                    ></ListWrapper>
                ) : showComponent ? (
                    <EmptyWrapper>
                        <Empty description="검색결과없음" />
                    </EmptyWrapper>
                ) : null} */}
                {showComponent && !books ? (
                    <div style={{ width: 200, margin: "200px auto" }}>
                        <Spin indicator={Icon}></Spin>
                    </div>
                ) : null}
                <Row gutter={[0, 60]}>
                    {Array.isArray(books) ? (
                        books
                            .slice(pagesVisited, pagesVisited + PerPage)
                            .map((item) => (
                                <Col span={6}>
                                    <Card
                                        style={{
                                            margin: "15px auto",
                                            height: 200,
                                            width: 150,
                                        }}
                                        hoverable
                                        cover={
                                            <Link to={`/book/${item.isbn}`}>
                                                <img
                                                    width="150"
                                                    height="150"
                                                    src={item.image}
                                                ></img>
                                            </Link>
                                        }
                                    >
                                        <Card.Meta
                                            title={item.title}
                                        ></Card.Meta>
                                    </Card>
                                </Col>
                            ))
                    ) : books === "검색결과없음" ? (
                        <EmptyWrapper>
                            <Empty description="검색결과없음" />
                        </EmptyWrapper>
                    ) : null}
                </Row>
                {/* <Row gutter={[0, 100]}>
                    <Col span={6}>
                        <Card style={{ width: 100 }}></Card>
                    </Col>
                    <Col span={6}>
                        <Card style={{ width: 100 }}></Card>
                    </Col>

                    <Col span={6}>
                        <Card style={{ width: 100 }}></Card>
                    </Col>

                    <Col span={6}>
                        <Card style={{ width: 100 }}></Card>
                    </Col>
                    <Col span={6}>
                        <Card style={{ width: 100 }}></Card>
                    </Col>
                    <Col span={6}>
                        <Card style={{ width: 100 }}></Card>
                    </Col>

                    <Col span={6}>
                        <Card style={{ width: 100 }}></Card>
                    </Col>

                    <Col span={6}>
                        <Card style={{ width: 100 }}></Card>
                    </Col>
                </Row> */}

                <Pagination>
                    {Array.isArray(books) && (
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
        </div>
    );
};

export default BookSearch;
