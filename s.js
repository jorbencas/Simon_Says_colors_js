let timeout = 1000;
[6,5,4,3,2,1].forEach(async (e,i) => {
    setTimeout(async () => {
        await console.log(e);
    }, timeout * (i + 1 ))
    setTimeout(async () => {
        await console.log("///////////////");
    }, (timeout * (i + 1 )) + 1)
});

