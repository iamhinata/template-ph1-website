'use script'
// /**これはjsdocコメント！ 関数や変数の宣言の直前に記載　@param＝関数の引数が何を指すのか明確にできます。　@return＝関数の戻り値が何を指すのか明確にできます。@type＝変数の型を示す　*/
{
    /**
    * @typedef QUIZ
    * @property {number} correctNumber 問題番号
    * @property {string | undefined} note ノート
    * @property {string} question 問題文
    * @property {string[]} answers 回答の配列
    */

    /**
    * @description 問題と回答の定数
    * @type {QUIZ[]}
    */
    //全ての問題をALLQUIZに入れる　配列
    const ALL_QUIZ = [
        {
            question: '日本のIT人材が2030年には最大どれくらい不足すると言われているでしょうか？',
            answers: ['約28万人', '約79万人', '約183万人'],
            correctNumber: 1,
            note: '経済産業省 2019年3月 － IT 人材需給に関する調査'
        },
        {
            question: '既存業界のビジネスと、先進的なテクノロジーを結びつけて生まれた、新しいビジネスのことをなんと言うでしょう？',
            answers: ['INTECH', 'BIZZTECH', 'X-TECH'],
            correctNumber: 2,
        },
        {
            question: 'IoTとは何の略でしょう？',
            answers: ['Internet of Things', 'Integrate into Technology', 'Information on Tool'],
            correctNumber: 0,
        },
        {
            question: 'イギリスのコンピューター科学者であるギャビン・ウッド氏が提唱した、ブロックチェーン技術を活用した「次世代分散型インターネット」のことをなんと言うでしょう？',
            answers: ['Society 5.0', 'CyPhy', 'SDGs'],
            correctNumber: 0,
            note: 'Society5.0 - 科学技術政策 - 内閣府'
        },
        {
            question: 'イギリスのコンピューター科学者であるギャビン・ウッド氏が提唱した、ブロックチェーン技術を活用した「次世代分散型インターネット」のことをなんと言うでしょう？',
            answers: ['Web3.0', 'NFT', 'メタバース'],
            correctNumber: 0,
        },
        {
            question: '先進テクノロジー活用企業と出遅れた企業の収益性の差はどれくらいあると言われているでしょうか？',
            answers: ['約2倍', '約5倍', '約11倍'],
            correctNumber: 1,
            note: 'Accenture Technology Vision 2021'
        }
    ];


    /**
       * @description クイズコンテナーの取得
       * @type {HTMLElement}
       */
    const quizContainer = document.getElementById('js-quizContainer');

    //htmlの作成
    /**
       * @description クイズ１つ１つのHTMLを生成するための関数
       * @param quizItem { QUIZ }
       * @param questionNumber { number }
       * @returns {string}
       */
    //回答作成
    const createQuizHtml = (quizItem, questionNumber) => {
        /**
  * @description 回答の生成
  * @type {string}
  */

        //クイズアイテムからアンサーズ（上の）取り出して、その配列の中身を一つずつ＝＞に書き換えてね
        const answersHtml = quizItem.answers.map((answer, answerIndex) => `<li class="p-quiz-box__answer__item"><button class="p-quiz-box__answer__button js-answer" data-answer="${answerIndex}">
                                                                        ${answer}<i class="u-icon__arrow"></i></button></li>` //  $はidを取り出しているよ
        ).join('');     //joinは、全ての文字列を一つの文字列に連結する　この場合配列のカンマが消える

        // 引用テキストの生成 noteが存在したら、（ifの省略）'true':'false';  .note→オブジェクト.プロパティ名　console.log(表示)できる
        const noteHtml = quizItem.note ? `<cite class="p-quiz-box__note"><i class="u-icon__note"></i>${quizItem.note}</cite>` : '';
        //クリエイトクイズHTMLに返す結果
        return `<section class="p-quiz-box js-quiz" data-quiz="${questionNumber}">
                <div class="p-quiz-box__question">
                    <h2 class="p-quiz-box__question__title">
                        <span class="p-quiz-box__label">Q${questionNumber + 1}</span>
                        <span class="p-quiz-box__question__title__text">${quizItem.question}</span>
                    </h2>
                    <figure class="p-quiz-box__question__image">
                        <img src="../assets/img/quiz/img-quiz0${questionNumber + 1}.png" alt="">
                    </figure>
                </div>
                <div class="p-quiz-box__answer">
                    <span class="p-quiz-box__label p-quiz-box__label--accent">A</span>
                        <ul class="p-quiz-box__answer__list">${answersHtml}</ul>
                    <div class="p-quiz-box__answer__correct js-answerBox">
                        <p class="p-quiz-box__answer__correct__title js-answerTitle"></p>
                        <p class="p-quiz-box__answer__correct__content">
                            <span class="p-quiz-box__answer__correct__content__label">A</span>
                            <span class="js-answerText"></span>
                        </p>
                    </div>
                </div>${noteHtml}
                </section>`
    }

    /**
 * @description 配列の並び替え
 * @param arrays {Array}
 * @returns {Array}
 */
    //shuffle＝配列から（部分）をコピーして並び替える
    const shuffle = arrays => {
        const array = arrays.slice();
        for (let i = array.length - 1; i >= 0; i--) {
            const randomIndex = Math.floor(Math.random() * (i + 1));
            [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
        }
        return array
    }
    /**
     * @description quizArrayに並び替えたクイズを格納
     * @type {Array}
     */
    const quizArray = shuffle(ALL_QUIZ)


    /**
* @type {string}
* @description 生成したクイズのHTMLを #js-quizContainer に挿入
*/
    quizContainer.innerHTML = quizArray.map((quizItem, index) => {
        return createQuizHtml(quizItem, index)
    }).join('')

    /**   * @type {NodeListOf<Element>}
        * @description すべての問題を取得
        */
    const allQuiz = document.querySelectorAll('.js-quiz');

    /**
       * @description buttonタグにdisabledを付与
       * @param answers {NodeListOf<Element>}
       */
    //アンサーズの引数に、それぞれの答えを入れていき非活性化する
    const setDisabled = answers => {
        answers.forEach(answer => {
            answer.disabled = true;
        })
    }


    /**
       * @description trueかfalseで出力する文字列を出し分ける
       * @param target {Element}
       * @param isCorrect {boolean}
       */
    //正解,不正解の場合に表示する　target=仮引数を立てて、中身を取り出す＝inner 正解か不正解かの結果をtargetに入れろ
    const setTitle = (target, isCorrect) => {
        target.innerText = isCorrect ? '正解！' : '不正解...';
    }


    /**
       * @description trueかfalseでクラス名を付け分ける
       * @param target {Element}
       * @param isCorrect {boolean}
       */
    //クラス名をつけることができる
    const setClassName = (target, isCorrect) => {
        target.classList.add(isCorrect ? 'is-correct' : 'is-incorrect');
    }

    /**
 * 各問題の中での処理
 */
    allQuiz.forEach(quiz => {
        const answers = quiz.querySelectorAll('.js-answer');
        const selectedQuiz = Number(quiz.getAttribute('data-quiz'));
        const answerBox = quiz.querySelector('.js-answerBox');
        const answerTitle = quiz.querySelector('.js-answerTitle');
        const answerText = quiz.querySelector('.js-answerText');

        answers.forEach(answer => {
            answer.addEventListener('click', () => {
                answer.classList.add('is-selected');
                const selectedAnswerNumber = Number(answer.getAttribute('data-answer'));

                // 全てのボタンを非活性化
                setDisabled(answers);

                // 正解ならtrue, 不正解ならfalseをcheckCorrectに格納
                const correctNumber = ALL_QUIZ[selectedQuiz].correctNumber
                const isCorrect = correctNumber === selectedAnswerNumber;

                // 回答欄にテキストやclass名を付与
                answerText.innerText = ALL_QUIZ[selectedQuiz].answers[correctNumber];
                setTitle(answerTitle, isCorrect);
                setClassName(answerBox, isCorrect);
            })
        })
    })
}
