const { dataTable } = require("codeceptjs");


Feature('login');

Before(async ({ I, TopPage }) => {
    TopPage.goto()
});

Scenario('test something', ({ I, TopPage }) => {
    //TODO:てすとでーたfixture化
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
