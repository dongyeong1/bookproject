import React, { useCallback, useState, useEffect } from "react";
import { Modal, Input, Empty, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
    BOOKS_REMOVE_REQUEST,
    MODAL_SEARCH_BOOK_REMOVE,
    MODAL_SEARCH_BOOK_REQUEST,
    SEARCH_BOOK_REMOVE,
    SEARCH_BOOK_REQUEST,
} from "../../reducer";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import {
    SearchOutlined,
    CaretRightOutlined,
    CaretLeftOutlined,
    LoadingOutlined,
} from "@ant-design/icons";

const Pagination = styled.div`
    margin-top: 50px;
    .paginationBttns {
        width: 90%;
        height: 10px;
        list-style: none;
        display: flex;
        justify-content: center;
    }

    .paginationBttns a {
        height: 1px;
        padding: 7px;
        margin: 10px;
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

const ModalWrapper = styled(Modal)`
    display: block;
`;

const ResultWrapper = styled.div`
    margin-top: 30px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    height: 200px;
    overflow-y: auto;
`;

const ContetnWrapper = styled.div`
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-right: auto;
`;

const SearchWrapper = styled(Input)`
    margin-left: 130px;
    border-radius: 20px;
    height: 40px;
    width: 200px;
    font-size: 15px;
`;
const EmptyWrapper = styled.div`
    margin-top: 10px;
`;

const TitleWrapper = styled.div`
    margin-left: 20px;
`;

const SpinWrapper = styled.div`
    width: 100px;
    margin: 50px auto;
`;
const BookSearchFormModal = ({ setModal, modal, setSearchedBook }) => {
    const [bookName, setBookName] = useState("");
    const [showComponent, setShowComponent] = useState(false);

    const onChangeBook = useCallback(
        (e) => {
            setBookName(e.target.value);
        },
        [bookName]
    );

    const dispatch = useDispatch();

    const { books, modalBooks } = useSelector((state) => state);

    const bookSearch = useCallback(() => {
        dispatch({
            type: MODAL_SEARCH_BOOK_REQUEST,
            data: bookName,
        });
        setShowComponent(true);

        setTimeout(() => {
            setShowComponent(true);
        }, 100);
    }, [bookName, modalBooks, showComponent]);

    const imageClick = useCallback(
        (title, isbn, image) => () => {
            setSearchedBook({ title, isbn, image });
            dispatch({
                type: MODAL_SEARCH_BOOK_REMOVE,
            });
            setBookName("");
            setModal(false);
            setShowComponent(false);
        },
        [bookName, modal]
    );

    const handleCancel = useCallback(() => {
        console.log("cancel");
        setBookName("");
        setModal(false);
        setShowComponent(false);
        dispatch({
            type: BOOKS_REMOVE_REQUEST,
        });
    }, [modal]);

    //paginate

    const [pageNumber, setPageNumber] = useState(0);

    const PerPage = 5;
    const pagesVisited = pageNumber * PerPage;

    const pageCount = Math.ceil(modalBooks && modalBooks.length / PerPage);

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
        <div>
            <ModalWrapper
                open={modal}
                onOk={handleCancel}
                onCancel={handleCancel}
            >
                <SearchWrapper
                    value={bookName}
                    onChange={onChangeBook}
                    prefix={<SearchOutlined />}
                    placeholder="책을 입력해주세요"
                    onPressEnter={bookSearch}
                />
                <ResultWrapper>
                    {showComponent && !modalBooks ? (
                        <SpinWrapper>
                            <Spin indicator={Icon}></Spin>
                        </SpinWrapper>
                    ) : null}
                    {Array.isArray(modalBooks) ? (
                        modalBooks
                            .slice(pagesVisited, pagesVisited + PerPage)
                            .map((v) => (
                                <ContetnWrapper
                                    onClick={imageClick(
                                        v.title,
                                        v.isbn,
                                        v.image
                                    )}
                                >
                                    <img src={v.image} width="50px"></img>
                                    <TitleWrapper>{v.title}</TitleWrapper>
                                </ContetnWrapper>
                            ))
                    ) : modalBooks === "검색결과없음" ? (
                        <EmptyWrapper>
                            <Empty description="검색결과없음" />
                        </EmptyWrapper>
                    ) : null}
                </ResultWrapper>

                {Array.isArray(modalBooks) && modalBooks.length > 8 && (
                    <Pagination>
                        <ReactPaginate
                            previousLabel={<CaretLeftOutlined />}
                            nextLabel={<CaretRightOutlined />}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={"paginationBttns"}
                        ></ReactPaginate>
                    </Pagination>
                )}
            </ModalWrapper>
        </div>
    );
};

export default BookSearchFormModal;
