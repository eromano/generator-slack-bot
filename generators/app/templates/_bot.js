'use strict';

var Bot = require('slackbots');
var assert = require('assert');
var slackMessageAnalyzer = require('./slackMessageAnalyzer');

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
    this._listenerHelloMessage();
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

      this.postSlackMessage(message, fallBack, color, null, title, titleLink, 'general');
    }).bind(this));
  }

  /**
   * Post a message on slack chat in answer to hello
   */
  _listenerHelloMessage() {
    this._listenerMessage(this.isHelloMessage, (function(message) {
      var message = 'Hello answer';
      var fallBack = 'Hello answer';
      var color = 'warning';
      var title = 'Hello Answer ' + slackMessageAnalyzer.createSlackMessageLink('made by slack bot generator','https://github.com/eromano/generator-slack-bot');

      this.postSlackMessage(message, fallBack, color, null, title, '', 'general');
    }).bind(this));
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

  /**
   * Call a callback in the case a message from slack meets the condition
   *
   * @param {Boolean}  condition to meet to call the callback
   * @param {Function} callback to call if the condition is satisfied
   */
  _listenerMessage(condition, callback) {
    this.bot.on('message', (function(message) {
      if (condition.call(this, message.text)) {
        callback.call(this, message);
      }
    }).bind(this));
  }

  /**
   * recognize if in the message is present the command "hello"
   *
   * @param {String} textMessage to analyze
   */
  isHelloMessage(textMessage) {
    return slackMessageAnalyzer.isTextContainedInMessage(textMessage, 'hello');
  }
}

module.exports = <%= botNameCamelCase %>;
