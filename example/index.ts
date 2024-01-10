import { Rule, RulesEngine } from "../lib";

type Color = "red" | "blue" | "green";
type Shape = "circle" | "square" | "triangle";
type Fact = {
    color: Color;
    shape: Shape;
    pass: boolean;
    msg?: string;
};

const fact: Fact = {
    color: "red",
    shape: "circle",
    pass: true,
};

console.log("---------- Fact ----------");
console.log(fact);

const BLOCKED_COLOR1: Color = "red";
const BLOCKED_SHAPE1: Shape = "triangle";

const BLOCKED_COLOR2: Color = "red";
const BLOCKED_SHAPE2: Shape = "circle";

console.log("---------- Rules ----------");
console.log(`rule 1: block when ${BLOCKED_COLOR1} ${BLOCKED_SHAPE1}`);
console.log(`rule 2: block when ${BLOCKED_COLOR2} ${BLOCKED_SHAPE2}`);

const rules: Rule<Fact>[] = [
    {
        priority: 2,
        condition: (fact) =>
            fact.color === BLOCKED_COLOR1 && fact.shape === BLOCKED_SHAPE1,
        consequence: (api) => {
            fact.pass = false;
            fact.msg = `blocked: ${BLOCKED_COLOR1} ${BLOCKED_SHAPE1}`;
            api.stop();
        },
    },
    {
        priority: 1,
        condition: (fact) =>
            fact.color === BLOCKED_COLOR2 && fact.shape === BLOCKED_SHAPE2,
        consequence: (api) => {
            fact.pass = false;
            fact.msg = `blocked: ${BLOCKED_COLOR2} ${BLOCKED_SHAPE2}`;
            api.stop();
        },
    },
];

const ruleEngine = new RulesEngine(rules);

console.log("---------- Execution ----------");
ruleEngine.execute(fact, (fact) => {
    if (fact !== undefined && fact.pass) {
        console.log("allowed");
    } else if (fact !== undefined && !fact.pass) {
        console.log(fact.msg);
    }
});
