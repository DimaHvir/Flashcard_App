import React, {useEffect, useState} from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import {readDeck, createCard, updateCard} from "../utils/api/index";

function EditCard({decks}) {
    const {cardId, deckId} = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({});
    const [formState, setFormState] = useState({deckId: Number(deckId), front : "", back : ""});

    useEffect(() => {
	const abortController = new AbortController();
	
	async function getDeck() {
	    const foundDeck = await readDeck(Number(deckId), abortController.signal) //decks.find((deck) => deck.id === Number(deckId));
	    if (cardId) {
		const foundCard = foundDeck.cards.find((card) => card.id === Number(cardId));
		setFormState(foundCard);
	    }
	    setDeck(foundDeck);
	}

	getDeck()

	return () => abortController.abort;
    }, [deckId, cardId]);


    const handleUpdateCard = async (event) => {
	event.preventDefault();
	if (cardId) {
	    await updateCard(formState);
	}
	else {
	    const newCard = {front: formState.front, back : formState.back}
	    await createCard(deckId, newCard);
	}
	history.push('/');
	history.goForward();
	history.go(0);
    }
    
    
    return (
	<>
	    <div background-color="grey">
		<p><Link to="/">Home</Link> / <Link to={`/decks/${deck.id}`}>{deck.name}</Link> / {cardId ? "Edit Card" : "Add Card"} </p>
	    </div>
	    <h1>{cardId ? "Edit Card" : "Add Card"}</h1>
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
