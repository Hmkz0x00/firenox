# FIRENOX 3D hero trial

The hero now uses a real Three.js mesh assembled from the supplied product
reference. This is a visual approximation, not a scan or dimensioned CAD model.

`lib/firenox-bottle-model.ts` builds the rounded canister, separate wrap label,
base rim, collar, trigger housing, red latch, finger opening, yellow safety
paddle and ring, and chain links. The label is typeset to a canvas texture for
sharp branding and includes the existing flame mark. The reverse print is a
simplified recreation of the supplied product artwork.

`components/product-bottle.tsx` loads Three.js only in the browser. It uses the
installed OrbitControls and RoomEnvironment, with no remote model, HDRI, API,
or paid service. No additional plugin or package was required.

One automatic revolution takes three minutes. The bottle stays upright and
does not float. Dragging pauses autoplay until release. There are no visible
viewer buttons. Keyboard left/right arrows rotate the focused canvas; Home
restores the front view; Space pauses or resumes. Reduced motion starts paused.
The wrap uses red FIRE and white NOX lettering, a two-line FIGHTS ALL / CLASS
OF FIRE caption, large printed red flames, and a red footer with Lucide badges.

The camera fits the complete silhouette to the available width and height.
Rendering pauses offscreen and in background tabs.

## Loading strategy (performance)

Three.js plus the environment/shader warm-up costs several seconds of main-thread
time on mid-range phones, so the viewer is not started during page load:

- `public/images/firenox-bottle.webp` is a static render of this exact model,
  captured from the WebGL canvas at 2x with the same camera framing. It is shown
  immediately (preloaded via `next/image`) and is the hero's visual on first paint.
- Fine-pointer devices (desktop) upgrade to the live 3D viewer on the first sign of
  intent: pointer move, key press, wheel or scroll. The canvas fades in over the
  render, so the hand-off is invisible.
- Touch and data-saver visitors get a "Rotate in 3D" button; the viewer loads only
  when they ask for it.
- If WebGL fails, the static render simply stays in place.

If the model in `lib/firenox-bottle-model.ts` changes, re-capture the poster so the
hand-off stays seamless: load the page at 1440x900 with deviceScaleFactor 2, focus
the canvas, press Home, then save `canvas.toDataURL()` and crop it horizontally
(symmetrically around the centre) to the bottle's bounds.
