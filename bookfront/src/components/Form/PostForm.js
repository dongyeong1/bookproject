import React, { useCallback, useState, useEffect } from "react";
import { Input, Button, Form, Rate } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
    ADD_POST_REQUEST,
    LOAD_MY_INFO_REQUEST,
    NAVER_LOGIN_REQUEST,
    REMOVE_POST_REQUEST,
} from "../../reducer";
import BookSearchFormModal from "../Modal/BookSearchFormModal";
import BookImageSelect from "../BookImageSelect";
import { Modal } from "antd";
import styled from "styled-components";
import { KAKAO_ACCESS_TOKEN, NAVER_ACCESS_TOKEN } from "../LoginToken";

const ErrorContent = styled.div`
    color: red;
    margin: auto;
    width: 120px;
`;

const ErrorWrapper = styled.div`
    margin-top: 5px;
    width: 400px;
`;
const ImageErrorWrapper = styled.div`
    margin-top: 5px;

    width: 350px;
`;

const FormItem = styled(Form.Item)`
    label {
        font-size: 20px;
    }
`;

const ReviewWrapper = styled.div`
    display: flex;
`;

const ContentWrapper = styled.div`
    .textArea {
        border: 0px;
        margin-top: 20px;
        width: 400px;
        height: 120px;
    }

    margin-left: 50px;
    margin-top: 30px;
    .ant-input {
        border: 0px;
        width: 400px;
    }
    .ant-rate {
        margin-top: 5px;
        margin-right: 270px;
        width: 200px;
    }
    .ant-btn {
        border-radius: 100px;
        margin-left: 150px;
    }
`;
const TextArea = styled(Input.TextArea)``;

const PostForm = ({ reviewSetModal }) => {
    const { post, user, addPostLoading } = useSelector((state) => state);

    const [imageError, setImageError] = useState(false);
    const [titleError, setTitleError] = useState(false);
    const [rateError, setRateError] = useState(false);
    const [textError, setTextError] = useState(false);

    const [searchedBook, setSearchedBook] = useState(null);
    const [title, setTitle] = useState();
    const [text, setText] = useState();
    const [rate, setRate] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        if (post && post.id) {
            successModals();
        }
    }, [post]);

    useEffect(() => {
        if (searchedBook) {
            setImageError(false);
        }
    }, [searchedBook]);

    const [modal, setModal] = useState(false);
    const onChangeText = useCallback(
        (e) => {
            setText(e.target.value);
            setTextError(false);
        },
        [text]
    );

    const onChangeTitle = useCallback(
        (e) => {
            setTitle(e.target.value);
            setTitleError(false);
        },
        [title]
    );

    const onChangeRate = useCallback(
        (e) => {
            setRate(e);
            setRateError(false);
        },
        [rate]
    );

    const showModal = useCallback(() => {
        setModal(true);
    }, [modal]);

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

    const submitText = useCallback(() => {
        if (text && searchedBook && title && rate) {
            dispatch({
                type: ADD_POST_REQUEST,
                data: {
                    userId: user.id,
                    title,
                    text,
                    rate,
                    isbn: searchedBook.isbn,
                    image: searchedBook.image,
                    bookname: searchedBook.title,
                },
            });
        } else {
            if (!text) {
                setTextError(true);
            }
            if (!searchedBook) {
                setImageError(true);
            }
            if (!title) {
                setTitleError(true);
            }
            if (!rate) {
                setRateError(true);
            }
        }
    }, [
        text,
        searchedBook,
        title,
        rate,
        imageError,
        titleError,
        rateError,
        textError,
    ]);

    const successModals = () => {
        Modal.success({
            content: "독후감 등록완료",
            onOk() {
                dispatch({
                    type: REMOVE_POST_REQUEST,
                });
                reviewSetModal(false);
            },
        });
    };

    return (
        <div>
            <Form layout="vertical" onFinish={submitText}>
                <ReviewWrapper>
                    <div>
                        <BookImageSelect
                            setImageError={setImageError}
                            searchedBook={searchedBook}
                            showModal={showModal}
                        ></BookImageSelect>
                        {imageError ? (
                            <ImageErrorWrapper>
                                <ErrorContent>책을 검색해주세요!</ErrorContent>
                            </ImageErrorWrapper>
                        ) : null}
                    </div>

                    <ContentWrapper>
                        <FormItem label="제목" required>
                            <Input
                                value={title}
                                onChange={onChangeTitle}
                                placeholder="제목을 입력해주세요"
                            ></Input>
                            {titleError ? (
                                <ErrorWrapper>
                                    <ErrorContent>
                                        제목을 입력해주세요!
                                    </ErrorContent>
                                </ErrorWrapper>
                            ) : null}
                        </FormItem>
                        <FormItem label="평점" required>
                            <Rate
                                defaultValue={0}
                                onChange={onChangeRate}
                                value={rate}
                            ></Rate>
                            {rateError ? (
                                <ErrorWrapper>
                                    <ErrorContent>
                                        평점을 입력해주세요!
                                    </ErrorContent>
                                </ErrorWrapper>
                            ) : null}
                        </FormItem>
                        <FormItem label="내용" required>
                            <Input.TextArea
                                className="textArea"
                                value={text}
                                placeholder="내용을 입력해주세요"
                                onChange={onChangeText}
                            ></Input.TextArea>
                            {textError ? (
                                <ErrorWrapper>
                                    <ErrorContent>
                                        내용을 입력해주세요!
                                    </ErrorContent>
                                </ErrorWrapper>
                            ) : null}
                        </FormItem>
                        <Button
                            size="large"
                            type="primary"
                            htmlType="submit"
                            loading={addPostLoading}
                        >
                            등록하기
                        </Button>
                    </ContentWrapper>
                </ReviewWrapper>
            </Form>
            <BookSearchFormModal
                setModal={setModal}
                modal={modal}
                setSearchedBook={setSearchedBook}
            ></BookSearchFormModal>
        </div>
    );
};

export default PostForm;
