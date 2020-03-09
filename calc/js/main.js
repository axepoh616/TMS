const curId = [145, 292, 143] // 298=ид для рос рубля!

const http = async (url) => {
    const responce = await fetch(url)
    return await responce.json()
}

const getCurrency = async () => {
    const select = document.getElementById('currencys')
    for (let i = 0; i < curId.length; i++) {
        const option = document.createElement('option')
        const currency = await http(`https://nbrb.by/api/exrates/currencies/${curId[i]}`)

        option.dataset.curId = currency.Cur_ID
        option.innerHTML = currency.Cur_Abbreviation
        select.appendChild(option)
    }

}

const getDate = (d) => {
    const date = new Date(d)
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    const monthId = Number(date.getMonth()) + 1
    const month = monthId < 10 ? `0${monthId}` : monthId
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
}

const submit = () => {
    const form = document.getElementById("form")
    form.addEventListener('submit', async (elem) => {
        elem.preventDefault()
        const select = document.getElementById('currencys')
        const result = document.getElementById('result')
        const curId = select.options[select.selectedIndex].dataset.curId
        const rate = await http(`https://nbrb.by/api/exrates/rates/${curId}`)

        const currentCurrencyValue = document.getElementById(`current_currency`).value
        const composition = Number(currentCurrencyValue) / rate.Cur_OfficialRate//калькулируем значение методом деления заданного числа на курс полученный с сервака(не работает на рос рубли тк везде привязка к 1 а в рос рублях к 100!)
        //тут гдето нужно ввести данные с сервака Cur_Scale=100 ? rate.Cur_OfficialRate * 100 для 1000 * 1000 и тд я хз какие могут быть варианты дольше ,но это не точно ! 
        const str = `You Can by ${composition.toFixed(2)} ${rate.Cur_Abbreviation} for ${currentCurrencyValue} BYN -- ${getDate(rate.Date)}`
        result.innerHTML = str
    })
}

getCurrency()
submit()




