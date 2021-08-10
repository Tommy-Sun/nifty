import React from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head'; //anything that uses the Head tag will automatically be placed into the head tag of the html document.
import Header from './Header';
import styles from '../styles/Home.module.css';

//The Layout component, which is imported and used in every page on the app. Has a header which contains the CDN for semantic ui (https://react.semantic-ui.com/usage)

const Layout = (props) => {
    return (
        <Container fluid>
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" 
                    integrity="sha256-9mbkOfVho3ZPXfM7W8sV2SndrGDuh7wuyLjtsWeTI1Q=" crossOrigin="anonymous" />
                <script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.js" integrity="sha256-t8GepnyPmw9t+foMh3mKNvcorqNHamSKtKRxxpUEgFI=" crossorigin="anonymous"></script>
                <script src="/assets/application.js" ></script>
             </Head>
            <div className={styles.content}>
                <Header />
                {props.children}
            </div>
            <Container fluid textAlign="center" className={styles.footer1}><div>Designed by Thomas Kebschull</div></Container>
            <Container fluid textAlign="center" className={styles.footer2} />
        </Container>
    )
};

export default Layout; 