type Api = {
    stop: () => void;
};

type Rule<T> = {
    priority: number;
    condition: (fact: T) => boolean;
    consequence: (api: Api, fact?: T) => void;
};

class RulesEngine<T> {
    public rules: Rule<T>[] = [];

    constructor(rules: Rule<T>[]) {
        if (rules !== undefined) {
            this.rules = rules;
        }
    }

    execute(fact: T, callback: (fact?: T) => void) {
        let done = false;
        this.rules.sort((a, b) => b.priority - a.priority);
        const api: Api = {
            stop: () => {
                done = true;
            },
        };
        function executeRule(rules: Rule<T>[], fact: T, index: number) {
            if (index >= rules.length || done) {
                return;
            }
            if (rules[index].condition(fact)) {
                rules[index].consequence(api, fact);
            }
            executeRule(rules, fact, ++index);
        }
        executeRule(this.rules, fact, 0);
        callback(fact);
    }
}

export { Rule, RulesEngine };
