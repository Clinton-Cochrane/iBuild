import { clearDirectionButtons } from "./controls";

const PORTFOLIO_URL = "https://d1h6dtn638poed.cloudfront.net/";

export function setupPortal(k) {
    const app = document.getElementById("app");
    const portal = document.getElementById("portal");
    const heading = document.getElementById("portal-title");
    const status = document.getElementById("portal-status");
    const help = document.getElementById("portal-help");
    const playButton = document.getElementById("portal-play");
    const pauseButton = document.getElementById("pause-button");
    const portfolioLink = document.getElementById("portal-portfolio");

    portfolioLink.href = PORTFOLIO_URL;

    let gameStarted = false;
    let portalOpen = true;

    // The launch scene has no gameplay objects. The same screen is shown as
    // an overlay during play so the map and player survive a pause.
    k.scene("portal", () => {
        status.textContent = "Explore the game or visit the portfolio site.";
        playButton.disabled = false;
    });

    function showPortal() {
        if (portalOpen || !gameStarted) return;
        clearDirectionButtons();
        k.debug.paused = true;
        portalOpen = true;
        heading.textContent = "Game paused";
        status.textContent = "Your place is saved here.";
        help.textContent = "Choose Continue to return to the game.";
        playButton.textContent = "Continue";
        portal.hidden = false;
        app.classList.add("is-portal");
        playButton.focus();
    }

    function play() {
        if (!portalOpen) return;
        portalOpen = false;
        portal.hidden = true;
        app.classList.remove("is-portal");

        if (gameStarted) {
            k.debug.paused = false;
        } else {
            gameStarted = true;
            k.go("main");
        }
        k.canvas.focus();
    }

    playButton.addEventListener("click", play);
    pauseButton.addEventListener("click", showPortal);
    window.addEventListener("keydown", (event) => {
        if (event.key !== "Escape" || event.repeat || !gameStarted || portalOpen) return;
        event.preventDefault();
        showPortal();
    });

    k.onLoad(() => k.go("portal"));
}
