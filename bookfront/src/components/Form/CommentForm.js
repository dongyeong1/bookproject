import React, { useCallback, useState } from "react";
import { Form, Input, Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ADD_COMMENT_REQUEST } from "../../reducer";
import styled from "styled-components";

const ButtonWrapper = styled(Button)`
    border-radius: 30px;
    margin-top: 5px;
    margin-left: auto;
`;

const Textarea = styled(Input.TextArea)`
    @media screen and (max-width: 600px) {
        width: 480px;
        margin: auto;
    }
`;

const Forms = styled(Form)`
    @media screen and (max-width: 600px) {
        width: 480px;
        margin: auto;
    }
`;

const CommentForm = ({ bookpostId }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state);

    const [comment, setComment] = useState("");
    const onChangeComment = useCallback(
        (e) => {
            setComment(e.target.value);
        },
        [comment]
    );

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

    const commentModal = () => {
        Modal.info({
            content: (
                <div>
                    <h3>댓글을 입력 해주세요!</h3>
                </div>
            ),
            centered: true,
            fontSize: 20,
        });
    };
    const onSubmit = () => {
        if (user) {
            if (comment && comment.trim().length !== 0) {
                dispatch({
                    type: ADD_COMMENT_REQUEST,
                    data: {
                        comment,
                        userId: user.id,
                        postId: bookpostId,
                    },
                });
            } else {
                commentModal();
            }
        } else {
            loginModal();
        }
    };

    return (
        <Forms onFinish={onSubmit}>
            <Textarea value={comment} onChange={onChangeComment}></Textarea>
            <ButtonWrapper size="large" type="primary" htmlType="submit">
                댓글작성
            </ButtonWrapper>
        </Forms>
    );
};

export default CommentForm;
