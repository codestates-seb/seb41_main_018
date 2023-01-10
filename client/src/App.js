const App = () => {
    return (
        <Router basename="/">
            <ScrollToTop />
            <Header />
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/mypage" element={<Mypage />}></Route>
            <Route path="/detail" element={<Detail />}></Route>
            <Route path="/post" element={<Post />}></Route>
            <Route path="/result" element={<Result />}></Route>
        </Router>
    );
};

export default App;
