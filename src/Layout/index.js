import {updateDeck, readDeck, listDecks, deleteDeck, createDeck,  createCard, listCards,  readCard, updateCard, deleteCard} from "../utils/api/index";
import React, {useEffect, useState} from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { Switch, Route, Link, useHistory, useParams } from "react-router-dom";
import DeckPath from "./DeckPath";

function Layout() {
    const history=useHistory();
    const params=useParams();
    
    const [decks, setDecks] = useState([]);
    

    useEffect(() => {
	const abortController = new AbortController();
	listDecks(abortController.signal).then(setDecks);
	
	return () => abortController.abort();
	//Do I need to use useEffect to update the list of decks?
    }, []);

    
    

    const handleCreateCard = (event) => {
	event.preventDefault();
	const newCard= {front: event.target.front.value, back: event.target.back.value};
	createCard(event.target.getAttribute("deckId") , newCard);//uodate
	listDecks().then(setDecks);
	history.goBack();
    }
    
    const handleUpdateCard = (event) => {
	event.preventDefault();
	const updatedCard = {id: event.target.getAttribute("cardId"), deckId: event.target.getAttribute("deckId"), front: event.target.front.value, back: event.target.back.value}
	updateCard(updatedCard);
	listDecks().then(setDecks);
	history.push(`/decks/${event.target.getAttribute("deckId")}`);
	history.goForward();
    }
    
    const handleDeleteCard = (event) => {
	const result = window.confirm("Are you sure you want to delete this post?");
	if (result) {
	    try {
		deleteCard(event.target.getAttribute("cardId"));
		listDecks().then(setDecks);
	    }
	    catch(error){
		console.log(error);
	    }
	}
    }
    
    const handleUpdateDeck = (event) => {
	event.preventDefault();
	const updatedDeck = {id: event.target.getAttribute("deckId"), name: event.target.name.value, description: event.target.description.value}
	updateDeck(updatedDeck);
	listDecks().then(setDecks);
	history.push(`/decks/${event.target.getAttribute("deckId")}`);
	history.goForward();
	
    }
    
    const handleDeleteDeck = (event) => {
	const res = window.confirm("Are you sure you want to delete this deck?");
	if (res) {
	    const deckId = event.target.getAttribute("deckId");
	    console.log(deckId);
	    deleteDeck(deckId);
	    listDecks().then(setDecks);

	}
    }
    
    const handleNewDeck = async (event) => {
	event.preventDefault();
	const deck = { name: event.target.name.value , description: event.target.description.value }
	await createDeck(deck);
	listDecks().then(setDecks);
	history.push("/");
	history.goForward();
    }

    const list = decks.map((deck) => {
	return (
	    <div class="card" key={deck.id}>
		<div class="card-body">
		    <h5 class="card-title">{deck.name}</h5>
		    <p class="card-text">{deck.description}</p>
		    <p class="card-text">{deck.cards.length} cards</p>
		    <Link to={`/decks/${deck.id}`}class="btn btn-primary">View</Link>
		    <Link to={`/decks/${deck.id}/study`} class="btn btn-secondary">Study</Link>
		    <button class="btn btn-secondary" deckId={deck.id} onClick={handleDeleteDeck}>Delete Deck</button>
		</div>
	    </div>
	)
    });
    
    return (
	<React.Fragment>
	    <Header />
	    <div className="container">
		{/* TODO: Implement the screen starting here */}
		<Switch>
		    <Route exact path="/">
			<Link to="/decks/new"><button>Create Deck</button></Link>
			{list}
		    </Route>
		    <Route path="/decks/new">
			<div background-color="grey">
			    <p><Link to="/">Home</Link> / New Deck</p>
			</div>
			<h1 class="header">Create Deck</h1>
			<form onSubmit={handleNewDeck}>
		    <div class="form-group">
			<label for="name" name="name">Name</label>
			<input type="text" name="name" class="form-control" id="name" aria-describedby="name" placeholder="Deck Name" />
		    </div>
		    <div class="form-group">
			<label for="description" name="description">Description</label>
			<input type="text-area" name="description" class="form-control" id="description" placeholder="Brief description of deck" />
		    </div>
		    <button type="submit" class="btn btn-primary">Submit</button>
		</form>
		    </Route>
		    <Route path="/decks/:deckId">
			<DeckPath handleDeleteCard={handleDeleteCard} handleUpdateDeck={handleUpdateDeck} handleCreateCard={handleCreateCard} handleUpdateCard={handleUpdateCard} decks={decks}  />
		    </Route>
		    <Route>
			<NotFound />
		    </Route>
		</Switch>
	</div>
	</React.Fragment>
    );
    }

export default Layout;