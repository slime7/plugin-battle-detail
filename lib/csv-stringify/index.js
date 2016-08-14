var Stringifier,get,stream,util
stream=require("stream"),util=require("util"),get=require("lodash.get"),module.exports=function(){var t,i,e,r,o
return 3===arguments.length?(e=arguments[0],r=arguments[1],t=arguments[2]):2===arguments.length?(Array.isArray(arguments[0])?e=arguments[0]:r=arguments[0],"function"==typeof arguments[1]?t=arguments[1]:r=arguments[1]):1===arguments.length&&("function"==typeof arguments[0]?t=arguments[0]:Array.isArray(arguments[0])?e=arguments[0]:r=arguments[0]),null==r&&(r={}),o=new Stringifier(r),e&&process.nextTick(function(){var t,i,r
for(i=0,r=e.length;r>i;i++)t=e[i],o.write(t)
return o.end()}),t&&(i=[],o.on("readable",function(){var t,e
for(e=[];t=o.read();)e.push(i.push(t))
return e}),o.on("error",function(i){return t(i)}),o.on("end",function(){return t(null,i.join(""))})),o},Stringifier=function(t){var i,e,r,o,n,s,u,l,p,h,f,a,c,m,y,g
null==t&&(t={}),y={}
for(m in t)g=t[m],y[m]=g
switch(stream.Transform.call(this,y),this.options=y,null==(i=this.options).delimiter&&(i.delimiter=","),null==(e=this.options).quote&&(e.quote='"'),null==(s=this.options).quoted&&(s.quoted=!1),null==(u=this.options).quotedString&&(u.quotedString=!1),null==(l=this.options).eof&&(l.eof=!0),null==(p=this.options).escape&&(p.escape='"'),null==(h=this.options).columns&&(h.columns=null),null==(f=this.options).header&&(f.header=!1),null==(a=this.options).formatters&&(a.formatters={}),null==(c=this.options.formatters).date&&(c.date=function(t){return""+t.getTime()}),null==(r=this.options.formatters).bool&&(r.bool=function(t){return t?"1":""}),null==(o=this.options.formatters).object&&(o.object=function(t){return JSON.stringify(t)}),null==(n=this.options).rowDelimiter&&(n.rowDelimiter="\n"),null==this.countWriten&&(this.countWriten=0),this.options.rowDelimiter){case"auto":this.options.rowDelimiter=null
break
case"unix":this.options.rowDelimiter="\n"
break
case"mac":this.options.rowDelimiter="\r"
break
case"windows":this.options.rowDelimiter="\r\n"
break
case"unicode":this.options.rowDelimiter="\u2028"}return this},util.inherits(Stringifier,stream.Transform),module.exports.Stringifier=Stringifier,Stringifier.prototype.headers=function(){var t,i,e
if(this.options.header&&this.options.columns)return e=this.options.columns,"object"==typeof e&&(e=function(){var r
r=[]
for(t in e)i=e[t],r.push(i)
return r}()),e=this.options.eof?this.stringify(e)+this.options.rowDelimiter:this.stringify(e),stream.Transform.prototype.write.call(this,e)},Stringifier.prototype.end=function(t,i,e){return 0===this.countWriten&&this.headers(),stream.Transform.prototype.end.apply(this,arguments)},Stringifier.prototype.write=function(t,i,e){var r,o,n,s
if(null!=t){if(s="object"!=typeof t,!s){0!==this.countWriten||Array.isArray(t)||null==(r=this.options).columns&&(r.columns=Object.keys(t))
try{this.emit("record",t,this.countWriten)}catch(n){return o=n,this.emit("error",o)}this.options.eof?t=this.stringify(t)+this.options.rowDelimiter:(t=this.stringify(t),(this.options.header||this.countWriten)&&(t=this.options.rowDelimiter+t))}return"number"==typeof t&&(t=""+t),0===this.countWriten&&this.headers(),s||this.countWriten++,stream.Transform.prototype.write.call(this,t,i,e)}},Stringifier.prototype._transform=function(t,i,e){return this.push(t),e()},Stringifier.prototype.stringify=function(t){var i,e,r,o,n,s,u,l,p,h,f,a,c,m,y,g,d,w,b,S
if("object"!=typeof t)return t
if(r=this.options.columns,"object"!=typeof r||null===r||Array.isArray(r)||(r=Object.keys(r)),l=this.options.delimiter,y=this.options.quote,p=this.options.escape,Array.isArray(t))r&&t.splice(r.length)
else{if(i=[],r)for(f=a=0,g=r.length;g>=0?g>a:a>g;f=g>=0?++a:--a)e=r[f],S=get(t,e),i[f]="undefined"==typeof S||null===S?"":S
else for(e in t)i.push(t[e])
t=i,i=null}if(Array.isArray(t)){for(m="",f=c=0,d=t.length;d>=0?d>c:c>d;f=d>=0?++c:--c)h=t[f],"string"==typeof h||("number"==typeof h?h=""+h:"boolean"==typeof h?h=this.options.formatters.bool(h):h instanceof Date?h=this.options.formatters.date(h):"object"==typeof h&&null!==h&&(h=this.options.formatters.object(h))),h?(u=h.indexOf(l)>=0,s=h.indexOf(y)>=0,o=h.indexOf(p)>=0&&p!==y,n=h.indexOf("\r")>=0||h.indexOf("\n")>=0,b=s||u||n||this.options.quoted||this.options.quotedString&&"string"==typeof t[f],b&&o&&(w="\\"===p?new RegExp(p+p,"g"):new RegExp(p,"g"),h=h.replace(w,p+p)),s&&(w=new RegExp(y,"g"),h=h.replace(w,p+y)),b&&(h=y+h+y),m+=h):(this.options.quotedEmpty||null==this.options.quotedEmpty&&""===t[f]&&this.options.quotedString)&&(m+=y+y),f!==t.length-1&&(m+=l)
t=m}return t}