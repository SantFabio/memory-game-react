import { Fragment } from "react";

export default function GameOver(props) {
    return (
        <>
            {props.showGameOver ? <div id="gameOver">
                <div>
                    Parabéns você completou o Jogo!
                </div>
                <button id="restart" onClick={()=> props.handleRestart()}>Jogar novamente</button>
            </div> : <Fragment />}
        </>
    )
}