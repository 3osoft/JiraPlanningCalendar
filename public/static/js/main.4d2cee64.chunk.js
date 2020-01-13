(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{213:function(e,t,a){e.exports=a(401)},218:function(e,t,a){},401:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),o=a(25),l=a.n(o),c=(a(218),a(87)),i=a(47),s=a.n(i),d=a(205),u=a(181),p=a(182),f=a(64),m=a(187),v=a.n(m),g=a(189),y=a.n(g),b="".concat("https://bkjira.atlassian.net","/browse/"),E=a(29),w=function(e){var t=e.cell,a=Object(E.c)(),r=Object(E.d)((function(e){return e})),o=t.row,l=t.col,i=JSON.stringify({row:o,col:l}),s=t.id,d=function(e,t){!function(e){r.selectedItems.find((function(t){return t.cellId===e.cellId&&t.value===e.value}))||a(R(e))}({cellId:s,value:t})};return n.a.createElement(f.c,{droppableId:i},(function(e,a){return n.a.createElement("div",{ref:e.innerRef,style:(o=a.isDraggingOver,{background:o?"lightblue":"white",padding:"8px"})},t.value.map((function(e,t){return n.a.createElement(f.b,{key:"".concat(s,"-").concat(e),draggableId:"".concat(s,"-").concat(e),index:t},(function(t,a){return n.a.createElement("div",Object.assign({ref:t.innerRef},t.draggableProps,{style:(o=a.isDragging,l=t.draggableProps.style,i=r.selectedItems.find((function(t){return s===t.cellId&&e===t.item})),Object(c.a)({display:"flex",userSelect:"none",padding:"3px",marginTop:"2px",marginBottom:"2px",background:o?"lightgreen":"white",borderStyle:i?"dotted":"none"},l))}),n.a.createElement("div",Object.assign({},t.dragHandleProps,{style:{width:"20px",height:"20px"},onClick:function(t){return function(e,t){e.defaultPrevented||0===e.button&&(e.preventDefault(),d(e,t))}(t,e)},onKeyDown:function(e){}}),n.a.createElement(v.a,{label:"drag-handle"})),n.a.createElement("div",{style:{marginLeft:"5px",marginRight:"10px"}},e),n.a.createElement("div",{onClick:function(){return function(e){window.open("".concat(b).concat(e),"_blank")}(e)},style:{width:"20px",height:"20px",cursor:"pointer"}},n.a.createElement(y.a,{label:"open"})));var o,l,i}))})),e.placeholder);var o}))},D=a(190);var h=a.n(D).a.create({baseURL:"http://localhost:3001"});h.interceptors.request.use((function(e){return e.url=e.url+"?jwt="+window.parent.window.token,e}));var I=a(42),O=a.n(I),S=function(){function e(){Object(u.a)(this,e),this.defaultQuery={startDate:O()().startOf("isoWeek").toDate(),endDate:O()().endOf("isoWeek").toDate()}}return Object(p.a)(e,[{key:"loadData",value:function(){var e,t=arguments;return s.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return t.length>0&&void 0!==t[0]?t[0]:this.defaultQuery,e=[[{id:"1",row:0,col:0,value:["Raspberry","Apple"],selected:[],DataViewer:w},{id:"2",row:0,col:1,value:["Paprika","Onion"],selected:[],DataViewer:w}],[{id:"3",row:1,col:0,value:["Cola","Fanta","Sprite"],selected:[],DataViewer:w}]],a.abrupt("return",e);case 3:case"end":return a.stop()}}),null,this)}},{key:"getData",value:function(e){var t="/users",a="/issues";if(e){e.userName&&(t="".concat(t,"/").concat(e.userName));var r="";e.issue&&(r="".concat(r,"project=").concat(e.issue,"&"));var n=O()(e.startDate).format("YYYY-MM-DD");r="".concat(r,"created>=").concat(n,"&");var o=O()(e.endDate).format("YYYY-MM-DD");(r="".concat(r,"created<=").concat(o,"&")).endsWith("&")&&(r=r.slice(0,-1)),a="".concat(a,"/").concat(r)}return Promise.all([h.get(t),h.get(a)])}}]),e}(),j=function(e){return function(t){var a,r;return s.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return t(C()),n.prev=1,a=new S,n.next=5,s.a.awrap(a.loadData(e));case 5:r=n.sent,t(L(r)),n.next=13;break;case 9:n.prev=9,n.t0=n.catch(1),console.log(n.t0),t(x([n.t0]));case 13:case"end":return n.stop()}}),null,null,[[1,9]])}},C=function(){return{type:"FETCH_DATA_REQUEST"}},L=function(e){return{type:"FETCH_DATA_SUCCESS",payload:e}},x=function(e){return{type:"FETCH_DATA_FAILURE",payload:e}},R=function(e){return{type:"SELECT",payload:{multiDragItem:e}}},T=a(115),A=a(412),k=a(411),_=a(415),N=a(414),F=function(e){var t=function(e){return{width:"25%",flex:"0 1 auto",alignSelf:"auto",marginLeft:0===e?"0":"1%"}},a=e.filterHandler;return n.a.createElement(T.c,{onSubmit:function(e){return a(e)}},(function(e){var a=e.formProps,r=(e.dirty,e.submitting);return n.a.createElement("form",a,n.a.createElement("div",{style:{display:"flex",flexDirection:"row",flexWrap:"nowrap",justifyContent:"flex-start",alignItems:"flex-start",alignContent:"space-between"}},n.a.createElement("div",{style:t(0)},n.a.createElement(N.a,{label:"Start date",name:"startDate",defaultValue:O()().startOf("isoWeek").format("YYYY-MM-DD")},(function(e){var t=e.fieldProps;e.error,e.valid;return n.a.createElement(k.a,t)}))),n.a.createElement("div",{style:t(1)},n.a.createElement(N.a,{label:"End date",name:"endDate",defaultValue:O()().endOf("isoWeek").format("YYYY-MM-DD")},(function(e){var t=e.fieldProps;e.error,e.valid;return n.a.createElement(k.a,t)}))),n.a.createElement("div",{style:t(2)},n.a.createElement(N.a,{label:"User",name:"user",defaultValue:""},(function(e){var t=e.fieldProps;e.error,e.valid;return n.a.createElement(_.a,t)}))),n.a.createElement("div",{style:t(3)},n.a.createElement(N.a,{label:"Issue",name:"issue",defaultValue:""},(function(e){var t=e.fieldProps;e.error,e.valid;return n.a.createElement(_.a,t)}))),n.a.createElement("div",{style:{width:"10%",flex:"0 1 auto",alignSelf:"center",marginLeft:"1%",marginTop:"30px"}},n.a.createElement(A.a,{type:"submit",appearance:"primary",isDisabled:r},"Search"))))}))},Y=function(e){return e.forEach((function(e){e.style.visibility="hidden"}))},M=a(202),U=a.n(M),P=a(203),H=a.n(P),V=a(114),J=function(){var e=Object(E.d)((function(e){return e})),t=Object(E.c)();Object(r.useEffect)((function(){e.isLoading||Y(document.querySelectorAll(".FloatingRect")),document.body.addEventListener("mousedown",(function(){Y(document.querySelectorAll(".ActiveCell"))}),!0)}),[e.isLoading]),Object(r.useEffect)((function(){t(j())}),[]);var a=function(t,a){return e.data[t][a].value},o=function(e,r){if(e.droppableId===r.droppableId){var n=JSON.parse(e.droppableId),o=n.row,l=n.col,c=function(e,t,a){var r=Array.from(e),n=r.splice(t,1),o=Object(V.a)(n,1)[0];return r.splice(a,0,o),r}(a(o,l),e.index,r.index);t(function(e,t,a){return{type:"REORDER",payload:{row:e,col:t,data:a}}}(o,l,c))}else{var i=JSON.parse(e.droppableId),s=JSON.parse(r.droppableId),d=i.row,u=i.col,p=s.row,f=s.col,m=function(e,t,a,r){var n=Array.from(e),o=Array.from(t),l=n.splice(a.index,1),c=Object(V.a)(l,1)[0];o.splice(r.index,0,c);var i={};return i[a.droppableId]=n,i[r.droppableId]=o,i}(a(d,u),a(p,f),e,r);t((v=d,g=u,y=m[e.droppableId],b=p,E=f,w=m[r.droppableId],{type:"MOVE",payload:{sourRow:v,sourCol:g,sourData:y,destRow:b,destCol:E,destData:w}}))}var v,g,y,b,E,w},l=function(e,a){var r=JSON.parse(e.droppableId),n=JSON.parse(a.droppableId),o=r.row,l=r.col,c=n.row,i=n.col;t({type:"MULTI_DRAG_SINGLE_DESTINATION",payload:{sourRow:o,sourCol:l,destRow:c,destCol:i}})};return n.a.createElement("div",{style:{paddingTop:"1%",paddingBottom:"1%",paddingLeft:"1.5%",paddingRight:"1.5%",backgroundColor:"white"}},n.a.createElement("div",null,n.a.createElement(F,{filterHandler:function(e){var a;return s.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:a={userName:e.user,issue:e.issue,startDate:new Date(e.startDate),endDate:new Date(e.endDate)},t(j(a));case 2:case"end":return r.stop()}}))}})),n.a.createElement(U.a,{active:e.isLoading,spinner:n.a.createElement(H.a,{color:"#0052CC"}),styles:{overlay:function(e){return Object(c.a)({},e,{background:"#D9FFFFFF"})}}},n.a.createElement("div",{style:{height:"600px",marginTop:"1%"}},n.a.createElement(f.a,{onDragStart:function(a){var r=a.draggableId;e.selectedItems.includes({id:r})||t({type:"UNSELECT_ALL"})},onDragEnd:function(t){var a=t.source,r=t.destination;r&&(e.selectedItems?l(a,r):o(a,r))}},n.a.createElement(d.a,{style:{".Spreadsheet td":{whiteSpace:"pre"}},data:e.data})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var W=a(31),B=a(204),G=a(33),Q={isLoading:!0,data:[],selectedItems:[],errors:[]},q=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Q,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REORDER":var a=Object.assign({},e.data[t.payload.row][t.payload.col]);a.value=t.payload.data;var r=Object(G.a)(e.data);return r[t.payload.row][t.payload.col]=a,{isLoading:!1,data:r,selectedItems:e.selectedItems,errors:[]};case"MOVE":var n=Object.assign({},e.data[t.payload.sourRow][t.payload.sourCol]);n.value=t.payload.sourData;var o=Object.assign({},e.data[t.payload.destRow][t.payload.destCol]);o.value=t.payload.destData;var l=Object(G.a)(e.data);return l[t.payload.sourRow][t.payload.sourCol]=n,l[t.payload.destRow][t.payload.destCol]=o,{isLoading:!1,data:l,selectedItems:e.selectedItems,errors:[]};case"FETCH_DATA_REQUEST":return{isLoading:!0,data:Object(G.a)(e.data),selectedItems:[],errors:[]};case"FETCH_DATA_SUCCESS":return{isLoading:!1,data:Object(G.a)(t.payload),selectedItems:[],errors:[]};case"FETCH_DATA_FAILURE":return{isLoading:!1,data:[],selectedItems:[],errors:Object(G.a)(t.payload)};case"SELECT":return{isLoading:!1,data:Object(G.a)(e.data),selectedItems:[].concat(Object(G.a)(e.selectedItems),[t.payload.selectedItem]),errors:[]};case"UNSELECT_ALL":return{isLoading:!1,data:Object(G.a)(e.data),selectedItems:[],errors:[]};case"MULTI_DRAG_SINGLE_DESTINATION":var c=Object(G.a)(e.data),i=t.payload.sourRow,s=t.payload.sourCol,d=t.payload.destRow,u=t.payload.destCol,p=Object.assign({},c[i][s]),f=Object.assign({},c[d][u]);return e.selectedItems.forEach((function(e){p.value=p.value.filter((function(t){return t!==e.value})),f.value.push(e.value)})),c[i][s]=p,c[d][u]=f,console.log(p),{isLoading:!1,data:c,selectedItems:[],errors:[]};default:return e}},K=Object(W.d)(q,Object(W.a)(B.a));l.a.render(n.a.createElement(E.a,{store:K},n.a.createElement(J,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[213,1,2]]]);
//# sourceMappingURL=main.4d2cee64.chunk.js.map