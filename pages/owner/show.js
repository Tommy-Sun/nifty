import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import ArtPieceCards from '../../components/ArtPieceCards';
import factory from '../../ethereum/factory';
import ArtPieceList from '../../ethereum/artpiecelist';

//This page shows an owner's name and all of the art pieces that are owned by him/her. 
//Also, he/she can edit the price of any of said art pieces.

class OwnerPage extends Component {
    static async getInitialProps (props) { 
        const artPiecesAddresses = await factory.methods.getDeployedArtPieces().call();
        const artPieces = ArtPieceList(artPiecesAddresses);
        const owner = props.query.owner;
        let artPieceSummaries = []
        for(var artPiece of artPieces) {
            if (await artPiece.methods.owner().call() == owner) {
                artPieceSummaries.push( 
                    await artPiece.methods.getSummary().call()
                );
            }
        };

        return { artPieceSummaries, artPiecesAddresses, owner };
    }

    render () {
        return (
            <Layout>
                <Container style={{margin: '10px'}} textAlign='center'>
                    <h1>Owner:</h1>
                    <h1>{this.props.owner}</h1>
                    <ArtPieceCards  
                        artPieceSummaries={this.props.artPieceSummaries}
                        artPiecesAddresses={this.props.artPiecesAddresses}
                        onOwnerPage={true}
                    />
                </Container>
            </Layout>
        )
    }
}

export default OwnerPage;