const Record = require('../record')
const db = require('../../config/mongoose')

db.once('open', () => {
  const promises = []
  promises.push(Record.create(
    {
      name: '午餐',
      category: '餐飲食品',
      date: '2020/05/23',
      amount: 70,
      categoryIcon: 'fas fa-utensils',
    },
    {
      name: '下午茶',
      category: '餐飲食品',
      date: '2020/05/23',
      amount: 50,
      categoryIcon: 'fas fa-utensils',
    },
    {
      name: '高鐵',
      category: '交通出行',
      date: '2020/05/23',
      amount: 390,
      categoryIcon: 'fas fa-shuttle-van',
    },
    {
      name: '電影',
      category: '休閒娛樂',
      date: '2020/05/23',
      amount: 250,
      categoryIcon: 'fas fa-grin-beam',
    },
    {
      name: '租金',
      category: '家居物業',
      date: '2020/05/20',
      amount: 6000,
      categoryIcon: 'fas fa-home',
    }
  ))
  Promise.all(promises).then(() => {
    console.log('record seeder imported!')
    db.close()
  })
})