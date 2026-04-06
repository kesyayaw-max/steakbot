const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);

require("dotenv").config();

const fs = require("fs");
const mongoose = require("mongoose");
const { Client, GatewayIntentBits, Collection, REST, Routes, SlashCommandBuilder } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();


// =======================
// 📂 LOAD COMMANDS
// =======================
const files = fs.readdirSync('./commands').filter(f => f.endsWith('.js'));

for (const file of files) {
  const cmd = require(`./commands/${file}`);
  client.commands.set(cmd.name, cmd);
}


// =======================
// 🚀 REGISTER SLASH COMMAND
// =======================
const slashCommands = [];

client.commands.forEach(cmd => {
  const builder = new SlashCommandBuilder()
    .setName(cmd.name)
    .setDescription(`Command ${cmd.name}`);

  // OPTIONAL ARG
  if (cmd.name === "slot" || cmd.name === "coinflip") {
    builder.addIntegerOption(opt =>
      opt.setName('bet')
        .setDescription('Jumlah taruhan')
        .setRequired(true)
    );
  }

  slashCommands.push(builder.toJSON());
});

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("🔄 Registering ALL slash commands...");

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: slashCommands }
    );

    console.log("✅ Semua slash command siap!");
  } catch (err) {
    console.error(err);
  }
})();


// =======================
// 🟢 READY EVENT + ACTIVITY
// =======================
client.on('clientReady', () => {
  console.log(`🤖 Login sebagai ${client.user.tag}`);

  const activities = [
    { name: "Tahap Pengembangan!🔥", type: 0 },
    { name: "Stay Tune! 😴", type: 3 },
    { name: "musik bisa 🎧", type: 2 },
    { name: "Rawr! 🔥", type: 0 },
    { name: "slot machine 🎰", type: 0 },
    { name: "live Like OwO 😎", type: 1, url: "https://twitch.tv/" }
  ];

  setInterval(() => {
    const act = activities[Math.floor(Math.random() * activities.length)];

    client.user.setPresence({
      activities: [{
        name: act.name,
        type: act.type,
        url: act.type === 1 ? act.url : undefined
      }],
      status: "online"
    });

  }, 3000);
});


// =======================
// 💬 PREFIX COMMAND (!)
// =======================
client.on('messageCreate', async msg => {
  if (!msg.content.startsWith(process.env.PREFIX) || msg.author.bot) return;

  const args = msg.content.slice(process.env.PREFIX.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command = client.commands.get(cmd);
  if (command) command.execute(msg, args);
});


// =======================
// ⚡ SLASH COMMAND HANDLER
// =======================
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    const fakeMsg = {
      author: interaction.user,
      content: "",
      client: interaction.client,
      reply: (data) =>
        interaction.reply(typeof data === "string" ? data : data)
    };

    const args = [];

    if (interaction.options.getInteger("bet")) {
      args.push(interaction.options.getInteger("bet"));
    }

    await command.execute(fakeMsg, args);

  } catch (err) {
    console.error(err);
    interaction.reply({ content: "❌ Error!", ephemeral: true });
  }
});


// =======================
// 🔌 CONNECT DATABASE + LOGIN
// =======================
async function startBot() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    await client.login(process.env.TOKEN);
  } catch (err) {
    console.error("❌ Gagal connect:", err);
  }
}

startBot();