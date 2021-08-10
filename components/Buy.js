import React, { Component } from 'react';
import { Grid, Message, Button, Icon } from 'semantic-ui-react';
import ChangePriceIcon from './ChangePriceIcon';
import { Router } from '../routes';
import web3 from '../ethereum/web3';
import ArtPiece from '../ethereum/artpiece';

//This component is only used in pages/buying/show.js. It shows the buying button and the ChangePriceIcon.

class Buy extends Component {
    state = {
        isOwner: false,
        errorMessage: '',
        loading: false
    }

    onBuy = async () => {
        this.setState({ loading: true, errorMessage: '' });
        try {
            const artPiece = ArtPiece(this.props.address);
            const accounts = await web3.eth.getAccounts();
            await artPiece.methods.buyArtPiece().send({
                from: accounts[0],
                value: web3.utils.toWei(this.props.price, 'ether') 
            });

            Router.replace(`/buying/${this.props.address}`); //essentially refreshes/redirects the page without telling the browser we have gone anywhere new. (Effectively refreshes the page.) 
        } catch (err) {
            this.setState({ errorMessage: err.message });
            console.log(err.message);
        };

        this.setState({ loading: false });
    };

    render () {
        const { Row, Column } = Grid;
        const { price, owner, address, title } = this.props;
        
        return (                
                <Grid>
                    <Row verticalAlign='middle'>
                        <Column width={11} textAlign='right'>
                            <h3>Price: {price} ETH</h3>
                        </Column>
                        <Column width={1} textAlign='left' style={{ padding: '0px' }}>
                            <ChangePriceIcon 
                                price={price}
                                owner={owner}
                                address={address}
                                title={title}
                            />
                        </Column>
                        <Column width={4}>
                            <Button fluid animated='fade' color='black' circular size='large' floated='right' loading={this.state.loading} onClick={this.onBuy}>
                                <Button.Content hidden><Icon style={{ marginTop: '-6px'}} size='large' name='ethereum' /></Button.Content>
                                <Button.Content visible>Buy</Button.Content>
                            </Button>
                        </Column>
                    </Row>
                    <Row>
                        <Column textAlign='right'>
                            <Message error hidden={!!!this.state.errorMessage} header='Uh oh!' content={this.state.errorMessage} />
                        </Column>
                    </Row>
                </Grid>      
        );
    }
}

export default Buy;