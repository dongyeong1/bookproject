import React, { useCallback, useState } from "react";
import { List, Modal, Button, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { UNFOLLOW_REQUEST } from "../../reducer";
import { useNavigate } from "react-router-dom";
import { CaretRightOutlined, CaretLeftOutlined } from "@ant-design/icons";
import ReactPaginate from "react-paginate";
import styled from "styled-components";
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

const Lists = styled(List)`
    .ant-spin-nested-loading
        > .ant-spin-container
        > .ant-list-items
        > .ant-list-item
        > div
        > .ant-btn {
        border-radius: 20px;
    }
`;

const ButtonWrapper = styled.div`
    .otheruser {
        border-radius: 20px;
        margin-right: 10px;
    }
    .followcancel {
        border-radius: 20px;
    }
`;

const FollowModal = ({ followModal, setFollowModal, followList, other }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleCancel = useCallback(() => {
        setFollowModal(false);
    }, [followModal]);
    const { user, unfollowLoading } = useSelector((state) => state);

    const unfollow = useCallback((id) => {
        dispatch({
            type: UNFOLLOW_REQUEST,
            data: { followUserId: id, userId: user.id },
        });
    }, []);

    const userPage = useCallback((id) => {
        navigate(`/user/${id}`);
    }, []);

    const [pageNumber, setPageNumber] = useState(0);

    const PerPage = 8;
    const pagesVisited = pageNumber * PerPage;

    const pageCount = Math.ceil(followList && followList.length / PerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div>
            <Modal
                title="팔로잉목록"
                open={followModal}
                onOk={handleCancel}
                onCancel={handleCancel}
            >
                {followList && (
                    <Lists
                        itemLayout="horizontal"
                        dataSource={
                            other
                                ? followList.slice(
                                      pagesVisited,
                                      pagesVisited + PerPage
                                  )
                                : user.Followings.slice(
                                      pagesVisited,
                                      pagesVisited + PerPage
                                  )
                        }
                        renderItem={(item, index) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                                        />
                                    }
                                    title={item.nickname}
                                ></List.Item.Meta>
                                {other ? null : (
                                    <ButtonWrapper>
                                        <Button
                                            type="primary"
                                            className="otheruser"
                                            onClick={() => userPage(item.id)}
                                        >
                                            독후감보기
                                        </Button>
                                        <Button
                                            loading={unfollowLoading}
                                            type="primary"
                                            className="followcancel"
                                            onClick={() => unfollow(item.id)}
                                        >
                                            팔로우취소
                                        </Button>
                                    </ButtonWrapper>
                                )}
                            </List.Item>
                        )}
                    ></Lists>
                )}
                {followList.length > 8 && (
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
            </Modal>
        </div>
    );
};

export default FollowModal;
