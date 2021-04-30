document.querySelector("#insert").addEventListener("submit", insertSubmitted);
document.querySelector("#delete").addEventListener("submit", deleteSubmitted);
document.querySelector("#find").addEventListener("submit", findSubmitted);
document
    .querySelector("#clearButton")
    .addEventListener("click", clearButtonClicked);

const KDTreeDisplay = document.querySelector("#KDTreeDisplay");

const reduceInput = (input) => {
    let re = new RegExp("(\\d+,){" + (kdTree.dimensions - 1) + "}\\d+");
    const matches = input.match(re);

    return matches && new Node(matches[0].split(","));
};

function insertSubmitted(c) {
    c.preventDefault();
    kdTree.insert(reduceInput(c.target.insert.value));
}

function deleteSubmitted(c) {
    c.preventDefault();
    kdTree.delete(reduceInput(c.target.insert.value));
}

function findSubmitted(c) {
    c.preventDefault();
    const { isFound } = kdTree.find(reduceInput(c.target.find.value));

    alert(
        `The node ${c.target.find.value} ${
            isFound ? "is in the skiplist" : "is NOT in the skiplist"
        }`
    );
}

function clearButtonClicked(c) {
    kdTree.clear();
}

kdTree.subscribe(renderKDTree);

function renderKDTree(updatedKDTree) {
    KDTreeDisplay.innerHTML = "";
    let stack = [{domParent: KDTreeDisplay, nodeToDisplay: updatedKDTree}]

    stack[0].domParent.appendChild(drawNode(stack[0].nodeToDisplay))

    // let currentNode = updatedKDTree;

    // while (currentNode != null) {
    //     KDTreeDisplay.appendChild(drawNode(currentNode));
    //     currentNode = currentNode.next[0];
    // }

    // for (e = 0; e < updatedKDTree.next.length; e++) {
    //     pointers.appendChild(document.createElement("hr"));
    // }
}

function drawNode(node) {
    //creates node div
    let newNode = document.createElement("div");
    newNode.setAttribute("class", "node");

    //creates value inside node div
    newNode.appendChild(document.createTextNode(node.value.toString()));

    return newNode;
}
