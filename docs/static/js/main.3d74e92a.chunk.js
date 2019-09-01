(window.webpackJsonpboards=window.webpackJsonpboards||[]).push([[0],{101:function(e,n,a){"use strict";a.r(n);var t=a(0),r=a.n(t),o=a(22),c=a.n(o);a(66),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var i=a(23),u=a(13),s=a(14),l=a(16),m=a(15),d=a(17),p=a(25),C="CARD",f=a(32),v=a.n(f),h=function(e,n,a){return{type:"MOVE_CARD",fromColumnId:e,toColumnId:n,id:a,updatedAt:(new Date).toJSON()}},E=function(e){return{type:"SET_ERROR_MESSAGE",message:e}},g=Object(i.b)(function(e){return{boards:e.boards}},{addBoard:function(){return{type:"ADD_BOARD_REQUEST"}}})(function(e){var n=e.boards,a=e.addBoard;return r.a.createElement("div",null,r.a.createElement("h1",null,"Boards"),r.a.createElement("ul",null,n.map(function(e){return r.a.createElement("li",{key:e.id},r.a.createElement(p.b,{to:"/boards/".concat(e.id,"/cards")},e.name))})),r.a.createElement("button",{onClick:a},"Add board"))}),O=(a(74),a(57)),b=a(10),R=a(29),A=a(18),k=a(58),N=(a(81),function(e){function n(){var e,a;Object(u.a)(this,n);for(var t=arguments.length,r=new Array(t),o=0;o<t;o++)r[o]=arguments[o];return(a=Object(l.a)(this,(e=Object(m.a)(n)).call.apply(e,[this].concat(r)))).state={moveToCardId:""},a.onMoveCardClick=function(){a.props.moveCard(a.props.column.id,a.state.moveToCardId,a.props.card.id)},a.onMoveToCardChange=function(e){var n=e.target.value;a.setState({moveToCardId:n})},a}return Object(d.a)(n,e),Object(s.a)(n,[{key:"componentDidMount",value:function(){this.props.moveToColumnsOptions.length&&this.setState({moveToCardId:this.props.moveToColumnsOptions[0].id})}},{key:"render",value:function(){return this.props.moveToColumnsOptions.length?r.a.createElement("div",null,r.a.createElement("select",{onChange:this.onMoveToCardChange,value:this.state.moveToCardId},this.props.moveToColumnsOptions.map(function(e){return r.a.createElement("option",{key:e.id,value:e.id},e.name)})),r.a.createElement("button",{onClick:this.onMoveCardClick},"Move to column")):null}}]),n}(r.a.PureComponent)),S=a(7),D=(a(82),function(e){function n(){var e,a;Object(u.a)(this,n);for(var t=arguments.length,r=new Array(t),o=0;o<t;o++)r[o]=arguments[o];return(a=Object(l.a)(this,(e=Object(m.a)(n)).call.apply(e,[this].concat(r)))).state={name:"",renamingCards:[]},a.displayEditName=function(e){return void 0!==a.state.renamingCards.find(function(n){return n.id===e})},a.onEditCardClick=function(e){return function(){var n=a.props.column.cards.find(function(n){return n.id===e});if(n){var t=n.name;a.setState(function(n){return{renamingCards:[].concat(Object(A.a)(n.renamingCards.filter(function(n){return n.id!==e})),[{id:e,name:t}])}})}}},a.onRenameCardChange=function(e){return function(n){var t=n.target.value;a.setState(function(n){return{renamingCards:[].concat(Object(A.a)(n.renamingCards.filter(function(n){return n.id!==e})),[{id:e,name:t}])}})}},a.getTemporaryNameStateValue=function(e){var n=a.state.renamingCards.find(function(n){return n.id===e});return n?n.name:""},a.onRenameCardClick=function(e){return function(){var n=a.state.renamingCards.find(function(n){return n.id===e});if(n){var t=n.name;""!==t?a.setState(function(n){return{renamingCards:n.renamingCards.filter(function(n){return n.id!==e})}},function(){return a.props.renameCard(a.props.column.id,e,t)}):a.props.setErrorMessage("Card name is required.")}}},a.onCancelRenameCardClick=function(e){return function(){a.setState(function(n){return{renamingCards:n.renamingCards.filter(function(n){return n.id!==e})}})}},a}return Object(d.a)(n,e),Object(s.a)(n,[{key:"render",value:function(){var e=this.props.card;return r.a.createElement("div",null,r.a.createElement("span",{className:"ah-icon",onClick:this.onEditCardClick(e.id)},r.a.createElement(S.f,null)),this.displayEditName(e.id)&&r.a.createElement("div",null,r.a.createElement("input",{className:"rename-card-in-column-input",onChange:this.onRenameCardChange(e.id),value:this.getTemporaryNameStateValue(e.id)}),r.a.createElement("span",{onClick:this.onRenameCardClick(e.id),className:"ah-icon"},r.a.createElement(S.c,null)),r.a.createElement("span",{onClick:this.onCancelRenameCardClick(e.id),className:"ah-icon"},r.a.createElement(S.b,null))))}}]),n}(t.PureComponent));var y=Object(R.c)(C,{beginDrag:function(e){return{card:e.card,column:e.column}}},function(e,n){return{connectDragSource:e.dragSource(),isDragging:n.isDragging()}})(function(e){var n=e.moveToColumnsOptions,a=e.column,t=e.card,o=e.moveCard,c=e.onCloseModal,i=e.isModalOpened,u=e.onDescriptionChange,s=e.description,l=e.onSaveDescriptionClick,m=e.onRemoveCardClick,d=e.setErrorMessage,C=e.renameCard,f=e.inPlaceRenameInProgress,v=e.toggleInPlaceRename,h=e.onNameChange,E=e.onSaveNameClick,g=e.temporaryName,O=e.connectDragSource,b=r.a.createElement("span",{onClick:m,className:"ah-remove ah-icon"},r.a.createElement(S.d,null));return O(r.a.createElement("div",{className:"ah-card ah-shape"},r.a.createElement(D,{column:a,card:t,renameCard:C,setErrorMessage:d}),r.a.createElement(p.b,{to:"/boards/".concat(a.boardId,"/cards/").concat(t.id)},t.name),r.a.createElement(k.a,{open:i,onClose:c,center:!0,classNames:{modal:"ah-modal-container"}},r.a.createElement("h5",null,"Column: ",a.name),r.a.createElement(N,{moveToColumnsOptions:n,column:a,card:t,moveCard:o}),!f&&r.a.createElement(r.a.Fragment,null,r.a.createElement("h4",null,t.name,r.a.createElement("span",{onClick:v},r.a.createElement(S.e,null)))),f&&r.a.createElement(r.a.Fragment,null,r.a.createElement("input",{className:"ah-in-place-rename-input",type:"text",onChange:h,value:g}),r.a.createElement("span",{className:"ah-icon",onClick:E},r.a.createElement(S.c,null)),r.a.createElement("span",{className:"ah-icon",onClick:v},r.a.createElement(S.b,null))),r.a.createElement("div",null,r.a.createElement("textarea",{className:"ah-card-description",onChange:u,value:s}),r.a.createElement("button",{className:"ah-card-save",onClick:l},"Save")),r.a.createElement("div",{className:"ah-time"},r.a.createElement("div",null,r.a.createElement(S.a,null),new Date(t.createdAt).toLocaleString()),r.a.createElement("div",null,r.a.createElement(S.h,null),new Date(t.updatedAt).toLocaleString())),b),b))}),j=function(e){function n(){var e,a;Object(u.a)(this,n);for(var t=arguments.length,r=new Array(t),o=0;o<t;o++)r[o]=arguments[o];return(a=Object(l.a)(this,(e=Object(m.a)(n)).call.apply(e,[this].concat(r)))).state={description:"",name:"",inPlaceRenameInProgress:!1},a.onCloseModal=function(){a.props.history.push("/boards/".concat(a.props.column.boardId,"/cards"))},a.onDescriptionChange=function(e){var n=e.target;a.setState({description:n.value})},a.onNameChange=function(e){var n=e.target;a.setState({name:n.value})},a.toggleInPlaceRename=function(){a.setState(function(e){return{inPlaceRenameInProgress:!e.inPlaceRenameInProgress}})},a.onSaveDescriptionClick=function(){a.props.changeCardDescription(a.props.column.id,a.props.card.id,a.state.description)},a.onSaveNameClick=function(){a.setState({inPlaceRenameInProgress:!1},function(){return a.props.renameCard(a.props.column.id,a.props.card.id,a.state.name)})},a.onRemoveCardClick=function(){a.props.removeCard(a.props.column.id,a.props.card.id)},a}return Object(d.a)(n,e),Object(s.a)(n,[{key:"componentDidMount",value:function(){this.setState({description:this.props.card.description,name:this.props.card.name})}},{key:"render",value:function(){return r.a.createElement(y,{isModalOpened:this.props.match.params.cardId===this.props.card.id,moveToColumnsOptions:this.props.moveToColumnsOptions,column:this.props.column,card:this.props.card,moveCard:this.props.moveCard,onRemoveCardClick:this.onRemoveCardClick,onCloseModal:this.onCloseModal,onDescriptionChange:this.onDescriptionChange,description:this.state.description,onSaveDescriptionClick:this.onSaveDescriptionClick,renameCard:this.props.renameCard,setErrorMessage:this.props.setErrorMessage,onNameChange:this.onNameChange,onSaveNameClick:this.onSaveNameClick,toggleInPlaceRename:this.toggleInPlaceRename,inPlaceRenameInProgress:this.state.inPlaceRenameInProgress,temporaryName:this.state.name})}}]),n}(r.a.PureComponent),I=Object(b.g)(j),M=(a(83),function(e){function n(){var e,a;Object(u.a)(this,n);for(var t=arguments.length,r=new Array(t),o=0;o<t;o++)r[o]=arguments[o];return(a=Object(l.a)(this,(e=Object(m.a)(n)).call.apply(e,[this].concat(r)))).state={name:""},a.onAddCardNameChange=function(e){var n=e.target.value;a.setState({name:n})},a.onAddCardClick=function(){var e=a.state.name;""!==e?(a.props.addCard(a.props.column.id,e),a.setState({name:""})):a.props.setErrorMessage("Card name is required.")},a.getMoveToColumnsOptions=function(){return a.props.columns.filter(function(e){return e.id!==a.props.column.id&&e.boardId===a.props.column.boardId}).map(function(e){return{id:e.id,name:e.name}})},a}return Object(d.a)(n,e),Object(s.a)(n,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,this.props.column.cards.map(function(n){return r.a.createElement(I,{key:n.id,card:n,moveToColumnsOptions:e.getMoveToColumnsOptions(),column:e.props.column,moveCard:e.props.moveCard,removeCard:e.props.removeCard,changeCardDescription:e.props.changeCardDescription,setErrorMessage:e.props.setErrorMessage,renameCard:e.props.renameCard})}),r.a.createElement("div",{className:"ah-add-card-wrapper"},r.a.createElement("input",{onChange:this.onAddCardNameChange,value:this.state.name,placeholder:"New card name"}),r.a.createElement("span",{onClick:this.onAddCardClick,className:"ah-icon"},r.a.createElement(S.g,null))))}}]),n}(r.a.PureComponent)),w=Object(i.b)(function(e){return{columns:e.columns}},{addCard:function(e,n){return{type:"ADD_CARD",name:n,columnId:e,id:v()(),description:"",createdAt:(new Date).toJSON()}},moveCard:h,removeCard:function(e,n){return{type:"REMOVE_CARD",columnId:e,id:n}},renameCard:function(e,n,a){return{type:"RENAME_CARD",id:n,name:a,columnId:e,updatedAt:(new Date).toJSON()}},changeCardDescription:function(e,n,a){return{type:"CHANGE_CARD_DESCRIPTION",columnId:e,id:n,description:a,updatedAt:(new Date).toJSON()}},setErrorMessage:E})(M);a(84);var _=Object(R.d)(C,{drop:function(e,n){var a=n.getItem();e.moveCard(a.column.id,e.column.id,a.card.id)}},function(e,n){return{connectDropTarget:e.dropTarget(),isOver:n.isOver()}})(function(e){var n=e.column,a=e.removeColumn,t=e.onEditColumnClick,o=e.onRenameColumnChange,c=e.renamingColumns,i=e.getTemporaryNameStateValue,u=e.onRenameColumnClick,s=e.onCancelRenameColumnClick,l=e.connectDropTarget,m=e.isOver,d=void 0!==c.find(function(e){return e.id===n.id});return l(r.a.createElement("div",{className:"ah-column ah-shape ".concat(m?"ah-is-over-column":"")},!d&&r.a.createElement("div",{className:"ah-column-name-wrapper"},n.name,r.a.createElement("span",{className:"ah-icon",onClick:t(n.id)},r.a.createElement(S.f,null))),d&&r.a.createElement("div",{className:"ah-column-name-wrapper"},r.a.createElement("input",{onChange:o(n.id),value:i(n.id)}),r.a.createElement("span",{onClick:u(n.id),className:"ah-icon"},r.a.createElement(S.c,null)),r.a.createElement("span",{onClick:s(n.id),className:"ah-icon"},r.a.createElement(S.b,null))),r.a.createElement("span",{onClick:function(){return a(n.id)},className:"ah-remove ah-icon"},r.a.createElement(S.d,null)),r.a.createElement(w,{column:n})))}),T=a(31),P=(a(89),function(e){function n(){var e,a;Object(u.a)(this,n);for(var t=arguments.length,r=new Array(t),o=0;o<t;o++)r[o]=arguments[o];return(a=Object(l.a)(this,(e=Object(m.a)(n)).call.apply(e,[this].concat(r)))).state={name:"",renamingColumns:[]},a.onAddColumnNameChange=function(e){var n=e.target.value;a.setState({name:n})},a.onRenameColumnChange=function(e){return function(n){var t=n.target.value;a.setState(function(n){return{renamingColumns:[].concat(Object(A.a)(n.renamingColumns.filter(function(n){return n.id!==e})),[{id:e,name:t}])}})}},a.onRenameColumnClick=function(e){return function(){var n=a.state.renamingColumns.find(function(n){return n.id===e});if(n){var t=n.name;""!==t?a.setState(function(n){return{renamingColumns:n.renamingColumns.filter(function(n){return n.id!==e})}},function(){return a.props.renameColumn(e,t)}):a.props.setErrorMessage("Column name is required.")}}},a.onEditColumnClick=function(e){return function(){var n=a.props.columns.find(function(n){return n.id===e});if(n){var t=n.name;a.setState(function(n){return{renamingColumns:[].concat(Object(A.a)(n.renamingColumns.filter(function(n){return n.id!==e})),[{id:e,name:t}])}})}}},a.onCancelRenameColumnClick=function(e){return function(){a.setState(function(n){return{renamingColumns:n.renamingColumns.filter(function(n){return n.id!==e})}})}},a.onAddColumn=function(){var e=a.state.name;""!==e?(a.props.addColumn(e,a.props.boardId),a.setState({name:""})):a.props.setErrorMessage("Column name is required.")},a.getTemporaryNameStateValue=function(e){var n=a.state.renamingColumns.find(function(n){return n.id===e});return n?n.name:""},a.cardExists=function(){var e=!1,n=a.props,t=n.columns,r=n.cardId;return!r||(t.forEach(function(n){n.cards.find(function(e){return e.id===r})&&(e=!0)}),e)},a}return Object(d.a)(n,e),Object(s.a)(n,[{key:"render",value:function(){var e=this;return this.cardExists()?r.a.createElement(T.Grid,{className:"ah-columns ah-shape"},!!this.props.errorMessage&&r.a.createElement("div",null,r.a.createElement("span",{className:"ah-error-message"},this.props.errorMessage),r.a.createElement("button",{onClick:function(){return e.props.setErrorMessage("")}},"Dismiss")),r.a.createElement(T.Row,{center:"xs",className:"add-column-wrapper"},r.a.createElement(T.Col,null,r.a.createElement("input",{onChange:this.onAddColumnNameChange,value:this.state.name,placeholder:"Name"}),r.a.createElement("button",{onClick:this.onAddColumn},"Add column"))),r.a.createElement(T.Row,null,this.props.columns.map(function(n){return r.a.createElement(T.Col,{key:n.id,xs:12,sm:6,md:4,lg:3},r.a.createElement(_,{column:n,addColumn:e.props.addColumn,renamingColumns:e.state.renamingColumns,getTemporaryNameStateValue:e.getTemporaryNameStateValue,onCancelRenameColumnClick:e.onCancelRenameColumnClick,onEditColumnClick:e.onEditColumnClick,onRenameColumnChange:e.onRenameColumnChange,onRenameColumnClick:e.onRenameColumnClick,removeColumn:e.props.removeColumn,renameColumn:e.props.renameColumn,moveCard:e.props.moveCard}))}))):r.a.createElement(b.a,{to:"/boards/".concat(this.props.boardId,"/cards")})}}]),n}(r.a.PureComponent)),x=Object(i.b)(function(e){return{columns:e.columns,errorMessage:e.errorMessage}},{addColumn:function(e,n){return{type:"ADD_COLUMN",name:e,boardId:n,id:v()()}},renameColumn:function(e,n){return{type:"RENAME_COLUMN",id:e,name:n}},removeColumn:function(e){return{type:"REMOVE_COLUMN",id:e}},moveCard:h,setErrorMessage:E})(function(e){var n=e.columns,a=e.addColumn,t=e.renameColumn,o=e.removeColumn,c=e.moveCard,i=e.match,u=e.errorMessage,s=e.setErrorMessage;return r.a.createElement(P,{boardId:i.params.boardId,columns:n.filter(function(e){return e.boardId===i.params.boardId}),addColumn:a,renameColumn:t,removeColumn:o,moveCard:c,errorMessage:u,setErrorMessage:s,cardId:i.params.cardId})}),L=function(e){function n(){return Object(u.a)(this,n),Object(l.a)(this,Object(m.a)(n).apply(this,arguments))}return Object(d.a)(n,e),Object(s.a)(n,[{key:"render",value:function(){return r.a.createElement(R.b,{backend:O.a},r.a.createElement(b.d,null,r.a.createElement(b.b,{exact:!0,path:"/",component:g}),r.a.createElement(b.b,{path:"/boards/:boardId/cards/:cardId?",component:x}),r.a.createElement(b.b,{component:function(){return r.a.createElement("h1",null,"404 Not Found")}})))}}]),n}(t.Component),V=function(e){var n=e.store;return r.a.createElement(i.a,{store:n},r.a.createElement(p.a,null,r.a.createElement(L,null)))},U=a(20),B=(a(90),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments.length>1?arguments[1]:void 0;switch(n.type){case"ADD_BOARD_SUCCESS":return[].concat(Object(A.a)(e),[{id:n.id,name:n.name}]);default:return e}}),G=a(55);function J(e,n){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),a.push.apply(a,t)}return a}function q(e){for(var n=1;n<arguments.length;n++){var a=null!=arguments[n]?arguments[n]:{};n%2?J(a,!0).forEach(function(n){Object(G.a)(e,n,a[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):J(a).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(a,n))})}return e}var F=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=arguments.length>1?arguments[1]:void 0;switch(n.type){case"ADD_COLUMN":return[].concat(Object(A.a)(e),[{boardId:n.boardId,id:n.id,name:n.name,cards:[]}]);case"ADD_CARD":return e.map(function(e){return e.id!==n.columnId?e:q({},e,{cards:[].concat(Object(A.a)(e.cards),[{id:n.id,name:n.name,description:n.description,createdAt:n.createdAt,updatedAt:n.createdAt}])})});case"RENAME_COLUMN":return e.map(function(e){return e.id!==n.id?e:q({},e,{name:n.name})});case"REMOVE_COLUMN":return e.filter(function(e){return e.id!==n.id});case"RENAME_CARD":return e.map(function(e){return e.id!==n.columnId?e:q({},e,{cards:e.cards.map(function(e){return e.id!==n.id?e:q({},e,{name:n.name,updatedAt:n.updatedAt})})})});case"CHANGE_CARD_DESCRIPTION":return e.map(function(e){return e.id!==n.columnId?e:q({},e,{cards:e.cards.map(function(e){return e.id!==n.id?e:q({},e,{description:n.description,updatedAt:n.updatedAt})})})});case"MOVE_CARD":if(n.fromColumnId===n.toColumnId)return e;var a=e.find(function(e){return e.id===n.fromColumnId});if(!a)return e;var t=a.cards.find(function(e){return e.id===n.id});return t?e.map(function(e){return e.id!==n.toColumnId&&e.id!==n.fromColumnId?e:e.id===n.toColumnId?q({},e,{cards:[].concat(Object(A.a)(e.cards),[q({},t,{updatedAt:n.updatedAt})])}):e.id===n.fromColumnId?q({},e,{cards:e.cards.filter(function(e){return e.id!==n.id})}):e}):e;case"REMOVE_CARD":return e.map(function(e){return e.id!==n.columnId?e:q({},e,{cards:e.cards.filter(function(e){return e.id!==n.id})})});default:return e}},H=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1?arguments[1]:void 0;switch(n.type){case"SET_ERROR_MESSAGE":return n.message;case"CLEAR_ERROR_MESSAGE":return"";case"ADD_COLUMN":case"ADD_CARD":case"RENAME_CARD":return"";default:return e}},K=Object(U.c)({boards:B,columns:F,errorMessage:H}),Q=a(24),W=a.n(Q),Y=a(30),$=W.a.mark(function e(){var n;return W.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=v()(),e.next=3,Object(Y.c)({type:"ADD_BOARD_SUCCESS",id:n,name:n});case 3:case"end":return e.stop()}},e)}),z=W.a.mark(function e(){return W.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(Y.d)("ADD_BOARD_REQUEST",$);case 2:case"end":return e.stop()}},e)}),X=W.a.mark(Z);function Z(){return W.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(Y.a)([Object(Y.b)(z)]);case 2:case"end":return e.stop()}},X)}var ee=a(59),ne=a(56),ae=a.n(ne),te=function(){var e=Object(ee.a)(),n=[e];var a=function(){try{var e=localStorage.getItem("LOCAL_STORAGE_STATE_KEY");if(null===e)return;return JSON.parse(e)}catch(n){return}}(),t=Object(U.e)(K,a,U.a.apply(void 0,n));return t.subscribe(ae()(function(){!function(e){try{var n=JSON.stringify(e);localStorage.setItem("LOCAL_STORAGE_STATE_KEY",n)}catch(a){}}(t.getState())})),e.run(Z),t}();c.a.render(r.a.createElement(V,{store:te}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},61:function(e,n,a){e.exports=a(101)},66:function(e,n,a){},74:function(e,n,a){},81:function(e,n,a){},82:function(e,n,a){},83:function(e,n,a){},84:function(e,n,a){},89:function(e,n,a){}},[[61,1,2]]]);
//# sourceMappingURL=main.3d74e92a.chunk.js.map