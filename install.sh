#!/bin/sh
echo '**************************'
echo 'インストールを開始します'
echo '**************************'
echo 'サブモジュールを更新します'
git submodule init
git submodule update
echo 'jszipをコピーしています'
cp jszip/jszip.js choudai/lib
echo '**************************'
echo 'インストールが終わりました'
echo '**************************'
