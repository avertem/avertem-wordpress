(this.webpackJsonptransactions=this.webpackJsonptransactions||[]).push([[0],{18:function(e,t,n){e.exports=n(31)},23:function(e,t,n){},31:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),s=n(11),c=n.n(s),r=(n(23),n(24),n(7),n(32)),i=n(2),l=n(3),u=n(5),m=n(4),p=n(6),h={namespaces:[]},d=o.a.createContext({namespaces:h.namespaces}),f=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(u.a)(this,Object(m.a)(t).call(this,e))).authSession=e.authSession,n.state={namespaces:h.namespaces},n}return Object(p.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.getNamespaces()}},{key:"getNamespaces",value:function(){var e=this;fetch("/wp-json/avertem/v1/namespace/namespaces",{method:"GET",mode:"cors",headers:{"Content-Type":"application/json",Accept:"application/json","Access-Control-Allow-Origin":"*","X-WP-Nonce":window._namespaces_wpnonce}}).then((function(e){if(200==e.status)return e.json();console.log("Failed to process request [%o]",e)})).then((function(t){if(t){console.log("error [%o]",t);var n=JSON.parse(t);console.log(n),e.setState({namespaces:n.data?n.data:[]})}})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){return o.a.createElement(d.Provider,{value:this.state},this.props.children)}}]),t}(o.a.Component),v=n(12),g=n.n(v),b=function(e){function t(e){var n;return Object(i.a)(this,t),(n=Object(u.a)(this,Object(m.a)(t).call(this,e))).state={},n.columns=[{name:"Name",selector:"namespace",sortable:!0,right:!0},{name:"Hash",selector:"hash",sortable:!0,right:!0},{name:"Type",selector:"type",sortable:!0,right:!0}],n}return Object(p.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return o.a.createElement(g.a,{data:this.context.namespaces,columns:this.columns,noHeader:!0,fixedHeaderScrollHeight:"300px"})}}]),t}(a.Component);b.contextType=d;var j=b;var w=function(){return o.a.createElement(f,null,o.a.createElement(r.a,null,o.a.createElement(j,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(w,null),document.getElementById("avertem_namespaces_id")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[18,1,2]]]);
//# sourceMappingURL=main.8ee34d12.chunk.js.map