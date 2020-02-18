var bip39 = require('bip39');
var jQuery = require('jquery');
var Buffer = require('buffer/').Buffer
var HDKey = require('hdkey')
var sha256 = require('js-sha256').sha256;
var ClipboardJS = require('clipboard');

function setKey(mnemonicPhrase) {
    let seed = bip39.mnemonicToSeedSync(mnemonicPhrase);
    let seedBuffer = new Buffer(seed)
    let hdkey = HDKey.fromMasterSeed(seed)

    let node = hdkey.derive("m/44'/60'/0'/0/0");
    let pubBuffer = new Buffer(node.publicKey)

    // generate the account id as hex from the public key
    var accountHash = sha256.create();
    accountHash.update(node.publicKey);
    let accountHex = accountHash.hex();

    // set value
    jQuery('.mnemonic_phrase').attr("data-clipboard-text",mnemonicPhrase);

    // set the account key
    jQuery('.mnemonic_key').val(JSON.stringify({
        mnemonic_public_key: pubBuffer.toString("hex"),
        mnemonic_account: accountHex,
    }));

    
    jQuery('.mnemonic_account_text').html(accountHex);
    jQuery('.mnemonic_account').attr("data-clipboard-text",accountHex);
}

jQuery(document).ready(function() {
    var clipboard = new ClipboardJS('.mnemonic_btn');

    const mnemonic = bip39.generateMnemonic();
    jQuery('.mnemonic').html(mnemonic);
    setKey(mnemonic);
});

