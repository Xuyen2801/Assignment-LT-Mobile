function randomNumber() {
    return new Promise((resolve, reject) => {
        const number = Math.random();

        if (number > 0.5) {
            resolve(number);
        } else {
            reject("Number is too small");
        }
    });
}

randomNumber()
    .then((number) => {
        console.log("Success:", number);
    })
    .catch((error) => {
        console.log("Error:", error);
    });
