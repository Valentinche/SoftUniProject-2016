class HomeView {
    constructor(wrapperSelector,mainContentSelector){
      this._wrapperSelector=wrapperSelector;
        this._mainContentSelector=mainContentSelector;
    }
    showGuestPage(mainContentData,mainData){
        let _that=this;
        $.get('templates/welcome-guest.html',function (template) {
            let renderedWrapper=Mustache.render(template,null);
            $(_that._wrapperSelector).html(renderedWrapper);

            $.get('templates/recent-posts.html',function (template) {
                let recentPost={
                    recentPosts:mainContentData
                   
                };
                let renderedRecentPosts=Mustache.render(template,recentPost);
                $('.recent-posts').html(renderedRecentPosts);

            });
            $.get('templates/posts.html',function (template) {
                let blogPosts={
                    blogPosts: mainData
                };
                let renderedPosts=Mustache.render(template,blogPosts);
                $('.articles').html(renderedPosts);

            });
            
            
        });

    }
    showUserPage(sideBarData,mainData){
        let _that=this;
        $.get('templates/welcome-user.html',function (template) {
            let renderedWrapper=Mustache.render(template,null);
            $(_that._wrapperSelector).html(renderedWrapper);
            $.get('templates/recent-posts.html',function (template) {
                let recentPost={
                    recentPosts:sideBarData

                };
                let renderedRecentPosts=Mustache.render(template,recentPost);
                $('.recent-posts').html(renderedRecentPosts);

            });
            $.get('templates/posts.html',function (template) {
                let blogPosts={
                    blogPosts: mainData
                };
                let renderedPosts=Mustache.render(template,blogPosts);
                $('.articles').html(renderedPosts);

            });

        });
    }
    //user Salad page

    showUserSaladPage(sideBarData,mainData){
    let _that=this;
    $.get('templates/welcome-user-salads.html',function (template) {
        let renderedWrapper = Mustache.render(template, {category:{name:"salad"}});

        $(_that._wrapperSelector).html(renderedWrapper);

       /* $.get('templates/recent-posts.html', function (template) {
            let recentPost = {
                recentPosts: sideBarData

            };
            let renderedRecentPosts = Mustache.render(template, recentPost);
            $('.recent-posts').html(renderedRecentPosts);

        });*/

        $.get('templates/posts.html', function (template) {
            let blogPosts = {
                blogPosts: mainData
            };
            console.log(blogPosts);
            var saladPosts = [];
            blogPosts.blogPosts.forEach(function(post){
               if(post.category === "Салата"){
                   saladPosts.push(post);
               }
            });
            let renderedSalads = Mustache.render(template, saladPosts);
            console.log(saladPosts);
            $('.articles').html(renderedSalads);


        });
    });
}
}