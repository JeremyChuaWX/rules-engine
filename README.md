# Rules Engine

A generic business rules engine built in Typescript.

## How to use

Transpile the Typescript files with the command:

```bash
npm run build
```

Run the example file with the command:

```bash
npm run example
```

## Components

### Rule

The basic unit of the rules engine.

```ts
type Rule<T> = {
    priority: number;
    condition: (fact: T) => boolean;
    consequence: (api: Api, fact?: T) => void;
};
```

#### Type parameter `T`

Allows for generic typing of facts and ensures type safety within the condition and consequence functions.

#### Priority

Dictates the order in which rules are ran against the fact. Sorted in descending order (largest to smallest).

#### Condition

The function that is ran to see if the consequence function will be called. If condition returns `true`, the consequence function is ran.

#### Consequence

The function that is ran when condition is met. Contains an API object that provides functions that can be run to invoke certain behaviors that manipulate the execution of the rules engine.

### Rules Engine

The component that runs the rules against a fact.

```ts
class RulesEngine<T> {
    rules: Rule<T>[];

    execute(fact: T, callback: (fact?: T) => void) {}
}
```

#### Rules

The array of rules that are registered to this instance of the rules engine.

#### Execute

Runs the registered rules against the provided fact. Once all the rules have been run, or the execution has been stopped, the callback function is ran.
