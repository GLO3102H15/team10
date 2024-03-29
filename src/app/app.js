$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
    options.url = "https://umovie.herokuapp.com" + options.url;
    if (!options.beforeSend) {
        options.beforeSend = function (xhr) {
            xhr.setRequestHeader('Authorization', $.cookie("session"));
            xhr.setRequestHeader('Access-Control-Allow-Origin', "*");
        }
    }
});

var app = app || {};

(function () {

    app.htmlEncode = function (value) {
        return $('<div/>').text(value).html();
    };

    app.setActiveMenuButtonWithId = function (buttonID) {
        var buttons = document.getElementById("navbar-body").getElementsByTagName("a");
        for (var i = 0; i < buttons.length; ++i) {
            if (buttons[i].id == buttonID) {
                buttons[i].parentNode.classList.add("active");
            } else {
                if (buttons[i].parentNode.classList.contains("active")) {
                    buttons[i].parentNode.classList.remove("active");
                }
            }
        }
    };

    app.setActiveLoginMenuButton = function () {
        $("#navbar-login-button").addClass("active");
    };

    app.getYoutubeRequestFromTitle = function (title) {
        return gapi.client.youtube.search.list({
            q: title + " trailer",
            maxResults: 1,
            part: 'snippet',
            type: 'video'
        });
    };

    app.checkAuthentication = function (callback) {
        var token = $.cookie('session');

        if (!token) {
            callback(false)
        } else {
            $.ajax({
                url: '/tokenInfo',
                type: 'GET'
            }).done(function (data) {
                callback(true);
            }).fail(function (jqXHR, status) {
                $.removeCookie('session');
                callback(false);
            });
        }
    };

    app.getGravatarFromEmail = function (email) {
        var hashedEmail = CryptoJS.MD5(email);
        return "http://www.gravatar.com/avatar/" + hashedEmail + "?d=identicon";
    };

    app.createUserFromToken = function () {
        $.ajax({
            url: '/tokenInfo',
            type: 'GET'
        }).done(function (data) {
            app.currentUser = new app.User({
                name: data.name,
                email: data.email,
                id: data.id,
                following: data.following
            });
            app.headerView.render(app.currentUser);
        }).fail(function (jqXHR, status) {
            console.log("error while getting token info");
        });
    };

    app.checkAuthentication(function (isAuthenticated) {
        if (isAuthenticated) {
            app.createUserFromToken();
        }
    });

    app.headerView = new app.HeaderView();

    app.homeView = new app.HomeView({el: '#main-container'});
    app.loginView = new app.LoginView();
    app.subscribeView = new app.SubscribeView();

    app.moviesView = new app.MoviesView({el: '#main-container'});
    app.browseMoviesView = new app.BrowseMoviesView({el: '#main-container'});

    app.browseTvShowsView = new app.BrowseTvShowsView({el: '#main-container'});
    app.tvShowsView = new app.TvShowsView({el: '#main-container'});

    app.browseActorsView = new app.BrowseActorsView({el: '#main-container'});
    app.actorsView = new app.ActorsView({el: '#main-container'});

    app.watchlistsView = new app.WatchlistsView({el: '#main-container'});
    app.searchView = new app.SearchView({el: '#main-container'});
    app.userView = new app.UserView({el: '#main-container'});
})();

googleApiClientReady = function () {
    app.googleAPILoaded = true;
};