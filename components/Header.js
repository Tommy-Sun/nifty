import React from 'react';
import { Button, Icon, Grid } from 'semantic-ui-react';
import { Link } from '../routes'; 
import styles from '../styles/Home.module.css';

//This is the Header of the website. It has a couple links to the home page (pages/index), and a link to the create new NFT page (pages/new).

const Header = (props) => {
    return (
        <Grid style={{ marginTop: '10px', marginBottom: '10px', marginRight: '50px', marginLeft: '50px', }}>
            <Grid.Row verticalAlign='middle'> 

                <Grid.Column width={1} textAlign='center'>
                    <Link route='/'>
                        <Button circular animated='vertical' color='black' size='massive'>
                            <Button.Content hidden><Icon name='home' /></Button.Content>
                            <Button.Content visible>NiFTy</Button.Content>
                        </Button>
                    </Link>
                </Grid.Column>

                <Grid.Column width={11} />

                <Grid.Column width={1} textAlign='center'>
                    <Link route='/'>    
                        <a>
                            <h1 className={styles.link}>
                                Art
                            </h1>
                        </a>
                    </Link>
                </Grid.Column>

                <Grid.Column width={2} />

                <Grid.Column width={1} textAlign='center'>
                    <Link route='/new'>
                        <a>
                            <h1 className={styles.link}>
                                +
                            </h1>
                        </a>
                    </Link> 
                </Grid.Column>

            </Grid.Row>
        </Grid>
    );
};

export default Header;