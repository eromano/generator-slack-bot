'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var mockery = require('mockery');
var os = require('os');

describe('slack-bott:app', function () {
  before(function () {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false
    });
  });

  after(function () {
    mockery.disable();
  });

  it('can be imported without blowing up', function () {
    var app = require('../generators/app');
    assert(app !== undefined);
  });

  describe('defaults', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .inDir(path.join(os.tmpdir(), './temp'))
        .withPrompts({
          botName: 'bot-mazinga',
          description: 'Mazinger Z is a Japanese super robot manga series written and illustrated by Go Nagai',
          githubAccount: 'mazingaAccount',
          authorName: 'Go Nagai',
          authorEmail: 'Go.Nagai@mazinga.com',
          authorUrl: 'http://mazinga.io',
          keywords: ['mazinga-keyword', 'bot-keyword', 'great-robot'],
          license: 'MIT'
        })
        .on('end', done);
    });

    it('created and CD into a folder named like the component', function () {
      assert.equal(path.basename(process.cwd()), 'bot-mazinga');
    });

    it('creates files', function () {
      var expected = [
        '.travis.yml',
        '.gitignore',
        '.jscsrc',
        'LICENSE',
        'README.md',
        'app.json',
        'package.json',
        'Gruntfile.js',
        'configBot.json',
        'grunt/coveralls.js',
        'grunt/jscs.js',
        'grunt/jshint.js',
        'grunt/mocha_istanbul.js',
        'grunt/mochaTest.js',
        'src/main.js',
        'src/botMazinga.js',
        'test/botMazinga.spec.js'
      ];

      assert.file(expected);
    });

    it('fills the package.json with bot data', function () {
      assert.fileContent('package.json', 'bot-mazinga');
      assert.fileContent('package.json', 'Go Nagai');
      assert.fileContent('package.json', 'Mazinger Z is a Japanese super robot manga series written and illustrated by Go Nagai');
      assert.fileContent('package.json', 'https://github.com/mazingaAccount/bot-mazinga.git');
    });

    it('fills the app.json with bot data', function () {
      assert.fileContent('app.json', 'bot-mazinga');
      assert.fileContent('app.json', 'Mazinger Z is a Japanese super robot manga series written and illustrated by Go Nagai');
      assert.fileContent('app.json', 'https://github.com/mazingaAccount/bot-mazinga.git');
    });

    it('fills the main.js with bot data', function () {
      assert.fileContent('src/main.js', 'var BotMazinga = require(\'./BotMazinga\');');
      assert.fileContent('src/main.js', 'this.botMazinga = new BotMazinga(tokenSlack)');
    });

    it('fills the bot.spec.js with bot data', function () {
      assert.fileContent('test/botMazinga.spec.js', 'var  BotMazinga = require(\'../src/BotMazinga\');');
      assert.fileContent('test/botMazinga.spec.js', 'this.botMazinga = new BotMazinga(\'Fake-token-slack\');');
    });

    it('fills the bot.js with bot data', function () {
      assert.fileContent('src/botMazinga.js', 'class BotMazinga');
      assert.fileContent('src/botMazinga.js', 'Hello I am bot-mazinga');
    });

    it('fills the readme.md with bot and author data', function () {
      assert.fileContent('readme.md', '## About bot-mazinga');
      assert.fileContent('readme.md', '(https://github.com/mazingaAccount/bot-mazinga/releases)');
      assert.fileContent('readme.md', 'Go Nagai  (Creator) | [mazingaAccount](https://github.com/mazingaAccount) |');
    });

  });
});
