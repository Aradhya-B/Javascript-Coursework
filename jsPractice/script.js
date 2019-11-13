async function firstAsync() {
    let promise = new Promise((req, res) => {
        setTimeout(() => res("Now it's done"), 1000);
    })

    let result = await promise;

    console.log(result);
}

firstAsync();


