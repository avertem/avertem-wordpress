(this.webpackJsonpcontract=this.webpackJsonpcontract||[]).push([[0],{150:function(e,t,a){e.exports=a(307)},155:function(e,t,a){},164:function(e,t){},166:function(e,t){},213:function(e,t){},214:function(e,t){},307:function(e,t,a){"use strict";a.r(t);var n=a(1),c=a.n(n),i=a(28),o=a.n(i),l=(a(155),a(156),a(326)),r=a(87),s=a.n(r),d=a(148),h=a(33),u=a(16),m=a(17),p=a(54),f=a(53),E=a(24),g=a(55),_=a(308),y=a(309),v=a(310),b=a(311),w=a(312),S=a(313),C=a(314),k=a(328),j=a(315),O=a(316),D=a(327),A=a(317),M=a(318),x=a(319),T=a(320),N=a(321),q=a(322),B=a(323),P=a(324),F=a(325),K={accountDetails:{account:"",debits:0,credits:0,total:0,progress:0}},X=c.a.createContext({accountDetails:K.accountDetails}),H=a(88),V=a(58),L=a(56),I=a.n(L),W=a(41),J=a(8).Buffer,U=a(43),z=a(49).sha256,G=function(e){function t(e){var a;Object(u.a)(this,t),(a=Object(p.a)(this,Object(f.a)(t).call(this,e))).toggle=function(e){return function(){var t;console.log("Toggle the modal stuff [%o]"+e),a.setState((t={},Object(h.a)(t,"modal_".concat(e),!a.state["modal_".concat(e)]),Object(h.a)(t,"modal_confirm",!0),Object(h.a)(t,"modal_request",!1),Object(h.a)(t,"modal_complete",!1),Object(h.a)(t,"modal_failure",!1),t))}},a.accountMnemonic=W.generateMnemonic(),a.seed=W.mnemonicToSeedSync(a.mnemonicPhrase),a.hdkey=U.fromMasterSeed(a.seed),a.node=a.hdkey.derive("m/44'/60'/0'/0/0"),a.pubBuffer=new J(a.node.publicKey);var n=z.create();return n.update(a.node.publicKey),a.state={modal_send:!1,modal_confirm:!0,modal_request:!1,modal_complete:!1,modal_failure:!1,sidechain_info:{name:"",newMnewmonic:a.accountMnemonic,account:n.hex().toUpperCase(),publicKey:a.pubBuffer.toString("hex"),encrypted:!1,seed:0,mnemonic:""},request_info:{},complete_info:{transactionHash:"",transactionValue:0},failure_info:{transactionHash:"",transactionValue:0,error:""}},a.handleNameChange=a.handleNameChange.bind(Object(E.a)(a)),a.handleEncryptedChange=a.handleEncryptedChange.bind(Object(E.a)(a)),a.handleSeedChange=a.handleSeedChange.bind(Object(E.a)(a)),a.handleMnemonicChange=a.handleMnemonicChange.bind(Object(E.a)(a)),a.sendSidechain=a.sendSidechain.bind(Object(E.a)(a)),a}return Object(g.a)(t,e),Object(m.a)(t,[{key:"handleNameChange",value:function(e){var t=this.state.sidechain_info;t.name=e.target.value,this.setState({sidechain_info:t})}},{key:"handleEncryptedChange",value:function(e){var t=this.state.sidechain_info;t.encrypted=e.target.value,this.setState({sidechain_info:t})}},{key:"handleSeedChange",value:function(e){var t=this.state.sidechain_info;t.seed=e.target.value,this.setState({sidechain_info:t})}},{key:"handleMnemonicChange",value:function(e){var t=this.state.sidechain_info;t.mnemonic=e.target.value,this.setState({sidechain_info:t})}},{key:"sendSidechain",value:function(){var e=Object(d.a)(s.a.mark((function e(t){var a,n,c,i,o,l=this;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("Selected : [%o]",this.state.sidechain_info),t.preventDefault(),a=new Date,(n=z.create()).update(this.state.sidechain_info.name),n.update(a.toISOString()),n.update(""+Math.random()),c=new J(n.arrayBuffer()),i=c.toString("hex"),o=new H.b(new H.a(this.state.sidechain_info.mnemonic),20,this.context.accountDetails.account,this.context.accountDetails.account,"D594F22DC389E38B3DE7FA5630DBD9DCA16DA8A77097516FD37F9E25C6BE24D2",{contract:"BC43DA695277D088BDEC03CE1DC58549651B5F3228F62AEEA7EEA7EDD2E2D221",contractName:"avertem__contract_sidechain_contract",model:{subjects:[{subject:"http://keto-coin.io/schema/rdf/1.0/keto/Sidechain#Sidechain/"+i,predicates:[{predicate:"http://keto-coin.io/schema/rdf/1.0/keto/Sidechain#id",objects:[{value:i,dataType:"http://www.w3.org/2001/XMLSchema#string"}]},{predicate:"http://keto-coin.io/schema/rdf/1.0/keto/Sidechain#accountHash",objects:[{value:this.context.accountDetails.account,dataType:"http://www.w3.org/2001/XMLSchema#string"}]},{predicate:"http://keto-coin.io/schema/rdf/1.0/keto/Sidechain#account",objects:[{value:this.state.sidechain_info.account,dataType:"http://www.w3.org/2001/XMLSchema#string"}]},{predicate:"http://keto-coin.io/schema/rdf/1.0/keto/Sidechain#key",objects:[{value:this.state.sidechain_info.publicKey,dataType:"http://www.w3.org/2001/XMLSchema#string"}]},{predicate:"http://keto-coin.io/schema/rdf/1.0/keto/Sidechain#encrypted",objects:[{value:this.state.sidechain_info.encrypted?"true":"false",dataType:"http://www.w3.org/2001/XMLSchema#string"}]},{predicate:"http://keto-coin.io/schema/rdf/1.0/keto/Sidechain#seed",objects:[{value:""+this.state.sidechain_info.seed,dataType:"http://www.w3.org/2001/XMLSchema#decimal"}]}]}]}}),this,this.setState({modal_confirm:!1,modal_request:!0,modal_complete:!1}),fetch("/wp-json/avertem/v1/transaction/send",{method:"POST",body:o.getProtoTransBuffer(),mode:"cors",headers:{"Content-Type":"application/protobuf",session_hash:this.authSession,"Access-Control-Allow-Origin":"*","X-WP-Nonce":window._sidechain_wpnonce},rejectUnauthorized:!1}).then((function(e){console.log("After sending the result is %o",e),200==e.status&&(console.log("Update the status %o",e),l.setState({modal_confirm:!1,modal_request:!1,modal_complete:!0,complete_info:{transactionHash:o.transactionHashValue.toString("hex"),transactionValue:10020}}))})).catch((function(e){console.log("Failed to send the transaction %s",e.statusText)}));case 13:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){return c.a.createElement(_.a,null,c.a.createElement(y.a,null,c.a.createElement(v.a,null,c.a.createElement(b.a,null,c.a.createElement(w.a,{for:"sidechainName"},"Name"),c.a.createElement(S.a,{type:"text",name:"sidechainName",value:this.state.sidechain_info.name,onChange:this.handleNameChange,required:!0},"Name")),c.a.createElement(b.a,null,c.a.createElement(w.a,{for:"sidechainAccount"},"Account Mnemonic"),c.a.createElement(C.a,null,c.a.createElement(S.a,{type:"text",name:"sidechainAccount",value:this.state.sidechain_info.newMnewmonic,required:!0,readOnly:!0},"Account Mnemonic"),c.a.createElement(k.a,{addonType:"append"},c.a.createElement(I.a,{"data-clipboard-text":this.state.sidechain_info.newMnewmonic},c.a.createElement(V.a,null))))),c.a.createElement(b.a,null,c.a.createElement(w.a,{for:"sidechainAccount"},"Account"),c.a.createElement(C.a,null,c.a.createElement(S.a,{type:"text",name:"sidechainAccount",value:this.state.sidechain_info.account,required:!0,readOnly:!0},"Account"),c.a.createElement(k.a,{addonType:"append"},c.a.createElement(I.a,{"data-clipboard-text":this.state.sidechain_info.account},c.a.createElement(V.a,null))))),c.a.createElement(b.a,null,c.a.createElement(w.a,{for:"sidechainPublickey"},"Public Key"),c.a.createElement(C.a,null,c.a.createElement(S.a,{type:"text",name:"sidechainPublickey",value:this.state.sidechain_info.publicKey,required:!0,readOnly:!0},"Public Key"),c.a.createElement(k.a,{addonType:"append"},c.a.createElement(I.a,{"data-clipboard-text":this.state.sidechain_info.publicKey},c.a.createElement(V.a,null))))),c.a.createElement(b.a,null,c.a.createElement(w.a,{for:"sidechainEncrypted"},"Encrypted"),c.a.createElement(S.a,{type:"radio",name:"sidechainEncrypted",value:this.state.sidechain_info.encrypted,onChange:this.handleEncryptedChange},"Encrypted")),c.a.createElement(b.a,null,c.a.createElement(w.a,{for:""},"Seed"),c.a.createElement(S.a,{type:"number",name:"sidechainSeed",value:this.state.sidechain_info.seed,onChange:this.handleSeedChange,required:!0},"Seed"))),c.a.createElement(j.a,null,c.a.createElement(O.a,{color:"primary",onClick:this.toggle("send")},"Send"),c.a.createElement(D.a,{isOpen:this.state.modal_send,toggle:this.toggle("send"),className:this.props.className},c.a.createElement(A.a,{toggle:this.toggle("send")},"Confirm Send ",this.state.sidechain_info.name),this.state.modal_confirm&&c.a.createElement(M.a,null,c.a.createElement(b.a,null,c.a.createElement(w.a,{for:"mnemonic"},"Mnemonic Phrase"),c.a.createElement(S.a,{type:"textarea",name:"mnemonic",value:this.state.sidechain_info.mnemonic,onChange:this.handleMnemonicChange,required:!0},"Mnemonic Phrase"),c.a.createElement(x.a,{color:"muted"},"Please provide your mnemonic phrase for confirmation."))),this.state.modal_complete&&c.a.createElement(M.a,null,c.a.createElement(T.a,null,c.a.createElement(N.a,null,c.a.createElement(q.a,null,"Transaction"),c.a.createElement(B.a,null,this.state.complete_info.transactionHash)),c.a.createElement(N.a,null,c.a.createElement(q.a,null,"Amount"),c.a.createElement(B.a,null,this.state.complete_info.transactionValue)))),this.state.modal_failure&&c.a.createElement(M.a,null,c.a.createElement(T.a,null,c.a.createElement(N.a,null,c.a.createElement(q.a,null,"Transaction"),c.a.createElement(B.a,null,this.state.failure_info.transactionHash)),c.a.createElement(N.a,null,c.a.createElement(q.a,null,"Amount"),c.a.createElement(B.a,null,this.state.failure_info.transactionValue)),c.a.createElement(N.a,null,c.a.createElement(q.a,null,"Error"),c.a.createElement(B.a,null,this.state.failure_info.transactionValue)))),c.a.createElement(P.a,null,this.state.modal_confirm&&c.a.createElement("div",null,c.a.createElement(O.a,{color:"primary",onClick:this.sendSidechain},"Send")," ",c.a.createElement(O.a,{color:"secondary",onClick:this.toggle("send")},"Cancel")),this.state.modal_request&&c.a.createElement("div",null,c.a.createElement(M.a,null,c.a.createElement(F.a,{color:"dark"}))),this.state.modal_complete&&this.state.modal_failure&&c.a.createElement("div",null,c.a.createElement(O.a,{color:"secondary",onClick:this.toggle("send")},"Close")))))))}}]),t}(n.Component);G.contextType=X;var $=G,Q=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(p.a)(this,Object(f.a)(t).call(this,e))).state={accountDetails:K.accountDetails},a}return Object(g.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){this.getAccount()}},{key:"getAccount",value:function(){var e=this;fetch("/wp-json/avertem/v1/account/info",{method:"GET",mode:"cors",headers:{"Content-Type":"application/json",Accept:"application/json","Access-Control-Allow-Origin":"*","X-WP-Nonce":window._sidechain_wpnonce}}).then((function(e){if(200==e.status)return e.json();console.log("Failed to process request [%o]",e)})).then((function(t){if(t){console.log("error [%o]",t);var a=JSON.parse(t);console.log(a),e.setState({accountDetails:{account:a.account,debits:a.data.debits,credits:a.data.credits,total:a.data.total,progress:parseInt(a.data.debits)/parseInt(a.data.credits)*100}})}})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){return c.a.createElement(X.Provider,{value:this.state},this.props.children)}}]),t}(c.a.Component);var R=function(){return c.a.createElement(Q,null,c.a.createElement(l.a,null,c.a.createElement($,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(c.a.createElement(R,null),document.getElementById("avertem_sidechain_id")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[150,1,2]]]);
//# sourceMappingURL=main.ed309f5e.chunk.js.map