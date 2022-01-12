import React, {useEffect, useState} from "react";
import { Switch, Route, Link, useParams, useHistory} from "react-router-dom";
import {readDeck, createCard} from "../utils/api/index";

function NewCard({decks}) {
    const history = useHistory();
    const [deck, setDeck] = useState({});
    const [formState, setFormState] = useState({});
    const {deckId} = useParams();

    useEffect(() => {
	const abortController = new AbortController;
	
	async function getDeck() {
	    const foundDeck = await readDeck(Number(deckId), abortController.signal) //.find((deck) => deck.id === Number(deckId));
	    setDeck(foundDeck);
	}

	getDeck();

	return () => abortController.abort;
    }, []);

    function handleChange(event) {
	event.preventDefault();
	const dataChange=formState;
	dataChange[event.target.id] = event.target.value;
	setFormState(dataChange);
    }
    
    const handleCreateCard = async (event) => {
	event.preventDefault();
	await createCard(deckId, formState);
	history.push('/');
	history.goForward();
	history.go(0);

    };

    return (
	<>
	<div background-color="grey">
		    <p><Link to="/">Home</Link>/<Link to={`/decks/${deck.id}`}>{deck.name}</Link> / Add Card</p>
		</div>
	    <h2>{deck.name}</h2>
	    <h3>Add Card</h3>
		<form onSubmit={handleCreateCard}>
		    <div class="form-group">
			<label for="front" name="front">Front</label>
			<textarea type="area" name="front" class="form-control" id="front" aria-describedby="front" placeholder="Enter Front Text" onChange={handleChange} />
		    </div>
		    <div class="form-group">
			<label for="back" name="back">Back</label>
			<textarea name="back" class="form-control" id="back" placeholder="Enter Back Text" onChange={handleChange} />
		    </div>
		    <button type="submit" class="btn btn-primary">Submit</button>
		</form>
	    </>
    );
}

export default NewCard;
