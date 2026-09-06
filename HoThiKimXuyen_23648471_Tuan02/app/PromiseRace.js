function simulateTask(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Task done");
        }, time);
    });
}

const task1 = simulateTask(1000);
const task2 = simulateTask(2000);
const task3 = simulateTask(3000);

Promise.race([task1, task2, task3])
    .then((result) => {
        console.log(result);
    });
