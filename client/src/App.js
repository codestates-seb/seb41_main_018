import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "../src/util/ScrollToTop";
import Header from "./components/Header";
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import SignUp from "../src/pages/SignUp";
import Mypage from "../src/pages/Mypage";
import Detail from "../src/pages/Detail";
import Post from "../src/pages/Post";
import Result from "../src/pages/Result";
import "./App.css";

const App = () => {
    return (
        <BrowserRouter basename="/">
            <ScrollToTop />
            <Header />
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
                <Route path="/mypage" element={<Mypage />}></Route>
                <Route path="/detail" element={<Detail />}></Route>
                <Route path="/post" element={<Post />}></Route>
                <Route path="/result" element={<Result />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
