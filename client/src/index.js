import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";

//https://freestrokes.tistory.com/170
//커맨드 키를 누르고 URL을 클릭하면 해당 주소로 이동합니다.
//아래의 코드는 위의 블로그를 참고하여 작성한 코드입니다.
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
    queryCache: new queryCache({
        onError: (error, query) => {
            console.log("onError", error);
        },
        onSuccess: (data) => {
            console.log("onSuccess", data);
        },
    }),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <QueryClientProvider client={queryClient}>
        <RecoilRoot>
            <App />
        </RecoilRoot>
    </QueryClientProvider>
);
