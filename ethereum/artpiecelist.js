import web3 from './web3';
import ArtPiece from './build/ArtPiece.json';

const ArtPieceList = (addresses) => {
    let artPieceList = [];
    
    for(var address of addresses) {
        artPieceList.push( 
            (
                new web3.eth.Contract(JSON.parse(ArtPiece.interface), address)
            )
        );
    };
    
    return artPieceList
};

export default ArtPieceList;
