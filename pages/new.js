import React, { Component } from 'react';
import Layout from '../components/Layout';
import { Container, Form, Grid, Segment, Message, Image } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import web3 from'../ethereum/web3';
import { Link } from '../routes';
import ipfs from '../ipfs/ipfs';
import styles from '../styles/Home.module.css';

/*

This page allows the user to create a new NFT. It is a form.

Error messages are custom designed and custom handled.

It deploys the NFT on a new smartcontract, and its address is added to the website's smartcontract list of smart contract addresses.
(As commented in our Solidity code, the website has one overall smartcontract (the factory) which keeps a list of the NFT's (the artpiece) smart contract addresses.)

*/

class NewNFT extends Component {
    state = {
        loading: false,
        errorMessage: '',
        successMessage: '',
        title: '',
        price: '',
        artist: '',
        description: '',
        buffer: null,
        ipfsHash: '',
        fileErrorMessage: '',
        titleErrorMessage: '',
        priceErrorMessage: '',
        artistErrorMessage: '',
        descriptionErrorMessage: ''
    };

    isFloat(n) {
        return parseFloat(n.match(/^-?\d*(\.\d+)?$/))>0;
    }
    // ^This function returns true of false depending on whether the input is a float or not.

    captureFile = (event) => {
        console.log('this capture button is working.');
        event.preventDefault();
        const file = event.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            const buffer = Buffer.from(reader.result);
            this.setState({ buffer: buffer });
            console.log(this.state.buffer);
        };
    }

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: '', successMessage: '', fileErrorMessage: '', titleErrorMessage: '', priceErrorMessage: '', 
                artistErrorMessage: '', descriptionErrorMessage: '' });

        let inputIsFaulty = false;

        try {
            if (this.state.buffer == null) throw "No file found. Please input an accepted NFT file.";
        } catch(err) {
            this.setState({ fileErrorMessage: err });
            inputIsFaulty = true;
        }

        try {
            if (!this.state.title) throw "No title inputted.";
            if (this.state.title.length > 80) throw "Title length cannot exceed 80 characters." 
        } catch(err) {
            this.setState({ titleErrorMessage: err + " Please enter the new NFT's title." });
            inputIsFaulty = true;
        }
        
        try {
            if (!this.state.price) throw "No price inputted.";
            if (!this.isFloat(this.state.price)) throw "Price must be a decimal or number."
        } catch(err) {
            this.setState({ priceErrorMessage: err + " Please enter the new NFT's price (in Ether). Only numbers accepted." });
            inputIsFaulty = true;
        }

        try {
            if (!this.state.artist) throw "No artist inputted";
            if (this.state.artist.length > 80) throw "Artist length cannot exceed 80 characters." 
        } catch(err) {
            this.setState({ artistErrorMessage: err + " Please enter the name of the new NFT's artist." });
            inputIsFaulty = true;
        }

        try {
            if (!this.state.description) throw "No description inputted";
        } catch(err) {
            this.setState({ descriptionErrorMessage: err + " Please enter the new NFT's description." });
            inputIsFaulty = true;
        }

        try {
            if (inputIsFaulty == true) throw "";
            
            try{
                const result = await ipfs.add(this.state.buffer); //This is adding the ipfs data to ipfs storage.
                this.setState({ ipfsHash: result.path }); //This is the ipfs hash which is the reference needed to find the data on ipfs storage.
                console.log('ipfsHash', this.state.ipfsHash);
            } catch(error) {
                console.log("ipfs is not adding the buffer");
                console.error(error);
            }
            
            const { title, price, artist, description, ipfsHash } = this.state;

            const accounts = await web3.eth.getAccounts();
            await factory.methods
            .createArtPiece(title, web3.utils.toWei(price, 'ether'), artist, description, ipfsHash)
            .send({
                from: accounts[0]
            });
            this.setState({ successMessage: 'New NFT Created. Click to redirect to Home'})
        } catch(err) {
            if (err != "") {
                this.setState({errorMessage: err.message});
            }
        }

        this.setState({ loading: false })
    }
    
    render() {
        const acceptedFiles = "File - Accepted file tyes are APNG, AVIF, GIF, JPEG, PNG, SVG, or WebP";
        const noError = styles.noError;
        const showError = styles.showError;

        return (
            <Layout>
                <Container textAlign='left' text>
                    <Segment raised>
                        <Container style={{ margin: '10px'}} textAlign='center'><h1>New NFT</h1></Container>
                        <Form onSubmit={this.onSubmit} loading={this.state.loading} style={{ marginBottom: '70px'}}>
                            <Form.Field>
                                        <Form.Input type='file' onChange={this.captureFile.bind(this)} label={acceptedFiles} error={!!this.state.fileErrorMessage} />
                                        <div className={`ui pointing above prompt label ${!!!this.state.fileErrorMessage ? noError : showError}`}>{this.state.fileErrorMessage}</div>
                            </Form.Field>
                            <Form.Field>
                                    <Form.Input
                                    fluid
                                    label='Title'
                                    placeholder='Title'
                                    id='form-input-first-name'
                                    value={this.state.title}
                                    onChange={event => this.setState({ title: event.target.value })}
                                    error={!!this.state.titleErrorMessage}
                                />
                                <div className={`ui pointing above prompt label ${!!!this.state.titleErrorMessage ? noError : showError}`}>{this.state.titleErrorMessage}</div>
                            </Form.Field>
                            
                            <Form.Field>
                                <Grid columns={2} style={{ marginBottom: !!this.state.priceErrorMessage ? '4px' : null }}>
                                    <Grid.Column width={14}>
                                        <Form.Input
                                            fluid
                                            label='Price'
                                            placeholder='Price'
                                            value={this.state.price}
                                            onChange={event => this.setState({ price: event.target.value })}
                                            error={!!this.state.priceErrorMessage}
                                        />
                                    </Grid.Column>
                                    <Grid.Column width={2} verticalAlign='bottom'>
                                        <h2>ETH</h2>
                                    </Grid.Column>
                                </Grid>
                                <div className={`ui pointing above prompt label ${!!!this.state.priceErrorMessage ? noError : showError}`}>{this.state.priceErrorMessage}</div>
                            </Form.Field>
                            <Form.Field>
                                <Form.Input
                                    label='Artist'
                                    fluid
                                    placeholder='Artist'
                                    value={this.state.artist}
                                    onChange={event => this.setState({ artist: event.target.value })}
                                    error={!!this.state.artistErrorMessage}
                                />
                                <div className={`ui pointing above prompt label ${!!!this.state.artistErrorMessage ? noError : showError}`}>{this.state.artistErrorMessage}</div>
                            </Form.Field>
                            <Form.Field>
                                <Form.TextArea 
                                    fluid='true'
                                    label='Description'
                                    placeholder='Description'
                                    value={this.state.description}
                                    onChange={event => this.setState({ description: event.target.value })}
                                    error={!!this.state.descriptionErrorMessage}
                                />
                                <Form.Button color='black' size='medium' basic floated='right'><h4>Submit</h4></Form.Button>
                                <div className={`ui pointing above prompt label ${!!!this.state.descriptionErrorMessage ? noError : showError}`}>{this.state.descriptionErrorMessage}</div>
                            </Form.Field>
                        </Form>
                    </Segment>
                    <Message error hidden={!!!this.state.errorMessage} header='Metamask Error?' content={this.state.errorMessage} />
                    <Link route='/'>
                        <a><Message color='black' hidden={!!!this.state.successMessage} header='Success!' content={this.state.successMessage} /></a>
                    </Link>
                </Container>
            </Layout>
        )
    }
}

export default NewNFT;
