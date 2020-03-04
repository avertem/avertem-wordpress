var bip39 = require('bip39');
var jQuery = require('jquery');
var Buffer = require('buffer/').Buffer
var HDKey = require('hdkey')
var sha256 = require('js-sha256').sha256;
var ClipboardJS = require('clipboard');

let accountHex = null;

function setKey(mnemonicPhrase) {
    let seed = bip39.mnemonicToSeedSync(mnemonicPhrase);
    let seedBuffer = new Buffer(seed)
    let hdkey = HDKey.fromMasterSeed(seed)

    let node = hdkey.derive("m/44'/60'/0'/0/0");
    let pubBuffer = new Buffer(node.publicKey)

    // generate the account id as hex from the public key
    var accountHash = sha256.create();
    accountHash.update(node.publicKey);
    accountHex = accountHash.hex().toUpperCase();

    // set value
    jQuery('.mnemonic_phrase').attr("data-clipboard-text",mnemonicPhrase);

    // set the account key
    jQuery('.mnemonic_key').val(JSON.stringify({
        mnemonic_public_key: pubBuffer.toString("hex"),
        mnemonic_account: accountHex,
    }));

    
    jQuery('.mnemonic_account_text').html(accountHex);
    jQuery('.mnemonic_account').attr("data-clipboard-text",accountHex);

    // set the username and set to read only
    jQuery('#user_login').val(accountHex.toLowerCase().substring(0,20));
    jQuery('#user_login').prop("readonly", true);
    //jQuery('#user_login').prop("size", 40);
}

jQuery(document).ready(function() {
    var clipboard = new ClipboardJS('.mnemonic_btn');

    const mnemonic = bip39.generateMnemonic();
    jQuery('.mnemonic').html(mnemonic);
    setKey(mnemonic);
    
    jQuery('#anonymous').change(function() {
        if(this.checked) {
            jQuery('#user_email').val(accountHex + "@avertem.io");
            jQuery('#first_name').val(accountHex);
            jQuery('#last_name').val(accountHex);
            jQuery('#billing_address_1').val(accountHex);
            jQuery('#billing_city').val(accountHex);
            jQuery('#billing_state').val(accountHex);
            jQuery('#billing_postcode').val(accountHex);
            jQuery('#billing_country').val(accountHex);
        }
    });
});

