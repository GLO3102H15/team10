var app = app || {};

(function ($) {

    app.LoginView = Backbone.View.extend({

        el: '#main-container',

        template: _.template($("#login-template").html()),

        events: {
            "click #btn-login-confirm": "login",
            "click #subscribe-link": "goToSubscription"
        },

        initialize: function () {
            _.bindAll(this, 'render');
        },

        render: function () {
            app.headerView.render("");
            this.$el.html(this.template());
        },

        login: function() {
            $("#login-form").submit(function(e) {
                var htmlForm = $('#login-form');

                if(htmlForm.length > 0) {
                    var form = htmlForm.parsley();

                    if(form.isValid()) {
                        var userEmail = $("#input-email").val();
                        var userPassword = $("#input-password").val();

                        var userModel = new app.User({email: userEmail, password: userPassword});

                        userModel.login(function(data, error) {
                            if(!error) {
                                userModel.attributes.name = data.name;
                                userModel.attributes.id = data.id;
                                userModel.attributes.following = data.following;
                                app.currentUser = userModel;

                                app.Router.navigate("", {trigger: true});
                                app.headerView.render(userModel);
                            } else {
                                if(data.status === 401) {
                                    $('#error-message').text("Bad credentials").fadeOut(4000, function() {
                                        $('#error-message').text('').show();
                                    });
                                }
                            }
                        })
                    }
                }
                return false; // prevents default POST on submit
            });
        },

        goToSubscription: function() {
            app.Router.navigate("subscribe", {trigger: true});
        }
    });

})(jQuery);
