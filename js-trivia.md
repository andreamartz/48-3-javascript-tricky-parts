# JS Questions from Toptal:

## https://www.toptal.com/javascript/interview-questions

### Q1. What is a potential pitfall with using `typeof bar === "object"` to determine if `bar` is an object? How can this pitfall be avoided?

A: The problem is that `typeof null === "object"` returns true. So, if the value of `bar` is null, `true` will be returned, but that is probably not what we would want in most cases.

Avoid this pitfall by checking if

`bar !== null && typeof bar === "object"`

See additional important details at https://www.toptal.com/javascript/interview-questions

### Q2. What will the code below output to the console and why?

```js
(function () {
  var a = (b = 3);
})();

console.log('a defined? ' + (typeof a !== 'undefined')); // a defined? false
console.log('b defined? ' + (typeof b !== 'undefined')); // b defined? true
```

Explanation: There are two things going on here. (The following two points are true in non-strict mode).

1. The equals assignment (=) operator has _RIGHT_ associativity. This means that the first thing that happens is `b` is set to `3` (i.e., `b = 3` without the `var`). Then `var a = b` is run. This declares `a` with `var` and initializes the value of `a` to be equal to `b`, which has the value of `3`.

2. Notice the scopes of `a` and `b`. `a` was declared with `var`, so it is scoped to the function, and after the function runs (which it will do, because it is an IIFE), we no longer have access to `a`, and it logs as `undefined`. `b` on the other hand is a global variable, because it was not declared with `var`, so we still have access to it outside the function, and it logs `3` or `b !== undefined`.

In strict mode, The statement `var a = b = 3;` will generate a runtime error of `ReferenceError: b is not defined`.

### Q3. What will the code below output to the console and why?

```js
var myObject = {
  foo: 'bar',
  func: function () {
    var self = this;
    console.log('outer func:  this.foo = ' + this.foo); // outer func:  this.foo = bar
    console.log('outer func:  self.foo = ' + self.foo); // outer func:  self.foo = bar
    (function () {
      console.log('inner func:  this.foo = ' + this.foo); // inner func:  this.foo = undefined
      console.log('inner func:  self.foo = ' + self.foo); // inner func:  self.foo = bar
    })();
  },
};
myObject.func();
```

A: See comments above for what the output will be.

`this` points to the object on which the function is called.

- The object on which the outer function is called is `myObject`, so `this` and `self` both refer to myObject.
- The inner function has access to the `self` variable defined in its parent scope, so `self.foo` still has the value `bar`. The inner function is called on the global object, so the global object is `this`. But the global object does not have a property called `boo`, so `undefined` is returned.

### Q4. What is the significance of, and reason for, wrapping the entire content of a JavaScript source file in a function block?

A: Wrapping the entire content of a JavaScript source file in a function block creates a closure around the contents of the file. This closure creates a private namespace for variables such that when the function is executed the variables can be used - and executed if they themselves are functions - but not modified. Creating such a closure is a common practice in JavaScript libraries like jQuery.

### Q5. What is the significance, and what are the benefits, of including 'use strict' at the beginning of a JavaScript source file?

A: In strict mode, JavaScript is less forgiving. 'Silent errors' in non-strict mode are actual errors thrown in strict mode, and that makes debugging easier.

See more benefits at https://www.toptal.com/javascript/interview-questions.

### Q6. Consider the two functions below. Will they both return the same thing? Why or why not?

```
function foo1() {
  return {
    bar: 'hello',
  };
}

function foo2() {
  return
  {
    bar: 'hello';
  };
}
```

A: They do not return the same thing.

```js
console.log(foo1()); // returns an object:   { bar: 'hello' }
console.log(foo2()); // returns undefined
```

Semi-colons are technically optional, but JavaScript will insert them for you if you don't provide them, which in this case and some others, leads to unexpected results. In `foo2`, JavaScript automatically inserted a colon after the `return`. This is why it is best practice to (1) be intentional about semi-colons and insert them ourselves and (2) not have return be the only thing on a line. In this case, the left bracket was also inserted.

### Q7. What will the code below output? Explain your answer.

```js
console.log(0.1 + 0.2); // seems like it should output 0.3, but actually it outputs 0.30000000000000004
console.log(0.1 + 0.2 == 0.3); // false
```

Numbers in JavaScript are treated with floating point precision. Because of this, the result of math operations can sometimes work out to be slightly different than what we might expect.

