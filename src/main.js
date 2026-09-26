import { dialogueData, MAP_SCALE, PLAYER_SCALE } from "./constants";
import { k } from "./kaplayCtx";
import { displayDialogue } from "./utils";
import { clearDirectionButtons, isDirectionButtonDown } from "./controls";

k.loadSprite("spritesheet", "./spritesheet.png", {
    sliceX: 39,
    sliceY: 31,
    anims: {
        "idle-down": 936,
        "walk-down": { from: 936, to: 939, loop: true, speed: 8 },
        "idle-side": 975,
        "walk-side": { from: 975, to: 978, loop: true, speed: 8 },
        "idle-up": 1014,
        "walk-up": { from: 1014, to: 1017, loop: true, speed: 8 },
    },
});

k.loadSprite("map", "map.png");
k.loadJSON("map-data", "./map.json");

k.setBackground(k.Color.CYAN);

k.scene("main", () => {
    const mapData = k.getAsset("map-data").data;
    const layers = mapData.layers;
    const artwork = layers.find(layer => layer.name === "artwork");
    const map = k.add([
        k.sprite("map"),
        // This PNG is the artwork image, whose origin is offset in Tiled.
        k.pos((artwork?.offsetx ?? 0) * MAP_SCALE, (artwork?.offsety ?? 0) * MAP_SCALE),
        k.scale(MAP_SCALE),
        "map",
    ]);

    // Support both this map's player layer and the tutorial's spawnpoints layer.
    const spawnLayer = layers.find(layer => layer.name === "player")
        ?? layers.find(layer => layer.name === "spawnpoints");
    const spawn = spawnLayer?.objects.find(entity => entity.name === "player")
        ?? (spawnLayer?.name === "player" ? spawnLayer.objects.find(entity => entity.point) : null);
    if (!spawn) throw new Error('Add a player point in a "player" or "spawnpoints" layer in Tiled.');

    const player = k.add([
        k.sprite("spritesheet", { anim: "idle-down" }),
        k.area({
            shape: new k.Rect(k.vec2(0, 3), 10, 10),
        }),
        k.body(),
        k.anchor("center"),
        k.pos(
            (spawn.x + (spawnLayer.offsetx ?? 0)) * MAP_SCALE,
            (spawn.y + (spawnLayer.offsety ?? 0)) * MAP_SCALE,
        ),
        k.scale(PLAYER_SCALE),
        k.z(1),
        {
            speed: 250,
            direction: "down",
            dir: k.vec2(0, 0),
            isInDialogue: false,
        },
        "player",
    ]);
    player.onUpdate(() => {
        player.dir.x = 0;
        player.dir.y = 0;
        if (player.isInDialogue) return;
        const isDown = (direction, key) => k.isKeyDown(direction)
            || k.isKeyDown(key) || isDirectionButtonDown(direction);
        if (isDown("left", "a")) player.dir.x = -1;
        if (isDown("right", "d")) player.dir.x = 1;
        if (isDown("up", "w")) player.dir.y = -1;
        if (isDown("down", "s")) player.dir.y = 1;

        player.move(player.dir.unit().scale(player.speed));
    });
    for (const layer of layers) {
        // Tiled layers are data; each collision layer must be loaded explicitly.
        if (layer.name !== "boundaries" && layer.name !== "stuff") continue;

        for (const object of layer.objects) {
            if (object.width <= 0 || object.height <= 0) {
                console.warn(`Skipping Tiled object ${object.id} in "${layer.name}": give it a positive width and height.`);
                continue;
            }

            k.add([
                k.area({
                    // Use rectangular bounds, including for the capsule-shaped nova.
                    shape: new k.Rect(k.vec2(0), object.width, object.height),
                }),
                k.body({ isStatic: true }),
                k.pos(
                    (object.x + (layer.offsetx ?? 0)) * MAP_SCALE,
                    (object.y + (layer.offsety ?? 0)) * MAP_SCALE,
                ),
                k.scale(MAP_SCALE),
                layer.name === "boundaries" ? "boundary" : "stuff",
                ...(object.name ? [object.name] : []),
            ]);

            if (dialogueData[object.name]) {
                player.onCollide(object.name, () => {
                    if (player.isInDialogue) return;
                    player.isInDialogue = true;
                    clearDirectionButtons();
                    displayDialogue(dialogueData[object.name], () => {
                        player.isInDialogue = false;
                    });
                });
            }
        }
    }

    function fitMapToScreen() {
        // sprite.width/height are source pixels; scale converts to world units.
        const mapWidth = map.width * MAP_SCALE;
        const mapHeight = map.height * MAP_SCALE;
        k.setCamPos(map.pos.x + mapWidth / 2, map.pos.y + mapHeight / 2);
        // The smaller ratio fits BOTH dimensions without stretching or cropping.
        k.setCamScale(Math.min(k.width() / mapWidth, k.height() / mapHeight));
    }

    fitMapToScreen();
    k.onResize(fitMapToScreen);
});
k.onLoad(() => k.go("main"));
