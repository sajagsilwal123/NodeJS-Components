// console.log(process.env.SECRET_MESSAGE)

const print = async function (){    
    let myPromise = new Promise(function(resolve) {
        setTimeout(function() {resolve("I love You !!");}, 3000);
      });
      const test = await myPromise
      console.log(test)
      console.log('HELLO WORLD')
}

print()
