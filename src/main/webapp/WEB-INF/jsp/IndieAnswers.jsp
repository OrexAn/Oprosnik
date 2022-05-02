<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<div class="row py-2">
    <div class="col" style="padding-left: 60px;">
        <div class="row py-2">
            <div class="col d-flex justify-content-start">
                <h3>Индивидуальные ответы</h3>
            </div>
        </div>
        <div class="row py-2">
            <div class="col d-flex justify-content-start">
                <h5>[${questionnaireTitle}]</h5>
            </div>
        </div>
    </div>
</div>
<div class="row py-2 d-flex justify-content-around px-4" style="padding-left: 60px !important;">
    <div class="col border" style="border-radius: 10px; width: 450px;">
        <div>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col" style="min-width: 150px;">#</th>
                        <th scope="col" style="min-width: 250px;">Дата</th>
                        <th scope="col">Ответы</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row" style="min-width: 150px;">1</th>
                        <td style="min-width: 250px;">3/27/2022</td>
                        <div style="white-space: nowrap; width: 760px; overflow-x: scroll;">
                            15
                        </div>
                    </tr>
                    <tr>
                        <th scope="row" style="min-width: 150px;">2</th>
                        <td style="min-width: 250px;">3/22/2022</td>
                        <td>
                            <div style="white-space: nowrap; width: 760px; overflow-x: scroll;">
                                15
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row" style="min-width: 150px;">3</th>
                        <td style="min-width: 250px;">3/19/2022</td>
                        <div style="white-space: nowrap; width: 760px; overflow-x: scroll;">
                            15
                        </div>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</div>
