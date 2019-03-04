<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm1.aspx.cs" Inherits="WebApplication2.WebForm1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>MainForm</title>
</head>
<body style="width: 1049px">
    <form id="form1" runat="server">
        <div>
            <h1>MainForm</h1>
            <input type="button" id="button" value="Дополнительная информация" />
        </div>
            <script>
                 button.onclick = function() {
                       window.open('WebForm2.aspx', 'myWindow','toolbar=0, height=500, width=1000, resizable=1, scrollbars=1');
                     window.focus();
                 };
            </script>
    </form>
</body>
</html>
