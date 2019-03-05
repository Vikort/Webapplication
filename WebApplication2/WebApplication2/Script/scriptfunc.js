function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }));
}

function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

function JSONToXml(obj) {
        var xml = '';

        for (var prop in obj) {
            if (!obj.hasOwnProperty(prop)) {
                continue;
            }

            if (obj[prop] == undefined)
                continue;

            xml += "<" + prop + ">";
            if (typeof obj[prop] == "object")
                xml += JSONToXml(new Object(obj[prop]));
            else
                xml += obj[prop];
            xml += "</" + prop + ">\n"; 
        }

        return xml;
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
    var Docs = {};
    Docs["DocumentType"] = d.getElementById("docs").value;
    Docs["DocumentName"] = d.getElementById("file").value;

    //

    //2 tab
    var UNP = {};
    UNP["UNPOrganization"] = d.getElementById("unp1").value;
    UNP["UNPOrganizationDop"] = d.getElementById("unp2").value;
    UNP["UNPPoruch1"] = d.getElementById("unp3").value;
    UNP["UNPPoruch2"] = d.getElementById("unp4").value;
    UNP["UNPPoruch3"] = d.getElementById("unp5").value;
    
    var Num = {};
    Num["NeighborsPhone"] = d.getElementById('number1').value;
    Num["DirectorPhone"] = d.getElementById('number2').value;
    Num["AdditionalIncomePhone"] = d.getElementById('number3').value;
    Num["ParentsNumber"] = d.getElementById('number4').value;
    Num["AdditionalPhone"] = d.getElementById('number5').value;

    var Purpose = {};
    Purpose["LoanPurpose"] = d.getElementById("goal").value;

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

    // crt xml
    var x2js = new X2JS();
    var xmldocs = "<Documents>\n" + xmldoc + "</Documents>\n";
    var xmlunp = JSONToXml(UNP);
    var xmlnum = JSONToXml(Num);
    var xmlporuch = JSONToXml(Poruchs);
    var xmlpurpose = JSONToXml(Purpose);
    var xml = "<root>\n" + xmldocs + xmlunp + xmlnum + xmlpurpose + xmlporuch + "</root>";
    if (window.DOMParser) {
        parser = new DOMParser();
        xmlD = parser.parseFromString(xml, "text/xml");
    }
    console.log(xmlD);

    var b64str = b64EncodeUnicode(xml);
    console.log(b64str);

    //var p = d.createElement("p");
    //p.setAttribute('id','b64');
    //p.innerHTML = b64str;
    //d.body.appendChild(p);
    //how to send b64str to main form???
    
}
var xmldoc = '';
file.onchange = function (event) {
    var fi = document.getElementById('file');
    if (fi.files.length > 0) {
        for (var i = 0; i <= fi.files.length - 1; i++) {
            xmldoc += "<DocumentType>" + d.getElementById("docs").value + "</DocumentType>\n<DocumentName>" + fi.files.item(i).name + "</DocumentName>\n";
            document.getElementById('files').innerHTML =
                document.getElementById('files').innerHTML + '<br /> ' + d.getElementById('docs').value + ": " + fi.files.item(i).name
                + " <input type='button' name='del' value = 'Del'>" + " <input type='button' name='open' value = 'Open' class='openfile'>";
        }
    }       
};

var d = document;

//d.getElementsByClassName("openfile").addEventListener("click", dragenter, false);