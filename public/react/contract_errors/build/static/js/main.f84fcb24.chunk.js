(this.webpackJsonpcontract_error=this.webpackJsonpcontract_error||[]).push([[0],{18:function(t,e,n){t.exports=n(31)},23:function(t,e,n){},31:function(t,e,n){"use strict";n.r(e);var r=n(0),o=n.n(r),c=n(11),a=n.n(c),s=(n(23),n(24),n(7),n(32)),i=n(2),l=n(3),u=n(5),h=n(4),d=n(6),m={contract_errors:[]},p=o.a.createContext({contract_errors:m.contract_errors}),f=function(t){function e(t){var n;return Object(i.a)(this,e),(n=Object(u.a)(this,Object(h.a)(e).call(this,t))).authSession=t.authSession,n.state={contract_errors:m.contract_errors},n}return Object(d.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){this.getContracts()}},{key:"getContracts",value:function(){var t=this;fetch("/wp-json/avertem/v1/contract/contract_errors",{method:"GET",mode:"cors",headers:{"Content-Type":"application/json",Accept:"application/json","Access-Control-Allow-Origin":"*","X-WP-Nonce":window._contract_errors_wpnonce}}).then((function(t){if(200==t.status)return t.json();console.log("Failed to process request [%o]",t)})).then((function(e){if(e){console.log("error [%o]",e);var n=JSON.parse(e);console.log(n),t.setState({contract_errors:n.data?n.data:[]})}})).catch((function(t){console.log(t)}))}},{key:"render",value:function(){return o.a.createElement(p.Provider,{value:this.state},this.props.children)}}]),e}(o.a.Component),v=n(12),g=n.n(v),_=function(t){function e(t){var n;return Object(i.a)(this,e),(n=Object(u.a)(this,Object(h.a)(e).call(this,t))).state={},n.columns=[{name:"Id",selector:"id",sortable:!0,right:!0},{name:"MSG",selector:"msg",sortable:!0,right:!0}],n}return Object(d.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){return o.a.createElement(g.a,{data:this.context.contract_errors,columns:this.columns,noHeader:!0,fixedHeaderScrollHeight:"300px"})}}]),e}(r.Component);_.contextType=p;var b=_;var j=function(){return o.a.createElement(f,null,o.a.createElement(s.a,null,o.a.createElement(b,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.a.render(o.a.createElement(j,null),document.getElementById("avertem_contract_errors_id")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[18,1,2]]]);
//# sourceMappingURL=main.f84fcb24.chunk.js.map