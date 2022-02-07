---
title: 'How To: Implement a Set of Stacks in Javascript'
date: 2018-01-06
tags:
  - Javascript
  - Algorithms
---

_The problem:_ create a stack data structure that will create additional stacks if the previous stack exceeds a particular size.

Pushing and popping from this stack should function as it normally would in a regular stack. That is, `push()` should place a value at the end of the last stack and `pop()` should return the last value in the last stack.

_Bonus:_ create a `popAt()` method that returns a popped value from a particular stack and shifts the rest of the values so there are no gaps.

### Plan of Action

So we know we’ll at least need to start things off with an **empty master stack** which we’ll eventually put more stacks into as we accumulate input. We’ll probably also want a **variable where we can store the maximum stack size** that a user can pass in.

Our `push()` method needs to **find the last stack and push a value into it**. It also needs to **check if that stack exceeds the maximum size**, because if it does, it will need to push another empty stack into our master stack.

Our `pop()` method **similarly needs to find the last stack and pop the last value from it**. It also needs to **check the length of the last stack** and if there’s nothing left, pop it from the master stack so we don’t have empty stacks lying around.

Our `popAt()` method will be the most complex. It will take a number that corresponds to the stack where we want to pop a value. First, we should **check the number against our stack length** because we know if the number is equal to the number of stacks, we can just run our regular pop method because it’s simply popping the last value from the last stack.

We should also **check to see if the number is out of bounds** in any way, like if it’s `0` or if it’s greater than the number of stacks we have. If so, then that would be an error.

Finally, we’ll need to find the stack in question, pop the value from that stack, then shift the rest of the stacks in a way that leaves no leftover space. The solution for this may not be immediately obvious, but we’ll see it’s actually simpler than you may think.

### Step 1: Initialize Our Data structure

<br />

```js
class StackSet {
  constructor(maxSize) {
   if (arguments.length < 1) {
    throw new Error (‘Woops, maxSize is required!’)
   }

this.stacks = [[]]
this.maxSize = maxSize
}
}

```

Since we know we’ll eventually have multiple stacks, we can start off with a nested array. This makes things a bit easier to get started.

Additionally, we need to store the maximum size since that’s what will determine when we create a new stack.

### Step 2: Our push() Method

<br />

```js
push(value) {
  if (this.stacks[this.stacks.length - 1].length === this.maxSize) {
   this.stacks.push([])
  }

this.stacks[this.stacks.length - 1].push(value)
}

```

First we create our `push()` method with a `value` param since we want to add a value to our stacks. Then we’ll do a quick check and see if the last stack in our master stack equals the max size passed into our constructor above. If so, we know we need another stack in our master stack because we can’t fit any more in the current stack, so let’s push an empty one.

Lastly, we’ll push our value into the last stack.

Note: remember that .length returns the _actual_ length of an array, not the number of indices. That’s why we need to subtract 1.

Let’s say our maxSize = 3. Here’s a visualization of what’s happening:

[![Set of Stacks](/images/stacks_1.png)](/images/stacks_1.png)

### Step 3: Our popAt() Method

<br />

```js
popAt(number) {
  // checks
  if (number < 1 || number > this.stacks.length) {
    throw new Error ('Whoa, that number is either too small or too  large for our stack.')
  }

  if (number === this.stacks.length) {
    return this.pop()
  }

  let stack = this.stacks[number - 1]
  let value = stack.pop()
  let nextStack = []

  for (let i = number; i < this.stacks.length; i++) {
    nextStack = this.stacks[i]
    nextStack.reverse()
    stack.push(nextStack.pop())
    nextStack.reverse()
    stack = nextStack
  }

  if (this.stacks.length > 1 && this.stacks[this.stacks.length - 1].length === 0) {
    this.stacks.pop()
  }

    return value;
}
```

Remember this method only wants one popped value from the stack at the number passed in. **And we need to shift our stacks so there aren’t any spaces.**

At the top we can start with some initial checks. If the number is `0` or larger than the number of stacks, then it’s of no use to us so we should let the user know.

Next, if the number is the same as the last stack, then we can run a regular `pop()`. No sweat.

If we don’t meet any of those initial checks, now it’s time to do work.

First, let’s grab the stack we need by subtracting `1` from the number param to get our stack index. Good, now let’s pop off the value we ultimately want to return from that stack.

We’re almost there, now we just need to clean up our stacks.

To do our shifting, we‘ll run a for loop on our stacks, starting at the stack that corresponds to our numbers param (we don’t care about the stacks that come before because they aren’t affected by the pop).

Basically what we want to do is 1) grab the stack _after_ our selected stack, 2) pop off the first value of that stack and 3) add the popped value to our selected stack since there’s an empty spot there where we popped off the final value earlier. We can do this pretty painlessly with the `shift()` method which acts like pop(), but on the beginning of an array instead of the end.

> Remember that arrays and objects in Javascript are assigned by reference meaning when you assign a variable to an array or object it points to that actual object instead of creating a copy. That means when we’re modifying ‘stack’ and ‘nextStack’, we’re modifying the stacks in our master stack.

After that, we’ll assign stack to whatever’s left over in `nextStack`, that way if our loop has any more iterations left, it can run the same process on the next stack until everything is in its right place.

Finally, we’ll run the same check we did in `pop()` to see if after all the work we did the last stack is empty. If so, let’s get rid of it. Then we’ll ultimately return our popped value so the user can see what it was.

[![Set of Stacks](/images/stacks_2.png)](/images/stacks_2.png)

### The Final Code

Here’s what our data structure will look like. I’ve added some logs at the end to show you what the output will be for each method. If you notice any typos, let me know!

```js
class StackSet {
	constructor(maxSize) {
		if (arguments.length < 1) {
			throw new Error('Woops, maxSize is required!');
		}

		this.stacks = [[]];
		this.maxSize = maxSize;
	}

	push(value) {
		if (this.stacks[this.stacks.length - 1].length === this.maxSize) {
			this.stacks.push([]);
		}

		this.stacks[this.stacks.length - 1].push(value);
	}

	pop() {
		const value = this.stacks[this.stacks.length - 1].pop();

		if (this.stacks.length > 1 && this.stacks[this.stacks.length - 1].length === 0) {
			this.stacks.pop();
		}

		return value;
	}

	popAt(number) {
		if (number < 1 || number > this.stacks.length) {
			throw new Error('Whoa, that number is either too small or too large for our stack.');
		}

		if (number === this.stacks.length) {
			return this.pop();
		}

		let stack = this.stacks[number - 1];
		let value = stack.pop();
		let nextStack = [];

		for (let i = number; i < this.stacks.length; i++) {
			nextStack = this.stacks[i];
			stack.push(nextStack.shift());
			stack = nextStack;
		}

		if (this.stacks.length > 1 && this.stacks[this.stacks.length - 1].length === 0) {
			this.stacks.pop();
		}

		return value;
	}
}
// initialize new StackSet object
const myStack = new StackSet(3);
// to test if it works
myStack.push(1);
myStack.push(2);
myStack.push(3);
myStack.push(4);
myStack.push(5);
myStack.push(6);
console.log(myStack.stacks); // [ [ 1, 2, 3 ], [ 4, 5, 6 ] ]
console.log(myStack.pop()); // 6
console.log(myStack.stacks); // [ [ 1, 2, 3 ], [ 4, 5 ] ]
console.log(myStack.popAt(1)); // 3
console.log(myStack.stacks); // [ [ 1, 2, 4 ], [ 5 ] ]
```
