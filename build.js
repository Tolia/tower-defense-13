(function(e,t){function r(e,t){return Math.floor(Math.random()*(t-e+1))+e}function i(){x=n.getElementById("canvas"),x.width=w*S,x.height=E*S,T=x.getContext("2d")}function s(){var e=0;for(var t=0;t<N.length;t++)e+=N[t].priority;var n=r(0,e-1);for(var t=0;t<N.length;t++){if(n<N[t].priority)return t;n-=N[t].priority}return!1}function a(){var e=A.x*32,t=A.y*32,n=e+32,r=t+32;T.strokeStyle=O,T.lineWidth=2,T.strokeRect(e,t,32,32),T.strokeStyle="#FFF",T.strokeRect(e-2,t-2,36,36)}function l(){return!1}function c(e){var t=[];for(var n in f)f[n].type===e&&t.push(f[n]);return t}function h(){return!1}function d(e,t){var n=[],r=[];for(var i=0;i<t;i++){n[i]=n[i]||[],r[i]=r[i]||[];for(var o=0;o<e;o++){var u=s(),a=N[u];n[i][o]=new y(N[u],"imageList"),r[i][o]=0}}return[n,r]}function v(){for(var e=0;e<C.length;e++)for(var t=0;t<C[e].length;t++)T.drawImage(C[e][t].image,t*32,e*32)}function m(e,t,n,i,s,o,u){var a,f,l=[],c=[];for(var h=0;h<e;h++)l.push(r(0,t-1,e)),c.push(r(0,t-1,e));for(a=0;a<e;a++)f=r(n,i),T.fillStyle="rgb("+Math.floor(f/s)+","+Math.floor(f/o)+","+Math.floor(f/u)+")",T.fillRect(l[a],c[a],1,1)}function g(e,t,n,i,s){var o=[];for(var u=0;u<3;u++){num=r(i[0][1],i[0][2]),T.fillStyle="rgb("+Math.floor(num/i[0][3])+","+Math.floor(num/i[0][4])+","+Math.floor(num/i[0][5])+")",T.fillRect(0,0,s,s);for(var a=0;a<i.length;a++)m(i[a][0],s,i[a][1],i[a][2],i[a][3],i[a][4],i[a][5]);var f=new Image;f.src=x.toDataURL(),o.push(f),T.clearRect(0,0,x.width,x.height)}var l=L;return L++,{"name":e,"is":t,"imageList":o,"images":o.length,"priority":n,"id":l}}function y(e,t){for(var n in e)n===t?this.image=e[t][r(0,e.images-1)]:this[n]=e[n];return this}function b(){N.push(g("grass","path",7,[[1024,175,230,1.3,1,2],[50,200,245,1,1.3,1.5],[100,125,175,2,1,2]],32)),N.push(g("darkGrass","path",7,[[1024,150,205,1.3,1,2],[50,175,220,1,1.3,1.5],[100,100,150,2,1,2]],32)),N.push(g("road","speed",4,[[1024,0,0,1,1,1],[600,0,50,1,1,1]],32)),N.push(g("water","slow",3,[[1024,100,200,1.5,1.5,1],[600,100,200,1.5,1.5,1]],32))}function M(){requestAnimationFrame(M),_()}function _(){v(),a()}function D(){n.getElementById("loading").classList.add("hidden")}var n=e.document,o=function(e,t){var n=e%t;return(e-n)/t},u=function(e){var t=$("#canvas").position().left,n=$("#canvas").position().top,r=e.pageX-t,i=e.pageY-n;return[o(r,S),o(i,S)]};x.addEventListener("mousemove",function(e){A.x=e.pageX-x.offsetLeft,A.y=e.pageY-x.offsetTop,A.x=o(A.x,S),A.y=o(A.y,S),O="black",p()&&l()?O="green":p()===null?O="blue":p()||(O="red")},!0);var f={"images/drain.png":{"type":"trap","name":"drain","src":"images/drain.png","stats":{"health":"","cost":"10"}},"images/scorpion.png":{"type":"structure","name":"scorpion","src":"images/scorpion.png","stats":{"health":"100","cost":"100"}}},p=function(){var e=C[A.y][A.x];return k[A.y][A.x]!==0?null:isbuilding()?h().is==="terrain"?!0:e.is==="path"?!0:h().is==="trap"&&e.is==="fast"?!0:!1:!0};(function(){var t=0,n=["ms","moz","webkit","o"];for(var r=0;r<n.length&&!e.requestAnimationFrame;++r)e.requestAnimationFrame=e[n[r]+"RequestAnimationFrame"],e.cancelAnimationFrame=e[n[r]+"CancelAnimationFrame"]||e[n[r]+"CancelRequestAnimationFrame"];e.requestAnimationFrame||(e.requestAnimationFrame=function(n,r){var i=(new Date).getTime(),s=Math.max(0,16-(i-t)),o=e.setTimeout(function(){n(i+s)},s);return t=i+s,o}),e.cancelAnimationFrame||(e.cancelAnimationFrame=function(e){clearTimeout(e)})})();var w=20,E=20,S=32,x,T,N=[],C,k,L=0,A={"x":0,"y":0},O="black";e.addEventListener("DOMContentLoaded",function(){i(),b();var e=d(w,E);C=e[0],k=e[1],D(),M()},!0)})(window)