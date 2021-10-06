const { bip32, payments } = require('bitcoinjs-lib')
    , b58 = require('bs58check')
    , bip39 = require('bip39')
    , BIP84 = require('bip84')
    , bchaddr = require('bchaddrjs')
    , { NETWORKS } = require('./constants')

function fromMnemonic(mnemonic, password, isTestnet) {
  BIP84.fromSeed.call(this, mnemonic, password, isTestnet, 145)
}

fromMnemonic.prototype = Object.create(BIP84.fromSeed.prototype)

function fromZPrv(zprv) {
  BIP84.fromZPrv.call(this, zprv, false, NETWORKS)
}

fromZPrv.prototype = Object.create(BIP84.fromZPrv.prototype)

fromZPrv.prototype.getAddress = function (index, isChange) {
  let change = isChange === true ? 1 : 0
    , pubkey = bip32.fromBase58(this.zprv, this.network).derive(change).derive(index).publicKey
    , address = bchaddr.toCashAddress((payments.p2pkh({ pubkey: pubkey, network: this.network })).address)

  return address
}

function fromZPub(zpub) {
  BIP84.fromZPub.call(this, zpub, false, NETWORKS)
}

fromZPub.prototype = Object.create(BIP84.fromZPub.prototype)

fromZPub.prototype.getAddress = function (index, isChange) {
  let change = isChange === true ? 1 : 0
    , pubkey = bip32.fromBase58(this.zpub, this.network).derive(change).derive(index).publicKey
    , address = bchaddr.toCashAddress((payments.p2pkh({ pubkey: pubkey, network: this.network })).address)

  return address
}

module.exports = {
  generateMnemonic: bip39.generateMnemonic,
  entropyToMnemonic: bip39.entropyToMnemonic,
  fromMnemonic: fromMnemonic,
  fromZPrv: fromZPrv,
  fromZPub: fromZPub
}
