const DiscordJS = require('discord.js')
const {ArdsClient} = require("ards-client")
const WOKCommands = require('wokcommands')
const path = require('path')
require('dotenv').config()
const got = require('got');
const fetch = require('node-fetch')
const xml2js = require('xml2js');
const got = require('got');



const { Intents } = DiscordJS

const client = new DiscordJS.Client({
  // These intents are recommended for the built in help menu
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
})

client.on('ready', () => {
    // The client object is required as the first argument.
    // The second argument is the options object.
    // All properties of this object are optional.

    new WOKCommands(client, {
        // The name of the local folder for your command files
        commandsDir: path.join(__dirname, 'commands'),
        
        // The name of the local folder for your feature files
        featuresDir: path.join(__dirname, 'features'),
        
        // The name of the local file for your message text and translations
        // Omitting this will use the built-in message path
        messagesPath: '',
        
        // If WOKCommands warning should be shown or not, default true
        showWarns: true,
        
        // How many seconds to keep error messages before deleting them
        // -1 means do not delete, defaults to -1
        delErrMsgCooldown: -1,
        
        // What language your bot should use
        // Must be supported in your messages.json file
        defaultLangauge: 'english',
        
        // If your commands should not be ran by a bot, default false
        ignoreBots: true,
        
        // Various options for your MongoDB database connection
        dbOptions: {
            // These 4 are the default options
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        },
        
        // What server/guild IDs are used for testing only commands & features
        // Can be a single string if there is only 1 ID
        testServers: ['882013264324755486e', 'ID2', 'ID3'],
        
        // What built-in commands should be disabled.
        // Note that you can overwrite a command as well by using
        // the same name as the command file name.
        disabledDefaultCommands: [
            //  'help',
            // 'command',
            // 'language',
            // 'prefix',
            // 'requiredrole'
        ]
    })
        // Here are some additional methods that you can chain
        // onto the contrustor call. These will eventually be
        // merged into the above object, but for now you can
        // use them:
        
        // The default is !
        .setDefaultPrefix('?')
        
        // Used for the color of embeds sent by WOKCommands
        .setColor(0xff0000)
        
        // When connecting to a Mongo database.
        // For more infomration view the "DATABASES" section
        // of this documentation.
})

client.login(process.env.token)