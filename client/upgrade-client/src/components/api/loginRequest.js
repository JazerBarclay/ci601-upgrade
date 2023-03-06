import config from "../../config";

const apiLocation = `${config.SERVER_IP}/login`;

const requestLogin = async (user, pass) => {
    const request = new Request(apiLocation, {
        method: "POST",
        body: JSON.stringify({
            username: user,
            password: pass,
        }),
        headers: new Headers({
            "Content-Type": "application/json",
        }),
    });

    try {
        let res = null;
        await fetch(request)
            .then((data) => data.json())
            .then((data) => {
                console.log(data.token)
                res = data.token;
            })
            .catch((err) => {
                res = null;
            });
        return res;
    } catch (error) {
        console.warn(error);
        return null;
    }
};

export { requestLogin };
