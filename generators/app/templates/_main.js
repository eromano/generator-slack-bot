var <%= botNameCamelCase %> = require('./<%= botNameCamelCase %>');
var nconf = require('nconf');

nconf.add('config', {type: 'file', file: './configBot.json'});

try {
  var tokenSlack = process.env.TOKEN_SLACK || nconf.get('tokenslack');

  this.<%= botNameCamelCaseNoFirst %> = new <%= botNameCamelCase %>(tokenSlack);
  this.<%= botNameCamelCaseNoFirst %>.run();
} catch (error) {
  console.log('Bot failed' + error);
}
