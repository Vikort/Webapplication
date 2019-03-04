function utf8_to_b64(str) {
  return window.btoa(unescape(encodeURIComponenet(str)));
}

function b64_to_utf8(str) {
  return decodeURIComponent(escape(window.atob(str)));
}

function json2xml(o, tab) {
   var toXml = function(v, name, ind) {
      var xml = "";
      if (v instanceof Array) {
         for (var i=0, n=v.length; i<n; i++)
            xml += ind + toXml(v[i], name, ind+"\t") + "\n";
      }
      else if (typeof(v) == "object") {
         var hasChild = false;
         xml += ind + "<" + name;
         for (var m in v) {
            if (m.charAt(0) == "@")
               xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
            else
               hasChild = true;
         }
         xml += hasChild ? ">" : "/>";
         if (hasChild) {
            for (var m in v) {
               if (m == "#text")
                  xml += v[m];
               else if (m == "#cdata")
                  xml += "<![CDATA[" + v[m] + "]]>";
               else if (m.charAt(0) != "@")
                  xml += toXml(v[m], m, ind+"\t");
            }
            xml += (xml.charAt(xml.length-1)=="\n"?ind:"") + "</" + name + ">";
         }
      }
      else {
         xml += ind + "<" + name + ">" + v.toString() +  "</" + name + ">";
      }
      return xml;
   }, xml="";
   for (var m in o)
      xml += toXml(o[m], m, "");
   return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, "");
}

