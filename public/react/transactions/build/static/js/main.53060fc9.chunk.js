(this.webpackJsonptransactions=this.webpackJsonptransactions||[]).push([[0],{18:function(t,e,n){t.exports=n(31)},23:function(t,e,n){},31:function(t,e,n){"use strict";n.r(e);var a=n(0),o=n.n(a),r=n(11),c=n.n(r),s=(n(23),n(24),n(7),n(32)),i=n(2),l=n(3),u=n(5),h=n(4),m=n(6),d={transactions:[]},p=o.a.createContext({transactions:d.transactions}),f=function(t){function e(t){var n;return Object(i.a)(this,e),(n=Object(u.a)(this,Object(h.a)(e).call(this,t))).authSession=t.authSession,n.state={transactions:d.transactions},n}return Object(m.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){this.getTransactions()}},{key:"getTransactions",value:function(){var t=this;fetch("/wp-json/avertem/v1/account/transactions",{method:"GET",mode:"cors",headers:{"Content-Type":"application/json",Accept:"application/json","Access-Control-Allow-Origin":"*","X-WP-Nonce":window._transaction_wpnonce}}).then((function(t){if(200==t.status)return t.json();console.log("Failed to process request [%o]",t)})).then((function(e){if(e){console.log("error [%o]",e);var n=JSON.parse(e);console.log(n),t.setState({transactions:n.data?n.data:[]})}})).catch((function(t){console.log(t)}))}},{key:"render",value:function(){return o.a.createElement(p.Provider,{value:this.state},this.props.children)}}]),e}(o.a.Component),v=n(12),b=n.n(v),g=function(t){function e(t){var n;return Object(i.a)(this,e),(n=Object(u.a)(this,Object(h.a)(e).call(this,t))).state={},n.columns=[{name:"Id",selector:"id",sortable:!0},{name:"Account",selector:"account",sortable:!0},{name:"Date",selector:"date",sortable:!0,right:!0},{name:"Type",selector:"type",sortable:!0,right:!0},{name:"Name",selector:"name",sortable:!0,right:!0},{name:"Amount",selector:"amount",sortable:!0,right:!0}],n}return Object(m.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){return o.a.createElement(b.a,{data:this.context.transactions,columns:this.columns,noHeader:!0,fixedHeaderScrollHeight:"300px"})}}]),e}(a.Component);g.contextType=p;var j=g;var w=function(){return o.a.createElement(f,null,o.a.createElement(s.a,null,o.a.createElement(j,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(w,null),document.getElementById("avertem_transactions_id")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[18,1,2]]]);
//# sourceMappingURL=main.53060fc9.chunk.js.map