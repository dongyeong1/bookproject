import React, { useCallback } from "react";
import { Modal } from "antd";

const PostModal = ({ modalcontent, modal, setModal }) => {
    const handleCancel = useCallback(() => {
        setModal(false);
    }, [modal]);
    return (
        <div>
            {modalcontent && (
                <Modal
                    title={modalcontent.title}
                    open={modal}
                    onOk={handleCancel}
                    onCancel={handleCancel}
                >
                    <p>{modalcontent.content}</p>
                </Modal>
            )}
        </div>
    );
};

export default PostModal;