### Q8. In what order will the numbers 1-4 be logged to the console when the code below is executed? Why?

```js
(function () {
  console.log(1);
  setTimeout(function () {
    console.log(2);
  }, 1000);
  setTimeout(function () {
    console.log(3);
  }, 0);
  console.log(4);
})();
```

A:

```
1
4
3
2
```

`1` is output immediately, because its console.log statement is not wrapped in a setTimeout.
`2` and `3` will not print yet, because their console.log statements are both wrapped in a setTimeout function. The delay for printing `3` is 0 milliseconds, but the fact that the console.log is wrapped in a setTimeout at all means that it is first sent off to the browser's API and then added to the callback queue after 0 milliseconds. In the meantime, JavaScript moves on to the last console.log statement (for the number `4`) and executes it.
Now that the call stack is empty, the two operations that were waiting to be put onto the call stack are loaded to the call stack in the order they were added to the queue.

### Q9. Write a simple function (less than 160 characters) that returns a boolean indicating whether or not a string is a palindrome.

A:

```js
function isPalindrome(str) {
  str = str.replace(/\W/g, '').toLowerCase();
  return str == str.split('').reverse().join('');
}
```

### Q10. Write a `sum` method which will work properly when invoked using either syntax below.

```js
console.log(sum(2, 3)); // Outputs 5
console.log(sum(2)(3)); // Outputs 5
```

A:

```js
function sum(x, y) {
  if (y !== undefined) {
    return x + y;
  } else {
    return function (y) {
      return x + y;
    };
  }
}
```

### Q11. Consider the following code snippet:

```js
for (var i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', function(){ console.log(i); });
  document.body.appendChild(btn);
```

### (a) What gets logged to the console when the user clicks on “Button 4” and why?

A: No matter which button the user clicks, the number 5 will always be logged to the console, because by the time the onclick method is invoked (for any of the buttons), the for loop will have already completed. Since the iteration variable `i` is declared with `var`, there will be only one value for i, which will be `5` after the for loop completes.

### (b) Provide one or more alternate implementations that will work as expected.

A: Replace `var` with `let`, like this:

```js
for (let i = 0; i < 5; i++) {
  var btn = document.createElement('button');
  btn.appendChild(document.createTextNode('Button ' + i));
  btn.addEventListener('click', function () {
    console.log(i);
  });
  document.body.appendChild(btn);
}
```

### Q12. Assuming `d` is an “empty” object in scope, say:

```js
var d = {};
```

### …what is accomplished using the following code?

```js
['zebra', 'horse'].forEach(function (k) {
  d[k] = undefined;
});
```

A:
After the forEach runs, the object d will look like this:

```js
{ 'zebra': undefined, 'horse': undefined }
```

This is a strategy for making sure that an object has a certain set of properties when we don't yet have values to assign to those properties.

### Q13. What will the code below output to the console and why?

```js
var arr1 = 'john'.split('');
var arr2 = arr1.reverse();
var arr3 = 'jones'.split('');
arr2.push(arr3);
console.log('array 1: length=' + arr1.length + ' last=' + arr1.slice(-1));
console.log('array 2: length=' + arr2.length + ' last=' + arr2.slice(-1));
```

A:
The `reverse` method for arrays reverses an array in place. Therefore, arr1 and arr2 are pointing to the same reference in memory, and it looks like this:

```js
['n', 'h', 'o', 'j', ['j', 'o', 'n', 'e', 's']];
```

The code will output this...

```js
'array 1: length=5 last=j,o,n,e,s';
'array 2: length=5 last=j,o,n,e,s';
```

...which is somewhat confusing, because arr1.slice(-1) returns the _array_
['j','o','n','e','s'], which is not obvious when viewing the output above.

### Q14. What will the code below output to the console and why ?

```js
console.log(1 + '2' + '2');
console.log(1 + +'2' + '2');
console.log(1 + -'1' + '2');
console.log(+'1' + '1' + '2');
console.log('A' - 'B' + '2');
console.log('A' - 'B' + 2);
```

A:

```js
console.log(1 + '2' + '2'); // "122"
console.log(1 + +'2' + '2'); // "32"
console.log(1 + -'1' + '2'); // "02"
console.log(+'1' + '1' + '2'); // "112"
console.log('A' - 'B' + '2'); // "NaN2"
console.log('A' - 'B' + 2); // NaN
```

