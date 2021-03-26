# 目的
以下サイトをサンプルにCodeceptJS(Puppeteer)でE2Eテストコードを実装
http://example.selenium.jp/reserveApp_Renewal/#
# サンプルサイト情報元
http://www.selenium.jp/test-site
https://github.com/selenium-jp/example

# 手順
codeceptjsインストール

```
npx create-codeceptjs .
npm run codeceptjs
→テスト実行

npm run codeceptjs:headless
→ヘッドレスでテスト実行する
```
# テスト内容
### 異常系テスト
- 処理日>=宿泊日の場合エラー
- 名前がない場合エラー
### 正常系テスト
- 予約フォーム入力登録→予約登録確認→予約完了
    - 正常データは2種類

# 内容の説明

# 参考サイト
https://www.selenium.dev/documentation/ja/guidelines_and_recommendations/page_object_models
http://www.selenium.jp/test-site
https://github.com/selenium-jp/example
https://qiita.com/tsuemura/items/56ba9942565963858d8f
https://qiita.com/tsuemura/items/70b156baecfbcffb03fb
