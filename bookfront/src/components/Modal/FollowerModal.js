import React, { useCallback, useState } from "react";
import { Modal } from "antd";

const FollowerModal = ({ follwerModal, setFollowerModal, followerList }) => {
    const handleCancel = useCallback(() => {
        setFollowerModal(false);
    }, [follwerModal]);
    return (
        <div>
            <Modal
                title="팔로워목록"
                open={follwerModal}
                onOk={handleCancel}
                onCancel={handleCancel}
            >
                {followerList &&
                    followerList.map((f, i) => (
                        <div>
                            <p>{f.nickname}</p>
                        </div>
                    ))}
            </Modal>
        </div>
    );
};

export default FollowerModal;