### Q15. The following recursive code will cause a stack overflow if the array list is too large. How can you fix this and still retain the recursive pattern?

```js
var list = readHugeList();

var nextListItem = function () {
  var item = list.pop();

  if (item) {
    // process the list item...
    nextListItem();
  }
};
```

A: We can wrap the recursive call to nextListItem in a setTimeout with a 0 millisecond delay:

```js
var list = readHugeList();

var nextListItem = function () {
  var item = list.pop();

  if (item) {
    // process the list item...
    setTimeout(nextListItem, 0);
  }
};
```

By doing this, all of the recursive calls to nextListItem will be sent to the Web APIs and then added to the event queue in the order they were called. They won't be added to the call stack until the stack is empty, so this recursion will never cause a stack overflow.

### Q16. What is a “closure” in JavaScript? Provide an example.

A: A closure is an inner function that is returned by an outer function which has access to the variables in the outer function even after the outer function returns.

Example:

```js
function outerFcn() {
  const outerVar = "I'm outerVar!";
  return function innerFcn() {
    const innerVar = "I'm innerVar!";
    console.log('outerVar: ', outerVar, 'innerVar: ', innerVar);
  };
}
outerFcn()();
```

### Q17. What would the following lines of code output to the console?

```
console.log('0 || 1 = ' +(0 || 1));
console.log('1 || 2 = ' +(1 || 2));
console.log('0 && 1 = ' +(0 && 1));
console.log('1 && 2 = ' +(1 && 2));
```

### Explain your answer.

A: The `+` immediately preceding each logical statement coerces it to a number. `true` coerces to `1`, and `false` coerces to `0`.
The last one is particularly tricky, because when using an AND expression (`&&`) that evaluates to true, the expression itself is returned, _not_ the boolean value.

```
console.log('0 || 1 = ' +(0 || 1)); // "0 || 1 = 1"
console.log('1 || 2 = ' +(1 || 2)); // "1 || 2 = 1"
console.log('0 && 1 = ' +(0 && 1)); // "0 && 1 = 0"
console.log('1 && 2 = ' +(1 && 2)); // "1 && 2 = 2"
```

### Q18. What will be the output when the following code is executed? Explain.

```js
console.log(false == '0');
console.log(false === '0');
```

A:

```js
console.log(false == '0'); // uses loose equality; output is `true`
console.log(false === '0'); // uses strick equality; output is `false`
```

### Q19. What is the output out of the following code? Explain your answer.

```js
var a = {},
  b = { key: 'b' },
  c = { key: 'c' };

a[b] = 123;
a[c] = 456;

console.log(a[b]);
```

A: The output will be `456`, not `123`. When an object property is set in JavaScript, the property name must be a string; if it is not a string, JavaScript will stringify it. When `b` is stringified, it results in the same value (i.e., [object Object]) as when `c` is stringified. Therefore, the statement `a[b]=123` is overwritten by `a[c]=456`. The end result is that both `a[b]` and `a[c]` will evaluate to 456.

### Q20. What will the following code output to the console:

```
console.log((function f(n){return ((n > 1) ? n * f(n-1) : n)})(10));
```

My attempt to rewrite on multiple lines:

```
console.log((function f(n) {
  return ((n > 1) ? n * f(n-1) : n)
})(10));
```

### Explain your answer.

We are logging to the console the result of calling the function f with the argument `10`. The result of calling this recursive function with `10` as the argument is equivalent to 10 factorial (i.e., `10!`), or `3628800`.

### Q21. Consider the code snippet below. What will the console output be and why?

```js
(function (x) {
  return (function (y) {
    console.log(x);
  })(2);
})(1);
```

A: The console output will be `1`. The inner function is a closure, and as such it has access to the value of the variable `x` from the outer function, even after the outer function returns.

### Q22. What will the following code output to the console and why?

```js
var hero = {
  _name: 'John Doe',
  getSecretIdentity: function () {
    return this._name;
  },
};

var stoleSecretIdentity = hero.getSecretIdentity;

console.log(stoleSecretIdentity());
console.log(hero.getSecretIdentity());
```

### What is the issue with this code and how can it be fixed?

A: First, let's look at what the two logs will output to the console:

```js
console.log(stoleSecretIdentity()); // undefined
console.log(hero.getSecretIdentity()); // "John Doe"
```

