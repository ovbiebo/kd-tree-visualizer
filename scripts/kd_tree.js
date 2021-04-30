class Observable {
    constructor() {
        this.observers = [];
    }

    subscribe(fnToAdd) {
        this.observers.push(fnToAdd);
    }

    unsubscribe(fnToRemove) {
        this.observers = this.observers.filter((fn) => {
            if (fn != fnToRemove) return fn;
        });
    }

    notifyObservers(updatedState) {
        this.observers.forEach((fn) => {
            if (typeof fn === "function") fn(updatedState);
        });
    }
}

class Node {
    constructor(value = [], leftChild = null, rightChild = null) {
        this.value = value;
        this.leftChild = leftChild;
        this.rightChild = rightChild;
    }

    isEqualTo(node) {
        for (const key of this.value) {
            if (this.value[key] !== node.value[key]) {
                return false;
            }
        }
        return true;
    }
}

class KDTree extends Observable {
    constructor(dimensions = 2) {
        super();
        this.root = null;
        this.dimensions = dimensions;
    }

    insert(nodeToInsert) {
        const { isFound, lastNode } = this.find(nodeToInsert);

        if (this.root === null) {
            this.root = nodeToInsert;
        } else if (!isFound) {
            nodeToInsert.rightChild = lastNode.rightChild || null;
            lastNode.rightChild = nodeToInsert;
        }

        super.notifyObservers(this.root);
    }

    delete(numberToDelete) {
        const { isFound, lastNodesInPrevLevels, foundNode } = this.find(
            numberToDelete
        );

        if (isFound) {
            foundNode.next.map((node, index) => {
                lastNodesInPrevLevels[index].next[index] = node;
            });
        }

        super.notifyObservers(this.header);
    }

    find(nodeToFind) {
        let currentNode = this.root;
        let currentDimension = 0;

        while (currentNode) {
            if (
                nodeToFind.value[currentDimension] <
                currentNode.value[currentDimension]
            ) {
                if (!currentNode.leftChild) break;
                currentNode = currentNode.leftChild;
            } else if (
                nodeToFind.value[currentDimension] >
                currentNode.value[currentDimension]
            ) {
                if (!currentNode.rightChild) break;
                currentNode.value = currentNode.rightChild;
            } else if (
                nodeToFind.value[currentDimension] ===
                currentNode.value[currentDimension]
            ) {
                if (nodeToFind.isEqualTo(currentNode)) {
                    return {
                        isFound: true,
                        lastNode: currentNode,
                    };
                }

                if (!currentNode.rightChild) break;
                currentNode = currentNode.rightChild;
            }

            currentDimension = ++currentDimension % this.dimensions;
        }

        return {
            isFound: false,
            lastNode: currentNode,
        };
    }

    clear() {
        this.root = null;
        super.notifyObservers(this.header);
    }
}

const kdTree = new KDTree();
