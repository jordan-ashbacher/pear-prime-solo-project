const sum = (num1, num2) => {
    if (!num2) {
        num2 = 0
    }

    return Number(num1) + Number(num2)
}

export default sum