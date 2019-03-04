<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WebForm2.aspx.cs" Inherits="WebApplication2.WebForm2" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Дополнительная информация</title>
    <link href="./Style/style.css" rel="stylesheet" type="text/css"/>
</head>
<body>
    <form id="form1" method="post" enctype="multipart/form-data" runat="server">
        <div>
            <input type="checkbox" name="consultation" id="consultation" value="Консультация" />
            <asp:Label for="consultation" Text="Консультация" runat="server" />
            <br /><br />
            <ul id="tabs">
                <li><a href="javascript:tabSwitch(1, 7, 'tab', 'content');" id="tab1" class="active">Документы</a></li>
                <li><a href="javascript:tabSwitch(2, 7, 'tab', 'content');" id="tab2">Закрытие Договора</a></li>
                <li><a href="javascript:tabSwitch(3, 7, 'tab', 'content');" id="tab3">Дополнительные поля</a></li>
                <li><a href="javascript:tabSwitch(4, 7, 'tab', 'content');" id="tab4">Поручители</a></li>
                <li><a href="javascript:tabSwitch(5, 7, 'tab', 'content');" id="tab5">Консолидация 2</a></li>
                <li><a href="javascript:tabSwitch(6, 7, 'tab', 'content');" id="tab6">IdeaDelivery</a></li>
                <li><a href="javascript:tabSwitch(7, 7, 'tab', 'content');" id="tab7">Запросы</a></li>
            </ul>
            <div class="content">
                <div id="content1">
                    <asp:Label Text="Документы: " for="docs" runat="server" />
                    <select name="docs" id="docs">
                        <option>Справка заявителя/поручителя с основного места работы</option>
                        <option>Согласие заявителя/поручителя на получение Банком в Национальном банке его кредитного отчета</option>
                        <option>31/32 страница паспорта</option>
                        <option>22 страница паспорта</option>
                        <option>16/17 страница вида на жительство</option>
                        <option>3 страница вида на жительство</option>
                        <option>Справка о получаемой пенсии, пособии</option>
                        <option>Иной документ(догово найма помещения ...)</option>
                        <option>Декларация о доходах из налоговой инспекции</option>
                        <option>Свидетельство о регистрации</option>
                        <option>Справка об отстутсвии задолженности по уплате налогов из налоговой инспекции</option>
                        <option>Фотография заявителя</option>
                        <option>Фотография первого поручителя</option>
                        <option>Фотография второго поручителя</option>
                        <option>Фотография третьего поручителя</option>
                        <option>Справка из банка об отсутсвии задолженности по указаному договору</option>
                        <option>Квитанция об оплате</option>
                        <option>Кредитный договор с информацией о ежимесячных платежах Беларусбанка</option>
                        <option>Дополительная информация о платежах при наступлении определенных льгот</option>
                        <option>Согласие заявителя/поручителя на получение Банком сведений о нем</option>
                        <option>Последняя страница кредитного договора</option>
                        <option>Последняя страница заявления на получения БПК</option>
                    </select>
                    <input type="file" id="file" name="file" accept="image/*" runat="server" />
                    <input type="button" id="photo" value="Сделать фото" />
                </div>
                <div id="content2">Empty</div>
                <div id="content3">
                    <div>
                        <input type="text" name="unp1" id="unp1"/>
                        <label for="unp1" id="u1">УНП основного места работы клиента</label><br /><br />
                        <input type="text" name="unp2" id="unp2" />
                        <label for="unp2" id="u2">УНП дополнительного места работы клиента</label><br /><br />
                        <input type="text" name="unp3" id="unp3"/>
                        <label for="unp3" id="u3">УНП основного места работы 1-го поручителя</label><br /><br />
                        <input type="text" name="unp4" id="unp4" />
                        <label for="unp4" id="u4">УНП основного места работы 2-го поручителя</label><br /><br />
                        <input type="text" name="unp5" id="unp5" />
                        <label for="unp5" id="u5">УНП основного места работы 3-го поручителя</label><br />
                    </div>
                    <hr />
                    <div>
                        <input type="text" name="number1" id="number1" placeholder="375(__) ___-__-__"/>
                        <label for="number1" id="num1">Домашний телефон соседей(в случае отсутствия дом.тел)</label><br /><br />
                        <input type="text" name="number2" id="number2" placeholder="375(__) ___-__-__"/>
                        <label for="number2" id="num2">Мобильный телефон директора(в случае отсутствия стац.раб.тел)</label><br /><br />
                        <input type="text" name="number3" id="number3" placeholder="375(__) ___-__-__"/>
                        <label for="number3" id="num3">Стац./мобильный телефон по доп.доходу</label><br /><br />
                        <input type="text" name="number4" id="number4" placeholder="375(__) ___-__-__"/>
                        <label for="number4" id="num4">Мобильный телефон родителей</label><br /><br />
                        <input type="text" name="number5" id="number5" placeholder="375(__) ___-__-__"/>
                        <label for="number5" id="num5">Мобильный телефон коллеги, соседей, родственников</label><br /><br />
                    </div>
                    <select name="goal" id="goal">
                        <option>Лечение</option>
                        <option>Покупка/ремонт автомобиля</option>
                        <option>Покупка/ремонт недвижимости</option>
                        <option>На учебу</option>
                        <option>Отдых</option>
                        <option>Погашение кредитов/займов</option>
                        <option>Покупка товаров/оплата услуг</option>
                        <option>Помощь близким/родственникам</option>
                        <option>Ритуальные услуги/товары</option>
                        <option>Торжественные меропрития</option>
                        <option>На всякий случай/на черный день</option>
                        <option>Долги</option>
                        <option>Аренда недвижимости</option>
                        <option>На продукты/на жизнь</option>
                        <option>Попросили оформить</option>
                        <option>Развитие бизнеса</option>
                        <option>Иное</option>
                    </select>
                    <label for="goal" id ="purpose">Цель кредита</label>
                </div>
                <div id="content4">
                    <p>Личный номер&nbsp;&nbsp;&nbsp;&nbsp;Тип поручителя</p><br />
                    <input type="text" name="poruchnum1" id="poruchnum1"/>
                    <select id="poruchtype1">
                        <option>Недостаточная платёжеспособность заявителя</option>
                        <option>Превышение лимита задолженности</option>
                        <option>Возраст заявителя</option>
                        <option>Условия продукта</option>
                    </select>
                    <br /><br />
                    <input type="text" name="poruchnum2" id="poruchnum2"/>
                    <select id="poruchtype2">
                        <option>Недостаточная платёжеспособность заявителя</option>
                        <option>Превышение лимита задолженности</option>
                        <option>Возраст заявителя</option>
                        <option>Условия продукта</option>
                    </select>
                    <br /><br />
                    <input type="text" name="poruchnum3" id="poruchnum3"/>
                    <select id="poruchtype3">
                        <option>Недостаточная платёжеспособность заявителя</option>
                        <option>Превышение лимита задолженности</option>
                        <option>Возраст заявителя</option>
                        <option>Условия продукта</option>
                    </select>
                    <br /><br />
                    <input type="text" name="poruchnum4" id="poruchnum4"/>
                    <select id="poruchtype4">
                        <option>Недостаточная платёжеспособность заявителя</option>
                        <option>Превышение лимита задолженности</option>
                        <option>Возраст заявителя</option>
                        <option>Условия продукта</option>
                    </select>
                    <br /><br />
                    <input type="text" name="poruchnum5" id="poruchnum5"/>
                    <select id="poruchtype5">
                        <option>Недостаточная платёжеспособность заявителя</option>
                        <option>Превышение лимита задолженности</option>
                        <option>Возраст заявителя</option>
                        <option>Условия продукта</option>
                    </select>
                </div>
                <div id="content5">Empty</div>
                <div id="content6">Empty</div>
                <div id="content7">
                    <input type="button" id="getrequest" value="Получить информацию о макс.платеже" />
                    <hr />  
                    <table id="table">
                        <tr>
                            <td colspan="9">Результат</td>
                        </tr>
                        <tr>
                            <td>RequestID</td>
                            <td>Дата загрузки</td>
                            <td>Сумма кредита</td>
                            <td>Регламент</td>
                            <td>ФИО</td>
                            <td>ДР</td>
                            <td>Личный номер</td>
                            <td>Макс платеж</td>
                            <td>Состояние заявки</td>
                        </tr>
                    </table>                    
                </div>
            </div>
            <input type="button" id="okbutton" value="ok" />
            <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
            <script src="Script/jquery.maskedinput.js"></script>
            <script src="Script/scriptfunc.js"></script>
        </div>
    </form>
</body>
</html>
