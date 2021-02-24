//const { dataTable } = require("codeceptjs");
const yaml  = require("js-yaml");
const fs = require('fs');
const path = require('path');
const moment = require("moment");

//TODO:PATHをパラメタ化
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

Scenario('valid resisted', ({ I, TopPage, ReserveCheckPage }) => {
    //テスト観点合計額が一致すること
    // fixtureにデータ駆動形で定義。計算メソッドは作らない。
    // 土日含む場合と含まない場合
    // 朝食ありなし
    // 観光プランありなし
    //DataTableで実装する
    TopPage.inputReserveForm(
      moment().add('days', 1).format("YYYY/MM/DD"),
      fixture.validData[0].inputData.reserveTerm,
      fixture.validData[0].inputData.peopleCount,
      fixture.validData[0].inputData.breakfastFlg,
      fixture.validData[0].inputData.planAFlg,
      fixture.validData[0].inputData.planBFlg,
      fixture.validData[0].inputData.guestName
    )
    TopPage.enterAgreeAndGotoNext()

    ReserveCheckPage.checkReserveDetail(
        fixture.validData[0].checkData.reserveDateFrom,
        fixture.validData[0].checkData.reserveDateTo,
        fixture.validData[0].checkData.reserveTerm,
        fixture.validData[0].checkData.PeopleCount,
        fixture.validData[0].checkData.breakfast,
        fixture.validData[0].checkData.plan_a_order,
        fixture.validData[0].checkData.plan_b_order,
        fixture.validData[0].checkData.guestName
    )
});
