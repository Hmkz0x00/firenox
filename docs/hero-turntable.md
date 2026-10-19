# Photographic hero trial

The hero uses a generated photographic sprite sheet, not a Three.js model.
Twelve views blend forward and back over 100 seconds. This is a subtle partial
turn, not an authenticated full 360-degree product capture. Additional real
product photographs would be needed for a faithful full rotation.

Asset: `public/firenox-turntable-sheet-v1.png` (1536 x 1024, six columns, two rows).
Generated with the built-in image-generation tool using the user's paired
FIRENOX product reference, specifically the bottle with the vertical wordmark.

Generation prompt:

> Create a photographic turntable sprite sheet using the right-hand bottle in
> the reference as the product identity. Exactly six columns and two rows with
> twelve full bottles, one per equal cell, on pure black. Keep the same scale,
> lighting, top and bottom baselines; show the complete yellow safety handle
> and base. Glossy black canister, black trigger head, red lever, vertical
> FIRENOX wordmark with FIRE white and NOX red, Fire Spray, Fights All class of
> fires, and the small flame logo at the bottom. Consecutive yaw angles from
> -27.5 to +27.5 degrees in five-degree steps. Fixed camera, no watermark,
> ground reflection, fire or water backdrop, borders, or text outside the label.

The browser registers silhouettes to a shared height and baseline, then blends
adjacent frames. This keeps the product fixed vertically. Native buttons pause,
play, and step through the views. Autoplay stops for reduced motion and pauses
when the product is outside the viewport or the document is hidden.

The previous video component and assets remain available for reverting the trial.
