# 家庭記帳本

## Features
 - 在首頁可瀏覽所有支出的清單及支出總金額
 - 可新增、編輯、刪除支出項目
 - 在首頁可以根據支出「類別」篩選支出；總金額的計算只會包括被篩選出來的支出總和

## Screen Photo
 ![首頁](https://github.com/ccomos/expense-tracker/blob/master/public/image/main.jpg)

## How to use
1.開啟終端機(Terminal)至要存放專案的本機位置並執行

```
git clone https://github.com/ccomos/expense-tracker.git
```

2.初始

```
cd expense-tracker  //切至專案資料夾
```

```
npm install  //安裝套件
```

3.載入資料seeder

```
npm run seed
```

4.開啟程式

```
npm run dev //執行程式, 成功執行下會出現 
'App is listening on localhost:3000'
'mongodb connected!'
```

5.於任一瀏覽器網址列輸入 [http://localhost:3000](http://localhost:3000) 進行瀏覽

## Tooling
- Node.js
- express
- express-handlebars
- mongoDB
- mongoose
- method-override
