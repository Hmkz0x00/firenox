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
Rendering pauses offscreen and in background tabs. A photographic poster is
used while loading or when WebGL is unavailable. Controls remain disabled
until the model is ready.

To return to the photographic trial, switch the hero import and product
element back to `ProductTurntable` from `components/product-turntable.tsx`.
The photographic sheet and earlier video assets have been preserved.
