import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "antd/dist/antd.css";

import { Col, Row } from "antd";

import Signup from "./pages/SignUp";
import TopLayout from "./components/TopLayout";

import Book from "./pages/Book";
import BookSearch from "./pages/BookSearch";

import MyPage from "./pages/MyPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NaverOauth from "./pages/NaverOauth";

import KakaoOauth from "./pages/KakaoOauth";
function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <TopLayout></TopLayout>

                <Row>
                    <Col xs={24} md={24}>
                        <Routes>
                            <Route
                                exact
                                path="/"
                                element={<Home></Home>}
                            ></Route>
                            <Route
                                exact
                                path="/NaverOauth"
                                element={<NaverOauth></NaverOauth>}
                            ></Route>
                            <Route
                                exact
                                path="/KakaoOauth"
                                element={<KakaoOauth></KakaoOauth>}
                            ></Route>
                            <Route
                                exact
                                path="/booksearch"
                                element={<BookSearch></BookSearch>}
                            ></Route>
                            <Route
                                exact
                                path="/signup"
                                element={<Signup></Signup>}
                            ></Route>
                            <Route
                                exact
                                path="/book/:id"
                                element={<Book></Book>}
                            ></Route>
                            <Route
                                exact
                                path="/mypage"
                                element={<MyPage></MyPage>}
                            ></Route>
                            <Route
                                exact
                                path="/login"
                                element={<Login></Login>}
                            ></Route>
                        </Routes>
                    </Col>
                </Row>

                {/* </Col>
    
    </Row>
      */}
            </div>
        </BrowserRouter>
    );
}

export default App;
