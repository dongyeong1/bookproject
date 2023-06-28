import React, { useState, useCallback, useEffect } from "react";
import { Card, Avatar, List, Modal, Comment, Rate } from "antd";
import {
    HeartTwoTone,
    HeartOutlined,
    MessageOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
    LIKE_POST_REQUEST,
    LOAD_MY_INFO_REQUEST,
    NAVER_LOGIN_REQUEST,
    UNLIKE_POST_REQUEST,
} from "../reducer";
import CommentForm from "./Form/CommentForm";
import { detailDate } from "../function";
import FollowButton from "./FollowButton";
import { KAKAO_ACCESS_TOKEN, NAVER_ACCESS_TOKEN } from "./LoginToken";

const Cards = styled(Card)`
    border: 1px solid lightgray;
    width: 500px;
    height: 160px;
    margin-bottom: 70px;
    margin-top: 20px;
    border-radius: 20px;
    .icon {
        margin-left: 10px;
        font-size: 15px;
    }

    .ant-card-meta-description {
        cursor: pointer;
    }
    .ant-card-meta-title {
        font-size: 16px;
    }
    .rate {
        position: relative;
        bottom: 90px;
        left: 150px;
    }
`;
// cursor:'pointer'
const CardWrapper = styled.div`
    .ant-card-meta-title {
        width: 70px;
        margin-right: 370px;
    }
    .ant-card-meta-description {
        margin-right: 100px;
        // margin-top:30px;
    }
    margin-bottom: 100px;
    width: 500px;
    margin: auto;
`;

const PostCard = ({ bookpost }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state);
    const id = useSelector((state) => state.user && state.user.id);
    const [like, setLike] = useState(false);
    const [showComment, setShowComment] = useState(false);

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

    const onLike = useCallback(
        (postId) => {
            if (user) {
                dispatch({
                    type: LIKE_POST_REQUEST,
                    data: { postId, userId: user.id },
                });
                setLike((prev) => !prev);
            } else {
                loginModal();
            }
        },
        [like, user]
    );

    const onUnLike = (postId) => {
        if (user) {
            dispatch({
                type: UNLIKE_POST_REQUEST,
                data: { postId, userId: user.id },
            });
            setLike((prev) => !prev);
        } else {
            loginModal();
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

    const onToggleComment = useCallback(() => {
        setShowComment((prev) => !prev);
    }, [showComment]);

    const liked = bookpost.Likers.find((v) => v.id === id);

    const [modal, setModal] = useState(false);

    const handleCancel = useCallback(() => {
        setModal(false);
    }, [modal]);

    const showModal = useCallback(() => {
        setModal(true);
    }, [modal]);
    return (
        <CardWrapper key={bookpost.id}>
            <Cards
                actions={[
                    <div>
                        {liked ? (
                            <div
                                onClick={() => onUnLike(bookpost.id)}
                                style={{ borderRadius: 50 }}
                            >
                                좋아요{bookpost.Likers.length}개
                                <HeartTwoTone
                                    className="icon"
                                    size="large"
                                ></HeartTwoTone>
                            </div>
                        ) : (
                            <div
                                onClick={() => onLike(bookpost.id)}
                                style={{ borderRadius: 50 }}
                            >
                                좋아요{bookpost.Likers.length}개
                                <HeartOutlined
                                    size="large"
                                    className="icon"
                                ></HeartOutlined>
                            </div>
                        )}
                    </div>,
                    <div>
                        <div onClick={onToggleComment}>
                            댓글{bookpost.Comments.length}개
                            <MessageOutlined className="icon" />
                        </div>
                    </div>,
                    <div>{user && <FollowButton bookpost={bookpost} />}</div>,
                ]}
            >
                <Card.Meta
                    avatar={
                        <Avatar size="large">{bookpost.User.nickname}</Avatar>
                    }
                    title={
                        <div>
                            <div>{bookpost.title}</div>
                            <span style={{ fontSize: 11 }}>
                                {detailDate(new Date(bookpost.createdAt))}
                            </span>
                        </div>
                    }
                    description={
                        <div onClick={showModal}>
                            {textCut(bookpost.content, 15, " ...상세보기")}
                        </div>
                    }
                />

                <Rate
                    className="rate"
                    defaultValue={bookpost.rate}
                    disabled
                ></Rate>
            </Cards>

            {showComment ? (
                <div>
                    <CommentForm bookpostId={bookpost.id}></CommentForm>
                    <div>
                        <List
                            dataSource={bookpost.Comments}
                            renderItem={(item) => (
                                <li>
                                    <Comment
                                        author={item.User.nickname}
                                        content={item.content}
                                        avatar={
                                            <Avatar>
                                                {item.User.nickname[0]}
                                            </Avatar>
                                        }
                                    />
                                </li>
                            )}
                        ></List>
                    </div>
                </div>
            ) : null}
            <Modal
                title={bookpost.title}
                open={modal}
                onOk={handleCancel}
                onCancel={handleCancel}
            >
                <p>{bookpost.content}</p>
            </Modal>
        </CardWrapper>
    );
};

export default PostCard;
