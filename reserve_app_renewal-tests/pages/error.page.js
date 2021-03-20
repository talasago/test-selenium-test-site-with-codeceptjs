const I = actor();

module.exports = {
    // locators
    h1: "div.container > h1",
    errorMassage: "#errorcheck_result",
    btnReturn: "#returnto_index",

    // 予約情報を入力する
    checkError(errorMassage) {
        I.waitForVisible('.container')
        I.see('予約エラー', this.h1)
        I.see(errorMassage, this.errorMassage) //エラーメッセージが存在するくらいまでの検証
    },

    //topページへ戻る
    returnTop() {
        I.click(this.btnReturn)
    }
}