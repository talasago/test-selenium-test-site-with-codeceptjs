const yaml = require("js-yaml");
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

Scenario('invalid resist', ({ I, TopPage, ErrorPage }) => {
    for (let idx in fixture.invalidData) {
        TopPage.inputReserveForm(
            //FIXME:eval()を使わずにfixtureに日付データを記載する方法
            eval(fixture.invalidData[idx].reserveDate),
            fixture.invalidData[idx].reserveTerm,
            fixture.invalidData[idx].peopleCount,
            fixture.invalidData[idx].breakfastFlg,
            fixture.invalidData[idx].planAFlg,
            fixture.invalidData[idx].planBFlg,
            fixture.invalidData[idx].guestName
        )
        TopPage.enterAgreeAndGotoNext()

        ErrorPage.checkError(fixture.invalidData[idx].expectError)
        ErrorPage.returnTop()

        TopPage.checkHeader()
    }
});

Scenario('valid resist', ({ I, TopPage, ReserveCheckPage, FinalConfirmPage }) => {
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
