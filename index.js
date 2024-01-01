var readline = require("readline");

var rl = readline.createInterface(process.stdin, process.stdout);

rl.question("Enter Bot's Token: ", async (token) => {
  await startFunction(token);
});

async function startFunction(token) {
  token = token.replaceAll('"', "");

  const { Client, GatewayIntentBits } = require("discord.js");

  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  try {
    await client.login(token);

    console.log(require("chalk").green.bold(`Bot's Username: ${client.user.tag}\nBot's ID: ${client.user.id}`));

    const user = await client.users.fetch("317048153079545856", { force: true });

    await user.createDM();

    console.log(require("chalk").green.bold("Flagged: ") + require("chalk").red.bold("false"));

    try {
      await user.deleteDM();
    } catch (err) {}
  } catch (err) {
    if (err.code == "TokenInvalid") return console.log(require("chalk").red.bold("Token is Invalid !"));
    if (err.code == 20026) return console.log(require("chalk").green.bold("Flagged: ") + require("chalk").red.bold("true"));
    console.log(err);
  }

  console.log();

  rl.question("Enter Bot's Token: ", async (t) => {
    await startFunction(t);
  });
}
