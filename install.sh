#!/bin/sh
JSZIP_DIR=choudai/lib/jszip

echo '**************************'
echo 'インストールを開始します'
echo '**************************'
echo 'サブモジュールを更新します'
git submodule init
git submodule update
echo 'フォルダを作成しています'
if [ ! -d ${JSZIP_DIR} ]; then
mkdir ${JSZIP_DIR}
fi
echo 'jszipをコピーしています'
cp jszip/jszip.js ${JSZIP_DIR}
echo '**************************'
echo 'インストールが終わりました'
echo '**************************'
