import { useEffect, useState } from "react";
import GameOver from "./components/GameOver";
import game from "./game/game"
import GameBoard from "./components/GameBoard";

export default function MemoryGame(props) {
    const [showGameOver, setShowGameOver] = useState(false)
    const [cards, setCards] = useState([]);

    useEffect(() => {
        setCards(game.createCardFromTechs())
    }, [])
    
    function handleRestart() {
        game.clearCards();
        setShowGameOver(false);
        setCards(game.createCardFromTechs())
    }
    function handleFlip(card) {
        game.flipCard(card, ()=>{
            setShowGameOver(true);
        },
        ()=>{
            setCards([...game.cards]);
        })
        setCards([...game.cards])
    }
    return (
        <>
            <GameBoard handleFlip={handleFlip} cards={cards}></GameBoard>
            <GameOver showGameOver={showGameOver} handleRestart={handleRestart}></GameOver>
        </>
    )
}