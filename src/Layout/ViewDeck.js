import React, {useEffect, useState} from "react";
import { Switch, Route, Link, useParams, useHistory} from "react-router-dom";
import {readDeck, deleteCard} from "../utils/api/index";

function ViewDeck({decks}) {
    const history = useHistory();
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const {deckId} = useParams();

    useEffect(() => {
	const abortController = new AbortController;
      
      async function getDecks() {
          const foundDeck = await readDeck(Number(deckId), abortController.signal); //decks.find((deck) => deck.id === Number(deckId));
	  if (foundDeck) {
              setDeck(foundDeck);
              setCards(foundDeck.cards);
	  }
      }
	
      getDecks();
      
      return () => abortController.abort();
    }, []);

    const handleDelete = async (cardId) => {
	if(window.confirm("Delete this card?")) {
	    await deleteCard(cardId);
	    const newCards = cards.filter((card) => card.id !== Number(cardId));
	    setCards(newCards);
	}
    }
    
    const list = cards.map((card) => {
	return (
	    <div className="card w-75 m-2" key={card.id}>
		<div className="card-body">
		    <div className="m-2">
			<p>{card.front}</p>
		    </div>
		    <div className="m-2">
			<p>{card.back}</p>
			<Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-primary">Edit</Link>
			<button className="btn-button-secondary" onClick={() => handleDelete(card.id)}>Delete</button>
		    </div>
		</div>
	    </div>
	)
    });

    return (
	<>
	    <div background-color="grey">
		<p><Link to="/">Home</Link> / {deck.name}</p>
	    </div>
	    <div className="justify-content-center">
		<div className="card m-4">
		    <div className="card-body">
			<h5 className="card-title">{deck.name}</h5>
			<p className="card-text">{deck.description}</p>
			<div>
			    <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary">Edit</Link>
			    <Link to={`/decks/${deckId}/study`}  className="btn btn-primary">Study</Link>
			    <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">Add Cards</Link>
			</div>
		    </div>
		</div>
		
		<h2>Cards</h2>
		<div className="d-flex justify-content-center flex-wrap">
		    {list}
		</div>
	    </div>
	</>
    );
}

export default ViewDeck;
