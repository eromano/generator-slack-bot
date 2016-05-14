/*global describe, it, beforeEach, afterEach */
'use strict';

var  <%= botNameCamelCase %> = require('../src/<%= botNameCamelCase %>');
var expect = require('chai').expect;
var sinon = require('sinon');
var Bot = require('slackbots');

describe('Bot Initialization', function () {

  beforeEach(function () {
    this.textCheck = '';

    this.slackbotStub = sinon.stub(Bot.prototype, 'postTo', (name, text, params) => {
      this.textCheck = params.attachments[0].text;
    });

    this.loginStub = sinon.stub(Bot.prototype, 'login', function () {});

    this.<%= botNameCamelCaseNoFirst %> = new <%= botNameCamelCase %>('Fake-token-slack');
    this.<%= botNameCamelCaseNoFirst %>.run();
  });

  afterEach(function () {
    this.slackbotStub.restore();
    this.loginStub.restore();
  });

  it('should the BOT token present', function () {
    expect(this.<%= botNameCamelCaseNoFirst %>.bot.token).to.be.equal('Fake-token-slack');
  });

  it('should the BOT say hello to the the channel when start', function () {
    this.<%= botNameCamelCaseNoFirst %>.bot.emit('start');

    expect(this.textCheck).to.be.equal('Hello I am <%= botName %>');
  });
});
