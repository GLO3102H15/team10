var app = app || {};

(function ($) {

    app.WatchlistView = Backbone.View.extend({

        tagName: 'div',

        template: _.template($('#watchlist-template').html()),

        events: {
            "click .btn-remove-watchlist": "removeWatchlist",
            "click .btn-open-watchlist-modify-name-modal": "openWatchlistModifyNameModal",
            "click .watchlist-save-new-name-button": "changeWatchlistName",
            "click .btn-add-movie": "addMovie"
        },

        initialize: function () {
            _.bindAll(this, 'render');
        },

        render: function () {
            this.$el.html(this.template({watchlist: {}}));
            var self = this;

            self.model.fetch().complete(function() {
                self.$el.html(self.template({watchlist: self.model.toJSON()}));
                var $movieList = self.$el.find('.watchlist-movie-list');

                var movies = _.filter(self.model.attributes.movies, function(movie){
                    return movie.trackName;
                });

                if(movies.length > 0) {
                    _.each(movies, function(movie) {
                        var movieModel = new app.Movie({id: movie.trackId});
                        var movieView = new app.WatchlistMovieView({model: movieModel});
                        movieView.on('movieRemoved', self.render, self);
                        movieView.watchlistId = self.model.id;
                        $movieList.append(movieView.render().el);
                    });
                }
                else {
                    var cell = $('<td>').html('There are no movies in this watchlist yet.');
                    $movieList.html($('<tr>').html(cell));
                }

                var $movieTitle = self.$el.find('.movie-title');
                $movieTitle.autocomplete({
                    serviceUrl: '/search/movies',
                    preventBadQueries: false,
                    paramName: "q",
                    params: {limit: 10},
                    triggerSelectOnValidInput: false,
                    transformResult: function(response) {
                        response = JSON.parse(response);
                        return {
                            suggestions: response.results.map(function(element) {
                                var value = element.trackName;
                                var id = element.trackId;
                                return {value: value, data: id};
                            })
                        };
                    },
                    onSelect: function(suggestion) {
                        var movieModel = new app.Movie({id: suggestion.data});

                        movieModel.fetch().complete(function()
                        {
                            if(self.model.containsMovie(movieModel))
                            {
                                alert("A watchlist can't have the same movie twice.");
                            }
                            else
                            {
                                movieModel.isNew = function(){return true;};
                                movieModel.save({}, {url: "/watchlists/" + self.model.id + "/movies"}).complete(function()
                                {
                                    self.render();
                                });
                            }
                        });
                    }
                });
            });

            return this;
        },

        removeWatchlist: function()
        {
            var self = this;

            self.model.destroy().complete(function(){
                self.trigger("watchlistRemoved");
            });
        },

        openWatchlistModifyNameModal: function()
        {
            var $modal = this.$('.watchlist-modify-name-modal');
            $modal.modal("show");
        },

        changeWatchlistName: function()
        {
            var self = this;

            self.model.isNew = function(){return false;};
            self.model.save({name: self.$('.watchlist-change-name').val()});
            if(self.model.validationError)
            {
                alert(self.model.validationError);
            }
            else
            {
                var $modal = this.$('.watchlist-modify-name-modal');
                $modal.one('hidden.bs.modal', function()
                {
                    self.render();
                });
                $modal.modal('hide');
            }
        }
    });

})(jQuery);