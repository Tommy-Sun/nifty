import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import ArtPieceCards from '../../components/ArtPieceCards';
import factory from '../../ethereum/factory';
import ArtPieceList from '../../ethereum/artpiecelist';

//This page shows an artist's name and all of the art pieces that were created by him/her.

class ArtistPage extends Component {
    static async getInitialProps (props) { 
        const artPiecesAddresses = await factory.methods.getDeployedArtPieces().call();
        const artPieces = ArtPieceList(artPiecesAddresses);
        const artist = props.query.artist;
        let artPieceSummaries = []
        for(var artPiece of artPieces) {
            if (await artPiece.methods.artist().call() == artist) {
                artPieceSummaries.push( 
                    await artPiece.methods.getSummary().call()
                );
            }
        };

        return { artPieceSummaries, artPiecesAddresses, artist };
    }

    render () {
        return (
            <Layout>
                <Container style={{margin: '10px'}} textAlign='center'>
                    <h1>Artist:</h1>
                    <h1>{this.props.artist}</h1>
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

export default ArtistPage;