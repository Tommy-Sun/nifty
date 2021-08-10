import React, { Component } from 'react';
import { Button, Container, } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import ArtPieceList from '../ethereum/artpiecelist';
import ArtPieceCards from '../components/ArtPieceCards';
import { Link } from '../routes';

//This is the Home Page. It displays all art pieces. 

class NiftyIndex extends Component { //we use getInitialProps instead of componentDidMount because Next.js renders everything on the server. componentDidMount will not run correctly for Next js unfortunately so we need to use the other method instead.
    static async getInitialProps () { 
        const artPiecesAddresses = await factory.methods.getDeployedArtPieces().call();
        const artPieces = ArtPieceList(artPiecesAddresses);
        let artPieceSummaries = []
        for(var artPiece of artPieces) {
            artPieceSummaries.push( 
                await artPiece.methods.getSummary().call()
            );
        };

        return { artPieceSummaries, artPiecesAddresses };
    }

    render() {
        return  (
            <Layout>   
                <Link route={`/new`}>
                    <Button color="black" fluid>Create New NFT</Button>
                </Link>
                <Container>          
                    <div>
                    <Container style={{margin: '10px'}}><h1 className='ui center aligned container'>Art</h1></Container>
                        <ArtPieceCards
                            artPieceSummaries={this.props.artPieceSummaries}
                            artPiecesAddresses={this.props.artPiecesAddresses}
                            onOwnerPage={false}
                        />
                    </div>
                </Container>
            </Layout>
        )
    }
}

export default NiftyIndex;