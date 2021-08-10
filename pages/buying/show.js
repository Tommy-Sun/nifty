import React, { Component } from 'react';
import Layout from '../../components/Layout';
import ArtPiece from '../../ethereum/artpiece';
import web3 from '../../ethereum/web3';
import { Grid, Container, Image, Modal } from 'semantic-ui-react';
import { Link } from '../../routes';
import Buy from '../../components/Buy';
import styles from '../../styles/Home.module.css';

//This is the detail view of an art piece. Along with showing the details, it is the page where a buyer may buy the art piece. 
//Also, an owner of the art piece may change the price.

class BuyingPage extends Component {
    state = {
        errorMessage: '',
        loading: false,
        userAccountAddress: '',
        modalIsOpen: false,
        modalHeight: 0
    };

    static async getInitialProps (props) { 
        const address = props.query.address;
        const artPiece = ArtPiece(address);
        const summary = await artPiece.methods.getSummary().call();

        const title = summary[0];
        const price = web3.utils.fromWei(summary[1], 'ether');
        const owner = summary[2];
        const artist = summary[3];
        const description = summary[4];
        const ipfsHash = summary[5];


        const accounts = await web3.eth.getAccounts();
        console.log("accounts", accounts);
        const userAccountAddress = accounts[0];
        
        console.log("userAddress", userAccountAddress);

        web3.eth.getAccounts().then(console.log);

        return { title, price, owner, artist, description, ipfsHash, address, userAccountAddress };
    }

    onOpenModal = () => {
        this.setState({ modalHeight: (window.innerHeight * 0.7) });
        this.setState({ modalIsOpen: true });
    };

    onCloseModal = () => {
        this.setState({ modalIsOpen: false });
    }

    render() {
        const { Row, Column } = Grid;
        const { title, price, owner, artist, description, address, ipfsHash, userAccountAddress } = this.props;
        console.log(this.state.modalHeight);

        return (
            <Layout>
                <Container>
                    <Grid padded='horizontally'>
                        <Row>
                            <Modal
                                style={{ width: 'auto'}}
                                onClose={() => this.setState({ modalIsOpen: false })}
                                onOpen={this.onOpenModal}
                                open={this.state.modalIsOpen}
                                
                                trigger={
                                    <Image className={styles.pointCursor} centered src={`https://ipfs.io/ipfs/${ipfsHash}`} />
                                }
                            >
                                    <Image className={styles.imgModal} style={{ maxHeight: `${this.state.modalHeight}px`}}  centered src={`https://ipfs.io/ipfs/${ipfsHash}`} />   
                            </Modal>
                        </Row>
                        <Row>
                            <Column textAlign='left'><h2>{title}</h2></Column>
                        </Row>
                        <Row>
                            <Column textAlign='center'><p>{description}</p></Column>
                        </Row>
                        <Row columns={2} divided>
                            <Column textAlign='center'>
                                <Link route={`/owner/${owner}`}>
                                    <div className={styles.link}>
                                        <h4>Owner:</h4>
                                        <p>{owner}</p>
                                    </div>
                                </Link>
                            </Column>
                            <Column textAlign='center'>
                                <Link route={`/artist/${artist}`}>
                                    <div className={styles.link}>
                                        <h4>Artist:</h4>
                                        <p>{artist}</p>
                                    </div>
                                </Link>
                            </Column>
                        </Row>
                        <Row>
                            <Column>
                                <Buy
                                    owner={owner}
                                    address={address}
                                    price={price}
                                    title={title}
                                />  
                            </Column>
                        </Row>
                    </Grid>
                </Container>
            </Layout>
        )
    }
}

export default BuyingPage;
