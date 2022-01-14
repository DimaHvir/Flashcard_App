import React, {useState, useEffect} from "react";
import {Route, Switch} from "react-router-dom";
import {listDecks} from "../utils/api/index";
import NewDeck from "./NewDeck";
import HomePage from "./HomePage";
import DeckPath from "./DeckPath"; 
import Header from "./Header";
import NotFound from "./NotFound";

function Layout() {
    const [decks, setDecks] = useState([]);
    
    useEffect(() => {
	const abortController = new AbortController();

	async function getDecks() {
	    const foundDecks = await listDecks(abortController.signal);
	    setDecks(foundDecks);
	}

	getDecks();

	return () => abortController.abort();
    }, []);

    
    return (
	<>
	    <Header />
	    <div className="container">
		<Switch>
		    <Route exact path="/decks/new">
			<NewDeck decks={decks} setDecks={setDecks} />
		    </Route>
		    <Route path="/decks">
			<DeckPath decks={decks} />
		    </Route>
		    <Route exact path="/">
			<HomePage decks={decks}/>
		    </Route>
		    <Route>
			<NotFound />
		    </Route>
		</Switch>
	    </div>
	</>
    );
}

export default Layout;
