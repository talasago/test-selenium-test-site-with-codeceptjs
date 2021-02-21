const assert = require('assert');

const I = actor();

module.exports = {

    // locators
    h1: "div.container > h1",
    error_massage: "#errorcheck_result",
    btn_return: "#returnto_index",

    // 予約情報を入力する
    checkError() {
        I.waitForVisible('.container')
        I.see('予約エラー', h1)
        I.seeElement(error_massage) //エラーメッセージが存在するくらいまでの検証
    },

    //topページへ戻る
    returnTop() {
        I.click(this.btn_return)
    }
}