import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    FOLLOW_USER_INFO_REQUEST,
    LIKE_POST_REQUEST,
    LOAD_MY_INFO_REQUEST,
    NAVER_LOGIN_REQUEST,
    UNLIKE_POST_REQUEST,
} from "../reducer";
import { Card, Empty, Rate, Modal, Button } from "antd";
import { detailDate } from "../function";
import ReactPaginate from "react-paginate";
import {
    MessageOutlined,
    ExclamationCircleOutlined,
    CaretRightOutlined,
    CaretLeftOutlined,
    HeartTwoTone,
    HeartOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import {
    KAKAO_ACCESS_TOKEN,
    NAVER_ACCESS_TOKEN,
} from "../components/LoginToken";

import PostModal from "../components/Modal/PostModal";
import FollowerModal from "../components/Modal/FollowerModal";
import FollowModal from "../components/Modal/FollowModal";
const ProfileWrapper = styled(Card)`
    width: 500px;
    height: 160px;
    margin: 20px auto;
    border-radius: 20px;
    background-color: lightGray;
`;

const Cards = styled(Card)`
    border: 1px solid lightgray;
    width: 500px;
    height: 160px;
    border-radius: 20px;
    margin: 20px auto;
`;

const ContentWrapper = styled.div`
    cursor: pointer;
`;

const CardWrapper = styled.div`
    .ant-card-meta-title {
        width: 70px;
        margin-top: 10px;
        margin-right: 300px;
    }

    .ant-card-meta-description {
        margin-right: 100px;
    }
    .ant-card-body {
        padding: 10px;
    }
    margin-top: 35px;
`;

const RateWrapper = styled(Rate)`
    position: relative;
    bottom: 90px;
    left: 160px;
`;

const Pagination = styled.div`
    margin-top: 80px;
    margin-bottom: 10px;

    .paginationBttns {
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
const PaginationWrapper = styled.div`
    width: 500px;
    margin: 20px auto;
`;

const User = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { followUserPage, user } = useSelector((state) => state);
    const navigate = useNavigate();
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
            type: FOLLOW_USER_INFO_REQUEST,
            data: {
                followUserId: id,
                userId: user.id,
            },
        });
    }, [user]);

    const [pageNumber, setPageNumber] = useState(0);

    const PerPage = 5;
    const pagesVisited = pageNumber * PerPage;

    const pageCount = Math.ceil(
        followUserPage &&
            followUserPage.Posts &&
            followUserPage.Posts.length / PerPage
    );

    const changePage = ({ selected }) => {
        setPageNumber(selected);
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

    const [modal, setModal] = useState(false);
    const [modalcontent, setModalcontent] = useState();

    const showModal = useCallback(
        (post) => {
            setModal(true);
            setModalcontent(post);
        },
        [modal]
    );

    const [followModal, setFollowModal] = useState(false);
    const [follwerModal, setFollowerModal] = useState(false);

    const [followList, setFollowList] = useState([]);
    const [followerList, setFollowerList] = useState([]);

    const followModalHandle = useCallback(
        (data) => {
            setFollowModal(true);
            setFollowList(data);
        },
        [followModal, followList]
    );

    const followerModalHandle = useCallback(
        (data) => {
            setFollowerModal(true);
            setFollowerList(data);
        },
        [follwerModal, followerList]
    );
    return (
        <div>
            {followUserPage && (
                <div>
                    <ProfileWrapper
                        actions={[
                            <div key="twit">
                                독후감갯수
                                <br />
                                {followUserPage && followUserPage.Posts
                                    ? followUserPage.Posts.length
                                    : 0}
                            </div>,
                            <div
                                onClick={() =>
                                    followModalHandle(followUserPage.Followings)
                                }
                                key="following"
                            >
                                팔로잉
                                <br />
                                {followUserPage &&
                                    followUserPage.Followings.length}
                            </div>,
                            <div
                                onClick={() =>
                                    followerModalHandle(
                                        followUserPage.Followers
                                    )
                                }
                                key="follower"
                            >
                                팔로워
                                <br />
                                {followUserPage &&
                                    followUserPage.Followers.length}
                            </div>,
                        ]}
                    >
                        <Card.Meta
                            style={{ height: 60, marginTop: 10 }}
                            title={
                                followUserPage && (
                                    <div style={{ fontSize: 22 }}>
                                        {followUserPage.nickname + "님 페이지"}
                                    </div>
                                )
                            }
                        />
                    </ProfileWrapper>

                    {followUserPage && followUserPage.Posts ? (
                        followUserPage.Posts.slice(
                            pagesVisited,
                            pagesVisited + PerPage
                        ).map((post) => (
                            <CardWrapper>
                                <Cards
                                    key={post.bookname}
                                    actions={[
                                        <div>
                                            <HeartOutlined />
                                            {" " + post.Likers.length}
                                        </div>,
                                        <div>
                                            <MessageOutlined className="icon" />
                                            {" " + post.Comments.length}
                                        </div>,
                                    ]}
                                >
                                    <Card.Meta
                                        avatar={
                                            <img
                                                src={post.src}
                                                width="70px"
                                            ></img>
                                        }
                                        title={
                                            <div>
                                                <div style={{ fontSize: 16 }}>
                                                    {post.title}
                                                </div>
                                                <span style={{ fontSize: 11 }}>
                                                    {detailDate(
                                                        new Date(post.createdAt)
                                                    )}
                                                </span>
                                            </div>
                                        }
                                        description={
                                            <ContentWrapper
                                                onClick={() => showModal(post)}
                                            >
                                                {textCut(
                                                    post.content,
                                                    15,
                                                    " ...상세보기"
                                                )}
                                            </ContentWrapper>
                                        }
                                    />
                                    <RateWrapper
                                        disabled
                                        value={post.rate}
                                    ></RateWrapper>
                                </Cards>
                            </CardWrapper>
                        ))
                    ) : (
                        <div style={{ marginTop: 150 }}>
                            <h2>등록된 독후감이 없습니다</h2>
                        </div>
                    )}
                    <PaginationWrapper>
                        <Pagination>
                            {followUserPage.Posts &&
                                followUserPage.Posts.length > 5 && (
                                    <ReactPaginate
                                        previousLabel={<CaretLeftOutlined />}
                                        nextLabel={<CaretRightOutlined />}
                                        pageCount={pageCount}
                                        onPageChange={changePage}
                                        containerClassName={"paginationBttns"}
                                    ></ReactPaginate>
                                )}
                        </Pagination>
                    </PaginationWrapper>

                    <PostModal
                        modal={modal}
                        setModal={setModal}
                        modalcontent={modalcontent}
                    ></PostModal>
                    <FollowModal
                        followModal={followModal}
                        setFollowModal={setFollowModal}
                        followList={followList}
                        other="other"
                    ></FollowModal>
                    <FollowerModal
                        follwerModal={follwerModal}
                        setFollowerModal={setFollowerModal}
                        followerList={followerList}
                        other="other"
                    ></FollowerModal>
                </div>
            )}
        </div>
    );
};

export default User;
