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
  let user = body.user.id;
  let value = body.actions[0].value;

  ack({
    text: 'Would you like to play a game?',
    attachments: [{
      text: `Choose a game to play\n\n<@${user}> clicked ${value}`,
      color: '#3AA3E3',
      attachment_type: 'default',
    }]
  });
});
