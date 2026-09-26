export function displayDialogue(text, onDisplayEnd) {
    const dialogueUI = document.getElementById('textbox-container');
    const dialogue = document.getElementById('dialogue');

    dialogueUI.style.display = "block";
    // Add HTML elements once, then reveal text inside them one character at a time.
    // This keeps links clickable and prevents images from reloading on every tick.
    const template = document.createElement("template");
    template.innerHTML = text;
    dialogueUI.classList.toggle("has-image", Boolean(template.content.querySelector("img")));
    const pending = [...template.content.childNodes].map(node => ({ node, parent: dialogue }));
    let textNode = null;
    let sourceText = "";
    let index = 0;
    const intervalRef = setInterval(() => {
        if (textNode && index < sourceText.length) {
            textNode.textContent += sourceText[index];
            index++;
            return;
        }

        textNode = null;
        const next = pending.shift();
        if (!next) {
            clearInterval(intervalRef);
            return;
        }

        if (next.node.nodeType === Node.TEXT_NODE) {
            sourceText = next.node.textContent;
            textNode = document.createTextNode("");
            next.parent.appendChild(textNode);
            index = 0;
            return;
        }

        const element = next.node.cloneNode(false);
        next.parent.appendChild(element);
        pending.unshift(...[...next.node.childNodes].map(node => ({ node, parent: element })));
    }, 1);

    const closeButton = document.getElementById("close");
    function onCloseButtonClick() {
        onDisplayEnd();
        dialogueUI.style.display = "none";
        dialogueUI.classList.remove("has-image");
        dialogue.innerHTML = "";
        clearInterval(intervalRef);
        closeButton.removeEventListener("click", onCloseButtonClick);
    }
    closeButton.addEventListener("click", onCloseButtonClick);

    addEventListener("keypress", (key) => {
    if (key.code === "Enter") {
      closeButton.click();
    }
  });
}
