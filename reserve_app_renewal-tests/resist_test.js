//const { dataTable } = require("codeceptjs");
const yaml  = require("js-yaml");
const fs = require('fs');
const path = require('path');
const moment = require("moment");

//TODO:PATHをパラメタ化
const fixtureYmlData = fs.readFileSync(path.join(__dirname, "../fixture/reserve_resist.yml"), 'utf8');
const fixture = yaml.load(fixtureYmlData);

Feature('reserve resist test');

Before(async ({ I, TopPage }) => {
    TopPage.goto()
});

Scenario('invalid resisted reserve_date', ({ I, TopPage }) => {
    TopPage.inputReserveForm(
      moment().format("YYYY/MM/DD"),
      fixture.invalidData[0].reserveTerm,
      fixture.invalidData[0].peopleCount,
      fixture.invalidData[0].breakfastFlg,
      fixture.invalidData[0].planAFlg,
      fixture.invalidData[0].planBFlg,
      fixture.invalidData[0].guestName
    )
});

Scenario('invalid resisted guest_name', ({ I, TopPage }) => {
    TopPage.inputReserveForm(
      moment().add('days', 1).format("YYYY/MM/DD"),
      fixture.invalidData[1].reserveTerm,
      fixture.invalidData[1].peopleCount,
      fixture.invalidData[1].breakfastFlg,
      fixture.invalidData[1].planAFlg,
      fixture.invalidData[1].planBFlg,
      fixture.invalidData[1].guestName
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
