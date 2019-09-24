let doubleDigitMaker = (num) => {
    let strNum = num.toString();
    if(strNum.length>1)
        return strNum;
    return '0'+strNum;
};

export {doubleDigitMaker};