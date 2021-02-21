//const { dataTable } = require("codeceptjs");
const yaml  = require("js-yaml");
const fs = require('fs');
const path = require('path');
//TODO:PATHをパラメタ化
const fixtureYmlData = fs.readFileSync(path.join(__dirname, "../fixture/reserve_resist.yml"), 'utf8');
const fixture = yaml.load(fixtureYmlData);

Feature('reserve resist test');

Before(async ({ I, TopPage }) => {
    TopPage.goto()
});

Scenario('invalid resisted reserve_date', ({ I, TopPage }) => {
    TopPage.inputReserveForm(
      //TODO:日付を自動変換
      '2021/2/1',
      fixture.invalidData[0].reserveTerm,
      fixture.invalidData[0].peopleCount,
      fixture.invalidData[0].breakfastFlg,
      fixture.invalidData[0].planAFlg,
      fixture.invalidData[0].planBFlg,
      fixture.invalidData[0].guestName
    )
});

Scenario('valid resisted', ({ I, TopPage }) => {
    TopPage.inputReserveForm(
        '2021/3/1',
        "3",
        "2",
        "1",
        "0",
        "1",
        "guest_name1"
    )
});
