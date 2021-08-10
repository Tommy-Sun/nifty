import React, { Component } from 'react';
import { Modal, Icon, Header } from 'semantic-ui-react';
import styles from '../styles/Home.module.css';
import web3 from '../ethereum/web3';
import ChangePriceForm from './ChangePriceForm';
import NotTheOwnerMessage from './NotTheOwnerMessage';

//The Icon that if pressed, allows you to edit/change the price of the art piece. Only allows you to do so, however, if the user is the owner of said art piece.

class ChangePriceIcon extends Component {
    state = {
        modalIsOpen: false,
        isOwner: false
    }

    onOpenModal = async () => {
        this.setState({ isOwner: false });
        const accounts = await web3.eth.getAccounts();
        const userAccountAddress = accounts[0];
        if (userAccountAddress == this.props.owner) {
            this.setState({ isOwner: true });
        }

        this.setState({ modalIsOpen: true });
    };

    onCloseModal = () => {
        this.setState({ modalIsOpen: false });
    }

    render () {
        return (
            <Modal
                dimmer="inverted"
                onClose={() => this.setState({ modalIsOpen: false })}
                onOpen={this.onOpenModal}
                open={this.state.modalIsOpen}
                trigger={
                    <div className={styles.link}>
                        <Icon name='edit' style={{ marginLeft: '5px' }} />
                        <Header sub style={{ marginTop: '0px' }} size='tiny'>Edit</Header>
                    </div>
                }
            >
                {this.state.isOwner ? <ChangePriceForm  price={this.props.price} address={this.props.address} title={this.props.title} closeModal={this.onCloseModal} /> 
                    : <NotTheOwnerMessage closeModal={this.onCloseModal} />}
            </Modal>
        );
    }
}

export default ChangePriceIcon;