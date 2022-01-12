import React, {useEffect, useState} from "react";
import { Switch, Route, Link, useParams, useHistory} from "react-router-dom";
import {readDeck, updateDeck} from "../utils/api/index";

function EditDeck({decks}) {

    const history = useHistory();
    const {deckId} = useParams();
    const [deck, setDeck] = useState({id: null, name: "", description: "", cards: []});
    const [formState, setFormState] = useState({id : null, name: "", description: ""});

    useEffect(() => {
	const abortController = new AbortController;
	console.log(deckId);
	async function getDecks() {
	    const foundDeck = await readDeck(Number(deckId), abortController.signal); //decks.find((deck) => deck.id === Number(deckId));
	    console.log(foundDeck);
	    console.log(deckId);
	    if (foundDeck) {
		setDeck(foundDeck);
		setFormState({id : foundDeck.id, name: foundDeck.name, description: foundDeck.description});
	    }
	}

	getDecks();

	return () => abortController.abort();
    }, []);


    const handleUpdateDeck = async (event) => {
	event.preventDefault();
	await updateDeck(formState);
	history.push('/');
	history.goForward();
	history.go(0);
    };
    
    return (
	<>
	    <div background-color="grey">
		<p><Link to="/">Home</Link> / <Link to={`/decks/${deck.id}`}>{deck.name}</Link> / Edit Deck</p>
	    </div>
	    <h1>{deck.name}</h1>
	    <form onSubmit={handleUpdateDeck}>
		<div class="form-group">
		    <label for="name">Name: </label>
		    <input type="text" className="form-control" id="name" aria-describedby="name" value={formState.name} onChange={e => setFormState({id: formState.id, name: e.target.value, description: formState.description})} />
		</div>
		<div className="form-group">
		    <label for="description">Description</label>
		    <input type="text" className="form-control" id="description" value={formState.description} onChange={e => setFormState({id: formState.id, name: formState.name, description: e.target.value})} />
		</div>
		<button type="submit" className="btn btn-primary">Submit</button>
	    </form>
	</>
    )
}

export default EditDeck;
