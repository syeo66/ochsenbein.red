---
title: 'Typescript: It''s not actually validating your types.'
date: '2022-08-11T21:15:00.000Z'
description: 'Types in typescript try to ensure you are working with the data you expect. But...'
devTo: 'https://dev.to/syeo66/'
---

Typescript is a nice thing: It lets you define types and make sure your classes and functions adhere to certain expectations. It forces you to think about what data you put into a function and what you will get out of it. If you get that wrong and try to call a function which expects a sting with a - let's say - number, the compiler will let you know. Which is a good thing.

Sometimes this leads to a misconception: I met people who believed typescript would actually make sure the types are what you say you are. But I have to tell you: Typescript does not do that.

Why? Well, Typescript is working on compiler level, not during the runtime. If you take a look at how the code Typescript produces does look like you'll see it translates to Javascript and strips all the types from the code. 

Typescript code:
```typescript
const justAFunction = (n: number): string => {
  return `${n}`
}

console.log(justAFunction)
```

The resulting Javascript code (assuming you are transpiling to a more recent EcmaScript version):
```typescript
"use strict";
const justAFunction = (n) => {
    return `${n}`;
};
console.log(justAFunction);
```

It only checks if the types seem to be correct based on your source code. It does not validate the actual data.

## Checking types

Is typescript useless then? Well, no, far from it. When you use it right it forces you to check your types if there are no guarantees ("unfortunately" it also provides  some easy ways out).

Let's change our example a little bit:
```typescript
const justAFunction = (str: string[] | string): string => {
  return str.join(' ') 
}

console.log(justAFunction(["Hello", "World"]))
console.log(justAFunction("Hello World"))
```

When compiling this will lead to the following error:
```
index.ts:2:14 - error TS2339: Property 'join' does not exist on type 'string | string[]'.
  Property 'join' does not exist on type 'string'.

2   return str.join(' ')
               ~~~~


Found 1 error in index.ts:2
```

The compiler forces to think about the type of the variable `str`. One solution would be to only allow `string[]` into the function. The other is to actually test if the variable contains the correct type. 

```typescript
const justAFunction = (str: string[] | string): string => {
  if (typeof str === 'string') {
    return str
  }

  return str.join(' ') 
}

console.log(justAFunction(["Hello", "World"]))
console.log(justAFunction("Hello World"))
```

This would also translate into Javascript and the type would be tested. In this case we would only have a guarantee that it is a `string` and we would only be assuming it is an array.

In many cases this is good enough. But as soon as we have to deal with external data source - like APIs, JSON files, user input and similar - we should not just assume the data is correct. We should validate the data and there is an opportunity to ensure the correct types.

