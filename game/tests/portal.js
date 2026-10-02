// playwright-cli run-code --filename=tests/portal.js
async (page) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const originalViewport = page.viewportSize();

    try {
        await page.reload();
        const start = page.getByRole('button', { name: 'Start Game' });
        await start.waitFor();
        await page.waitForFunction(async () => (await import('/src/kaplayCtx.js')).k.getSceneName() === 'portal');
        if (await page.getByRole('link', { name: 'Portfolio' }).getAttribute('href') !==
            'https://d1h6dtn638poed.cloudfront.net/') {
            throw new Error('Portfolio link does not point to the portfolio root.');
        }
        const portfolioLink = page.getByRole('link', { name: 'Portfolio' });
        if (await portfolioLink.getAttribute('target') !== '_blank' ||
            !(await portfolioLink.getAttribute('rel'))?.split(/\s+/).includes('noopener')) {
            throw new Error('Portfolio link does not open safely in a new tab.');
        }
        if (await page.evaluate(async () => (await import('/src/kaplayCtx.js')).k.get('player').length) !== 0) {
            throw new Error('Gameplay objects were created before Start Game.');
        }

        await start.click();
        await page.waitForFunction(async () => (await import('/src/kaplayCtx.js')).k.get('player').length === 1);
        const before = await page.evaluate(async () => {
            const { k } = await import('/src/kaplayCtx.js');
            const player = k.get('player')[0];
            player.pos = k.vec2(-1000, -1000);
            return { id: player.id, x: player.pos.x, y: player.pos.y };
        });

        await page.keyboard.press('Escape');
        await page.getByRole('button', { name: 'Continue' }).waitFor();
        if (!await page.locator('#game-controls').isHidden()) {
            throw new Error('Movement controls are visible over the pause menu.');
        }
        const paused = await page.evaluate(async () => {
            const { k } = await import('/src/kaplayCtx.js');
            return { scene: k.getSceneName(), paused: k.debug.paused, id: k.get('player')[0].id };
        });
        if (paused.scene !== 'main' || !paused.paused || paused.id !== before.id) {
            throw new Error('Pause recreated or failed to stop the game.');
        }

        await page.getByRole('button', { name: 'Continue' }).click();
        const resumed = await page.evaluate(async () => {
            const { k } = await import('/src/kaplayCtx.js');
            const player = k.get('player')[0];
            return { paused: k.debug.paused, id: player.id, x: player.pos.x, y: player.pos.y };
        });
        if (resumed.paused || resumed.id !== before.id || resumed.x !== before.x || resumed.y !== before.y) {
            throw new Error('Continue did not resume the same player position.');
        }

        await page.getByRole('button', { name: 'Pause game' }).click();
        await page.getByRole('button', { name: 'Continue' }).waitFor();
        await page.setViewportSize({ width: 390, height: 844 });
        const card = await page.locator('.portal-card').boundingBox();
        if (!card || card.x < 0 || card.x + card.width > 390) {
            throw new Error('Pause menu does not fit the mobile viewport.');
        }
        await page.getByRole('button', { name: 'Continue' }).click();
        const pauseButton = await page.getByRole('button', { name: 'Pause game' }).boundingBox();
        const upButton = await page.getByRole('button', { name: 'Move up' }).boundingBox();
        if (!pauseButton || !upButton || pauseButton.y + pauseButton.height > upButton.y) {
            throw new Error('Pause button is not above the direction buttons.');
        }
        if (errors.length) throw new Error(`Browser errors: ${errors.join('; ')}`);
        return 'Portal, pause, resume, portfolio link, and mobile controls passed.';
    } finally {
        if (originalViewport) await page.setViewportSize(originalViewport);
    }
}
