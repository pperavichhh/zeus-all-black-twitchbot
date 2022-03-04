import tmi from 'tmi.js'


const options = {
	options: { debug: true },
	connection: {
    reconnect: true,
    secure: true,
    timeout: 180000,
    reconnectDecay: 1.3,
    reconnectInterval: 1000,
	},
	identity: {
		username: 'zeusallblackbot',
		password: 'aywy1l8gvvgpv2gzzyir3m04otl88s'
	},
	channels: [ "zeusallblack" ]
}

const client = new tmi.Client(options)

client.connect()

// events


client.on('hosted', (channel, username, viewers, autohost) => {
  onHostedHandler(channel, username, viewers, autohost)
})

client.on('subscription', (channel, username, method, message, userstate) => {
  onSubscriptionHandler(channel, username, method, message, userstate)
})

client.on('raided', (channel, username, viewers) => {
  onRaidedHandler(channel, username, viewers)
})

client.on('cheer', (channel, userstate, message) => {
  onCheerHandler(channel, userstate, message)
})

client.on('giftpaidupgrade', (channel, username, sender, userstate) => {
  onGiftPaidUpgradeHandler(channel, username, sender, userstate)
})

client.on('hosting', (channel, target, viewers) => {
  onHostingHandler(channel, target, viewers)
})

client.on('resub', (channel, username, months, message, userstate, methods) => {
  resubHandler(channel, username, months, message, userstate, methods)
})

client.on('subgift', (channel, username, streakMonths, recipient, methods, userstate) => {
  subGiftHandler(channel, username, streakMonths, recipient, methods, userstate)
})

// event handlers

client.on('message', (channel, userstate, message, self) => {
  if(message=="!github") {
    client.say(channel,"https://github.com/pperavichhh/zeus-all-black-twitchbot")
  }
  if(message=="!dis") {
    client.say(channel,"มาเข้ากันได้นะครับ มีแจ้งเตือนสตรีมและข่าวสารต่างๆ เข้ามาพูดคุยกับผมเยอะๆนะครับ https://discord.gg/Jy9hqPuwjc")
  }
  if(message="!donate") {
    client.say(channel, "	0158553937 KBANK ยุทธนากร แก้วกองใหญ่")
  }
  if(message="!mapsettings"){
   client.say(channel,"https://clips.twitch.tv/AdorableSeductiveSproutShazBotstix-EEgHFnua4qDq_Rwb") 
  }
  if(message="!keyboard"){
   client.say(channel,"Xtrfy K4") 
  }
  if(message="!sub"){
   client.say(channel,"อุดหนุนผมได้ผ่าน sub นะครับ เดือนละ 69 บาทครับผมม https://www.twitch.tv/subs/zeusallblack") 
  }
  if(message="!vdosettings"){
   client.say(channel,"	https://clips.twitch.tv/StylishSincereCobblerAMPTropPunch-SrLHkTJ6XOXQXtnF") 
  }
  if(message=="$clear"){
    client.clear("zeusallblack");
  }
})

// function onMessageHandler (channel, userstate, message, self) {
//   checkTwitchChat(userstate, message, channel)
// }


function onHostedHandler (channel, username, viewers, autohost) {
  client.say(channel,
    `ขอบคุณ คุณ @${username} สำหรับการ Host ด้วยคนดู ${viewers} คนด้วยค้าบ`
  )
}

function onRaidedHandler(channel, username, viewers) {
  client.say(channel,
    `ขอบคุณ คุณ @${username} สำหรับการ raid ด้วยคนดู ${viewers} คน ขอบคุณที่ raid มาดูผมโง่นะครับ`
  )
}

function onSubscriptionHandler(channel, username, method, message, userstate) {
  client.say(channel,
    `ขอบคุณ คุณ @${username} สำหรับการซับด้วยนะค้าบ`
  )
}

function onCheerHandler(channel, userstate, message)  {
  client.say(channel,
    `ขอบคุณ คุณ @${userstate.username} สำหรับ ${userstate.bits} บิท ด้วยค้าบ แต่ทีหลังขอเยอะกว่านี้นะ ตังค์กินข้าวไม่มี `
  )
}

function onGiftPaidUpgradeHandler(channel, username, sender, userstate) {
  client.say(channel,
    `ขอบคุณ คุณ @${username} สำหรับการต่อซับที่ได้มาจาก gift sub ด้วยค้าบ`
  )
}

function onHostingHandler(channel, target, viewers) {
  client.say(channel,
    `เทพเจ้าแบงค์กำลัง Hosting ${target} ด้วยคนดู ${viewers} คน`
  )
}


function resubHandler(channel, username, months, message, userstate, methods) {
  const cumulativeMonths = userstate['msg-param-cumulative-months']
  client.say(channel,
    `ขอบคุณ คุณ @${username} สำหรับซับ ${cumulativeMonths} เดือน ด้วยค้าบ`
  )
}

function subGiftHandler(channel, username, streakMonths, recipient, methods, userstate) {

  client.say(channel,
    `ขอบคุณ คุณ @${username} ที่ giftsub ให้ คุณ ${recipient} ด้วยค้าบ`
  )

  // this comes back as a boolean from twitch, disabling for now
  // "msg-param-sender-count": false
  // const senderCount =  ~~userstate["msg-param-sender-count"];
  // client.say(channel,
  //   `${username} has gifted ${senderCount} subs!`
  // )
}

// commands


// function checkTwitchChat(userstate, message, channel) {
//   console.log(message)
//   message = message.toLowerCase()
//   let shouldSendMessage = false
//   shouldSendMessage = BLOCKED_WORDS.some(blockedWord => message.includes(blockedWord.toLowerCase()))
//   if (shouldSendMessage) {
//     // tell user
//     client.say(channel, `@${userstate.username}, เบาน้องเบา`)
//     // delete message
//     client.deletemessage(channel, userstate.id)
//   }
// }
