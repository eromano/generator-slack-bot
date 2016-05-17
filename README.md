<h1 align="center">Slack bot Yeoman Generator</h1>
<p align="center">
  <img title="yeoman generator" src='/assets/yeoman-logo.png' alt='yeoman logo' width="100px" height="100px" />
  <img title="slack logo" src='/assets/slack-logo.png' alt='slack logo' width="100px" height="100px" />
</p>
<p align="center">
  <a title='Build Status' href="https://travis-ci.org/eromano/generator-slack-bot" >
    <img src='https://travis-ci.org/eromano/generator-slack-bot.svg?branch=master' alt='Build Status'  />
  </a>
  <a href='https://coveralls.io/r/eromano/generator-slack-bot'>
    <img src='https://img.shields.io/coveralls/eromano/generator-slack-bot.svg' alt='Coverage Status' />
  </a>
  <a href='https://github.com/eromano/generator-slack-bot/blob/master/LICENSE'>
    <img src='https://img.shields.io/badge/license-MIT-blue.svg' alt='license' />
  </a>
  <a alt='downloads stats' href='https://npmjs.org/package/generator-slack-bot'>
    <img src='https://img.shields.io/npm/dm/generator-slack-bot.svg' alt='downloads stats' />
  </a>
  <a href="https://nodei.co/npm/generator-slack-bot/">
    <img src="http://img.shields.io/npm/v/generator-slack-bot.svg" alt='npm version' >
  </a>
  <a title='blog' href='http://eromano.github.io'>
     <img src='https://img.shields.io/badge/style-blog-blue.svg?label=my' alt='blog' />
  </a>
</p>

## About Slack bot Yeoman Generator
>Full Yeoman Generator to create Slack Bot with travis, coveralls and test.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-slack-bot using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-slack-bot
```

Then generate your new Bot:

```bash
yo slack-bot
```

<img src='assets/generator.gif' alt='generator slack bot shell' />


Which will generate the following project structure, if for example your bot name is Mazinga:

    ├── travis.yml
    ├── gitignore
    ├── jscsrc
    ├── LICENSE
    ├── README.md
    ├── app.json
    ├── package.json
    ├── Gruntfile.js
    ├── configBot.json
    ├── grunt/coveralls.js
    ├── grunt/jscs.js
    ├── grunt/jshint.js
    ├── grunt/mocha_istanbul.js
    ├── grunt/mochaTest.js
    ├── src/slackMessageAnalyzer.js
    ├── src/main.js
    ├── src/botMazinga.js
    ├── test/botMazinga.spec.js
    └── test/mockoBjects/channel.js

And run `npm install` for you to fetch all dependencies.

## Getting Started with the bot

In order to make the bot works you need a TOKEN_SLACK.
Your Slack bot integration token is obtainable at https://my.slack.com/services/new/bot.
After you have obtained your TOKEN_SLACK copy it in the configBot.json


## Main chunk of codes to understand in the generated bot

###  slackMessageAnalyzer.js

In this class you are going to find all the utility in order to analyzer the slack message

Class | Method | Parameters | Description
------------ | ------------- | ------------- | -------------
slackMessageAnalyzer.js |  createSlackMessageLink(titleLink, link) |@param {Boolean}  @param {String} titleLink  text to show instead of the pure URL <br /> @param {String} link to redirect |  Create a slack link format message
slackMessageAnalyzer.js |  createSlackMessageLink(titleLink, link) |@param {String} textMessage message to analyze <br /> @param {String} textToSearch text to search in the message |  Create a slack link format message isTextContainedInMessage

###  yourBotName.js

In this class there are the listeners for the messages

Class | Method | Parameters | Description
------------ | ------------- | ------------- | -------------
yourBotName.js |  _listenerMessage(condition, callback) |@param {Boolean}  condition to meet to call the callback  <br /> @param {Function} callback to call if the condition is satisfied | Call a callback in the case a message from slack meets the condition

## Code Example

This pice of code below will activate a listner on the hello message and will answer in the general chat wit a mssage 'Hello Answer'


```javascript
   _listenerHelloMessage() {
    this._listenerMessage(this.isHelloMessage, (function(message) {
      var message = 'Hello answer';
      var fallBack = 'Hello answer';
      var color = 'warning';
      var title = 'Hello Answer ' + slackMessageAnalyzer.createSlackMessageLink('made by slack bot generator','https://github.com/eromano/generator-slack-bot');

      this.postSlackMessage(message, fallBack, color, null, title, '', 'general');
    }).bind(this));
  }
  
  isHelloMessage(textMessage) {
    return slackMessageAnalyzer.isTextContainedInMessage(textMessage, 'hello');
  }
```

## History

For detailed changelog, see [Releases](https://github.com/eromano/generator-slack-bot/releases).

## Contributors

Contributor | GitHub profile | Twitter profile |
--- | --- | ---
Eugenio Romano (contributor)| [Eugenio Romano](https://github.com/eromano) | [@RomanoEugenio](https://twitter.com/RomanoEugenio)

All contributors [contributors](https://github.com/eromano/generator-slack-bot/graphs/contributors).

## License
[MIT](https://github.com/eromano/generator-slack-bot/blob/master/LICENSE)
 
