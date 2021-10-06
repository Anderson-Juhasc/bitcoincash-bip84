module.exports = {
  NETWORKS: {
    mainnet: {
      messagePrefix: '\x19Litecoin Signed Message:\n',
      bech32: 'bitcoincash',
      bip44: 145,
      bip32: {
        public: 0x0488b21e,
        private: 0x0488ade4
      },
      pubKeyHash: 0x00,
      scriptHash: 0x00,
      wif: 0x80
    },
    testnet: {
      messagePrefix: '\x19Litecoin Signed Message:\n',
      bech32: 'bchtest',
      bip44: 1,
      bip32: {
        public: 0x043587cf,
        private: 0x04358394
      },
      pubKeyHash: 0x6f,
      scriptHash: 0xc4,
      wif: 0xef
    }
  }
}
