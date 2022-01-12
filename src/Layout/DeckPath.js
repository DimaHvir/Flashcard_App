import React, {useEffect, useState} from "react";
import { Switch, Route, Link, useParams, useHistory} from "react-router-dom";
import {listCards} from "../utils/api/index";
import ViewDeck from "./ViewDeck";
import EditDeck from "./EditDeck";
import StudyDeck from "./StudyDeck";
import NewCard from "./NewCard";
import EditCard from "./EditCard";

function DeckPath({decks}) {


    return (
	<Switch>
	    <Route exact path="/decks/:deckId/cards/new">
		<NewCard decks={decks} />
	    </Route>
	    <Route path="/decks/:deckId/cards/:cardId/edit">
		<EditCard decks={decks} />
	    </Route>
	    <Route path="/decks/:deckId/edit">
		<EditDeck decks={decks} />
	    </Route>
	    <Route path="/decks/:deckId/study">
		<StudyDeck decks={decks} />
	    </Route>
	    <Route exact path="/decks/:deckId">
		<ViewDeck decks={decks} />
	    </Route>
	</Switch>
    );












    
    /*
    const [cards, setCards] = useState([]);
    const [curCard, setCurCard] = useState({});
    const [isFlipped, setIsFlipped] = useState(false);
    const [cardToEdit, setCardToEdit] = useState(null);

    const history = useHistory();
    const { deckId, cardId } = useParams();
    const deck = decks.find((deck) => deck.id == deckId) || {};
    console.log(cardId);

    useEffect(() => {
	const abortController= new AbortController();
	async function setup() {
	    const list = await listCards(deckId, abortController.signal);
	    setCards(list);
	    if (list.length != 0) {setCurCard(list[0])};
	}

	setup();

	return () => abortController.abort();
    }, [decks]);


    //Click handlers currently cause state problems
    const list = cards.map((card) => {
	return (
	    <div class="card w-75 m-2" key={card.id}>
		<div class="card-body">
		    <div class="m-2">
			<p>{card.front}</p>
		    </div>
		    <div class="m-2">
			<p>{card.back}</p>
			<Link to={`/decks/${deckId}/cards/${card.id}/edit`} onClick={() => {setCardToEdit(card.id)}} class="btn btn-primary">Edit</Link>
			<button class="btn-button-secondary"  cardId={card.id} onClick={handleDeleteCard}>Delete</button>
		    </div>
		</div>
	    </div>
	)
    });

    const flipHandler = (event) => {
	event.preventDefault();
	setIsFlipped(!isFlipped);
    }

    const nextHandler = (event) => {
	const curIndex = cards.indexOf(curCard);
	event.preventDefault();
	setIsFlipped(false);
	if (cards.length - 1 == curIndex) {
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
	//add navbar

	<Switch> 
	    <Route exact path="/decks/:deckId/">
		<div background-color="grey">
		    <p><Link to="/">Home</Link> / {deck.name}</p>
		</div>
	<div class="justify-content-center">
	    <div class="card m-4">
		<div class="card-body">
		    <h5 class="card-title">{deck.name}</h5>
		    <p class="card-text">{deck.description}</p>
		    <div>
			<Link to={`/decks/${deckId}/edit`} class="btn btn-secondary">Edit</Link>
			<Link to={`/decks/${deckId}/study`}  class="btn btn-primary">Study</Link>
			<Link to={`/decks/${deckId}/cards/new`} class="btn btn-primary">Add Cards</Link>
		    </div>
		</div>
	    </div>
	    
	    <h2>Cards</h2>
	    <div class="d-flex justify-content-center flex-wrap">
		{list}
	    </div>
	</div>
	    </Route>
	    <Route path="/decks/:deckId/cards/:cardId/edit">
		<div background-color="grey">
		    <p><Link to="/">Home</Link> / <Link to={`/decks/${deck.id}`}>{deck.name}</Link> / Edit Card</p>
		</div>
		<h1>Edit Card</h1>
		<form deckId={deck.id} cardId={cardToEdit} onSubmit={handleUpdateCard}>
		    <div class="form-group">
			<label for="front" name="front">Front</label>
			<input type="text" name="front" class="form-control" id="front" aria-describedby="front" placeholder="Enter Front Text" />
		    </div>
		    <div class="form-group">
			<label for="back" name="back">Back</label>
			<input type="text" name="back" class="form-control" id="back" placeholder="Enter Back Text" />
		    </div>
		    <button type="submit" class="btn btn-primary">Submit</button>
		</form>
	    </Route>
	    <Route path="/decks/:deckId/cards/new">
		<div background-color="grey">
		    <p><Link to="/">Home</Link>/<Link to={`/decks/${deck.id}`}>{deck.name}</Link> / New Card</p>
		</div>
		<h2>{deck.name}: Add Card</h2>
		<form deckId={deckId} onSubmit={handleCreateCard}>
		    <div class="form-group">
			<label for="front" name="front">Front</label>
			<input type="text" name="front" class="form-control" id="front" aria-describedby="front" placeholder="Enter Front Text" />
		    </div>
		    <div class="form-group">
			<label for="back" name="back">Back</label>
			<input type="text" name="back" class="form-control" id="back" placeholder="Enter Back Text" />
		    </div>
		    <button type="submit" class="btn btn-primary">Submit</button>
		</form>
	    </Route>
	    <Route path="/decks/:deckId/edit">
		<div background-color="grey">
		    <p><Link to="/">Home</Link> / <Link to={`/decks/${deck.id}`}>{deck.name}</Link> / Edit Deck</p>
		</div>
		<h1>Edit Deck</h1>
		<form deckId={deck.id} onSubmit={handleUpdateDeck}>
		    <div class="form-group">
			<label for="name">Name</label>
			<input type="text" class="form-control" id="name" aria-describedby="name" placeholder={deck.name} />
		    </div>
		    <div class="form-group">
			<label for="description">Description</label>
			<input type="text" class="form-control" id="description" placeholder={deck.description} />
		    </div>
		    <button type="submit" class="btn btn-primary">Submit</button>
		</form>
	    </Route>
	    <Route path="/decks/:deckId/study">
		<div background-color="grey">
		    <p><Link to="/">Home</Link> / <Link to={`/decks/${deck.id}`}>{deck.name}</Link> / Study</p>
		</div>
		<h1>{deck.name}: Study</h1>
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
	    </Route>
	    </Switch>
	    )*/

}

export default DeckPath;

