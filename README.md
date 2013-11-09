# 概要
画像まとめブログの画像をサムネイルで表示してくれるChrome拡張

# とりあえず使う
1. `$git clone git@github.com:chuchuross/choudai-extension.git`
2. `$sh install.sh`
3. Chromeの設定画面で拡張機能画面を開く
4. 「デベロッパーモード」にチェックを入れて「パッケージされていない拡張機能を読み込む」を押す
5. jsやhtmlなどが入ってるフォルダ「choudai」を選択する
6. 右上にアイコンが追加されるので、画像がありそうなページを開いてる状態でアイコンを押すと画像が表示される

# crxにする
1. `$git clone git@github.com:chuchuross/choudai-extension.git`
2. `$sh install.sh`
3. Chromeの設定画面で拡張機能画面を開く
4. 「デベロッパーモード」にチェックを入れて「拡張機能のパッケージ化」を選択
5. 上と同じ
6. ダイアログに従って操作していくとcrxが生成される

