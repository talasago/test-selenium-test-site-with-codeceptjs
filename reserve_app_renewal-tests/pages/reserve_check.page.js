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
    checkReserveDetail(
      reserveDateFrom,   //宿泊日
      reserveDateTo,
      totalPrice,
      reserveTerm,
      PeopleCount,
      breakfast,
      plan_a_order,
      plan_b_order,
      guestName
    ) {
        I.waitForVisible('.container')
        I.see('予約内容', this.h1)
        I.see(totalPrice, this.totalPrice)
        I.see(reserveDateFrom, this.reserveDateFrom)
        I.see(reserveDateTo, this.reserveDateTo)
        I.see(reserveTerm, this.reserveTerm)
        I.see(PeopleCount, this.reservePeopleCount)
        //朝食のラジオボタン
        I.see(breakfast, this.bf_order)
        if (plan_a_order === null) {
            I.dontSeeElemetn(this.plan_a_order)
        } else {
            I.see(plan_a_order, this.plan_a_order)
        }
        if (plan_b_order === null) {
            I.see(this.plan_b_order)
        } else {
            I.see(plan_b_order, this.plan_b_order)
        }
        I.see(guestName, this.guestName)
    },

    //topページへ戻る
    returnTop() {
        I.click(this.btn_fields.return)
    },

    goToCommit() {
        I.click(this.btn_fields.commit)
    }

}