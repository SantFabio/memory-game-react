let game = {
    techs: [
        "bootstrap",
        "css",
        "electron",
        "firebase",
        "html",
        "javascript",
        "jquery",
        "mongo",
        "node",
        "react"
    ],
    lockMode: false,
    firstCard: null,
    secondCard: null,
    setCard: function (id) {
        let card = this.cards.filter(card => card.id === id.id)[0];
        if (card.flipped || this.lockMode) {
            return false;
        }
        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.lockMode = true;
            this.secondCard = card;
            this.secondCard.flipped = true;
            return true;
        }
    },
    checkMatch: function () {
        if (!this.firstCard || !this.secondCard) {
            return false;
        } else {   
            return this.firstCard.icon === this.secondCard.icon
        }

    },
    checkGameOver: function () {
     return this.cards.filter( card => !card.flipped).length == 0;  
    }
    ,
    clearCards: function () {
            this.lockMode = false;
            this.firstCard = null;
            this.secondCard = null;
    },
    unFlipCards: function () {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },
    cards: null,
    // Cria um tabuleiro(cards) com 10 pares de cartas usando as techs como referência
    createCardFromTechs: function () {
        this.cards = [];
        this.techs.forEach(tech => {
            this.cards.push(this.createPairFromTechs(tech));
        });
        // desistrutura o array cards os arrays filhos tranformando em um único array
        this.cards = this.cards.flatMap(tech => tech);
        this.shuffleCards();
        return this.cards
    },

    // criar um par de cartas
    createPairFromTechs: function (tech) {
        return [{
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false
        }, {
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false
        }];
    },
    // cria um id para cada carta, ele concatena com um numero randomico porém usamos o parse para que o número seja inteiro.
    createIdWithTech: function (tech) {
        return tech + parseInt(Math.random() * 1000);
    },
    // função que embaralha as cartas
    shuffleCards: function () {
        let currentIndex = this.cards.length;
        let randomIndex = 0;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--;
            [this.cards[currentIndex], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[currentIndex]];
        }
    },
    flipCard: function(card, gameOverCallBack, noMatchCallBack) {
        if (game.setCard(card)) {
            if (game.secondCard) {
                if (game.checkMatch()) {
                    game.clearCards();
                    if (game.checkGameOver()) {
                        game.clearCards();
                        setTimeout(() => {
                            // setShowGameOver(true);
                            gameOverCallBack();
                        }, 500);
                    }
                } else {
                    setTimeout(() => {
                        game.unFlipCards();
                        // setCards([...game.cards])
                        noMatchCallBack()
                    }, 500)
                }
            }
        }
    }

}
export default game;