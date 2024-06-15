const TelegramBot = require('node-telegram-bot-api');
const token = '7413876053:AAEQcVeiuVKlvCfyN_Djl-8VK9AjlRyC98s';
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const welcomeMessage = 'Welcome! Click to check the game.';
    const keyboard = [
        [
            { text: 'Check Game', callback_data: 'check_game' },
            { text: 'Stop Bot', callback_data: 'stop_bot' }
        ]
    ];
    const options = {
        reply_markup: {
            inline_keyboard: keyboard
        }
    };
    bot.sendMessage(chatId, welcomeMessage, options);
});

bot.on('callback_query', (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const messageId = callbackQuery.message.message_id;
    const data = callbackQuery.data;

    if (data === 'check_game') {
        // Логика для получения состояния игры
        const gameMessage = 'You clicked the button! Here is the game: https://your-web-app-url.com';
        bot.editMessageText(gameMessage, {
            chat_id: chatId,
            message_id: messageId
        });
    } else if (data === 'stop_bot') {
        bot.sendMessage(chatId, 'Bot is stopping...');
        process.exit();
    }
});
