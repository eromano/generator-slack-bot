'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var askName = require('inquirer-npm-name');
var githubUsername = require('github-username');
var path = require('path');
var mkdirp = require('mkdirp');
var _ = require('lodash');

function makeBotName(name) {
  name = _.kebabCase(name);
  return name;
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

module.exports = yeoman.Base.extend({

  initializing: function () {
    this.props = {};
  },

  prompting: function () {
    var done = this.async();

    this.log(yosay(
      'Welcome to the awesome slack bot generator!'
    ));

    askName({
      name: 'botName',
      message: 'What\'s the name of your Bot?',
      default: makeBotName(path.basename(process.cwd())),
      filter: makeBotName,
      validate: function (str) {
        return str.length > 0;
      }
    }, this, function (name) {
      this.props.botName = name;
      done();
    }.bind(this));
  },

  default: function () {
    if (path.basename(this.destinationPath()) !== this.props.botName) {
      this.log(
        'Your bot must be inside a folder named ' + this.props.botName + '\n' +
        'I\'ll automatically create this folder.'
      );
      mkdirp(this.props.botName);
      this.destinationRoot(this.destinationPath(this.props.botName));
    }
  },

  askFor: function () {
    var done = this.async();

    var prompts = [{
      name: 'description',
      message: 'How would you describe the bot?'
    }, {
      name: 'authorName',
      message: 'Author\'s Name',
      default: this.user.git.name(),
      store: true
    }, {
      name: 'authorEmail',
      message: 'Author\'s Email',
      default: this.user.git.email(),
      store: true
    }, {
      name: 'authorUrl',
      message: 'Author\'s Homepage',
      store: true
    }, {
      name: 'keywords',
      message: 'Package keywords (comma to split)',
      filter: function (words) {
        return words.split(/\s*,\s*/g);
      }
    }];

    this.prompt(prompts, function (props) {
      this.props = _.extend(this.props, props);
      done();
    }.bind(this));
  },

  askForGithubAccount: function () {
    var done = this.async();

    if (validateEmail(this.props.authorEmail)) {
      githubUsername(this.props.authorEmail, function (err, username) {
        if (err) {
          username = username || '';
        }

        var prompts = [{
          name: 'githubAccount',
          message: 'GitHub username or organization',
          default: username
        }];

        this.prompt(prompts, function (props) {
          this.props = _.extend(this.props, props);
          done();
        }.bind(this));
      }.bind(this));
    } else {
      done();
    }
  },

  writing: function () {
    this.props.botNameCamelCase = _.chain(this.props.botName).camelCase().upperFirst();
    this.props.botNameCamelCaseNoFirst = _.chain(this.props.botName).camelCase();

    this.fs.copy(
      this.templatePath('_.gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copy(
      this.templatePath('_.jscsrc'),
      this.destinationPath('.jscsrc')
    );

    this.fs.copy(
      this.templatePath('_.jshintrc'),
      this.destinationPath('.jshintrc')
    );

    this.fs.copy(
      this.templatePath('_.travis.yml'),
      this.destinationPath('.travis.yml')
    );

    this.fs.copyTpl(
      this.templatePath('_app.json'),
      this.destinationPath('app.json'),
      {
        botName: this.props.botName,
        description: this.props.description,
        githubAccount: this.props.githubAccount
      }
    );

    var currentPkg = this.fs.readJSON(this.destinationPath('app.json'), {});
    var pkg = _.extend({
      keywords: this.props.keywords
    }, currentPkg);

    this.fs.writeJSON(this.destinationPath('app.json'), pkg);

    this.fs.copy(
      this.templatePath('_Gruntfile.js'),
      this.destinationPath('Gruntfile.js')
    );

    this.fs.copy(
      this.templatePath('grunt/_coveralls.js'),
      this.destinationPath('grunt/coveralls.js')
    );

    this.fs.copy(
      this.templatePath('grunt/_jscs.js'),
      this.destinationPath('grunt/jscs.js')
    );

    this.fs.copy(
      this.templatePath('grunt/_jshint.js'),
      this.destinationPath('grunt/jshint.js')
    );

    this.fs.copy(
      this.templatePath('grunt/_mocha_istanbul.js'),
      this.destinationPath('grunt/mocha_istanbul.js')
    );

    this.fs.copy(
      this.templatePath('grunt/_mochaTest.js'),
      this.destinationPath('grunt/mochaTest.js')
    );

    this.fs.copy(
      this.templatePath('_configBot.json'),
      this.destinationPath('configBot.json')
    );

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        botName: this.props.botName,
        description: this.props.description,
        authorName: this.props.authorName,
        githubAccount: this.props.githubAccount
      }
    );

    currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});
    this.props.keywords.push("alfresco-component");

    pkg = _.extend({
      keywords: this.props.keywords
    }, currentPkg);

    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath('README.md'),
      {
        botName: this.props.botName,
        description: this.props.description,
        githubAccount: this.props.githubAccount,
        authorName: this.props.authorName,
        authorUrl: this.props.authorUrl
      }
    );

    this.fs.copyTpl(
      this.templatePath('_main.js'),
      this.destinationPath('src/main.js'),
      {
        botNameCamelCase: this.props.botNameCamelCase,
        botNameCamelCaseNoFirst: this.props.botNameCamelCaseNoFirst
      }
    );

    this.fs.copyTpl(
      this.templatePath('_bot.js'),
      this.destinationPath('src/' + this.props.botNameCamelCaseNoFirst + '.js'),
      {
        botName: this.props.botName,
        botNameCamelCase: this.props.botNameCamelCase
      }
    );

    this.fs.copyTpl(
      this.templatePath('_bot.js'),
      this.destinationPath('src/' + this.props.botNameCamelCaseNoFirst + '.js'),
      {
        botName: this.props.botName,
        botNameCamelCase: this.props.botNameCamelCase
      }
    );

    this.fs.copyTpl(
      this.templatePath('_test/_bot.spec.js'),
      this.destinationPath('test/' + this.props.botNameCamelCaseNoFirst + '.spec.js'),
      {
        botName: this.props.botName,
        botNameCamelCase: this.props.botNameCamelCase,
        botNameCamelCaseNoFirst: this.props.botNameCamelCaseNoFirst
      }
    );

    this.composeWith('license', {
      options: {
        name: this.props.authorName,
        email: this.props.authorEmail,
        website: this.props.authorUrl
      }
    }, {
      local: require.resolve('generator-license/app')
    });
  },

  install: function () {
    if (!this.options['skip-install']) {
      this.npmInstall();
    }
  }
});

