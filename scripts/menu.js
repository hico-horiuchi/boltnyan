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
  let user = body.user.id;
  let value = body.actions[0].selected_options[0].value;

  ack({
    text: 'Would you like to play a game?',
    attachments: [{
      text: `Choose a game to play\n\n<@${user}> selected ${value}`,
      color: '#3AA3E3',
      attachment_type: 'default',
    }]
  });
});