When we call the method directly from `hero`, the value of `this` becomes `hero`, and therefore the value associated with hero.\_name is logged to the console. When we first save the method to a variable and then execute the function, it does not behave the same way, because the context for `this` is no longer `hero`, but instead it is the global object.

### Q23. Create a function that, given a DOM Element on the page, will visit the element itself and all of its descendents (not just its immediate children). For each element visited, the function should pass that element to a provided callback function.

### The arguments to the function should be:

### \* a DOM element

### \* a callback function (that takes a DOM element as its argument)

A:

```js
function Traverse(p_element, p_callback) {
  p_callback(p_element);
  var list = p_element.children;
  for (var i = 0; i < list.length; i++) {
    Traverse(list[i], p_callback); // recursive call
  }
}
```

### Q24. Testing your `this` knowledge in JavaScript: What is the output of the following code?

```js
var length = 10;
function fn() {
  console.log(this.length); // 10
}

var obj = {
  length: 5,
  method: function (fn) {
    fn();
    arguments[0](); // 2
  },
};

obj.method(fn, 1);
```

A: Inside obj.method, `arguments[0]` refers to the function fn. `arguments[0]()` executes the function, and when it does, `this` refers to the array-like arguments data structure. The length of the arguments structure is `2`, so `2` is printed to the console.

### Q25. Consider the following code. What will the output be, and why?

```js
(function () {
  try {
    throw new Error();
  } catch (x) {
    var x = 1,
      y = 2;
    console.log(x); // 1
  }
  console.log(x); // undefined
  console.log(y); // 2
})();
```

A:

```js
1;
undefined;
2;
```

Variables declared with `var` are scoped (globally or) to the function they are in. Their declarations are hoisted to the top of their scope.

- The first `console.log(x)` prints the value of x from the `catch` block.
- The second one prints the value of x in the function scope, which is `undefined` because its declaration has been hoisted to the top of the function, but it has not been initialized.
- The third one prints the value of `y`.

### Q26. What will be the output of this code?

```js
var x = 21;
var girl = function () {
  console.log(x);
  var x = 20;
};
girl();
```

A: `undefined`
This one is both tricky and very interesting!
JavaScript knows that there is a local variable x, because its declaration was hoisted to the top of the function scope. However, the initialization of x is _not_ hoisted and does not happen until after the console.log. So, at the time of the console.log, JS knows there is a local x variable (which is why it will NOT look to the global scope for a value), but it doesn't have a value yet.

### Q27. What will this code print?

```js
for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, i * 1000);
}
```

A: The numbers `0`, `1`, `2`, `3`, and `4` print one second apart. Variables declared with `let` are block-scoped, so each iteration of the loop gets its own value for `i`.

### Q28. What do the following lines output, and why?

```js
console.log(1 < 2 < 3);
console.log(3 > 2 > 1);
```

A:

```js
console.log(1 < 2 < 3); // true
console.log(3 > 2 > 1); // false
```

Greater than (`>`) and less than (`<`) operators have the same level of operator precedence, and they both use left-to-right associativity.

`1 < 2` evaluates to `true`. `true` coerces to `1` when compared with `3`. `1 < 3` evaluates to `true`.

`3 > 2` evaluates to `true`. `true` coerces to `1` when compared with `1`. `1 > 1` evaluates to `false`.

### Q29. How do you add an element at the begining of an array? How do you add one at the end?

A: The Array prototype method `unshift` can be used to add an element to the beginning of an array. The Array prototype method `push` can be used to add an element to the end of an array.

```js
const myArray = ['a', 'b', 'c', 'd'];
myArray.push('end');
myArray.unshift('start');
console.log(myArray); // ["start", "a", "b", "c", "d", "end"]
```

It's also possible to use the spread operator:

```js
const myArray2 = ['start', ...myArray, 'end'];
```

### Q30. Imagine you have this code:

```js
var a = [1, 2, 3];
```

**a) Will this result in a crash?**

```js
a[10] = 99;
```

A: No. It will result in

```js
[1, 2, 3, empty, empty, empty, empty, empty, empty, empty, 99];
```

**b) What will this output?**

```js
console.log(a[6]);
```

A: `undefined`

Note that although it returns `undefined`, the slot is actually empty. When mapping over an array (using Array.prototype.map()) with a callback function, empty slots will remain empty in the mapped output, but `undefined` slots will be mapped using the callback function.

