export const getContent = async (contentId = 0) => {
    await axios
        .get(`/constents${contentId !== 0 ? `/${contentId}` : ""}`)
        .then((res) => {
            if (!res.ok) {
                throw Error("error");
            }
            return res.json();
        })
        .catch((err) => {
            console.error(err.message);
        });
};
