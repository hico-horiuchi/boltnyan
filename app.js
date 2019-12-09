const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.message('hello', ({ message, say }) => {
  say(`Hey there <@${message.user}>!`);
});

app.message('button', ({ message, say }) => {
  say({
    blocks: [
      {
        'type': 'section',
        'text': {
          'type': 'mrkdwn',
          'text': `Hey there <@${message.user}>!`
        },
        'accessory': {
          'type': 'button',
          'text': {
            'type': 'plain_text',
            'text': 'Click Me'
          },
          'action_id': 'button_click'
        }
      }
    ]
  });
});

app.action('button_click', ({ body, ack, say }) => {
  say(`<@${body.user.id}> clicked the button`);
  ack();
});

(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('Bolt app is running!');
})();
