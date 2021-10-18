import React from 'react';
import { Card, Container, Grid, Header, PlaceholderImage } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import MaxStringCharacters from './MaxStringCharacters';
import { Link } from '../routes';
import styles from '../styles/Home.module.css';
import ChangePriceIcon from './ChangePriceIcon';

const ArtPieceCards = React.forwardRef((props, ref) => {

    //Props passed to this component are artPieceSummaries and artPiecesAddresses.

    return (
        <Card.Group style={{ marginTop: '10px' }} itemsPerRow={3}>
            {props.artPieceSummaries.map((art, index) => 
                {
                    const title = art[0];
                    const price = web3.utils.fromWei(art[1], 'ether');
                    const owner = art[2];
                    const artist = art[3];
                    const address = props.artPiecesAddresses[index];
                    const ipfsHash = art[5];



                    return (
                        <Card key={index} className={styles.cardHover}>
                            <Link route={`/buying/${address}`} passHref>
                                <Container className={styles.pointCursor}>
                                    <Header size='medium' textAlign='center' style={{ marginTop: '10px', marginBottom: '10px' }}>
                                        {MaxStringCharacters(title, 35)}
                                    </Header>
                                    <Container className={styles.imgContainer}>
                                        {<img className={styles.img} src={`https://ipfs.io/ipfs/${ipfsHash}`} /> ? 
                                            (
                                                <img
                                                className={styles.img} 
                                                onLoad={() => {
                                                    var shallowCopy = [...this.state.loading];
                                                    shallowCopy[index] = true
                                                    this.setState({ loading: shallowCopy })}
                                                } 
                                                src={`https://ipfs.io/ipfs/${ipfsHash}`}
                                                />
                                            ) : 
                                            (
                                                <Placeholder className={styles.imgContainer}>
                                                    <Placeholder.Image />
                                                </Placeholder>
                                            )
                                        }
                                    </Container>
                                </Container>
                            </Link>
                            <Card.Content extra>
                                <Card.Description textAlign='center'>
                                    <Container>
                                    <Grid columns={3} textAlign='center' verticalAlign='middle'>
                                        <Grid.Row>
                                            <Grid.Column width={4} textAlign='right'></Grid.Column>
                                            <Grid.Column width={8}>
                                                <Link route={`/buying/${address}`} passHref>
                                                    <p style={{ marginBottom: '10px' }} className={styles.pointCursor}>Price: {MaxStringCharacters(price, 7)} ETH</p>
                                                </Link>
                                            </Grid.Column>
                                            <Grid.Column width={4} textAlign='left'>
                                                {props.onOwnerPage ? <ChangePriceIcon price={price} owner={owner} address={address} title={title} /> : null}
                                            </Grid.Column>
                                        </Grid.Row>
                                    </Grid>
                                    </Container>
                                    <Grid columns={2} divided>
                                        <Grid.Column>
                                            <Link route={`/owner/${owner}`} passHref>
                                                <div className={styles.link}>
                                                    <h4>Owner:</h4>
                                                    <p>{MaxStringCharacters(owner, 18)}</p>
                                                </div>
                                            </Link>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Link route={`/artist/${artist}`} passHref>
                                                <div className={styles.link}>
                                                    <h4>Artist:</h4>
                                                    <p>{MaxStringCharacters(artist, 18)}</p>
                                                </div>
                                            </Link>
                                        </Grid.Column>
                                    </Grid>
                                    <br />
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    )
                })
            }
        </Card.Group>
    ) 
}
)

export default ArtPieceCards;

/* Note to self: for dynamic routing you must use backticks `` then ${} */
//<img
className={styles.img} 
onLoad={() => {
    var shallowCopy = [...this.state.loading];
    shallowCopy[index] = true
    this.setState({ loading: shallowCopy })}
} 
src={`https://ipfs.io/ipfs/${ipfsHash}`}
/>