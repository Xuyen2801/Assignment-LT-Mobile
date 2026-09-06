function getEvenNumbers() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const numbers = [1, 2, 3, 4, 5, 6];

            const evenNumbers = numbers.filter((number) => {
                return number % 2 === 0;
            });

            resolve(evenNumbers);
        }, 1000);
    });
}

getEvenNumbers().then((result) => {
    console.log(result);
});
