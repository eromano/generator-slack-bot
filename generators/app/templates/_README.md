<h1 align="center"><%= botName %></h1>
<p align="center">
    <a title='Build Status' href="https://travis-ci.org/<%= githubAccount %>/<%= botName %>">
        <img src='https://travis-ci.org/<%= githubAccount %>/<%= botName %>.svg?branch=master' alt='travis Status' />
    </a>
    <a title='coveralls Status' href='https://coveralls.io/r/<%= githubAccount %>/<%= botName %>'>
        <img src='https://img.shields.io/coveralls/<%= githubAccount %>/<%= botName %>.svg' alt='Coverage Status' />
    </a>
</p>
<p align="center">
    <a title='closed issue' href='http://issuestats.com/github/<%= githubAccount %>/<%= botName %>'>
        <img src='http://issuestats.com/github/<%= githubAccount %>/<%= botName %>/badge/issue' alt='issue stats' />
    </a>
    <a title='blog' href='<%= authorUrl %>'>
       <img src='https://img.shields.io/badge/style-blog-blue.svg?label=my' alt='blog' />
    </a>
</p>

## About <%= botName %>
><%= botName %> is a  node.js slack bot.
<%= description %>

## Bot Command list

* Just to start type hello in the general chat after invited the bot in it
   
    ``` hello  ```


## Install Getting Started
1. Create a new [bot integration](https://my.slack.com/services/new/bot)
1. Choose between **One-Click Heroku** or **Manual Heroku**

 - **One-Click Heroku**
       Click this button:

       [![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

 - **Manual Heroku**
    *  Install [Heroku toolbelt](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)
    * Create a new bot integration (as above)
    *  `heroku create`
    *  `heroku config:set TOKEN_SLACK=[Your Slack bot integration token (obtainable at https://my.slack.com/services/new/bot)]`
    *  `git push heroku master`


## Development

* To test <%= botName %>

    ```$ npm run-script test```

* To debug <%= botName %>

    ```$ npm run-script debug```

* To see the test coverage <%= botName %>

    ```$ npm run-script coverage```

* To run <%= botName %> on your machine

    ```$ npm run-script start```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b <%= botName %>`
3. Commit your changes: `git commit -a `
4. Push to the branch: `git push origin <%= botName %>`
5. Submit a pull request

## History

For detailed changelog, check [Releases](https://github.com/<%= githubAccount %>/<%= botName %>/releases).

### Contributors

Contributor | GitHub profile | 
--- | --- | ---
<%= authorName %>  (Creator) | [<%= githubAccount %>](https://github.com/<%= githubAccount %>) | 

