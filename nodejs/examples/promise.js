// promise.js

// new
var promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    var probability = Math.random();
    if (probability >= 0.5)
      resolve('1: async operation success!');
    else
      reject(Error('1: async operation failed ;('));
  }, 3000);
});


promise.then(console.log, console.error);

// return
var promise2 = (param) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      var probability = Math.random();
      if (probability >= 0.5)
        resolve('2: async operation success!');
      else
        reject(Error('2: async operation failed ;('));
    }, 2000);
  });
};

promise2().then(console.log, console.error);


// promise Chaining
var promise3 = (param) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // var probability = Math.random();
      if (true)
        resolve('3: async operation success!');
      else
        reject(Error('3: async operation failed ;('));
    }, 1000);
  });
};

promise3().then((result) => {
  console.log('a: ' + result);
  return 10;
}).then((result) => {
  console.log('b: ' + result);
  return result + 10;
}).then((result) => {
  console.log('c: ' + result);
});

// promise chaining2
var userInfo = '{"name":"John", "age":10}';
function parseData(data) {
  return JSON.parse(data);
}
function auth(data) {
  if(data.name === 'John') {
    return data;
  }
  throw Error(data.name + ' is not an authorized user!');
}
function display(data) {
  console.log(`Welcome, ${data.name}!`);
}
function getData() {
  return new Promise((resolve) =>{ return resolve(userInfo); });
}

getData().then(parseData)
         .then(auth)
         .then(display)
         .catch((err) => {console.error(err.message);});

// Error Handling - catch API
userInfo = '{"name":"Jane", "age":10}';
getData().then(parseData)
         .then(auth)
         .then(display)
         .catch((err) => {console.error(err.message);});
// Jane is not an authorized user!

/**/
// all API
var body = {jacket:false, shirt:false, pants:false};
function wearAShirt(body) {
  return new Promise((resolve) => {
    if(body.jacket)
      throw Error('셔츠를 입고 자켓을 입어야지.');
    body.shirt = true;
    console.log('셔츠를 입었다.');
    return resolve(body);
  });
}
function wearAJacket(body) {
  return new Promise((resolve) => {
    if(body.shirt) {
      console.log('자켓을 입었다.');
      body.jacket = true;
      return resolve(body);
    } else {
      throw Error('셔츠를 입고 자켓을 입어야지.');
    }
  });
}
function wearPants(body) {
  return new Promise((resolve) => {
    console.log('바지를 입었다.');
    body.pants = true;
    return resolve(body);
  });
}
function howDoILook(body) {
  body.shirt?console.log('셔츠를 입었네.'):null;
  body.jacket?console.log('자켓을 입었네.'):null;
  body.pants?console.log('바지를 입었네.'):null;
}
//*
wearAShirt(body)
         .then(wearPants)
         .then(wearAJacket)
         .then(howDoILook)
         .catch(() =>{console.log('잘못입었네');});
/**/
Promise.all([wearAShirt(body), wearPants(body)])
       .then(values => {return wearAJacket(values[0]);})
       .then(howDoILook)
       .catch(() => {console.log('잘못입었네.');});

/**/