function xml2json(xml, tab) {
   var X = {
      toObj: function(xml) {
         var o = {};
         if (xml.nodeType==1) {   // element node ..
            if (xml.attributes.length)   // element with attributes  ..
               for (var i=0; i<xml.attributes.length; i++)
                  o["@"+xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue||"").toString();
            if (xml.firstChild) { // element has child nodes ..
               var textChild=0, cdataChild=0, hasElementChild=false;
               for (var n=xml.firstChild; n; n=n.nextSibling) {
                  if (n.nodeType==1) hasElementChild = true;
                  else if (n.nodeType==3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++; // non-whitespace text
                  else if (n.nodeType==4) cdataChild++; // cdata section node
               }
               if (hasElementChild) {
                  if (textChild < 2 && cdataChild < 2) { // structured element with evtl. a single text or/and cdata node ..
                     X.removeWhite(xml);
                     for (var n=xml.firstChild; n; n=n.nextSibling) {
                        if (n.nodeType == 3)  // text node
                           o["#text"] = X.escape(n.nodeValue);
                        else if (n.nodeType == 4)  // cdata node
                           o["#cdata"] = X.escape(n.nodeValue);
                        else if (o[n.nodeName]) {  // multiple occurence of element ..
                           if (o[n.nodeName] instanceof Array)
                              o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                           else
                              o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                        }
                        else  // first occurence of element..
                           o[n.nodeName] = X.toObj(n);
                     }
                  }
                  else { // mixed content
                     if (!xml.attributes.length)
                        o = X.escape(X.innerXml(xml));
                     else
                        o["#text"] = X.escape(X.innerXml(xml));
                  }
               }
               else if (textChild) { // pure text
                  if (!xml.attributes.length)
                     o = X.escape(X.innerXml(xml));
                  else
                     o["#text"] = X.escape(X.innerXml(xml));
               }
               else if (cdataChild) { // cdata
                  if (cdataChild > 1)
                     o = X.escape(X.innerXml(xml));
                  else
                     for (var n=xml.firstChild; n; n=n.nextSibling)
                        o["#cdata"] = X.escape(n.nodeValue);
               }
            }
            if (!xml.attributes.length && !xml.firstChild) o = null;
         }
         else if (xml.nodeType==9) { // document.node
            o = X.toObj(xml.documentElement);
         }
         else
            alert("unhandled node type: " + xml.nodeType);
         return o;
      },
      toJson: function(o, name, ind) {
         var json = name ? ("\""+name+"\"") : "";
         if (o instanceof Array) {
            for (var i=0,n=o.length; i<n; i++)
               o[i] = X.toJson(o[i], "", ind+"\t");
            json += (name?":[":"[") + (o.length > 1 ? ("\n"+ind+"\t"+o.join(",\n"+ind+"\t")+"\n"+ind) : o.join("")) + "]";
         }
         else if (o == null)
            json += (name&&":") + "null";
         else if (typeof(o) == "object") {
            var arr = [];
            for (var m in o)
               arr[arr.length] = X.toJson(o[m], m, ind+"\t");
            json += (name?":{":"{") + (arr.length > 1 ? ("\n"+ind+"\t"+arr.join(",\n"+ind+"\t")+"\n"+ind) : arr.join("")) + "}";
         }
         else if (typeof(o) == "string")
            json += (name&&":") + "\"" + o.toString() + "\"";
         else
            json += (name&&":") + o.toString();
         return json;
      },
      innerXml: function(node) {
         var s = ""
         if ("innerHTML" in node)
            s = node.innerHTML;
         else {
            var asXml = function(n) {
               var s = "";
               if (n.nodeType == 1) {
                  s += "<" + n.nodeName;
                  for (var i=0; i<n.attributes.length;i++)
                     s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue||"").toString() + "\"";
                  if (n.firstChild) {
                     s += ">";
                     for (var c=n.firstChild; c; c=c.nextSibling)
                        s += asXml(c);
                     s += "</"+n.nodeName+">";
                  }
                  else
                     s += "/>";
               }
               else if (n.nodeType == 3)
                  s += n.nodeValue;
               else if (n.nodeType == 4)
                  s += "<![CDATA[" + n.nodeValue + "]]>";
               return s;
            };
            for (var c=node.firstChild; c; c=c.nextSibling)
               s += asXml(c);
         }
         return s;
      },
      escape: function(txt) {
         return txt.replace(/[\\]/g, "\\\\")
                   .replace(/[\"]/g, '\\"')
                   .replace(/[\n]/g, '\\n')
                   .replace(/[\r]/g, '\\r');
      },
      removeWhite: function(e) {
         e.normalize();
         for (var n = e.firstChild; n; ) {
            if (n.nodeType == 3) {  // text node
               if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) { // pure whitespace text node
                  var nxt = n.nextSibling;
                  e.removeChild(n);
                  n = nxt;
               }
               else
                  n = n.nextSibling;
            }
            else if (n.nodeType == 1) {  // element node
               X.removeWhite(n);
               n = n.nextSibling;
            }
            else                      // any other node
               n = n.nextSibling;
         }
         return e;
      }
   };
   if (xml.nodeType == 9) // document node
      xml = xml.documentElement;
   var json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");
   return "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";
}

function parseXml(xml) {
   var dom = null;
   if (window.DOMParser) {
      try { 
         dom = (new DOMParser()).parseFromString(xml, "text/xml"); 
      } 
      catch (e) { dom = null; }
   }
   else if (window.ActiveXObject) {
      try {
         dom = new ActiveXObject('Microsoft.XMLDOM');
         dom.async = false;
         if (!dom.loadXML(xml)) // parse error ..

            window.alert(dom.parseError.reason + dom.parseError.srcText);
      } 
      catch (e) { dom = null; }
   }
   else
      alert("cannot parse xml string!");
   return dom;
}

function tabSwitch(active, number, tabprefix, contentprefix) {
	for (var i = 1; i < number + 1; i++) {
		document.getElementById(contentprefix + i).style.display = 'none';
		document.getElementById(tabprefix + i).className = '';
	}
	document.getElementById(contentprefix + active).style.display = 'block';
	document.getElementById(tabprefix + active).className = 'active';
}

photo.onclick = function () {
    window.open('PhotoForm.aspx', 'Window', 'toolbar=0, height=600, width=600, resizable=1, scrollbars=1');
    window.focus();
}

getrequest.onclick = function () {
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.open("GET", "sample-my.xml", false);
    xmlhttp.send();
    xmlDoc = xmlhttp.responseXML;
    var date = new Date(xmlDoc.getElementsByTagName("дата_загрузки")[0].innerHTML);
    var datestr = date.toString().substr(0,24);
    var birthday = new Date(xmlDoc.getElementsByTagName("ДР")[0].innerHTML);
    var birthdaystr = birthday.toString().substr(0,24);
    console.log(date);
    var str = "<tr><td>";
    str += xmlDoc.getElementsByTagName("RequestID")[0].innerHTML + "</td><td>" + datestr + "</td><td>";
    str += xmlDoc.getElementsByTagName("Сумма_кредита")[0].innerHTML + "</td><td>" + xmlDoc.getElementsByTagName("Регламент")[0].innerHTML + "</td><td>";
    str += xmlDoc.getElementsByTagName("ФИО")[0].innerHTML + "</td><td>" + birthdaystr + "</td><td>";
    str += xmlDoc.getElementsByTagName("Личный_номер")[0].innerHTML + "</td><td>" + xmlDoc.getElementsByTagName("Макс_платеж")[0].innerHTML + "</td><td>";
    str += xmlDoc.getElementsByTagName("Состояние_заявки")[0].innerHTML + "</td></tr>";

    document.getElementById("table").innerHTML += str;
}

jQuery(function ($) {
    $("#number1").mask("375(99) 999-99-99");
    $("#number2").mask("375(99) 999-99-99");
    $("#number3").mask("375(99) 999-99-99");
    $("#number4").mask("375(99) 999-99-99");
    $("#number5").mask("375(99) 999-99-99");
    $("#unp1").mask("999999999");
    $("#unp2").mask("999999999");
    $("#unp3").mask("999999999");
    $("#unp4").mask("999999999");
    $("#unp5").mask("999999999");
    $("#poruchnum1").mask("9999999a999aa9");
    $("#poruchnum2").mask("9999999a999aa9");
    $("#poruchnum3").mask("9999999a999aa9");
    $("#poruchnum4").mask("9999999a999aa9");
    $("#poruchnum5").mask("9999999a999aa9");
});

okbutton.onclick = function () {
    //1 tab

    //2 tab
    var UNP = {};
    UNP[d.getElementById("u1").innerHTML] = d.getElementById("unp1").value;
    UNP[d.getElementById("u2").innerHTML] = d.getElementById("unp2").value;
    UNP[d.getElementById("u3").innerHTML] = d.getElementById("unp3").value;
    UNP[d.getElementById("u4").innerHTML] = d.getElementById("unp4").value;
    UNP[d.getElementById("u5").innerHTML] = d.getElementById("unp5").value;
    
    var Num = {};
    Num[d.getElementById("num1").innerHTML] = d.getElementById('number1').value;
    Num[d.getElementById("num2").innerHTML] = d.getElementById('number2').value;
    Num[d.getElementById("num3").innerHTML] = d.getElementById('number3').value;
    Num[d.getElementById("num4").innerHTML] = d.getElementById('number4').value;
    Num[d.getElementById("num5").innerHTML] = d.getElementById('number5').value;

    var Purpose = {};
    Purpose[d.getElementById("purpose").innerHTML] = d.getElementById("goal").value;

    //3 tab
    var Poruchs = {};
    if (d.getElementById("poruchnum1").value) {
        Poruchs['PersonalNumber1'] = d.getElementById("poruchnum1").value;
        Poruchs['IncomeType1'] = d.getElementById("poruchtype1").value;
    }
    if (d.getElementById("poruchnum2").value) {
        Poruchs['PersonalNumber2'] = d.getElementById("poruchnum2").value;
        Poruchs['IncomeType2'] = d.getElementById("poruchtype2").value;
    }
    if (d.getElementById("poruchnum3").value) {
        Poruchs['PersonalNumber3'] = d.getElementById("poruchnum3").value;
        Poruchs['IncomeType3'] = d.getElementById("poruchtype3").value;
    }
    if (d.getElementById("poruchnum4").value) {
        Poruchs['PersonalNumber4'] = d.getElementById("poruchnum4").value;
        Poruchs['IncomeType4'] = d.getElementById("poruchtype4").value;
    }
    if (d.getElementById("poruchnum5").value) {
        Poruchs['PersonalNumber5'] = d.getElementById("poruchnum").value;
        Poruchs['IncomeType5'] = d.getElementById("poruchtype5").value;
    }
}

var d = document;
