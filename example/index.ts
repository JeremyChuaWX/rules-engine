import { Rule, RulesEngine } from "../lib";

type Color = "red" | "blue" | "green";
type Shape = "circle" | "square" | "triangle";
type Fact = {
    color: Color;
    shape: Shape;
    pass?: boolean;
    msg?: string;
};

const fact: Fact = {
    color: "red",
    shape: "circle",
};

console.log("---------- Fact ----------");
console.log(fact);

const BLOCKED_COLOR1: Color = "red";
const BLOCKED_SHAPE1: Shape = "triangle";

const BLOCKED_COLOR2: Color = "red";
const BLOCKED_SHAPE2: Shape = "circle";

const BLOCKED_COLOR3: Color = "blue";
const BLOCKED_SHAPE3: Shape = "square";

console.log("---------- Rules ----------");
console.log(`rule 1: block when ${BLOCKED_COLOR1} ${BLOCKED_SHAPE1}`);
console.log(`rule 2: block when ${BLOCKED_COLOR2} ${BLOCKED_SHAPE2}`);
console.log(`rule 3: block when ${BLOCKED_COLOR3} ${BLOCKED_SHAPE3}`);

const rules: Rule<Fact>[] = [
    {
        name: `rule 1: block when ${BLOCKED_COLOR1} ${BLOCKED_SHAPE1}`,
        priority: 3,
        condition: (fact) =>
            fact.color === BLOCKED_COLOR1 && fact.shape === BLOCKED_SHAPE1,
        consequence: (api) => {
            fact.pass = false;
            fact.msg = `blocked: ${BLOCKED_COLOR1} ${BLOCKED_SHAPE1}`;
            api.stop();
        },
    },
    {
        name: `rule 2: block when ${BLOCKED_COLOR2} ${BLOCKED_SHAPE2}`,
        priority: 2,
        condition: (fact) =>
            fact.color === BLOCKED_COLOR2 && fact.shape === BLOCKED_SHAPE2,
        consequence: (api) => {
            fact.pass = false;
            fact.msg = `blocked: ${BLOCKED_COLOR2} ${BLOCKED_SHAPE2}`;
            api.stop();
        },
    },
    {
        name: `rule 3: block when ${BLOCKED_COLOR3} ${BLOCKED_SHAPE3}`,
        priority: 1,
        condition: (fact) =>
            fact.color === BLOCKED_COLOR3 && fact.shape === BLOCKED_SHAPE3,
        consequence: (api) => {
            fact.pass = false;
            fact.msg = `blocked: ${BLOCKED_COLOR3} ${BLOCKED_SHAPE3}`;
            api.stop();
        },
    },
];

const rulesEngine = new RulesEngine(rules);

console.log("---------- Execution ----------");
rulesEngine.execute(fact, (fact) => {
    if (fact !== undefined && fact.pass) {
        console.log("allowed");
    } else if (fact !== undefined && !fact.pass) {
        console.log(fact.msg);
    }
});
