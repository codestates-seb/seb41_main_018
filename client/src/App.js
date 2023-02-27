import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ScrollToTop from "./util/ScrollToTop";
import Header from "../src/pages/components/Header";
import Home from "../src/pages/HomePage/Home";
import Login from "../src/pages/Login,SignUp/Login";
import SignUp from "../src/pages/Login,SignUp/SignUp";
import Mypage from "../src/pages/MyPage/MyPage";
import Detail from "../src/pages/DetailPage/Detail";
import Post from "../src/pages/PostPage/Post";
import Edit from "./pages/PostPage/Edit";
import Result from "../src/pages/Result/Result";
import Footer from "../src/pages/components/Footer";
import "./App.css";

const App = () => {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Header />
            {/* {!["/signup", "/login"].includes(location.pathname.slice(0, 6)) && <Footer />} */}
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
                <Route path="/mypage" element={<Mypage />}></Route>
                <Route path="/detail/:contentId" element={<Detail />}></Route>
                <Route path="/post" element={<Post />}></Route>
                <Route path="/edit" element={<Edit />}></Route>
                <Route path="/result" element={<Result />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
