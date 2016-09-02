class PostController{
    constructor(postView, requester, baseUrl,appKey){
        this._postView = postView;
        this._requester =requester;
        this._appKey=appKey;
        this._baseServiceUrl=baseUrl+ "/appdata/"+appKey+"/posts";
    }
    showCreatePostPage(data, isLoggedIn){
        this._postView.showCreatePostPage(data,isLoggedIn);
    }
    createPost(requestData){
        if(requestData.title.length<5){
            showPopup('error',"Заглавието трябва да съдържа поне 5 символа.");
            return;
        }
        if(requestData.author.length<3){
            showPopup('error'," Авторът трябва да съдържа поне 3 символа.");
            return;
        }
        if(requestData.content.length<10){
            showPopup('error',"Съдържанието трябва да съдържа поне 10 символа.");
            return;
        }
        let requesterUrl=this._baseServiceUrl;
        this._requester.post(requesterUrl, requestData,
            function success(data) {
                showPopup('success',"Успешно създадохте рецепта.");
                redirectUrl("#/");

            },
            function error(data) {
                showPopup('error',"Има проблем със създаването на рецепта.");

            });

    }
}