const Category = require('../category')
const db = require('../../config/mongoose')

db.once('open', () => {
  const promises = []
  promises.push(Category.create(
    {
      category: "家居物業",
      categoryIcon: "fas fa-home",
    },
    {
      category: "交通出行",
      categoryIcon: "fas fa-shuttle-van"
    },
    {
      category: "休閒娛樂",
      categoryIcon: "fas fa-grin-beam"
    },
    {
      category: "餐飲食品",
      categoryIcon: "fas fa-utensils"
    },
    {
      category: "其他",
      categoryIcon: "fas fa-pen"
    }
  ))
  Promise.all(promises).then(() => {
    console.log('category seeder imported!')
    db.close()
  })
})