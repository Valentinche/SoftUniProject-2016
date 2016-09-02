(function () {

    // Create your own kinvey application

    let baseUrl = "https://baas.kinvey.com";
    let appKey = "kid_HJja-Kli"; // Place your appKey from Kinvey here...
    let appSecret = "f90be2bcaa6f45b5b99caba8607a6274"; // Place your appSecret from Kinvey here...
    let _guestCredentials = "9ae26f72-54f1-46f1-931e-c3a633786fe7.cUC4OKlf3tzIiLCC32pf6ZCR44hpP6EU3GygK380AKQ="; // Create a guest user using PostMan/RESTClient/Fiddler and place his authtoken here...

    //Create AuthorizationService and Requester

    let selector = ".wrapper";
    let mainContentSelector = ".main-content";
    let authService = new AuthorizationService(baseUrl,
        appKey,
        appSecret,
        _guestCredentials);
    let requester = new Requester(authService);
    authService.initAuthorizationType("Kinvey");

    

    // Create HomeView, HomeController, UserView, UserController, PostView and PostController
    let homeView = new HomeView(selector, mainContentSelector);

    let homeController=new HomeController(homeView,requester,baseUrl,appKey);

    let userView = new UserView(selector,mainContentSelector);
    let userController=new UserController(userView,requester,baseUrl,appKey);
    let postView = new PostView(selector,mainContentSelector);
    let postController = new PostController(postView, requester, baseUrl, appKey);
    //postController.showCreatePostPage();
    // userController.showLoginPage();
    // userController.showRegisterPage();
    // homeController.showGuestPage();
    homeView.showGuestPage();
    initEventServices();

    onRoute("#/", function () {
        // Check if user is logged in and if its not show the guest page, otherwise show the user page...
        if(!authService.isLoggedIn()){
            homeController.showGuestPage();
        }
        else{
            homeController.showUserPage();
        }
    });

    onRoute("#/post-:id", function () {
        // Create a redirect to one of the recent posts...
        let top=$("#post-"+ this.params['id']).position().top;
        $(window).scrollTop(top);
    });

    onRoute("#/login", function () {
        // Show the login page...
        userController.showLoginPage(authService.isLoggedIn())
    });

    onRoute("#/register", function () {
        // Show the register page...
        userController.showRegisterPage(authService.isLoggedIn())
    });

    onRoute("#/logout", function () {
        // Logout the current user...
        userController.logout();
    });

    onRoute('#/posts/create', function () {
        // Show the new post page...
        let data={
            fullname:sessionStorage['fullname']
        }
        postController.showCreatePostPage(data,authService.isLoggedIn())
    });
    //salad page
    onRoute('#/welcome-user-salads',function () {
        // Check if user is logged in and if its not show the guest salad page, otherwise show the user salad page...
        if(!authService.isLoggedIn()){
            homeController.showGuestPage();
        }
        else{
            homeController.showUserSaladPage();
        }
    })



    bindEventHandler('login', function (ev, data) {
        // Login the user...
        userController.login(data);
    });

    bindEventHandler('register', function (ev, data) {
        // Register a new user...
        userController.register(data);
    });

    bindEventHandler('createPost', function (ev, data) {
        // Create a new post...
        postController.createPost(data);
    });

    run('#/');
})();