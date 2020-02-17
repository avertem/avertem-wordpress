var bip39 = require('bip39');
var jQuery = require('jquery');
var Buffer = require('buffer/').Buffer
var HDKey = require('hdkey')

function setKey(mnemonicPhrase) {
    let seed = bip39.mnemonicToSeedSync(mnemonicPhrase);
    let seedBuffer = new Buffer(seed)
    let hdkey = HDKey.fromMasterSeed(seed)

    let node = hdkey.derive("m/44'/60'/0'/0/0");
    let pubBuffer = new Buffer(node.publicKey)
    jQuery('.mnemonic_key').val(pubBuffer.toString("hex"));
}

jQuery(document).ready(function() {
    const mnemonic = bip39.generateMnemonic();
    jQuery('.mnemonic').val(mnemonic);
    setKey(mnemonic);
    jQuery('.mnemonic').change(function(){
        setKey(jQuery('.mnemonic').val());
    })
});

