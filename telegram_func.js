const path = require('path')

require('dotenv').config({
  path: path.join(__dirname, '.env')
})

const Telegraf = require('telegraf')
const CommandParser = require('telegraf-command-parts')
const bot = new Telegraf(process.env.BOT_TOKEN)

const { cmd, handlers } = require('./functions')

bot.use(CommandParser())

bot.command('kaynak', ctx => new cmd.SourceBot(ctx))
bot.command('grup', ctx => new cmd.GroupBot(ctx))
bot.command('kanal', ctx => new cmd.GroupBot(ctx))
bot.command('ban', ctx => cmd.banCommand(ctx))
bot.command('unban', ctx => cmd.unbanCommand(ctx))
bot.command('yardim', ctx => cmd.helpCommand(ctx))
bot.command('help', ctx => cmd.helpCommand(ctx))
bot.command('discord', ctx => cmd.discordCommand(ctx))
bot.command('duyuru', ctx => cmd.announcementCommand(ctx))
bot.command('pin', ctx => cmd.pinCommand(ctx))

bot.on(['new_chat_members', 'left_chat_member'], ctx => handlers.joinedLeftUserHandler(ctx))

bot.on('text', handlers.easterEggHandler)

bot.launch()
