(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{209:function(e,t,a){e.exports=a(391)},214:function(e,t,a){},391:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(25),s=a.n(o),i=(a(214),a(114)),c=a(30),u=a.n(c),l=a(200),d=function(e){return{type:"FETCH_DATA",data:e}},f=a(39),p=a(115),v=a(402),h=a(401),m=a(404),w=a(406),y=a(27),g=a.n(y),D=function(e){var t=function(e){return{width:"25%",flex:"0 1 auto",alignSelf:"auto",marginLeft:0===e?"0":"1%"}},a=e.filterHandler;return r.a.createElement(p.c,{onSubmit:function(e){return a(e)}},(function(e){var a=e.formProps,n=(e.dirty,e.submitting);return r.a.createElement("form",a,r.a.createElement("div",{style:{display:"flex",flexDirection:"row",flexWrap:"nowrap",justifyContent:"flex-start",alignItems:"flex-start",alignContent:"space-between"}},r.a.createElement("div",{style:t(0)},r.a.createElement(w.a,{label:"Start date",name:"startDate",defaultValue:g()().startOf("isoWeek").format("YYYY-MM-DD")},(function(e){var t=e.fieldProps;e.error,e.valid;return r.a.createElement(h.a,t)}))),r.a.createElement("div",{style:t(1)},r.a.createElement(w.a,{label:"End date",name:"endDate",defaultValue:g()().endOf("isoWeek").format("YYYY-MM-DD")},(function(e){var t=e.fieldProps;e.error,e.valid;return r.a.createElement(h.a,t)}))),r.a.createElement("div",{style:t(2)},r.a.createElement(w.a,{label:"User",name:"user",defaultValue:""},(function(e){var t=e.fieldProps;e.error,e.valid;return r.a.createElement(m.a,t)}))),r.a.createElement("div",{style:t(3)},r.a.createElement(w.a,{label:"Issue",name:"issue",defaultValue:""},(function(e){var t=e.fieldProps;e.error,e.valid;return r.a.createElement(m.a,t)}))),r.a.createElement("div",{style:{width:"10%",flex:"0 1 auto",alignSelf:"center",marginLeft:"1%",marginTop:"30px"}},r.a.createElement(v.a,{type:"submit",appearance:"primary",isDisabled:n},"Search"))))}))},b=a(34),E=a(32),O=a(194);var k=a.n(O).a.create({baseURL:"http://localhost:3001"});function x(e){var t="/users",a="/issues";if(e){e.userName&&(t="".concat(t,"/").concat(e.userName));var n="";e.issue&&(n="".concat(n,"project=").concat(e.issue,"&"));var r=g()(e.startDate).format("YYYY-MM-DD");n="".concat(n,"created>=").concat(r,"&");var o=g()(e.endDate).format("YYYY-MM-DD");(n="".concat(n,"created<=").concat(o,"&")).endsWith("&")&&(n=n.slice(0,-1)),a="".concat(a,"/").concat(n)}return Promise.all([k.get(t),k.get(a)])}k.interceptors.request.use((function(e){return e.url=e.url+"?jwt="+window.parent.window.token,e}));var j=function(){function e(){Object(b.a)(this,e)}return Object(E.a)(e,[{key:"fromJson",value:function(e){return{accountType:e.accountType,accountId:e.accountId,displayName:e.displayName,isActive:e.active}}},{key:"toJson",value:function(e){throw new Error("Method not implemented.")}},{key:"parseArrayFromJson",value:function(e){var t=this,a=new Array;return e.forEach((function(e){var n=t.fromJson(e);n.isActive&&"atlassian"===n.accountType&&a.push(n)})),a}},{key:"parseArrayToJson",value:function(e){throw new Error("Method not implemented.")}}]),e}(),A=function(){function e(){Object(b.a)(this,e)}return Object(E.a)(e,[{key:"fromJson",value:function(e){return{key:e.key,name:e.name}}},{key:"toJson",value:function(e){throw new Error("Method not implemented.")}},{key:"parseArrayFromJson",value:function(e){var t=this,a=new Array;return e.forEach((function(e){a.push(t.fromJson(e))})),a}},{key:"parseArrayToJson",value:function(e){throw new Error("Method not implemented.")}}]),e}(),J=function(){function e(){Object(b.a)(this,e)}return Object(E.a)(e,[{key:"fromJson",value:function(e){var t=new j,a=new A;return{key:e.key,assignee:t.fromJson(e.fields.assignee),creator:t.fromJson(e.fields.creator),created:new Date(e.fields.created),project:a.fromJson(e.fields.project)}}},{key:"toJson",value:function(e){throw new Error("Method not implemented.")}},{key:"parseArrayFromJson",value:function(e){var t=this,a=new Array;return e.forEach((function(e){a.push(t.fromJson(e))})),a}},{key:"parseArrayToJson",value:function(e){throw new Error("Method not implemented.")}}]),e}(),M=a(201),C=a(65),I=a(198),R=a.n(I),S=a(199),Y=a.n(S),T=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"hidden";arguments.length>2&&void 0!==arguments[2]&&arguments[2];return e.forEach((function(e){e.classList.add(t)}))},N="".concat("https://bkjira.atlassian.net","/browse/"),P=function(e){var t=e.cell,a=t.row,n=t.col,o=JSON.stringify({row:a,col:n}),s=function(e){e.preventDefault(),e.stopPropagation(),e.nativeEvent.stopImmediatePropagation(),"mousedown"===e.type&&T(document.querySelectorAll(".ActiveCell"))};return r.a.createElement(C.c,{droppableId:o},(function(e,a){return r.a.createElement("div",{ref:e.innerRef,style:(n=a.isDraggingOver,{background:n?"lightblue":"white",padding:"8px"})},t.value.map((function(e,t){return r.a.createElement(C.b,{key:e,draggableId:e,index:t},(function(t,a){return r.a.createElement("div",Object.assign({onMouseDown:function(e){return s(e)},onMouseUp:function(e){return s(e)},onMouseOver:function(e){return s(e)},onMouseMove:function(e){return s(e)},ref:t.innerRef},t.draggableProps,{style:(n=a.isDragging,o=t.draggableProps.style,Object(M.a)({display:"flex",userSelect:"none",padding:"3px",marginTop:"2px",marginBottom:"2px",background:n?"lightgreen":"white"},o))}),r.a.createElement("div",Object.assign({},t.dragHandleProps,{style:{width:"20px",height:"20px"}}),r.a.createElement(R.a,{label:"drag-handle"})),r.a.createElement("div",{style:{marginLeft:"5px",marginRight:"10px"}},e),r.a.createElement("div",{onClick:function(){return function(e){window.open("".concat(N).concat(e),"_blank")}(e)},style:{width:"20px",height:"20px",cursor:"pointer"}},r.a.createElement(Y.a,{label:"open-icon"})));var n,o}))})),e.placeholder);var n}))},F=function(e){var t=e.cell;return r.a.createElement("div",{onMouseDown:function(e){return e.stopPropagation()},onMouseOver:function(e){return e.stopPropagation()}},t.value)},L=function(){function e(t,a,n,r){Object(b.a)(this,e),this.data=new Array,this.users=new Array,this.issues=new Array,this.dates=new Array,this.startDate=void 0,this.endDate=void 0,this.startDate=n,this.endDate=r,this.addDates(),this.addUsers(t),this.addIssues(a),this.create()}return Object(E.a)(e,[{key:"calendarData",get:function(){return this.data}}]),Object(E.a)(e,[{key:"addDates",value:function(){for(var e=this.generateDates(new Date(this.startDate),new Date(this.endDate)),t=0;t<e.length;t++){var a=this.createCell(t+1,0,e[t],F);this.dates.push(a)}}},{key:"addUsers",value:function(e){for(var t=0;t<e.length;t++){var a=this.createCell(0,t+1,e[t].displayName);this.users.push(a)}}},{key:"addIssues",value:function(e){for(var t=this,a=new Map,n=function(n){var r=e[n],o=t.dates.find((function(e){return e.value===r.created.toLocaleDateString()})),s=t.users.find((function(e){return e.value===r.assignee.displayName}));if(o&&s){var i=o.col,c=s.row,u=a.get(JSON.stringify({row:c,col:i}));u||(u=[]),u.push(r.key),a.set(JSON.stringify({row:c,col:i}),u);var l=t.createCell(i,c,u,P);t.issues.push(l)}},r=0;r<e.length;r++)n(r)}},{key:"create",value:function(){var e=this,t=g()(this.startDate.setDate(this.startDate.getDate()-1)),a=g()(this.endDate),n=this.users.length+1,r=Math.trunc(g.a.duration(a.diff(t)).asDays())+1;console.log(this.startDate),console.log(this.endDate);for(var o=0;o<n;o++){this.data[o]=[];for(var s=0;s<r;s++){var i=this.createCell(s,o,[],P);this.addCell(i)}}this.dates.forEach((function(t){e.addCell(t)})),this.users.forEach((function(t){e.addCell(t)})),this.issues.forEach((function(t){e.addCell(t)}))}},{key:"createCell",value:function(e,t,a,n){return{col:e,row:t,value:a,DataViewer:n}}},{key:"addCell",value:function(e){this.data[e.row][e.col]=e}},{key:"generateDates",value:function(e,t){for(var a=new Array,n=e;n<=t;)a.push(new Date(n).toLocaleDateString()),n.setDate(n.getDate()+1);return a}}]),e}(),W=function(){function e(){Object(b.a)(this,e),this.defaultQuery={startDate:g()().startOf("isoWeek").toDate(),endDate:g()().endOf("isoWeek").toDate()}}return Object(E.a)(e,[{key:"loadData",value:function(){var e,t,a,n,r,o=arguments;return u.a.async((function(s){for(;;)switch(s.prev=s.next){case 0:return e=o.length>0&&void 0!==o[0]?o[0]:this.defaultQuery,s.next=3,u.a.awrap(x(e));case 3:return t=s.sent,a=(new j).parseArrayFromJson(t[0].data),n=(new J).parseArrayFromJson(t[1].data.issues),r=new L(a,n,e.startDate,e.endDate).calendarData,console.log(r),s.abrupt("return",r);case 9:case"end":return s.stop()}}),null,this)}}]),e}(),V=function(){var e=new W,t=Object(f.d)((function(e){return e.data})),a=Object(f.c)(),o=function(t){return u.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,u.a.awrap(e.loadData(t));case 2:return a.abrupt("return",a.sent);case 3:case"end":return a.stop()}}))};Object(n.useEffect)((function(){!function(){var t;u.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,u.a.awrap(u.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u.a.awrap(e.loadData());case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}})));case 2:t=n.sent,a(d(t));case 4:case"end":return n.stop()}}))}()}),[]);var s=function(e,a){return t[e][a].value};return r.a.createElement("div",{style:{paddingTop:"1%",paddingBottom:"1%",paddingLeft:"1.5%",paddingRight:"1.5%",backgroundColor:"white"}},r.a.createElement("div",null,r.a.createElement(D,{filterHandler:function(e){var t,n;return u.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return t={userName:e.user,issue:e.issue,startDate:new Date(e.startDate),endDate:new Date(e.endDate)},r.next=3,u.a.awrap(o(t));case 3:n=r.sent,a(d(n));case 5:case"end":return r.stop()}}))}})),r.a.createElement("div",{style:{marginTop:"1%"}},r.a.createElement(C.a,{onDragEnd:function(e){var t=e.source,n=e.destination;if(n){if(t.droppableId===n.droppableId){var r=JSON.parse(t.droppableId),o=r.row,c=r.col,u=function(e,t,a){var n=Array.from(e),r=n.splice(t,1),o=Object(i.a)(r,1)[0];return n.splice(a,0,o),n}(s(o,c),t.index,n.index);a(function(e,t,a){return{type:"REORDER",row:e,col:t,data:a}}(o,c,u))}else{var l=JSON.parse(t.droppableId),d=JSON.parse(n.droppableId),f=l.row,p=l.col,v=d.row,h=d.col,m=function(e,t,a,n){var r=Array.from(e),o=Array.from(t),s=r.splice(a.index,1),c=Object(i.a)(s,1)[0];o.splice(n.index,0,c);var u={};return u[a.droppableId]=r,u[n.droppableId]=o,u}(s(f,p),s(v,h),t,n);a((w=f,y=p,g=m[t.droppableId],D=v,b=h,E=m[n.droppableId],{type:"MOVE",sourRow:w,sourCol:y,sourData:g,destRow:D,destCol:b,destData:E}))}var w,y,g,D,b,E;T(document.querySelectorAll(".FloatingRect"))}}},r.a.createElement(l.a,{style:function(){return{".Spreadsheet td":{whiteSpace:"pre"}}},data:t}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var H=a(35),U=a(89),B={data:[]},q=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:B,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"FETCH_DATA":return{data:Object(U.a)(t.data)};case"REORDER":var a=Object.assign({},e.data[t.row][t.col]);a.value=t.data;var n=Object(U.a)(e.data);return n[t.row][t.col]=a,{data:n};case"MOVE":var r=Object.assign({},e.data[t.sourRow][t.sourCol]);r.value=t.sourData;var o=Object.assign({},e.data[t.destRow][t.destCol]);o.value=t.destData;var s=Object(U.a)(e.data);return s[t.sourRow][t.sourCol]=r,s[t.destRow][t.destCol]=o,{data:s};default:return e}},_=Object(H.d)(q);s.a.render(r.a.createElement(f.a,{store:_},r.a.createElement(V,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[209,1,2]]]);
//# sourceMappingURL=main.a4f61443.chunk.js.map