import { ChatEngine, getOrCreateChat, ChatEngineWrapper } from 'react-chat-engine';

import { ChatList, ChatFeed, Socket } from 'react-chat-engine';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { useEffect, useState } from 'react';
import "./chat.css";

const projectID = 'd202be9d-9c19-4791-9ff3-df327f9d04ec';

const Chateng = (props) => {

	const name = props.name;

	console.log(name + "name in the chat file ");


	const [username, setUsername] = useState(name);

	function createDirectChat(creds) {
		getOrCreateChat(
			creds,
			{ is_direct_chat: true, usernames: [username] },
			() => setUsername('')
		)
	}


	function renderChatForm(creds) {
		createDirectChat(creds);
		return (
			<div>
				
			</div>
		)
	}


	return (
		<ChatEngineWrapper  style={{overflow:"hidden"}}>
			<Socket	
			    hideUI={true}
				projectID={projectID}
				userName="Utkarsh"
				userSecret="utkarsh1998"
				renderNewChatForm={(creds) => renderChatForm(creds)}
			/>

			<Grid container>
				<Grid item xs={5}><ChatList /></Grid>
				<Grid item xs={7}><ChatFeed /> </Grid>
			</Grid>
			

		</ChatEngineWrapper>

		// <ChatEngine
		//   projectID={projectID}
		//   userName="Utkarsh"
		//   userSecret="utkarsh1998"
		//   renderNewChatForm={(creds) => renderChatForm(creds)}
		// />
	);
};

// infinite scroll, logout, more customizations...

export default Chateng;