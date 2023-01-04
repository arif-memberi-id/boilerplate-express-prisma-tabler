function formatNumberWithCommas(numberParam) {
    return numberParam.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //return String(numberParam).replace(/(.)(?=(\d{3})+$)/g,'$1,');
}

function formatNumberWithoutDelimiter(numberParam) {
    return Number(numberParam.toString().replace(/\,/g,''));
}

module.exports = { formatNumberWithCommas, formatNumberWithoutDelimiter }