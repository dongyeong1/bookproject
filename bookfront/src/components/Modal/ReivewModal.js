import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { REMOVE_POST_REQUEST } from "../../reducer";
import Modals from "react-modal";
import PostForm from "../Form/PostForm";
const customStyles = {
    content: {
        width: 900,
        height: 600,
        margin: "auto",
    },
};

const ReviewModal = ({ modal, setModal }) => {
    const dispatch = useDispatch();

    const handleCancel = useCallback(() => {
        dispatch({
            type: REMOVE_POST_REQUEST,
        });
        setModal(false);
    }, []);

    return (
        <div>
            <Modals
                style={customStyles}
                isOpen={modal}
                onRequestClose={handleCancel}
            >
                <PostForm reviewSetModal={setModal}></PostForm>
            </Modals>
        </div>
    );
};

export default ReviewModal;