### Q31. What is the value of the following?

```js
typeof undefined == typeof NULL;
```

A: The value is `"undefined"`. Note that NULL is just an undefined variable that has nothing to do with `null`.

### Q32. What would following code return?

```js
console.log(typeof typeof 1);
```

A: It will return `"string"`.
This is because `typeof 1` returns `"number"`, and `typeof "number"` returns `"string"`.

### Q33. What will be the output of the following code:

```js
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log(i);
  }, i * 1000);
}
```

### Explain your answer. How could the use of closures help here?

A: The output will be `5` five times, each one second apart, with the first one printing as soon as the call stack is empty.

The loop creates five distinct setTimeout function calls. The variable i is declared with `var`, which means its scope is the global scope. By the time the callbacks to setTimeout start running, the value of i has already reached 5, and that is why all the logs to the console print 5.

#### **How Closures Help**

If having 5 print every time was _not_ the goal of the developer and he/she instead wanted to see 0, 1, 2, 3, and 4 print one second apart, this could be achieved by using `let` instead of `var`. By using `let` instead of `var`, each iteration of the loop creates it's own scope for i, which is closed over when the iteration ends.

### Q34. What is `NaN`? What is its type? How can you reliably test if a value is equal to `NaN`?

`NaN` is a property on the global object that represents a value that is "not a number". It is the result of an operation that cannot be performed (e.g., `9/0`).

The type of `NaN` is "number":

```js
typeof NaN; // "number"
```

Because strict equality comparisons to NaN are always false (including comparisons to itself)...

```js
NaN === NaN; // false
```

...a reliable test of whether a value computes to `NaN` is to check it against `NaN`. ONLY a value of `NaN` will pass this test as being `true`:

```js
0 * Infinity !== NaN; // true
```

Additionally, in ES6 a new function `Number.isNaN()` was introduced, which is similar to the older `isNaN()`, but it is more reliable. So, using `Number.isNaN()` is another solid choice for testing whether a value is equal to NaN.

### Q35. What will the following code output and why?

```js
var b = 1;
function outer() {
  var b = 2;
  function inner() {
    b++;
    var b = 3;
    console.log(b);
  }
  inner();
}
outer();
```

A: Output to the console will be `3`, because `inner` has its own `var b`.
The inner function is interpreted by JavaScript as follows:

```js
function inner() {
  var b; // b is undefined
  b++; // b is NaN
  b = 3; // b is 3
  console.log(b); // output "3"
}
```

### Q36. Discuss possible ways to write a function isInteger(x) that determines if x is an integer.

A: In ES6, writing such a function has become a trivial exercise with the introduction of the function Number.isInteger(). Before ES6, either of these two approaches would work:

- Using the bitwise XOR operator:

```js
function isInteger(x) {
  return (x ^ 0) === x;
}
```

- Using typeof and the modulo operator:

```js
function isInteger(x) {
  return typeof x === 'number' && x % 1 === 0;
}
```

Some functions, like the following ones, seem like they would work fine, but they don't reliably return the correct result:

```js
function isInteger(x) {
  return parseInt(x, 10) === x;
}
function isInteger(x) {
  return Math.round(x) === x;
}
function isInteger(x) {
  return Math.ceil(x) === x;
}
function isInteger(x) {
  return Math.floor(x) === x;
}
```

### Q37. How do you clone an object?

A: Objects are passed by reference in JavaScript. So, if we just use the equals ('=') to clone the object, we won't actually get a clone. Instead, we'll get another variable that points to the same reference in memory.

```js
// the original object
const nestedPersonObject = {
  name: 'Joe',
  address: {
    houseNumber: 1222,
    street: 'Main',
    city: 'New Haven',
  },
};

// try to clone using '='
const nestedPersonClone = nestedPersonObject;

// change name property on the new variable
nestedPersonClone.name = 'Amy';

console.log(nestedPersonObject.name); // 'Amy'

// The name property was changed for both, because they both point to the same reference in memory.
```

To make a shallow clone of an object is easy enough. We can use either Object.assign or the spread operator.

Using Object.assign:

```js
const nestedPersonClone2 = Object.assign({}, nestedPersonObject);
```

Using the spread operator:

```js
const nestedPersonClone3 = { ...nestedPersonObject };
```

The best way to create a deep clone is to use Lodash.
