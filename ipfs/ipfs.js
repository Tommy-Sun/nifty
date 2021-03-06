const { create } = require('ipfs-http-client');

const ipfsClient = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
})

export default ipfsClient;
