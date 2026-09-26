# Folder structure

- `src` - source code for your kaplay project
- `dist` - distribution folder, contains your index.html, built js bundle and static assets


## Development

```sh
$ npm run dev
```

will start a dev server at http://localhost:3001 (or the next free port printed by Vite).

Use the arrow keys to move. Mouse/touch movement is not implemented yet.

## Map and camera

`public/map.json` contains positions and collision walls exported from Tiled.
`public/map.png` is the artwork image. Its Tiled layer is named `artwork`.
The player spawns at the point in the `player` layer. The tutorial's
`spawnpoints` layer with an object named `player` is also supported.

There are three separate settings:

- `MAP_SCALE` in `src/constants.js` converts all map positions and wall sizes
  to game units. At `0.25`, a Tiled coordinate of 1000 becomes 250 game units.
  Layer offsets are included before multiplying.
- `PLAYER_SCALE` enlarges the small character sprite. Change this to adjust
  the character's size relative to the map; it does not change the spawn point.
- `fitMapToScreen()` in `src/main.js` centers the camera on the artwork and
  sets zoom to `Math.min(windowWidth / mapWidth, windowHeight / mapHeight)`.
  This fits the whole image, preserves its shape, and updates on resize.
  Empty space around the image is expected when the aspect ratios differ.

The image is 4080 × 3072 pixels, so at `MAP_SCALE = 0.25` the game map is
1020 × 768 units. In a 1280 × 720 window, the camera zoom is
`Math.min(1280 / 1020, 720 / 768) = 0.9375`.

## Walls and objects in Tiled

The loader creates solid collision rectangles from the `boundaries` and `stuff`
layers (these names must match exactly). These rectangles appear in KAPLAY's
debug inspector; they do not draw new artwork during normal play.

Walls can stay unnamed; Tiled assigns their numeric IDs automatically. KAPLAY's
own object IDs are separate. Width and height must both be greater than zero.
Invalid rectangles are skipped with a warning in the browser console.

Boundary 13 uses width 1, or 0.25 game units at `MAP_SCALE = 0.25`.

Named objects trigger dialogue when their names match keys in `dialogueData`
in `src/constants.js`. The exported name `window` was corrected from `wiondow`;
make the same correction in Tiled before exporting again. `nova` has no
dialogue until you add an entry for it.

The resume, GitHub, contact, and photo album links are waiting for URLs. When
they exist, add HTML links to the corresponding dialogue strings. To show an
image, put it in `public/` and add a tag such as
`<img src="/photos/my-picture.jpg" alt="Description">` to the string.

The loader currently uses rectangular bounds for all these objects, including
the capsule-shaped `nova`. Exact capsule collision is not implemented.

## Regression check

`tests/map-framing.js` checks player spawning, map centering, full-map visibility
at desktop and narrow sizes, collision offsets, both collision layers, and
positive collider dimensions using Playwright CLI.
It runs against the Vite development server.

Ready-to-paste OpenCode prompt:

```text
In this project, start npm run dev and use the local URL Vite prints.
Use playwright-cli to open that URL, then run:
playwright-cli run-code --filename=tests/map-framing.js
Report any failed checks and browser errors. Do not change files.
```

## Distribution

```sh
$ npm run build
```

will build your js files into `dist/`

```sh
$ npm run zip
```

will build your game and package into a .zip file, you can upload to your server or itch.io / newground etc.
