const { browser: browserGlobals, node: nodeGlobals } = require('globals');

function findParentProperty(node, propertyKey) {
    return findParentPropertyByMatcher(node, (key) => key === propertyKey);
}

function inSSRHook(node) {
    let matchedHook;
    const HOOKS = ['data', 'computed', 'created', 'beforeCreate'];
    const matchNode = findParentPropertyByMatcher(node, (key) => {
        return (matchedHook = HOOKS.find((hook) => key === hook));
    });
    return {
        node: matchNode,
        hook: matchedHook,
    };
}

function findParentPropertyByMatcher(node, matcher) {
    let current = node;
    while(current !== undefined && current !== null) {
        if (current.type === 'Property' && typeof matcher === 'function' && matcher(current.key.name)) {
            return current;
        }
        current = current.parent;
    }
    return ;
}

function isClientGlobals(variable) {
    return (variable in browserGlobals) && !(variable in nodeGlobals);
}

module.exports = {
    findParentProperty,
    isClientGlobals,
    findParentPropertyByMatcher,
    inSSRHook,
}