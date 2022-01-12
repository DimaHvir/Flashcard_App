import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {createDeck} from "../utils/api/index";

function NewDeck() {
    const history = useHistory();
    const [formState, setFormState] = useState({});

    function changeHandler(event) {
	event.preventDefault();
	const dataChange = formState;
	dataChange[event.target.id] = event.target.value;
	setFormState(dataChange);
    }

    function cancelHandler(event) {
	event.preventDefault();
	history.push('/');
	history.goForward();
    }

    const createNewDeck = async (event) => {
	event.preventDefault();
	const newDeck = await createDeck(formState);
	history.push('/');
	history.goForward();
	history.go(0);
    }
    
    return (
	<>
	    <h2>Create Deck</h2>
	    <form onSubmit={createNewDeck}>
		<label for="name">Name</label>
		<input type="text" name="name" id="name" onChange={changeHandler} placeholder="Deck Name" required />

		<label for="description">Description</label>
		<textarea name="description" id="description" onChange={changeHandler} placeholder="Brief description of the deck" required></textarea>

		<button className="btn btn-secondary" onClick={cancelHandler}>Cancel</button>
		<button className="btn btn-primary" type="submit">Submit</button>
	    </form>
	</>
    );
}

export default NewDeck;
