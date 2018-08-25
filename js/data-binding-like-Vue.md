# Vue.js처럼 데이터 바인딩 해보기


```javascript      
      console.log('#1 데이터 변경에 따른 반응형(like Vue) 프로그래밍을 원하지만, 절차적으로 동작한다.');
      {
        let name = 'World';
        let message = `Hello, ${name}!`;
        console.log(message);
        name = 'John';
        console.log(message); // 결과는 바뀌지 않는다.
      }
      

      console.log('#2 실행하려고 하는 코드를 저장한다!');
      {
        let target = null;
        let storage = [];
        let record = () => { storage.push(target); };
        let replay = () => { storage.forEach(t => t()); };

        let name = 'World';
        let message = `Hello, ${name}!`;
        target = () => {
          message = `Hello, ${name}!`;
        };

        record();
        target();

        console.log('init: ' + message); // 첫 번째

        name = 'John';
        replay();
        console.log('change: ' + message); // 값 변경 후
      }

      console.log('#3 클래스로 동작 캡슐화');
      
      var target = null;
      
      class Dependency {
        constructor () {
          this.subscribers = [];
        }
        depend() {
          if(target && !this.subscribers.includes(target))
            this.subscribers.push(target);
        }
        notify() {
          this.subscribers.forEach(subscribe => subscribe());
        }
      }

      {
        let name = 'World';
        let message = undefined;
        let dependency = new Dependency();
        target = () => { message = `Hello, ${name}!`; };
        dependency.depend();
        target();

        console.log(message);

        name = 'Jane';
        dependency.notify();

        console.log(message);        
      }
      
      console.log(`#4 watcher로 업데이트 자동화`);
      {
        function watch(fn) {
          target = fn;
          dependency.depend();
          target();
          target = null;
        }
        
        let dependency = new Dependency();
        let name = 'Kate';
        let message = undefined;
        watch(() => message =`Hello, ${name}!` );
        console.log(message);

        name = 'Jill';
        dependency.notify();

        console.log(message);
      }

      console.log(`#5 각각의 변수가 종속성을 가질 수 있도록`);
      {
        let data = {
          name: 'World',
          age: 30
        };
        
        Object.keys(data).forEach(key => {
          let internalValue = data[key];
          Object.defineProperty(data, key, {
            get() {
              console.log(`${key} was accessed.`);
              return internalValue;
            },
            set(val) {
              console.log(`${key} was changed!`);
              internalValue = val;
            }
          });
        });

        data.name = 'Jane';
        console.log(data.name);
      }

      console.log(`#6 개념 모으기. Vue처럼 써보자!`);

      let data = {
        name: 'Tom',
        age: 20
      };
      
      Object.keys(data).forEach(key => {
        let internalValue = data[key];
        let dependency = new Dependency();

        Object.defineProperty(data, key, {
          get() {
            console.log(`\taccessed ${key} has ${internalValue}`);
            dependency.depend();
            return internalValue;
          },
          set(val) {
            console.log(`\tchanged ${key} to ${val}`);
            internalValue = val;
            dependency.notify();
          }
        });
      });

      function watch(fn) {
        target = fn;
        target();
        target = null;
      }
      let message;
      watch(() => {message = `Hello, ${data.name} aged ${data.age}!`});
      
      data.name = '함익례';
      console.log(message); // "Hello, 함익례 aged 20!"
      
      data.name = '강혜림';
      console.log(message); // "Hello, 강혜림 aged 20!"
```
