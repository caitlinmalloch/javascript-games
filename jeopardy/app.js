const game = document.getElementById("game");
const scoreDisplay = document.getElementById("score");

const jeopardyCategories = [
  {
    genre: "FRIENDS",
    questions: [
      {
        question: "How many seasons of Friends are there?",
        answers: ["10", "15"],
        correct: "10",
        level: "easy",
      },
      {
        question: "How many times did Ross get divorced?",
        answers: ["4", "3"],
        correct: "3",
        level: "medium",
      },
      {
        question: "Who was the maid of honor at Monica's wedding?",
        answers: ["Phoebe", "Rachel"],
        correct: "Rachel",
        level: "hard",
      },
    ],
  },
  {
    genre: "THE OFFICE",
    questions: [
      {
        question: "Who was Pam engaged to before Jim?",
        answers: ["Troy", "Roy"],
        correct: "Roy",
        level: "easy",
      },
      {
        question: "Who did Michael take on his trip to Jamaica?",
        answers: ["Pam", "Jan"],
        correct: "Jan",
        level: "medium",
      },
      {
        question: "What does Dwight keep in his car for special occasions?",
        answers: ["Tie", "Birkenstocks"],
        correct: "Birkenstocks",
        level: "hard",
      },
    ],
  },
  {
    genre: "SEINFELD",
    questions: [
      {
        question: "What does Elaine eat from a stranger's plate?",
        answers: ["Egg Roll", "Fortune Cookie"],
        correct: "Egg Roll",
        level: "easy",
      },
      {
        question: "What character is on Jerry's Pez dispenser?",
        answers: ["Mickey Mouse", "Tweety Bird"],
        correct: "Tweety Bird",
        level: "medium",
      },
      {
        question: "What does George buy Elaine with a red dot?",
        answers: ["Cashmere sweater", "Cashmere scarf"],
        correct: "Cashmere sweater",
        level: "hard",
      },
    ],
  },
  {
    genre: "GREY'S ANATOMY",
    questions: [
      {
        question: "Which character proposed the idea for the free clinic?",
        answers: ["Izzie", "Bailey"],
        correct: "Bailey",
        level: "easy",
      },
      {
        question: "Where were the doctors flying during the plane crash?",
        answers: ["Phoenix", "Boise"],
        correct: "Boise",
        level: "medium",
      },
      {
        question: "What is Jo Wilson's real first name?",
        answers: ["Emma", "Brooke"],
        correct: "Brooke",
        level: "hard",
      },
    ],
  },
  {
    genre: "SILICON VALLEY",
    questions: [
      {
        question: "What was the name of Pied Piper's Java Programmer?",
        answers: ["Gilfoyle", "Dinesh"],
        correct: "Dinesh",
        level: "easy",
      },
      {
        question: "Where did Richard first meet Peter Gregory?",
        answers: ["TechCrunch Disrupt", "Outside of a TED Talk"],
        correct: "Outside of a TED Talk",
        level: "medium",
      },
      {
        question: "What compression software test is used?",
        answers: ["Weissman Score", "Zurich Score"],
        correct: "Weissman Score",
        level: "hard",
      },
    ],
  },
];

let score = 0;

function addCategory(category) {
  const column = document.createElement("div");
  column.classList.add("genre-column");

  const genreTitle = document.createElement("div");
  genreTitle.classList.add("genre-title");
  genreTitle.innerHTML = category.genre;

  column.appendChild(genreTitle);
  game.append(column);

  category.questions.forEach((question) => {
    const card = document.createElement("div");
    card.classList.add("card");
    column.append(card);

    if (question.level === "easy") {
      card.innerHTML = 100;
    }
    if (question.level === "medium") {
      card.innerHTML = 200;
    }
    if (question.level === "hard") {
      card.innerHTML = 300;
    }

    card.setAttribute("data-question", question.question);
    card.setAttribute("data-answer-1", question.answers[0]);
    card.setAttribute("data-answer-2", question.answers[1]);
    card.setAttribute("data-correct", question.correct);
    card.setAttribute("data-value", card.getInnerHTML());

    card.addEventListener("click", flipCard);
  });
}

jeopardyCategories.forEach((category) => addCategory(category));

function flipCard() {
  this.innerHTML = "";
  this.style.fontSize = "15px";
  this.style.lineHeight = "30px";

  const textDisplay = document.createElement("div");
  textDisplay.classList.add("card-text");
  textDisplay.innerHTML = this.getAttribute("data-question");

  const firstButton = document.createElement("button");
  const secondButton = document.createElement("button");

  firstButton.classList.add("first-button");
  secondButton.classList.add("second-button");
  firstButton.innerHTML = this.getAttribute("data-answer-1");
  secondButton.innerHTML = this.getAttribute("data-answer-2");
  firstButton.addEventListener("click", getResult);
  secondButton.addEventListener("click", getResult);
  this.append(textDisplay, firstButton, secondButton);

  const allCards = Array.from(document.querySelector(".card"));
  allCards.forEach((card) => card.removeEventListener("click", flipCard));
}

function getResult() {
  const allCards = Array.from(document.querySelectorAll(".card"));
  allCards.forEach((card) => card.addEventListener("click", flipCard));

  const cardOfButton = this.parentElement;

  if (cardOfButton.getAttribute("data-correct") === this.innerHTML) {
    score = score + parseInt(cardOfButton.getAttribute("data-value"));
    scoreDisplay.innerHTML = score;
    cardOfButton.classList.add("correct-answer");
    setTimeout(() => {
      while (cardOfButton.firstChild) {
        cardOfButton.removeChild(cardOfButton.lastChild);
      }
      cardOfButton.innerHTML = cardOfButton.getAttribute("data-value");
    }, 100);
  } else {
    cardOfButton.classList.add("wrong-answer");
    setTimeout(() => {
      while (cardOfButton.firstChild) {
        cardOfButton.removeChild(cardOfButton.lastChild);
      }
      cardOfButton.innerHTML = 0;
    }, 100);
  }
  cardOfButton.removeEventListener("click", flipCard);
}
