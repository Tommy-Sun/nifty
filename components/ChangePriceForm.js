import React, { Component } from 'react';
import { Form, Grid, Segment, Header, Message } from 'semantic-ui-react';
import ArtPiece from '../ethereum/artpiece';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

//Displays if someone clicks on the ChangePriceIcon and IS the owner of the art piece.

class ChangePriceForm extends Component {
    state = {
        price: '',
        loading: false,
        errorMessage: ''
    }

    onSubmit = async () => {
        this.setState({ loading: true, errorMessage: '' });
        try {
            const artPiece = ArtPiece(this.props.address);
            const accounts = await web3.eth.getAccounts();
            const newPrice = web3.utils.toWei(this.state.price, 'ether'); 
            await artPiece.methods.updatePrice(newPrice).send({
                from: accounts[0]
            });

            Router.replace(window.location.href); //essentially refreshes/redirects the page without telling the browser we have gone anywhere new. (Effectively refreshes the page.) 
        } catch (err) {
            this.setState({ errorMessage: err.message });
            console.log(err.message);
        };

        this.setState({ loading: false });
    }

    render () {
        return (
            <Segment>
                <Header textAlign='center'>{this.props.title} - Current Price: {this.props.price} ETH</Header>
                <Form onSubmit={this.onSubmit}>
                    <Form.Field>
                        <Grid columns={3}>
                            <Grid.Column width={10} style={{ marginRight: '0px', paddingRight: '0px' }}>
                                <Form.Input
                                    fluid
                                    label='Change Price?'
                                    placeholder='New Price'
                                    value={this.state.price}
                                    onChange={event => this.setState({ price: event.target.value })}
                                />
                            </Grid.Column>
                            <Grid.Column width={2} verticalAlign='bottom'>
                                <h2 style={{ marginBottom:'5px' }}>ETH</h2>
                            </Grid.Column>
                            <Grid.Column width={4} verticalAlign='bottom'>
                                <Form.Button color='black' size='medium' loading={this.state.loading} basic fluid floated='right'><h4>Submit</h4></Form.Button>
                            </Grid.Column>
                        </Grid>
                    </Form.Field>
                </Form>
                <Message error hidden={!!!this.state.errorMessage} header='Uh oh!' content={this.state.errorMessage} />
            </Segment>
        );
    }
}

export default ChangePriceForm;