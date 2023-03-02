'use strict'
//回答一覧定義
{
    const CORRECT_ANSWERS = [
    {
        index: 1,
        value: '約79万人'
    },
    {
        index: 2,
        value: 'X-TECH'
    },
    {
        index: 0,
        value: 'Internet of Things'
    },
    {
        index: 0,
        value: 'Society 5.0'
    },
    {
        index: 0,
        value: 'Web3.0'
    },
    {
        index: 1,
        value: '約5倍'
    }
];

//全ての問題を取得
const allQuiz = document.querySelectorAll('.js-quiz');

// buttonタグにdisabledを付与
//答えを一つずつ取り出してanswersに入れて、非活性化させる。
const setDisabled = answers => {
    answers.forEach(answer => {
        answer.disabled = true;
    })
}

// trueかfalseで出力する文字列を出し分ける
//正解,不正解の場合に表示する　target=仮引数を立てて、中身を取り出す＝inner 正解か不正解かの結果をtargetに入れろ
const setTitle = (target, isCorrect) => {
    target.innerText = isCorrect ? '正解！' : '不正解...';
}
const setClassName = (target, isCorrect) => {
    target.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');
}

// 各問題の中での処理
allQuiz.forEach(quiz => {
    const answers = quiz.querySelectorAll('.js-answer');
    const selectedQuiz = Number(quiz.getAttribute('data-quiz'));
    const answerBox = quiz.querySelector('.js-answerBox');
    const answerTitle = quiz.querySelector('.js-answerTitle');
    const answerText = quiz.querySelector('.js-answerText');


    answers.forEach ( answer => {
//クリックした時の動作
        answer.addEventListener('click', () => {
            console.log('hello');
            answer.classList.add('is-selected');//新しくクラス名を付けれる
            const selectedAnswer = Number(answer.getAttribute('data-answer'));//dataanwerから数を取り出す
            
            //全てのボタンを非活性化
            //実行させている　呼び出し
            setDisabled(answers); 

           //押した数と答えが絶対的に正しければ、正解ならtrue, 不正解ならfalseをisCorrectに格納
            const isCorrect = CORRECT_ANSWERS[selectedQuiz].index === selectedAnswer;

            // 回答欄にテキストやclass名を付与
            answerText.innerText = CORRECT_ANSWERS[selectedQuiz].value;
            setTitle(answerTitle, isCorrect);　//ターゲットがアンサータイトルですよ→上の公式を実行
            setClassName(answerBox, isCorrect);
            })
        })
    })
}