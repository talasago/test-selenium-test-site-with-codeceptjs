const I = actor();

module.exports = {

    // locators
    h1: "div.container > h1",
    btnReturn: "#returnto_checkInfo",

    // 予約完了であるか確認
    checkReserveFinalCommit() {
        I.waitForVisible('.container')
        I.see('予約を完了しました', this.h1)
    },

    //一つ前のページにに戻る
    returnCheckInfoPage() {
        I.click(this.btnReturn)
    }
}