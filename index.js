// language: JavaScript, file: index.js, runtime: Node 18+, target: Discord.js v14
// env: DISCORD_TOKEN, CLIENT_ID, GUILD_ID

const {
  Client,
  GatewayIntentBits,
  Events,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  REST,
  Routes,
  MessageFlags
} = require("discord.js");

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const methods = [
  {
    id: "fisch",
    name: "FISCH",
    emoji: "🎣",
    description: "Fisch method guide",
    text: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌸 𝗙𝗜𝗦𝗖𝗛 𝗠𝗘𝗧𝗛𝗢𝗗 𝗕𝗘𝐀𝗠 🌸
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 𝐅𝐈𝐑𝐒𝐓 𝐓𝐇𝐈𝐍𝐆𝐒 𝐅𝐈𝐑𝐒𝐓!
🔹 Join ALL the Fisch Discord servers here:
🔗 https://disboard.org/search?keyword=fisch

🌊 𝐀𝐔𝐑𝐎𝐑𝐀 𝐄𝐕𝐄𝐍𝐓 – 𝟖𝐱 𝐋𝐔𝐂𝐊! 🌊
✨ Hosting Aurora with 8x Server Luck!
🎣 Popping Nuke – DM me for PS link!
⏳ Limited slots – first come, first served!

🔄 𝐓𝐑𝐀𝐃𝐈𝐍𝐆 – 𝐇𝐎𝐓 𝐈𝐓𝐄𝐌𝐒 🔄
🎁 Toxic Grove Mutants
🌿 Bloomspire: Twisted Toxins
🎣 Tranquility Rod
🔨 Stone Hammer
🌸 Dream Orchid

💎 MLF: Offers / Gems
📩 DM to negotiate!`
  },

  {
    id: "rivals",
    name: "RIVALS",
    emoji: "⚔️",
    description: "Rivals method guide",
    text: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚔️ 𝗥𝗜𝗩𝗔𝗟𝗦 𝗠𝗘𝗧𝗛𝗢𝗗 𝗕𝗘𝐀𝗠 ⚔️
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 𝐅𝐈𝐑𝐒𝐓 𝐓𝐇𝐈𝐍𝐆𝐒 𝐅𝐈𝐑𝐒𝐓!
🔹 Join the official Rivals Discord server:
🔗 https://discord.gg/nosniygames

🎯 𝐋𝐅𝐆 – 𝐋𝐎𝐎𝐊𝐈𝐍𝐆 𝐅𝐎𝐑 𝐆𝐑𝐎𝐔𝐏 🎯
👑 Looking for DIAMOND 2+ players
🌎 NA region only
🎮 DUOS RANKED / WS GRIND

⚡ 𝐐𝐔𝐈𝐂𝐊 𝐒𝐏𝐀𝐌𝐒 – 𝐂𝐎𝐏𝐘 & 𝐏𝐀𝐒𝐓𝐄 ⚡
1️⃣ LF D2+ NA DUOS – Ranked/WS grind. Hmu let's run it! 🏆
2️⃣ NEED DUO – D2+ NA. Trying to hit Rivals. Drop rank below! 📊
3️⃣ SWEATS ONLY – D2+ NA. WS grinders add me! 🔥`
  },

  {
    id: "adopt_me",
    name: "ADOPT ME",
    emoji: "🐶",
    description: "Adopt Me method guide",
    text: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🐾 𝗔𝗗𝗢𝗣𝗧 𝗠𝗘 𝗠𝗘𝗧𝗛𝗢𝗗 𝗕𝗘𝗔𝗠 🐾
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 𝐅𝐈𝐑𝐒𝐓 𝐓𝐇𝐈𝐍𝐆𝐒 𝐅𝐈𝐑𝐒𝐓!
🔹 Join Adopt Me Discord communities:
🔗 https://disboard.org/search?keyword=adopt%20me

🔄 𝐓𝐑𝐀𝐃𝐈𝐍𝐆 – 𝐇𝐎𝐓 𝐈𝐓𝐄𝐌𝐒 🔄
🦄 Candicorn
🐓 Velocirooster
🐉 Bat Dragon
🦁 Blazing Lion

💎 LF: Upgrades • Overpays • Offers
📩 QUICK DM – let's make a deal!`
  },

  {
    id: "fish_it",
    name: "FISH IT",
    emoji: "🐟",
    description: "Fish It method guide",
    text: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🐟 𝗙𝗜𝗦𝗛 𝗜𝗧! 𝗠𝗘𝗧𝗛𝗢𝗗 𝗕𝗘𝐀𝗠 🐟
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 𝐅𝐈𝐑𝐒𝐓 𝐓𝐇𝐈𝐍𝐆𝐒 𝐅𝐈𝐑𝐒𝐓!
🔹 Join the official FISH IT! Discord server:
🔗 https://discord.com/invite/3drcrjAru3

🔄 𝐓𝐑𝐀𝐃𝐈𝐍𝐆 – 𝐇𝐎𝐓 𝐈𝐓𝐄𝐌𝐒 🔄
🐉 Profane Leviathan
🦑 Ancient Kraken
🐋 Moby Whale
👾 Nessie
💎 Enchant Relics

🎁 𝐅𝐑𝐄𝐄 𝗣𝗥𝗢𝗙𝗔𝗡𝗘 𝗟𝗘𝗩𝗜𝗔𝗧𝗛𝗔𝗡 – 𝐉𝐎𝐈𝐍 𝗡𝗢𝗪! 🎁
🐉 DM ME TO JOIN SOMEONE GIVING AWAY PROFANE LEVIATHAN`
  },

  {
    id: "dahood",
    name: "DAHOOD",
    emoji: "🎮",
    description: "DaHood method guide",
    text: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔫 𝗗𝗔𝗛𝗢𝗢𝗗 𝗕𝗘𝗔𝗠 🔫
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 ACQUISITION:
🎯 Look for active trading communities
👀 Check expensive fits and rare items
🔄 Server hop through legitimate trading areas

📋 SAFE TRADING:
🤝 Be friendly and communicate honestly
🎁 Use legitimate giveaways only
💰 Verify trades before confirming
📹 Use trusted communities
🚀 Avoid pressure and fake urgency
✅ Never ask anyone for passwords or login codes`
  },

  {
    id: "bloxfruits",
    name: "BLOXFRUITS",
    emoji: "🍎",
    description: "Blox Fruits method guide",
    text: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🍎 𝗕𝗟𝗢𝗫 𝗙𝗥𝗨𝗜𝗧𝗦 𝗠𝗘𝗧𝗛𝗢𝗗 𝗕𝗘𝗔𝗠 🍎
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 𝐅𝐈𝐑𝐒𝐓 𝐓𝐇𝐈𝐍𝐆𝐒 𝐅𝐈𝐑𝐒𝐓!
🔹 Join Blox Fruits Discord communities:
🔗 https://disboard.org/search?keyword=blox%20fruits

🔄 𝐓𝐑𝐀𝐃𝗜𝗡𝗚 – 𝐇𝐎𝐓 𝐈𝐓𝐄𝐌𝐒 🔄
🐯 3x TIGERS
🐺 3x WEREWOLVES

🐉 𝐋𝐄𝐕𝐈𝐀𝐓𝐇𝐀𝐍 𝐇𝐔𝐍𝐓 – 𝐉𝐎𝐈𝐍 𝐓𝐇𝐄 𝐏𝐀𝐑𝐓𝐘! 🐉
⚔️ Hosting a Leviathan hunt
👥 Need 3 more for private server`
  },

  {
    id: "steal_brainrot",
    name: "STEAL A BRAINROT",
    emoji: "🧠",
    description: "Steal a Brainrot method",
    text: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEAL A BRAINROT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

JOIN: https://discord.gg/brainrots
⚠️ Use trading channels appropriately.

METHODS:
1) FREE PRIVATE SERVER
2) GIVEAWAY EVENTS
3) HANGOUT WITH PLAYERS
4) Trade items through legitimate channels`
  },

  {
    id: "buy_sell",
    name: "BUY AND SELL METHOD",
    emoji: "💰",
    description: "Buy and sell method",
    text: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━
'BUY/SELL METHOD'
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REQ: PC only (mobile can't hide domain)

STEPS:
1. Go to Discord Roblox selling servers
2. Find target account
3. Act like buying → ask to login to check
4. Type: roblox.com/login in address bar and leave it

SERVERS:
• https://discord.gg/Jq2YTzWtKA
• https://discord.gg/DN92bfYThS`
  },

  {
    id: "fake_friends",
    name: "FAKE FRIENDS METHOD",
    emoji: "🤝",
    description: "Fake Friends method",
    text: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━
'FAKE FRIENDS METHOD'
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 1: Be logged into an account you've used before
STEP 2: In-game, find a rich friend & join session
STEP 3: Tell them to add your new Discord (DC, cord, Disco)
STEP 4: Say: 'The reason I wanted you to add me is because I'm doing this giveaway'`
  },

  {
    id: "limited",
    name: "LIMITED METHOD",
    emoji: "💎",
    description: "Limited method",
    text: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LIMITEDS METHOD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 1: Install RoPro extension
STEP 2: Go to Rolimons trades (https://www.rolimons.com/trades)
STEP 3: Visit Roblox profile, find Discord, add and message about trading SSHF, Valk, etc.

👥 GROUP METHOD

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GROUPS METHOD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STEP 1: Create a phishing group link with members and funds
STEP 2: Send group link to target: 'Look, I have 500K+ funds'
STEP 3: Send phishing link (private server or profile user link)`
  },

  {
    id: "manipulate",
    name: "MANIPULATE METHOD",
    emoji: "🧩",
    description: "Manipulate method",
    text: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MANIPULATE METHOD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
HOW IT WORKS:
1. Once you've hit someone, tell them you'll give their account back
2. When they beam an account, say the victim didn't login
3. They'll hit even more accounts!`
  },

  {
    id: "condo_2026",
    name: "CONDO METHOD 2026",
    emoji: "🏠",
    description: "Condo Method 2026",
    text: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONDO METHOD 2026
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Watch tutorial: https://streamable.com/4xhnz4
Use TikTok bio links to redirect traffic.`
  },

  {
    id: "grow_garden_2",
    name: "GROW A GARDEN 2",
    emoji: "🌱",
    description: "Grow a Garden 2 method",
    text: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AGW2 HUSTLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🌱 TRADING:
🐉 Dragons Breath
🌸 Bloom storms
🌱 Dragon Fruit seeds
💰 Sheckles

🎁 Join legitimate giveaways and private servers.
⚠️ Verify giveaway hosts before participating.`
  },

  {
    id: "ps99",
    name: "PS99 METHOD",
    emoji: "🐾",
    description: "PS99 method",
    text: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PS99 HUSTLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🐾 TRADING:
Titanic Lucki Golem
Titanic Horseshoe Capybara
Titanic Chest Mimic
Huge Event Pets
600B Gems

💎 Always verify trades before confirming.`
  },

  {
    id: "tips_tricks",
    name: "TIPS & TRICKS",
    emoji: "💡",
    description: "Tips and tricks",
    text: `━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TIPS & TRICKS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHEN VICTIM SAYS: 'can\\'t join through links'
RESPONSE: 'Too bad then, I can\\'t add friends because of parental control settings'

WHEN VICTIM SAYS: 'it\\'s not loading'
RESPONSE: 'Open it in chrome, Roblox private server links only work on chrome'`
  }
];

function homeEmbed() {
  return new EmbedBuilder()
    .setTitle("✨ GlowMethod")
    .setDescription(
      "Select the method below to view detailed guides and instructions."
    )
    .setFooter({ text: "GlowMethod • Private Method System" });
}

function methodsEmbed() {
  return new EmbedBuilder()
    .setTitle("📌 METHOD")
    .setDescription("Choose a method below.")
    .setFooter({ text: "GlowMethod" });
}

function guideEmbed(method) {
  return new EmbedBuilder()
    .setTitle(`${method.emoji} ${method.name}`)
    .setDescription(`**STEP**\n\n${method.text}`)
    .setFooter({ text: "GlowMethod • Private Guide" });
}

function homeButtons() {
  return [
    new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("method")
        .setLabel("METHOD")
        .setStyle(ButtonStyle.Secondary)
    )
  ];
}

function methodListComponents() {
  const options = methods.map((method) => ({
    label: method.name,
    description: method.description,
    value: method.id,
    emoji: method.emoji
  }));

  return [
    new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("method_select")
        .setPlaceholder("📌 Select a method...")
        .addOptions(options)
    ),
    new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("home")
        .setLabel("⬅ BACK")
        .setStyle(ButtonStyle.Secondary)
    )
  ];
}

function guideBackButton() {
  return [
    new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("method_list")
        .setLabel("⬅ BACK")
        .setStyle(ButtonStyle.Secondary)
    )
  ];
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once(Events.ClientReady, async (bot) => {
  console.log(`✅ ${bot.user.tag} is online.`);
  console.log("DEBUG  TOKEN prefix :", TOKEN ? TOKEN.slice(0, 10) + "..." : "kosong");
  console.log("DEBUG  CLIENT_ID    :", CLIENT_ID);
  console.log("DEBUG  GUILD_ID     :", GUILD_ID);
  console.log("DEBUG  bot.user.id  :", bot.user.id);

  if (CLIENT_ID && TOKEN && GUILD_ID) {
    try {
      const rest = new REST({ version: "10" }).setToken(TOKEN);

      await rest.put(Routes.applicationCommands(CLIENT_ID), { body: [] });

      await rest.put(
        Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
        {
          body: [
            {
              name: "method",
              description: "Open the private GlowMethod menu."
            }
          ]
        }
      );

      console.log("✅ /method registered (guild-scoped).");
    } catch (error) {
      console.error("Could not register /method:", error);
    }
  } else {
    console.error("❌ CLIENT_ID atau GUILD_ID belum di-set.");
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  try {
    if (
      interaction.isChatInputCommand() &&
      interaction.commandName === "method"
    ) {
      try {
        await interaction.user.send({
          embeds: [homeEmbed()],
          components: homeButtons()
        });

        await interaction.reply({
          content: "📩 GlowMethod has been sent to your DMs!",
          flags: MessageFlags.Ephemeral
        });
      } catch {
        await interaction.reply({
          content:
            "❌ I couldn't send you a DM. Please enable Direct Messages from this server and try again.",
          flags: MessageFlags.Ephemeral
        });
      }

      return;
    }

    if (interaction.isButton()) {
      if (interaction.customId === "method") {
        await interaction.update({
          embeds: [methodsEmbed()],
          components: methodListComponents()
        });
        return;
      }

      if (interaction.customId === "home") {
        await interaction.update({
          embeds: [homeEmbed()],
          components: homeButtons()
        });
        return;
      }

      if (interaction.customId === "method_list") {
        await interaction.update({
          embeds: [methodsEmbed()],
          components: methodListComponents()
        });
        return;
      }
    }

    if (
      interaction.isStringSelectMenu() &&
      interaction.customId === "method_select"
    ) {
      const method = methods.find(
        (item) => item.id === interaction.values[0]
      );

      if (!method) {
        await interaction.reply({
          content: "❌ Method not found.",
          flags: MessageFlags.Ephemeral
        });
        return;
      }

      await interaction.update({
        embeds: [guideEmbed(method)],
        components: guideBackButton()
      });
    }
  } catch (error) {
    console.error(error);

    if (!interaction.replied && !interaction.deferred) {
      await interaction
        .reply({
          content: "❌ An error occurred while processing the menu.",
          flags: MessageFlags.Ephemeral
        })
        .catch(() => {});
    }
  }
});

if (!TOKEN) {
  console.error("❌ DISCORD_TOKEN is missing.");
  process.exit(1);
}

client.login(TOKEN);
