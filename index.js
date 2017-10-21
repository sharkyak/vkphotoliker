const VK = require('vk-io')
const CronJob = require('cron').CronJob
require('dotenv').config()

const { login, pass, link, message, startTime } = process.env

const vk = new VK({
  login,
  pass
})

const auth = vk.auth.windows()
let owner_id
let photo_id

try {
  owner_id = link.match(/photo([-\d]+)/)[1]
  photo_id = link.match(/photo[-\d]+_(\d+)/)[1]

  auth.run()
    .then(account => {
      console.log('Authorised user:', account.user)

      new CronJob(startTime, () => {
        writeComment(account.token)
      }, null, true, 'Asia/Yekaterinburg')
    })
    .catch(error => console.error(error))
} catch (err) {
  console.log('Wrong photo link!')
}

const writeComment = access_token => {
  console.log('commenting!')

  vk.api.photos.createComment({
    owner_id,
    photo_id,
    message,
    access_token
  })
    .then(() => console.log('Done!'))
    .catch(err => console.error(err))
}
