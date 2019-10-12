function randomRange(myMin, myMax) {
    return Math.floor(Math.random() * (myMax - myMin + 1) + myMin);
}

// Main

for (let i =0; i < 50; i++) {
    console.log(randomRange(0, 1000));
}
