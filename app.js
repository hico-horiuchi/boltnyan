const { App, LogLevel } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: LogLevel.DEBUG
});

app.message('hello', ({ message, say }) => {
  say(`Hey there <@${message.user}>!`);
});

// https://api.slack.com/docs/message-buttons
app.message('game', ({ message, say }) => {
  say({
    text: 'Would you like to play a game?',
    attachments: [{
      text: 'Choose a game to play',
      fallback: 'You are unable to choose a game',
      callback_id: 'wopr_game',
      color: '#3AA3E3',
      attachment_type: 'default',
      actions: [{
        name: 'game',
        text: 'Chess',
        type: 'button',
        value: 'chess'
      }, {
        name: 'game',
        text: "Falken's Maze",
        type: 'button',
        value: 'maze'
      }, {
        name: 'game',
        text: 'Thermonuclear War',
        style: 'danger',
        type: 'button',
        value: 'war',
        confirm: {
          title: 'Are you sure?',
          text: "Wouldn't you prefer a good game of chess?",
          ok_text: 'Yes',
          dismiss_text: 'No'
        }
      }]
    }]
  });
});

app.action({ callback_id: 'wopr_game' }, ({ body, ack, say }) => {
  ack();
  say(`<@${body.user.id}> clicked ${body.actions[0].value}`);
});

app.error((error) => {
	console.error(error);
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('Bolt app is running!');
})();
