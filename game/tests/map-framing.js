// Run against the Vite dev server with:
// playwright-cli open http://localhost:3001
// playwright-cli run-code --filename=tests/map-framing.js
async (page) => {
    const originalViewport = page.viewportSize();
    try {
        await page.reload();
        await page.getByRole('button', { name: 'Start Game' }).click();
        await page.waitForFunction(async () => {
            const { k } = await import('/src/kaplayCtx.js');
            return k.get('player').length === 1;
        });
        for (const viewport of [
            { width: 1280, height: 720 },
            { width: 390, height: 844 },
        ]) {
            await page.setViewportSize(viewport);
            await page.waitForFunction(async ({ width, height }) => {
                const { k } = await import('/src/kaplayCtx.js');
                return k.width() === width && k.height() === height;
            }, viewport);
            await page.evaluate(async () => {
                const { k } = await import('/src/kaplayCtx.js');
                const { MAP_SCALE } = await import('/src/constants.js');
                const mapData = await (await fetch('/map.json')).json();
                const player = k.get('player')[0];
                const spawn = mapData.layers.find(layer => layer.name === 'player').objects[0];
                if (Math.abs(player.pos.x - spawn.x * MAP_SCALE) > 0.01 ||
                    Math.abs(player.pos.y - spawn.y * MAP_SCALE) > 0.01) {
                    throw new Error('Player is not at the Tiled spawn point.');
                }
                const map = k.get('map')[0];
                const topLeft = k.toScreen(map.pos);
                const bottomRight = k.toScreen(map.pos.add(
                    k.vec2(map.width * map.scale.x, map.height * map.scale.y),
                ));
                if (topLeft.x < -1 || topLeft.y < -1 ||
                    bottomRight.x > k.width() + 1 || bottomRight.y > k.height() + 1) {
                    throw new Error('The camera crops the map.');
                }
                if (Math.abs((topLeft.x + bottomRight.x) / 2 - k.width() / 2) > 1 ||
                    Math.abs((topLeft.y + bottomRight.y) / 2 - k.height() / 2) > 1) {
                    throw new Error('The map is not centered.');
                }
                const wallLayer = mapData.layers.find(layer => layer.name === 'boundaries');
                const walls = k.get('boundary');
                if (walls.length !== wallLayer.objects.length) {
                    throw new Error('Missing collision walls.');
                }
                walls.forEach((wall, index) => {
                    const source = wallLayer.objects[index];
                    if (Math.abs(wall.pos.x - (source.x + (wallLayer.offsetx ?? 0)) * MAP_SCALE) > 0.01 ||
                        Math.abs(wall.pos.y - (source.y + (wallLayer.offsety ?? 0)) * MAP_SCALE) > 0.01) {
                        throw new Error('A collision wall ignores the Tiled layer offset.');
                    }
                });
                for (const layer of mapData.layers.filter(layer =>
                    layer.name === 'boundaries' || layer.name === 'stuff')) {
                    const colliders = k.get(layer.name === 'boundaries' ? 'boundary' : 'stuff');
                    if (colliders.length !== layer.objects.length) {
                        throw new Error(`Missing or duplicated colliders in ${layer.name}.`);
                    }
                    for (const [index, object] of layer.objects.entries()) {
                        if (object.width <= 0 || object.height <= 0) {
                            throw new Error(`Tiled object ${object.id} has no collision thickness.`);
                        }
                        const collider = colliders[index];
                        const box = collider.worldArea().bbox();
                        if (Math.abs(box.width - object.width * MAP_SCALE) > 0.01 ||
                            Math.abs(box.height - object.height * MAP_SCALE) > 0.01 ||
                            Math.abs(box.pos.x - (object.x + (layer.offsetx ?? 0)) * MAP_SCALE) > 0.01 ||
                            Math.abs(box.pos.y - (object.y + (layer.offsety ?? 0)) * MAP_SCALE) > 0.01) {
                            throw new Error(`Tiled object ${object.id} has incorrect collision bounds.`);
                        }
                        if (!collider.tags.includes(layer.name === 'boundaries' ? 'boundary' : 'stuff')) {
                            throw new Error(`Tiled object ${object.id} has the wrong layer tag.`);
                        }
                    }
                }
            });
        }
    } finally {
        if (originalViewport) await page.setViewportSize(originalViewport);
    }
}
