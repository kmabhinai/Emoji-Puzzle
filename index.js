const cards = document.querySelectorAll('.card');
var flipped = false, first_card, second_card, score = 0;

function flip() {
    this.classList.add("flip");
    if (!flipped) {
        flipped = true;
        first_card = this;
    }
    else {
        second_card = this;
        check();
        cards.forEach((card) => { card.removeEventListener("click", flip); });
        cards.forEach((card) => card.addEventListener("click", flip));
    }
}

function check() {
    if (first_card.dataset.image == second_card.dataset.image && first_card.dataset.num != second_card.dataset.num) {

        first_card.removeEventListener("click", flip);
        second_card.removeEventListener("click", flip);

        reset();
        score += 100;
        document.getElementById("score").innerText = "Score : " + score;
        if (score == 800) {
            document.getElementById("success").innerText = "You Won the Game!🎉";

        }
    }
    else {
        setTimeout(() => {
            first_card.classList.remove("flip");
            second_card.classList.remove("flip");
            reset();
        }, 350);
    }
}

function reset() {
    [first_card, second_card, flipped] = [null, null, false];
}

(function shuffle() {
    cards.forEach((card) => {
        var index = Math.floor(Math.random() * 16);
        card.style.order = index;
    });
})();


//Main
cards.forEach((card) => card.addEventListener("click", flip));