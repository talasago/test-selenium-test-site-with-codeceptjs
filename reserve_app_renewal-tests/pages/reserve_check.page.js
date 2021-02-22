const assert = require('assert');

const I = actor();

module.exports = {
    // locators
    check_fields: {
        h1:                 "div.container > h1",
        totalPrice:         "#price",
        reserveDateFrom:    "#datefrom",
        reserveDateTo:      "#dateto",
        reserveTerm:        "#dayscount",
        reservePeopleCount: "#hc",
        breakfast:          "#bf_order",
        plan_a_order:       "#plan_a_order",
        plan_b_order:       "#plan_b_order",
        guestName:          "#gname"
    },
    btn_fields: {
        return: "#returnto_iｓndex",
        commit: "#commit"
    },

    // 予約情報を検証する
    checkContent(errorMassage) {
        //TODO:実装する
        I.waitForVisible('.container')
        I.see('予約エラー', this.h1)
        I.see(errorMassage, this.errorMassage) //エラーメッセージが存在するくらいまでの検証
    },

    //topページへ戻る
    returnTop() {
        I.click(this.btn_fields.return)
    },

    goToCommit() {
        I.click(this.btn_fields.commit)
    }

}