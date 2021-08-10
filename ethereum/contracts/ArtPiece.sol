pragma solidity ^0.4.26;

contract ArtPieceFactory {
    address[] public deployedArtPieces;

    function createArtPiece(string artTitle, uint artPrice, string artistName, string artdescription, string artIpfsHash) public {
        address newArtPiece = new ArtPiece(artTitle, msg.sender, artPrice, artistName, artdescription, artIpfsHash);
        deployedArtPieces.push(newArtPiece);
    }

    function getDeployedArtPieces() public view returns (address[]) {
        return deployedArtPieces;
    }
}

contract ArtPiece {
    address public owner;
    string public title;
    uint256 public price;
    string public artist; 
    string public description;
    string private ipfsHash;

    constructor(
        string artTitle,
        address artOwner,
        uint256 artPrice,
        string artistName,
        string artdescription,
        string artIpfsHash
    ) public {
        title = artTitle;
        owner = artOwner;
        price = artPrice;
        artist = artistName;
        description = artdescription;
        ipfsHash = artIpfsHash;
    }

    function buyArtPiece() public payable {
        require(msg.sender != owner);
        require(msg.value >= price);
        owner.transfer(price);
        owner = msg.sender;
    }

    function updatePrice(uint256 newPrice) public {
        require(msg.sender == owner);
        price = newPrice;
    }

    function getSummary() public view returns (string, uint, address, string, string, string) {
        return (
          title,
          price,
          owner,
          artist,
          description, 
          ipfsHash
        );
    }
}

