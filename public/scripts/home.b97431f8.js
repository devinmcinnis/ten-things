!function(){"use strict";function t(t){return'<li data-id="'+t+'"><label><span class="c-thing__label">#'+t+'</span><input name="thing'+t+'" class="c-thing__input" type="text" placeholder="The next thing is next"></label></li>'}function n(t){return"<li><p>"+t+"</p></li>"}var e=$(document);e.ready(function(){var a=localStorage.getItem("submit"),i=Date.now()-parseInt(a,10);86335426>i&&$("main").append('<p><a href="/things">Results</a></p>'),e.on("submit","form#tenthings",function(t){t.preventDefault();var e=$(this),a=e.serializeArray();$.post("/things",a,function(t){console.log(t),e.remove();for(var a="<ul>",i=0;i<t.things.length;i+=1)a+=n(t.things[i]);a+="</ul>",$("main").append(a),localStorage.setItem("submit",Date.now())})}),e.on("keypress",".c-thing__input",function(n){var e=$(this),a=$("ul"),i=e.closest("li"),s=parseInt(i.data("id"),10)+1;if(13===n.keyCode&&(n.preventDefault(),$("input[name=thing"+s+"]").focus()),e.val()&&!i.hasClass("active")){var l=$(t(s));a.append(l),i.addClass("active")}})})}();