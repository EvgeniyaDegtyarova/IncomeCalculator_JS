//доходы
const incomeSalary = document.getElementById('income-salary'),
    incomeOther = document.getElementById('income-other');
// incomeExtra1 = document.getElementById('income-extra-1'),
// incomeExtra2 = document.getElementById('income-extra-2');

//расходы
const costsFood = document.getElementById('costs-food'),
    costsHouseServices = document.getElementById('costs-house-services'),
    costsTransport = document.getElementById('costs-transport'),
    costsClothes = document.getElementById('costs-clothes'),
    costsVacation = document.getElementById('costs-vacation');

//выходящие данные
const totatlMonthInput = document.getElementById('total-month'),
    totalDayInput = document.getElementById('total-day'),
    totalHalfYearInput = document.getElementById('total-halfyear');

let totalMonth, totalDay, totalHalfYear;
//moneyBox
const moneyBoxRange = document.getElementById('money-box-range'),
    accumulationInput = document.getElementById('accumulation'),
    spend = document.getElementById('spend');

let accumulation = 0;
let totalPrecents = 0;

const inputs = document.querySelectorAll('.input');
for (input of inputs) {
    //console.log(input); //проверили что перебрали и вывелся инпут
    input.addEventListener('input', () => {
        //console.log('run'); //проверили что при вводе и удалении событие работает
        countingAvailableMoney();
        calculaionPrecents(); //дописали чтоб при изменении инпута снова менялся процент
    })
}
const strToNum = str => str.value ? parseInt(str.value) : 0 //функция для преобразования строки в число
const countingAvailableMoney = () => {
    const totalPerMonth = strToNum(incomeSalary) + strToNum(incomeOther);
    //console.log(incomeSalary.value) //будет получаеться строка и строки буду конкатенироваться поэтому нужна доп фукнция
    //console.log(totalPerMonth); проверка делается
    const totalCosts = strToNum(costsFood) + strToNum(costsHouseServices) + strToNum(costsTransport) + strToNum(costsClothes) + strToNum(costsVacation);

    totalMonth = totalPerMonth - totalCosts;
    //console.log(totalMonth); //проверили чтоб отправить в инпут ниже
    totatlMonthInput.value = totalMonth;
};
//написали фукнцию чтоб при ползунке в спане измениялиьс процениты
moneyBoxRange.addEventListener('input', e => {
    const totalPercentsEl = document.getElementById('total-percents');
    totalPrecents = e.target.value;
    totalPercentsEl.innerHTML = totalPrecents;
    calculaionPrecents();
});
//пишем фукнцию чтоб при движении ползунка менялись инпуты
const calculaionPrecents = () => {
    accumulation = ((totalMonth * totalPrecents) / 100).toFixed(); //получаем проценты
    //нужна доп проверка и сделать ноль если ничего не воодили
    accumulationInput.value = accumulation;

    spend.value = totalMonth - accumulation;

    totalDay = (spend.value / 30).toFixed();
    totalDayInput.value = totalDay;

    totalHalfYear = accumulation * 6;
    totalHalfYearInput.value = totalHalfYear;
}