const { setHeadlessWhen } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
  tests: './reserve_app_renewal-tests/**/*_test.js',
  output: './output',
  helpers: {
    Puppeteer: {
      url: 'http://example.selenium.jp/reserveApp_Renewal/',
      windowSize: '1200x900',
      waitForTimeout: 5000,
      waitForNavigation: 'networkidle0',//少なくとも500msの間、ネットワーク接続が0以下になったときに、ナビゲーションが終了したと見なします。
      waitForAction: 0, //クリック、ダブルクリック、またはPressKeyアクションの後に待機する時間（ミリ秒）。これが長いほどテスト時間が長くなるかも。
    },
  },
  include: {
    TopPage: './reserve_app_renewal-tests/pages/top.page.js',
    ErrorPage: './reserve_app_renewal-tests/pages/error.page.js',
    ReserveCheckPage: './reserve_app_renewal-tests/pages/reserve_check.page.js',
    FinalConfirmPage: './reserve_app_renewal-tests/pages/final_confirm.page.js'
  },
  bootstrap: null,
  mocha: {},
  name: 'selenium test site with codeceptjs for puppetter',
  translation: 'ja-JP',
  plugins: {
    pauseOnFail: {},
    retryFailedStep: {
      enabled: true
    },
    tryTo: {
      enabled: true
    },
    screenshotOnFail: {
      enabled: true
    }
  },
}