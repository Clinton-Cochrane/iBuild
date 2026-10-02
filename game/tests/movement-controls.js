// playwright-cli run-code --filename=tests/movement-controls.js
async (page) => {
    const directions = [
        { name: 'up', key: 'w', arrow: 'ArrowUp', x: 0, y: -1 },
        { name: 'down', key: 's', arrow: 'ArrowDown', x: 0, y: 1 },
        { name: 'left', key: 'a', arrow: 'ArrowLeft', x: -1, y: 0 },
        { name: 'right', key: 'd', arrow: 'ArrowRight', x: 1, y: 0 },
    ];
    const originalViewport = page.viewportSize();
    const resetPlayer = () => page.evaluate(async () => {
        const { k } = await import('/src/kaplayCtx.js');
        // Move outside the map so walls and object dialogue cannot affect inputs.
        k.get('player')[0].pos = k.vec2(-1000, -1000);
    });
    const checkMovement = async ({ x, y }) => {
        await page.waitForFunction(async ({ x, y }) => {
            const { k } = await import('/src/kaplayCtx.js');
            const player = k.get('player')[0];
            return player.dir.x === x && player.dir.y === y &&
                (x === 0 || (player.pos.x + 1000) * x > 2) &&
                (y === 0 || (player.pos.y + 1000) * y > 2);
        }, { x, y });
    };
    const checkStopped = () => page.waitForFunction(async () => {
        const { k } = await import('/src/kaplayCtx.js');
        const player = k.get('player')[0];
        return player.dir.x === 0 && player.dir.y === 0;
    });

    try {
        await page.reload();
        await page.getByRole('button', { name: 'Start Game' }).click();
        await page.waitForFunction(async () => {
            const { k } = await import('/src/kaplayCtx.js');
            return k.get('player').length === 1;
        });
        for (const direction of directions) {
            for (const key of [direction.key, direction.arrow]) {
                await resetPlayer();
                await page.keyboard.down(key);
                await checkMovement(direction);
                await page.keyboard.up(key);
                await checkStopped();
            }
            await resetPlayer();
            const button = page.getByRole('button', { name: `Move ${direction.name}`, exact: true });
            await button.hover();
            await page.mouse.down();
            await checkMovement(direction);
            // Pointer capture must still release when the cursor leaves the pad.
            await page.mouse.move(5, 5);
            await page.mouse.up();
            await checkStopped();
        }

        await resetPlayer();
        await page.keyboard.down('w');
        await page.keyboard.down('d');
        await checkMovement({ x: 1, y: -1 });
        await page.keyboard.up('w');
        await page.keyboard.up('d');
        await checkStopped();

        await resetPlayer();
        await page.getByRole('button', { name: 'Move up', exact: true }).focus();
        await page.keyboard.down('Space');
        await checkMovement(directions[0]);
        await page.keyboard.up('Space');
        await checkStopped();

        await page.evaluate(async () => {
            const { k } = await import('/src/kaplayCtx.js');
            k.get('player')[0].isInDialogue = true;
        });
        await resetPlayer();
        await page.keyboard.down('d');
        await page.getByRole('button', { name: 'Move right', exact: true }).hover();
        await page.mouse.down();
        await page.waitForTimeout(100);
        await checkStopped();
        await page.evaluate(async () => {
            const { k } = await import('/src/kaplayCtx.js');
            const player = k.get('player')[0];
            if (player.pos.x !== -1000 || player.pos.y !== -1000) {
                throw new Error('Movement did not pause during dialogue.');
            }
        });
        await page.keyboard.up('d');
        await page.mouse.up();
        await page.evaluate(async () => {
            const { k } = await import('/src/kaplayCtx.js');
            k.get('player')[0].isInDialogue = false;
        });

        await page.setViewportSize({ width: 390, height: 844 });
        for (const direction of directions) {
            const box = await page.getByRole('button', { name: `Move ${direction.name}`, exact: true }).boundingBox();
            if (!box || box.width < 44 || box.height < 44 || box.x < 0 || box.y < 0 ||
                box.x + box.width > 390 || box.y + box.height > 844) {
                throw new Error(`The ${direction.name} button does not fit the mobile viewport.`);
            }
        }

        // Real touch events exercise hold, multi-touch diagonals, and release.
        const cdp = await page.context().newCDPSession(page);
        try {
            await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: true });
            const up = await page.getByRole('button', { name: 'Move up', exact: true }).boundingBox();
            const right = await page.getByRole('button', { name: 'Move right', exact: true }).boundingBox();
            const touches = [up, right].map((box, id) => ({
                x: box.x + box.width / 2, y: box.y + box.height / 2, id,
            }));
            await resetPlayer();
            await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [touches[0]] });
            await checkMovement(directions[0]);
            await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: touches });
            await checkMovement({ x: 1, y: -1 });
            await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [touches[0]] });
            await checkMovement(directions[0]);
            await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
            await checkStopped();
            await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [touches[0]] });
            await checkMovement(directions[0]);
            await cdp.send('Input.dispatchTouchEvent', { type: 'touchCancel', touchPoints: [] });
            await checkStopped();
        } finally {
            await cdp.send('Emulation.setTouchEmulationEnabled', { enabled: false });
            await cdp.detach();
        }
        return 'WASD, arrows, mouse, focused buttons, dialogue pause, mobile layout, and touch checks passed.';
    } finally {
        await page.keyboard.up('w');
        await page.keyboard.up('d');
        await page.keyboard.up('Space');
        await page.mouse.up();
        if (originalViewport) await page.setViewportSize(originalViewport);
        await page.reload();
    }
}
