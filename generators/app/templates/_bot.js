'use strict';

var Bot = require('slackbots');
var assert = require('assert');

class <%= botNameCamelCase %> {

  /**
   * @param {String} slackToken Your Slack bot integration token (obtainable at https://my.slack.com/services/new/bot)
   */
  constructor(slackToken) {
    assert(slackToken, 'Slack Token is necessary obtain it at https://my.slack.com/services/new/bot and copy in configBot.json');

    var settingsBot = {
      token: slackToken,
      name: '<%= botName %>'
    };

    this.bot = new Bot(settingsBot);
  }

  run() {
    this._startChannelMessageListner();
  }

  /**
   * Post a message in any channel where the bot is present at Start
   */
  _startChannelMessageListner() {
    this.bot.on('start', (function() {
      var message = 'Hello I am <%= botName %>';
      var fallBack = '<%= botName %> is here';
      var color = 'warning';
      var title = '<%= botName %> greetings';
      var titleLink = 'Hello I am <%= botName %>';

      this.postSlackMessage(message, fallBack, color, null, title, titleLink,'general');
    })).bind(this);
  }

  /**
   * Post a message in the slack general chat
   *
   * @param {String} message
   * @param {String} fallback
   * @param {successColor|failColor|infoColor} color of the vertical line before the message default infoColor yellow
   * @param {Array} fields is an Array of messages  { 'title': 'Project', 'value': 'Awesome Project','short': true},
   * @param {String} title title message,
   * @param {String} titleLink link message
   * @param {String} nameChannelOrUser where posts a message  channel | group | user by name,
   */
  postSlackMessage(message, fallback, color, fields, title, titleLink, nameChannelOrUser) {
    var params = {
      as_user: true,
      attachments: [
        {
          'fallback': fallback,
          'color': color || this.infoColor,
          'title': title ? title : '<%= botName %>',
          'title_link': titleLink,
          'text': message,
          'fields': fields,
          'mrkdwn_in': ['text', 'pretext']
        }
      ]
    };

    this.bot.postTo(nameChannelOrUser, '', params);
  }
}

module.exports = <%= botNameCamelCase %>;
