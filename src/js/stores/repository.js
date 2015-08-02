var Reflux = require('reflux');
var Actions = require('../actions/actions');
var apiRequests = require('../utils/api-requests');

var RepositoryStore = Reflux.createStore({
  listenables: Actions,

  init: function () {
    this._releases = [];
  },

  onGetReleases: function (repo) {
    apiRequests
      .get('https://api.github.com/repos/' + repo + '/releases')
      .end(function (err, response) {
        if (response && response.ok) {
          // Success - Do Something.
          Actions.getReleases.completed(response.body);
        } else {
          // Error - Show messages.
          Actions.getReleases.failed(err);
        }
      });
  },

  onGetReleasesCompleted: function (releases) {
    this._releases = releases;
    this.trigger(this._releases);
  },

  onGetReleasesFailed: function () {
    this._releases = [];
    this.trigger(this._releases);
  }

});

module.exports = RepositoryStore;
