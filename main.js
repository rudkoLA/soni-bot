const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();
const version = "v2.16.1";
const prefix = "+";

function randomNumber(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function doubleDigit(number) { return number.toString().length < 2 ? `0${number}` : number; }
function date() { const date = new Date(); return `[${doubleDigit(date.getHours())}:${doubleDigit(date.getMinutes())}]`; }

function react(emoteName, emoteID, message, serverID)
{
    if (message.guild.id === serverID)
    {
        if (message.content.toLowerCase().startsWith(emoteName) ||
            message.content.toLowerCase().includes(" " + emoteName) ||
            message.content.toLowerCase().includes(":" + emoteName))
        {
            try
            {
                message.react(message.guild.emojis.cache.get(emoteID)).then(() => console.log(`${date()} Reacted with emote ${emoteName} in #${message.channel.name}, ${message.guild.name}`));
            }
            catch (err)
            {
                console.log(`${date()} Failed to react with emote ${emoteName} in #${message.channel.name}, ${message.guild.name} with error ${err}`);
            }
        }
    }
}

function respond(message, title, description)
{
    message.channel.send(
        {
            embed: {
                color: 0x3ba3a1,
                author: {
                    name: "Soni Bot",
                    icon_url: "https://cdn.discordapp.com/avatars/755787461040537672/8d9976baa914802cab2e4c9ecd5a9b29.webp"
                },
                fields: [
                    {
                        name: title,
                        value: description
                    }
                ]
            }
        }
    )
}

client.on("message", function(message)
{
    // Reactions
    react("ew", "769328775979728926", message, "329019997894475777");
    react("ew", "808988372948615178", message, "599483748337319955");
    react("dbrug", "808989500058894376", message, "599483748337319955");

    if (message.author.id === "170927851577671680") message.react("😐").then(() => console.log(`${date()} Reacted with neutral_face on message from boremac`)); // React with neutral_face if message author is boremac

    if (message.author.bot) return;                             // Ignore if message author is a bot
    if (!message.content.startsWith(prefix)) return;            // Ignore if message does not start with prefix

    const commandBody = message.content.slice(prefix.length);   // Remove prefix from string
    const args = commandBody.split(' ');                // Split args from command
    const command = args.shift().toLowerCase();                 // Store command in const command

    let reply = null;                                           // Initialise reply to null

    switch (command)
    {
        case "changelog":
            message.channel.send(
                {
                    embed: {
                        color: 0x3ba3a1,
                        author: {
                            name: "Soni Bot Changelog",
                            icon_url: "https://cdn.discordapp.com/avatars/755787461040537672/8d9976baa914802cab2e4c9ecd5a9b29.webp"
                        },
                        fields: [
                            {
                                name: `${version} changelog:`,
                                value: `\u2022 Internal changes`
                            }
                        ]
                    }
                }
            )
            break;
        case "sven": respond(message, "Facts about Sven", "\u2022 He is Fatal's idiot sandwich\n\u2022 Is everyone's favourite feeder\n\u2022 Special boi\n\u2022 Thief"); break;
        case "fatal": respond(message, "Fatal", "Nobody knows who or what Fatal really is."); break;
        case "soni": respond(message, "Soni", "Is daddy uwu"); break;
        case "riki": respond(message, "Riki", "Is mommy uwu"); break;
        case "abenz": respond(message, "Some facts about benny", "\u2022 He be bri'ish\n\u2022 He is a stinky nerd who loves an idiot sandwich\n\u2022 Father of the chuckens\n\u2022 Lucio feeder smH\n\u2022 Gets called Benjamin when in trouble"); break;
        case "shadow": respond(message, "Shadow", `he's just a cringe bri'ish ""person"" with too much money`) ; break;
        case "svensdum"       : reply = "https://media.discordapp.net/attachments/757754446787641427/763366193834360832/sven.png"; break;
        case "intelligence"   : reply = "https://media.discordapp.net/attachments/655767387756298250/773322072448958495/image0.png?width=763&height=619"; break;
        case "understandable" : reply = "https://en.meming.world/images/en/thumb/a/af/Understandable%2C_Have_a_Great_Day.jpg/300px-Understandable%2C_Have_a_Great_Day.jpg"; break;
        case "shut"           : reply = "https://i.redd.it/6hfg80l3zw631.png"; break;
        case "family"         : reply = "https://media.discordapp.net/attachments/824926463908249640/881986397261692938/family_tree_6.png"; break;
        case "help":
            message.channel.send(
                {
                    embed: {
                        color: 0x3ba3a1,
                        author: {
                            name: "Soni Bot Help",
                            icon_url: "https://cdn.discordapp.com/avatars/755787461040537672/8d9976baa914802cab2e4c9ecd5a9b29.webp"
                        },
                        fields: [
                            {
                                name: "Version",
                                value: version,
                                inline: true
                            },
                            {
                                name: "Prefix",
                                value: prefix,
                                inline: true
                            },
                            {
                                name: "\u200b",
                                value: "\u200b"
                            },
                            {
                                name: "`changelog`",
                                value: "Display changes in the latest version"
                            },
                            {
                                name: "`sven` `fatal` `soni` `riki` `abenz` `shadow`",
                                value: "Tell facts about the specified user"
                            },
                            {
                                name: "`svensdum`",
                                value: "Kinda self explanatory innit bruv"
                            },
                            {
                                name: "`intelligence` `understandable` `shut`",
                                value: "Post the specified response"
                            },
                            {
                                name: "`family`",
                                value: "Post our family tree"
                            },
                            {
                                name: "`help`",
                                value: "Display this message, you idiot"
                            },
                            {
                                name: "`8ball`",
                                value: "For help with daily decisions"
                            },
                            {
                                name: "`dice`",
                                value: "Roll a die"
                            },
                            {
                                name: "`joke`",
                                value: "Tell a joke - what did you think honestly"
                            },
                            {
                                name: "`remind`",
                                value: "Remind you to do something in the\nspecified amount of seconds"
                            }
                        ],
                        timestamp: new Date(),
                        footer: {
                            text: "Made with ❤️ by Soni"
                        }
                    }
                }
            ).then(() => console.log(`${date()} Responded to command '${command}' with arguments [${args}] in #${message.channel.name}, ${message.guild.name}`));
            break;
        case "8ball":
            if (args.length > 0)
            {
                const i = randomNumber(0, 11);
                switch (i)
                {
                    case 0:  reply = "why do you ask me"; break;
                    case 1:  reply = "find out yourself"; break;
                    case 2:  reply = "that may be the case"; break;
                    case 3:  reply = "i dont think it matters"; break;
                    case 4:  reply = "im not sure actually"; break;
                    case 5:  reply = "ask sven"; break;
                    case 6:  reply = "i cant be bothered to answer"; break;
                    case 7:  reply = "idk"; break;
                    case 8:  reply = "ask riki bot"; break;
                    case 9:  reply = "hmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm"; break;
                    case 10: reply = "why would i know"; break;
                    case 11: reply = "do you expect me to know?"; break;
                }
            }
            else reply = "you didnt even type in a question smH";
            break;
        case "dice":
            const i = randomNumber(0, 5);
            switch (i)
            {
                case 0: reply = "1"; break;
                case 1: reply = "2"; break;
                case 2: reply = "3"; break;
                case 3: reply = "4"; break;
                case 4: reply = "5"; break;
                case 5: reply = "6"; break;
            }
            break;
        case "joke":
            const j = randomNumber(0, 20);
            switch (j)
            {
                case 0  : reply = "two guys stole a calendar. they got six months each."; break;
                case 1  : reply = "Autocorrect can go straight to he'll."; break;
                case 2  : reply = "two peanuts were walking down the street. one was a salted."; break;
                case 3  : reply = "i asked a friend to the gym, but they never showed up. i guess the two of us aren't gonna work out."; break;
                case 4  : reply = "today my son asked 'can i have a book mark?' and i burst into tears. 11 years old and he still doesn't know my name is brian."; break;
                case 5  : reply = "my wife is really mad at the fact that i have no sense of direction. so i packed up my stuff and right."; break;
                case 6  : reply = "how do you make holy water? you boil the hell out of it."; break;
                case 7  : reply = "im reading a book about anti-gravity. its impossible to put down!"; break;
                case 8  : reply = "what do you call someone with no body and no nose? nobody knows."; break;
                case 9  : reply = "a slice of apple pie is $2.50 in Jamaica and $3.00 in the Bahamas. these are the pie rates of the caribbean."; break;
                case 10 : reply = "justice is a dish best served cold, if it were served warm it would be justwater."; break;
                case 11 : reply = "if you see a robbery at an Apple Store does that make you an iWitness?"; break;
                case 12 : reply = "why did the invisible man turn down the job offer? he couldn't see himself doing it."; break;
                case 13 : reply = "what has two butts and kills people? an assassin"; break;
                case 14 : reply = "why couldn't the bike stand up by itself? it was two tired."; break;
                case 15 : reply = "when a woman is giving birth, she is literally kidding."; break;
                case 16 : reply = "why was six sad? because seven eight nine."; break;
                case 17 : reply = "what did the buffalo say to his son when he dropped him off at school? bison."; break;
                case 18 : reply = "why did the crab never share? because he's shellfish."; break;
                case 19 : reply = "as a lumberjack, i know that i've cut exactly 2,417 trees. i know because every time i cut one, i keep a log."; break;
                case 20 : reply = "what do prisoners use to call each other? cell phones."; break;
            }
            break;
        case "remind":
            if (args.length > 1)
            {
                let query = args[1];
                if (args.length > 2)
                {
                    for (let l = 2; l < args.length; l++)
                    {
                        query += " " + args[l];
                    }
                }

                setTimeout(function ()
                {
                    message.reply("remember " + query).then(() => console.log(`${date()} Reminded ${message.author.username} of ${query}`));
                }, parseInt(args[0]) * 1000);
                reply = "ok i will remind u after " + parseInt(args[0]) + " seconds";
            }
            else reply = "that's not how it works (use `" + prefix + "remind [delay in seconds] [thing to remind]`"; // TODO: Update this
            break;
    }

    if (reply != null) message.channel.send(reply).then(() => console.log(`${date()} Responded to command '${command}' with arguments [${args}] in #${message.channel.name}, ${message.guild.name}`));
});

client.login(config.BOT_TOKEN).then(() => console.log("Successfully logged in!"));