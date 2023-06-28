/* eslint-disable no-unused-vars */
import React, { useCallback, useState } from "react";
import { Input, Button, Rate, Modal, Form, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { POST_EDIT_REQUEST } from "../../reducer";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Modals from "react-modal";
import styled from "styled-components";

const CardWrapper = styled(Card)`
    margin-top: 30px;
    width: 350px;
    height: 510px;
`;

const ReviewWrapper = styled.div`
    display: flex;
`;

const FormItem = styled(Form.Item)`
    label {
        font-size: 20px;
    }
`;
const ContentWrapper = styled.div`
    .textArea {
        border: 0px;
        margin-top: 20px;
        width: 400px;
        height: 150px;
    }

    .ant-rate {
        margin-top: 5px;
        margin-right: 270px;
    }

    .ant-btn {
        border-radius: 100px;
        margin-left: 150px;
    }
    margin-left: 50px;
    margin-top: 70px;

    .ant-input {
        border: 0px;
        width: 400px;
    }
`;
const PostEditModal = ({ editModal, setEditModal, post }) => {
    const { postEditLoading } = useSelector((state) => state);
    const customStyles = {
        content: {
            width: 900,
            height: 600,
            margin: "auto",
        },
    };
    const { confirm } = Modal;

    const dispatch = useDispatch();
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [rate, setRate] = useState(post.rate);

    const onChangeTitle = useCallback(
        (e) => {
            setTitle(e.target.value);
        },
        [title]
    );

    const onChangeContent = useCallback(
        (e) => {
            setContent(e.target.value);
        },
        [content]
    );

    const onChangeRate = useCallback(
        (e) => {
            setRate(e);
        },
        [rate]
    );

    const handleCancel = useCallback(() => {
        setEditModal(false);
    }, []);

    const EditPostSubmit = useCallback(() => {
        dispatch({
            type: POST_EDIT_REQUEST,
            data: {
                postId: post.id,
                title,
                content,
                rate,
            },
        });
    }, [title, content, rate, post]);

    const showConfirm = useCallback(() => {
        confirm({
            title: "수정하시겠습니까?",
            icon: <ExclamationCircleOutlined />,

            onOk() {
                console.log("OK");
                EditPostSubmit();
                setEditModal(false);
            },

            onCancel() {
                console.log("Cancel");
            },
        });
    });

    const br = (text) => {
        console.log("asdasdas", text);
        if (text.length > 20) {
            const a = text.substr(0, 20);
            const b = text.substr(20);
            const c = a + "\n" + b;
            return c;
        } else {
            return text;
        }
    };

    const textCut = (txt, len, lastTxt) => {
        if (len == "" || len == null) {
            len = 20;
        }
        if (lastTxt == "" || lastTxt == null) {
            lastTxt = "...";
        }
        if (txt.length > len) {
            txt = txt.substr(0, len) + lastTxt;
        }
        return txt;
    };
    return (
        <div>
            {post && (
                <Modals
                    style={customStyles}
                    isOpen={editModal}
                    onRequestClose={handleCancel}
                >
                    <Form layout="vertical" onFinish={showConfirm}>
                        <ReviewWrapper>
                            <div>
                                <CardWrapper
                                    hoverable
                                    cover={
                                        <img
                                            alt="example"
                                            height="400"
                                            src={post.src}
                                        />
                                    }
                                >
                                    <Card.Meta
                                        title={<div>{post.bookname}</div>}
                                    ></Card.Meta>
                                </CardWrapper>
                            </div>

                            <ContentWrapper>
                                <FormItem label="제목" required>
                                    <Input
                                        placeholder={post.title}
                                        value={title}
                                        onChange={onChangeTitle}
                                    ></Input>
                                </FormItem>
                                <FormItem label="평점" required>
                                    <Rate
                                        Rate
                                        te
                                        placeholder={post.rate}
                                        value={rate}
                                        defaultValue={post.rate}
                                        onChange={onChangeRate}
                                    ></Rate>
                                </FormItem>
                                <FormItem label="내용" required>
                                    <Input.TextArea
                                        className="textArea"
                                        placeholder={post.content}
                                        value={content}
                                        onChange={onChangeContent}
                                    ></Input.TextArea>
                                </FormItem>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={postEditLoading}
                                >
                                    수정하기
                                </Button>
                            </ContentWrapper>
                        </ReviewWrapper>
                    </Form>
                </Modals>
            )}
        </div>
    );
};

export default PostEditModal;
