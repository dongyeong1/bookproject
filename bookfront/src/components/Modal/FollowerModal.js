import React, { useCallback, useState } from "react";
import { Modal, List, Avatar, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_FOLLOWER_REQUEST } from "../../reducer";
import styled from "styled-components";
import { CaretRightOutlined, CaretLeftOutlined } from "@ant-design/icons";
import ReactPaginate from "react-paginate";

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

const FollowerModal = ({
    follwerModal,
    setFollowerModal,
    followerList,
    other,
}) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state);
    const handleCancel = useCallback(() => {
        setFollowerModal(false);
    }, [follwerModal]);

    const removeFollower = useCallback(
        (id) => {
            dispatch({
                type: REMOVE_FOLLOWER_REQUEST,
                data: {
                    followerId: id,
                    userId: user.id,
                },
            });
        },
        [user]
    );

    const [pageNumber, setPageNumber] = useState(0);

    const PerPage = 8;
    const pagesVisited = pageNumber * PerPage;

    const pageCount = Math.ceil(followerList && followerList.length / PerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <div>
            <Modal
                title="팔로워목록"
                open={follwerModal}
                onOk={handleCancel}
                onCancel={handleCancel}
            >
                {followerList && (
                    <List
                        itemLayout="horizontal"
                        dataSource={
                            other
                                ? followerList.slice(
                                      pagesVisited,
                                      pagesVisited + PerPage
                                  )
                                : user.Followers.slice(
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
                                    <Button
                                        type="primary"
                                        onClick={() => removeFollower(item.id)}
                                    >
                                        삭제
                                    </Button>
                                )}
                            </List.Item>
                        )}
                    ></List>
                )}
                {followerList.length > 8 && (
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

export default FollowerModal;
