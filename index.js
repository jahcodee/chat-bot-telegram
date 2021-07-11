const TelegramApi = require ('node-telegram-bot-api')
const token = '1865594141:AAHI9Y86rzaVnNd_io9J0z1gSFl9P5EefKQ'

const bot =  new TelegramApi(token, {polling: true})

const chats = {}

const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'}, {text: '3', callback_data: '3'}],
            [{text: '4', callback_data: '4'}, {text: '5', callback_data: '5'}, {text: '6', callback_data: '6'}],
            [{text: '7', callback_data: '7'}, {text: '8', callback_data: '8'}, {text: '9', callback_data: '9'}],
            [{text: '0', callback_data: '0'}],
            
        ]
    })
}

const againOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Попробовать снова', callback_data: '/again'}],
            
        ]
    })
}

const startGame = async (chatId) => {
            await bot.sendMessage(chatId, 'Сейчас я загадаю цифру от 0 до 9, а ты должен ее угадать!');
            const randomNumber = Math.floor(Math.random() * 10)
            chats[chatId] = randomNumber;
            await bot.sendMessage(chatId, 'Отгадывай!', gameOptions)
        }


const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Информация о пользователе'},
        {command: '/name', description: 'Username пользователя'},
        {command: '/game', description:'Игра - Отгадай число'}
    ])
    
    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/6f9/bf3/6f9bf3ed-544f-37cf-b3e1-1779eccbf3d2/2.webp');
            return bot.sendMessage(chatId, `Добро пожаловать в телеграм бота  ${msg.from.first_name}` )
        }
        if (text === '/info') {
            return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`)
        }
        if (text === '/name') {
            return bot.sendMessage(chatId, `Твой username: ${msg.chat.username}`)
        }
        if (text === '/game') {
                return startGame(chatId);
        }
        return bot.sendMessage(chatId, 'Я не понял что ты имел ввиду, попробуй еще разок!')
    })

    
    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId)
        }
        // const user = await UserModel.findOne({chatId})
        if (data == chats[chatId]) {
            // user.right += 1;
            await bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${chats[chatId]}`, againOptions);
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/6f9/bf3/6f9bf3ed-544f-37cf-b3e1-1779eccbf3d2/4.webp')
        } else {
                // user.wrong += 1;
                await bot.sendMessage(chatId, `К сожалению, бот загадал цифру ${chats[chatId]}`, againOptions);
                await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/6f9/bf3/6f9bf3ed-544f-37cf-b3e1-1779eccbf3d2/192/26.webp') 
            }
            // await user.save();
        
       
    })
}

start();