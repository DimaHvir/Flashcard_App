import React, {useEffect, useState} from "react";
import { Switch, Route, Link, useParams, useHistory} from "react-router-dom";
import {readDeck, updateCard} from "../utils/api/index";

function EditCard({decks}) {
    const {cardId, deckId} = useParams();
    const history = useHistory();
    const [card, setCard] = useState({});
    const [deck, setDeck] = useState({});
    const [formState, setFormState] = useState({id : Number(cardId), deckId: Number(deckId), front : "", back : ""});

    useEffect(() => {
	const abortController = new AbortController;
	
	async function getDeck() {
	    const foundDeck = await readDeck(Number(deckId), abortController.signal) //decks.find((deck) => deck.id === Number(deckId));
	    const foundCard = foundDeck.cards.find((card) => card.id === Number(cardId));
	    setDeck(foundDeck);
	    setCard(foundCard);
	    setFormState(foundCard);
	}

	getDeck()

	return () => abortController.abort;
    }, []);


    const handleUpdateCard = async (event) => {
	event.preventDefault();
	await updateCard(formState);
	history.push('/');
	history.goForward();
	history.go(0);
    }
    
    
    return (
	<>
	    <div background-color="grey">
		<p><Link to="/">Home</Link> / <Link to={`/decks/${deck.id}`}>{deck.name}</Link> / Edit Card</p>
	    </div>
	    <h1>Edit Card</h1>
	    <form  onSubmit={handleUpdateCard}>
		<div class="form-group">
		    <label for="front" name="front">Front</label>
		    <textarea type="text" name="front" class="form-control" id="front" aria-describedby="front" value={formState.front} onChange={e => setFormState({id: formState.id, deckId: formState.deckId, front: e.target.value, back: formState.back})} />
		</div>
		<div class="form-group">
		    <label for="back" name="back">Back</label>
		    <textarea type="text" name="back" class="form-control" id="back" value={formState.back} onChange={e => setFormState({id: formState.id, deckId: formState.deckId, front: formState.front, back: e.target.value})} />
		</div>
		<button type="submit" class="btn btn-primary">Submit</button>
	    </form>
	</>
    )
}

export default EditCard;
