import React, {useEffect, useState} from "react";
import { Link, useParams, useHistory} from "react-router-dom";
import {readDeck} from "../utils/api/index";

function StudyDeck({decks}) {

    const {deckId} = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({id: null, name: "", description: "", cards: []});
    const [cards, setCards] = useState([]);
    const [curCard, setCurCard] = useState({id: null, deckId: null, front: "", back: ""});
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
	const abortController = new AbortController();
	async function getDeck() {
	    const foundDeck = await readDeck(Number(deckId)); //.find((deck) => deck.id === Number(deckId));
	    setDeck(foundDeck);
	    setCards(foundDeck.cards);
	    setCurCard(foundDeck.cards[0]);
	}

	getDeck();

	return () => abortController.abort;
    },[deckId]);

    const flipHandler = (event) => {
	event.preventDefault();
	setIsFlipped(!isFlipped);
    }

    const nextHandler = (event) => {
	const curIndex = cards.indexOf(curCard);
	event.preventDefault();
	setIsFlipped(false);
	if (cards.length - 1 === curIndex) {
	    const res = window.confirm("You have finished this deck; press Ok to restart and Cancel to return")
	    if (res) {
		setCurCard(cards[0]);
	    }
	    else{
		history.push("/");
		history.goForward();
	    }
	}
	else {
	    setCurCard(cards[curIndex + 1])
	}
    }
    
    return (
	<>
	    <div background-color="grey">
		<p><Link to="/">Home</Link> / <Link to={`/decks/${deck.id}`}>{deck.name}</Link> / Study</p>
	    </div>
	    <h1>{deck.name}: Study | Card {cards.indexOf(curCard) + 1} of {cards.length}</h1>
	    {cards.length < 3 ? (<h2>Not enough cards to study</h2>) : (
		<div class="card">
		    <div class="card-body">
			<h5 class="card-title">{curCard.name}</h5>
			<p class="card-text">{isFlipped ? curCard.back : curCard.front}</p>
			<button class="btn btn-primary" onClick={flipHandler}>Flip</button>
			{isFlipped ? (<button class="btn btn-secondary" onClick={nextHandler}>Next</button>) : ""}
		    </div>
		</div>
	    )}
	</>
    )
}

export default StudyDeck;
