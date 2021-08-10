import web3 from './web3';
import ArtPiece from './build/ArtPiece.json';

const SomeArtPiece = (address) => {
    return new web3.eth.Contract(
        JSON.parse(ArtPiece.interface),
        address
    )
};

export default SomeArtPiece;