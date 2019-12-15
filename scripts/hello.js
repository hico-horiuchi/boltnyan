app.message(`boltnyan hello`, ({ message, say }) => {
  say(`Hey there <@${message.user}>!`);
});
