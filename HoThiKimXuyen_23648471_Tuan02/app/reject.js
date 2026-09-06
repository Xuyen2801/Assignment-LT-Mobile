function failTask() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject("Something went wrong");
        }, 1000);
    });
}

failTask().catch((error) => {
    console.log(error);
});
