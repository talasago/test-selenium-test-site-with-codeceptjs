const assert = require('assert');

const I = actor();

module.exports = {

    // locators
    h1: "div.container > h1",
    input_fields: {
        reserveDate: "#datePick",
        guestName: "#guestname"
    },
    select_fields: {
        reserveTerm: "#reserve_term",
        peopleCount: "#headcount"
    },
    radio_fields: {
        breakfastOnFlg: "#breakfast_on",
        breakfastOffFlg: "#breakfast_off"
    },
    check_fields: {
        planAFlg: "#plan_a",
        planBFlg: "#plan_b"
    },
    btn_fields: {
        agreeAndGotoNext: "#agree_and_goto_next"
    },

    //topページへ遷移する
    goto() {
        I.amOnPage('http://example.selenium.jp/reserveApp_Renewal/')
        I.refreshPage()
        I.executeScript(() => sessionStorage.clear())
        I.waitForVisible('.container')
    },

    // 予約情報を入力する
    inputReserveForm(
      reserveDate,  //宿泊日
      reserveTerm,  //宿泊期間
      peopleCount,  //人数
      breakfastFlg, //朝食選択 0:あり 1:なし
      planAFlg,     //昼からチェックイン 0:チェックなし 1:チェックあり
      planBFlg,     //お得な観光  0:チェックなし 1:チェックあり
      guestName     //名前
      ) {
        I.fillField(this.input_fields.reserveDate, reserveDate)
        I.selectOption(this.select_fields.reserveTerm, reserveTerm)
        I.selectOption(this.select_fields.peopleCount, peopleCount)
        if (breakfastFlg === "0") {
            I.checkOption(this.radio_fields.breakfastOnFlg)
        } else if (breakfastFlg === "1") {
            I.checkOption(this.radio_fields.breakfastOffFlg)
        }
        if (planAFlg === "0") {
            I.checkOption(this.check_fields.planAFlg)
        } else if (planAFlg === "1") {
            I.uncheckOption(this.check_fields.planAFlg)
        }
        if (planBFlg === "0") {
            I.checkOption(this.check_fields.planBFlg)
        } else if (planBFlg === "1") {
            I.uncheckOption(this.check_fields.planBFlg)
        }
        I.fillField(this.input_fields.guestName, guestName)
    },

    enterAgreeAndGotoNext() {
        I.click(this.btn_fields.agreeAndGotoNext)
    },

    checkHeader() {
        I.waitForVisible('.container')
        I.see('予約フォーム', h1)
    }
}