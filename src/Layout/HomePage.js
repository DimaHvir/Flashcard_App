import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {deleteDeck} from "../utils/api/index";

function HomePage({decks}) {
    const history = useHistory();
    
    async function handleDelete(deckId) {
	if (window.confirm("Delete This Deck?")) {
	    await deleteDeck(deckId);
	    history.go(0);
	}
    }
    
    const list = decks.map((deck) => {
	return (
	    <div className="card" key={deck.id}>
		<div className="card-body">
		    <h5 className="card-title">{deck.name}</h5>
		    <h6 className="card-subtitle mb-2 text-muted">{`${deck.cards.length} cards`}</h6>
		    <p className="card-text">{deck.description}</p>
		    <Link to={`/decks/${deck.id}`}><button className="btn btn-secondary">View</button></Link>
		    <Link to={`/decks/${deck.id}/study`}><button className="btn btn-primary">Study</button></Link>
		    <button className="btn btn-danger" onClick={() => handleDelete(deck.id)}>Delete</button>
		</div>
	    </div>
	);
    });

    return (
	<>
	    <Link to="/decks/new"><button className="btn btn-secondary">Create Deck</button></Link>
	    <div className="col">
		{list}
	    </div>
	</>
    );
}

export default HomePage;
