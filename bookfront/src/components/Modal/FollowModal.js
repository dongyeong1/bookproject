import React, { useCallback } from "react";
import { Modal } from "antd";

const FollowModal = ({ followModal, setFollowModal, followList }) => {
    const handleCancel = useCallback(() => {
        setFollowModal(false);
    }, [followModal]);
    return (
        <div>
            <Modal
                title="팔로우목록"
                open={followModal}
                onOk={handleCancel}
                onCancel={handleCancel}
            >
                {followList &&
                    followList.map((f, i) => (
                        <div>
                            <p>{f.nickname}</p>
                        </div>
                    ))}
            </Modal>
        </div>
    );
};

export default FollowModal;
