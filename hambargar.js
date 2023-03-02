'use strict';

//ボタンをクリックした時に、toggle=押したときにcssを追加、次に押すと削除、というのができる。今の場合ハンバーガーメニューを開く、閉じる。
{
    const Header = document.getElementById('js-header');
    const HeaderButton = document.getElementById('js-headerButton');

    HeaderButton.addEventListener('click', () => {
        Header.classList.toggle('is-open')
    })
}