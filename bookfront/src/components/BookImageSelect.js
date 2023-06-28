import React, { useEffect } from "react";
import { Button, Card } from "antd";
import styled from "styled-components";

const Cards = styled(Card)`
    margin-top: 30px;
    width: 350px;
    height: 460px;

    .ant-card-meta-description {
        border-radius: 30px;
        margin-left: 80px;
    }
`;

const ButtonWrapper = styled.div`
    text-align: center;
    .button {
        border-radius: 30px;
        margin-top: 200px;
    }
`;

const BookImageSelect = ({ showModal, searchedBook }) => {
    return (
        <div>
            {searchedBook ? (
                <Cards
                    hoverable
                    cover={
                        <img
                            alt="example"
                            height="400"
                            src={searchedBook.image}
                        />
                    }
                >
                    <Card.Meta
                        title={searchedBook.title}
                        description={
                            <Button
                                style={{ borderRadius: 20, marginTop: 30 }}
                                type="primary"
                                size="large"
                                onClick={showModal}
                            >
                                {" "}
                                다른책 검색하기
                            </Button>
                        }
                    ></Card.Meta>
                </Cards>
            ) : (
                <Cards hoverable>
                    <ButtonWrapper>
                        <Button
                            className="button"
                            type="primary"
                            size="large"
                            onClick={showModal}
                        >
                            책 검색하기
                        </Button>
                    </ButtonWrapper>
                </Cards>
            )}
        </div>
    );
};

export default BookImageSelect;
