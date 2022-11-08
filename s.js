let timeout = 1000;
// [6, 5, 4, 3, 2, 1].forEach(async (e, i) => {
//   setTimeout(() => {
//     console.log(e);
//   }, timeout * (i + 1));
//   await setTimeout(() => {
//     console.log("**********");
//   }, timeout * (i + 1));
// });

async function fert(timeout) {
  await setTimeout(function () {
    console.log("2 seconds");
  }, timeout);

  //   await setTimeout(function () {
  //     console.log("4 seconds");
  //   }, 1000);
  //   await setTimeout(function () {
  //     console.log("6 seconds");
  //   }, 1000);
}

fert(timeout);
fert(timeout + 1000);
