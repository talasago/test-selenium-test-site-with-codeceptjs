const yaml  = require("js-yaml");
const fs = require('fs');
const path = require('path');
const moment = require("moment");

//fixtureデータ
const fixtureYmlData = fs.readFileSync(path.join(__dirname, "fixture/reserve_resist.yml"), 'utf8');
const fixture = yaml.load(fixtureYmlData);

Feature('reserve resist test');

Before(async ({ I, TopPage }) => {
    TopPage.goto()
});

Scenario('invalid resisted reserve_date', ({ I, TopPage, ErrorPage }) => {
    TopPage.inputReserveForm(
      //TODO:fixtureに日付データを記載する方法
      moment().format("YYYY/MM/DD"),
      fixture.invalidData[0].reserveTerm,
      fixture.invalidData[0].peopleCount,
      fixture.invalidData[0].breakfastFlg,
      fixture.invalidData[0].planAFlg,
      fixture.invalidData[0].planBFlg,
      fixture.invalidData[0].guestName
    )
    TopPage.enterAgreeAndGotoNext()
    ErrorPage.checkError('翌日以降の日付を指定')
    TopPage.checkHeader()
});

Scenario('invalid resisted guest_name', ({ I, TopPage, ErrorPage }) => {
    TopPage.inputReserveForm(
      moment().add('days', 1).format("YYYY/MM/DD"),
      fixture.invalidData[1].reserveTerm,
      fixture.invalidData[1].peopleCount,
      fixture.invalidData[1].breakfastFlg,
      fixture.invalidData[1].planAFlg,
      fixture.invalidData[1].planBFlg,
      fixture.invalidData[1].guestName
    )
    TopPage.enterAgreeAndGotoNext()
    ErrorPage.checkError('名前が指定されていません')
    TopPage.checkHeader()
});

Scenario('valid resisted', ({ I, TopPage, ReserveCheckPage, FinalConfirmPage }) => {
    for (let idx in fixture.validData) {
        TopPage.inputReserveForm(
          fixture.validData[idx].inputData.reserveDate,
          fixture.validData[idx].inputData.reserveTerm,
          fixture.validData[idx].inputData.peopleCount,
          fixture.validData[idx].inputData.breakfastFlg,
          fixture.validData[idx].inputData.planAFlg,
          fixture.validData[idx].inputData.planBFlg,
          fixture.validData[idx].inputData.guestName
        )
        TopPage.enterAgreeAndGotoNext()

        ReserveCheckPage.checkReserveDetail(
            fixture.validData[idx].checkData.reserveDateFrom,
            fixture.validData[idx].checkData.reserveDateTo,
            fixture.validData[idx].checkData.totalPrice,
            fixture.validData[idx].checkData.reserveTerm,
            fixture.validData[idx].checkData.PeopleCount,
            fixture.validData[idx].checkData.breakfast,
            fixture.validData[idx].checkData.plan_a_order,
            fixture.validData[idx].checkData.plan_b_order,
            fixture.validData[idx].checkData.guestName
        )
        ReserveCheckPage.goToCommit()

        FinalConfirmPage.checkReserveFinalCommit()
        TopPage.goto()
    }
});
