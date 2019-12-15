const { App, LogLevel } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: LogLevel.DEBUG
});

app.message('boltnyan hello', ({ message, say }) => {
  say(`Hey there <@${message.user}>!`);
});

// https://api.slack.com/docs/message-buttons
app.message('boltnyan button', ({ message, say }) => {
  say({
    text: 'Would you like to play a game?',
    attachments: [{
      text: 'Choose a game to play',
      fallback: 'You are unable to choose a game',
      callback_id: 'game_button',
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

app.action({ callback_id: 'game_button' }, ({ body, ack, say }) => {
  ack(`<@${body.user.id}> clicked ${body.actions[0].value}`);
});

// https://api.slack.com/docs/message-menus
app.message('boltnyan menu', ({ message, say }) => {
  say({
    text: 'Would you like to play a game?',
    response_type: 'in_channel',
    attachments: [{
      text: 'Choose a game to play',
      fallback: "If you could read this message, you'd be choosing something fun to do right now.",
      color: '#3AA3E3',
      attachment_type: 'default',
      callback_id: 'game_menu',
      actions: [{
        name: 'games_list',
        text: 'Pick a game...',
        type: 'select',
        options: [{
          text: 'Hearts',
          value: 'hearts'
        }, {
          text: 'Bridge',
          value: 'bridge'
        }, {
          text: 'Checkers',
          value: 'checkers'
        }, {
          text: 'Chess',
          value: 'chess'
        }, {
          text: 'Poker',
          value: 'poker'
        }, {
          text: "Falken's Maze",
          value: 'maze'
        }, {
          text: 'Global Thermonuclear War',
          value: 'war'
        }]
      }]
    }]
  });
});

app.action({ callback_id: 'game_menu' }, ({ body, ack, say }) => {
  ack(`<@${body.user.id}> selected ${body.actions[0].selected_options[0].value}`);
});

app.error((error) => {
  console.error(error);
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('Bolt app is running!');
})();
