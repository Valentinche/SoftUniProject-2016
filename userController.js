class UserController {
    constructor(userView, requester, baseUrl, appKey) {
        this._userView = userView;
        this._requester = requester;
        this._appKey = appKey;
        this._baseServiceUrl = baseUrl + "/user/" + appKey + "/";

    }

    showLoginPage(isLoggedIn) {
        this._userView.showLoginPage(isLoggedIn);

    }

    showRegisterPage(isLoggedIn) {
        this._userView.showRegisterPage(isLoggedIn);

    }

    login(requestData) {
        let requestUrl=this._baseServiceUrl+"login";
        this._requester.post(requestUrl,requestData,
            function success(data) {
                showPopup('success',"Браво,влязохте успешно.");
                sessionStorage['_authToken']=data._kmd.authtoken;
                sessionStorage['username']=data.username;
                sessionStorage['fullname']=data.fullname;
                redirectUrl("#/");

            },
            function  error(data) {
                showPopup('error',"Има проблем с входа/няма такъв потребител/парола");
            });

    }

    register(requestData) {
        if (requestData.username.length < 5) {
            showPopup('error', "Потребителското име трябва да е поне 6 символа.");
            return;

        }
        if (requestData.fullName.length < 8) {
            showPopup('error', " Пълното име трябва да бъде поне 8 символа.");
            return;

        }
        if (requestData.password.length < 6) {
            showPopup('error', "Паролата трябва да е поне 6 символа.");
            return;

        }
        if (requestData.password !== requestData.confirmPassword) {
            showPopup('error', "Паролите не съвпадат.");
            return;


        }
        delete requestData['confirmPassword'];
        let requestUrl = this._baseServiceUrl;
        this._requester.post(requestUrl,requestData,
            function success(data) {
                showPopup('success',"Успешно се регистрирахте.");
                redirectUrl("#/login");

            },
            function error(data) {
                showPopup('error',"Грешка при регистрация.");



            });
    }

    logout() {
        sessionStorage.clear();
        redirectUrl("#/");

    }
}