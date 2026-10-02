const heldInputs = new Map();
const buttons = [...document.querySelectorAll('[data-direction]')];

function updateButtons() {
    for (const button of buttons) {
        button.classList.toggle('is-held', [...heldInputs.values()].includes(button.dataset.direction));
    }
}

export function clearDirectionButtons() {
    heldInputs.clear();
    updateButtons();
}

export function isDirectionButtonDown(direction) {
    return [...heldInputs.values()].includes(direction);
}

for (const button of buttons) {
    button.addEventListener('pointerdown', (event) => {
        if (event.button !== 0) return;
        event.preventDefault();
        button.setPointerCapture(event.pointerId);
        heldInputs.set(event.pointerId, button.dataset.direction);
        updateButtons();
    });

    const releasePointer = (event) => {
        heldInputs.delete(event.pointerId);
        updateButtons();
    };
    button.addEventListener('pointerup', releasePointer);
    button.addEventListener('pointercancel', releasePointer);
    button.addEventListener('lostpointercapture', releasePointer);

    // Focused buttons can also be held with Space or Enter.
    button.addEventListener('keydown', (event) => {
        if (event.code !== 'Space' && event.code !== 'Enter') return;
        event.preventDefault();
        heldInputs.set(event.code, button.dataset.direction);
        updateButtons();
    });
    button.addEventListener('keyup', (event) => {
        heldInputs.delete(event.code);
        updateButtons();
    });
    button.addEventListener('blur', () => {
        heldInputs.delete('Space');
        heldInputs.delete('Enter');
        updateButtons();
    });
    button.addEventListener('contextmenu', (event) => event.preventDefault());
}

window.addEventListener('blur', clearDirectionButtons);
document.addEventListener('visibilitychange', () => {
    if (document.hidden) clearDirectionButtons();
});
