import React from 'react';
import { Message, Segment, Button } from 'semantic-ui-react';

//Displays if someone clicks on the ChangePriceIcon and IS NOT the owner of the art piece.

const NotTheOwnerMessage = React.forwardRef((props, ref) => {
    const errorMessage1 = "Only the current art piece owner can edit its price.";
    const errorMessage2 = "Please make sure metamask is wired up to your current browser session and check to see if the current account's address is the same as the owner of this Art Piece.";
    return (
        <Segment textAlign='center' inverted color="red">
            <Message> 
                <Message.Header>
                    Are you the owner?
                </Message.Header>
                <Message.Content floated="left">
                    <br />
                    <span>{errorMessage1}</span>
                    <br />
                    <br />
                    <span>{errorMessage2}</span>
                </Message.Content>
            
            <Button color="black" circular style={{ marginTop:"30px", width: "200px"}}  onClick={props.closeModal}>OK</Button>
            </Message>
        </Segment>
    )
}
)
export default NotTheOwnerMessage;