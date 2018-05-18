export const updateWelcomeMessage = (data) => {
    return getCurrentUserInfo()
        .then(function(user) {
            data.welcomeMessage = data.welcomeMessage
                .replace("<first>", user.firstName)
                .replace("<last>", user.lastName)
                .replace("<id>", user.name)
            return data
        })
}

const getCurrentUserInfo = () => {
    return fetch("/services/userapi/currentUser", {
            method: "get",
            credentials: "same-origin"
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            return data;
        })
}