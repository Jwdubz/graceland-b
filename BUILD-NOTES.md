# Graceland Wedding Chapel — Basic concept

Blue Pole. A paper sheet, their film beside it, and a sign-blue rule between the two. Words stay on the paper. Faces stay in the picture.

Preview was `python3 -m http.server` on 127.0.0.1:8766, then stopped. Nothing was deployed, pushed, or emailed.

## What is on the page

Desktop is a locked aisle on the left and the name on the right. The film is their YouTube cut `yt-3lTbCmSgxTA`, trimmed so the loop opens on the bride at the door (the source fades up from black for about a second; the web file starts at source 1.0s and runs 32.032s). Encoded with `tools/encode.sh` at 1920, poster with `tools/posters.sh`. No color filter, no scrim, no blur.

“Chapel” is the held word. It rises when the couple takes hands (encoded 27.95s, about a quarter second after the join) and stays when the loop returns to the door. Pause reveals it immediately and the button becomes Play. Checked in Chromium: hidden at 25.25s, visible at 28.19s, still visible after the restart at 0s.

Phone keeps the same landscape film at 70vw so the groom, Elvis, and the bride all stay in frame. A taller phone crop cuts the groom off the left. The name sits on the paper directly under a horizontal blue rule.

The rest of the page, in order:

1. Full-length aisle walk (`trad-cer.jpg`), no heading on the faces.
2. “Presents A Storybook Chapel” and the front of the building, pole 619 in the photo.
3. “Chapel Entrance” and the pink car. The words are the blue sign on that building.
4. “Just Married by the King” — the celebration still beside the portrait film `yt-Gvd0yBjwy6M` (25.73s, 1080×1920). That film plays only while it is on screen.
5. One bouquet at its real size, 320px: “12 Rose Hand Tied Bouquet” and $125.
6. The night sign, then Call and Back To Top.

Call is `tel:{{PHONE}}` in the header and at the end. Back To Top uses Lenis, 1.85s, cubic-bezier(0.70, 0, 0.30, 1).

Type is self-hosted Fraunces (display) and Outfit (UI), `font-display: swap`. Desktop h1 computed 80.64px, letter-spacing −1.6128px, line-height 77.4px. Phone h1 computed 54.6px. Both faces reported loaded. `og.jpg` is 1200×630: paper, their logo, the blue rule, and the hand-join. `noindex` is still on.

## Copy, and what was left off

Only lines that are on their assets:

- Graceland Wedding Chapel, and Las Vegas, from their logo.
- 619 from the pole in the front and night photos. The street name is not in the assets, so it is not on the page.
- “Presents A Storybook Chapel” from the roadside sign.
- “Chapel Entrance” from the sign on the building.
- “Just Married by the King” from the shirt photograph’s filename.

`<!-- VERIFY -->` is on $125. That number is the filename `12-Rose-Hand-Tied-Bouquet-125.webp`. It is not printed on the bouquet photo.

`photos/hires/logo.svg` and `logo2.svg` are not logos. They are a saved 404 page. A phone number and a “world’s first” line live in that HTML. Neither is on this site. The logo on the page is `logo-sharp.png`.

Also unused: the Storybook folder (a different room), the historical stills, the annotated parking map, broadcast and film-burn clips, and the lyrics painted on the pink car.

## What was checked

Playwright Chromium only. Desktop 1440×900. Phone 390×844 at device scale 2. Shots are in `_shots/`.

- No console errors. No horizontal overflow.
- After a full scroll, no split line stayed hidden.
- Pause is 77×44. Call and Back To Top are at least 44px tall and do not sit under Pause.
- The celebration photo on the phone is the full frame (shown ratio matches 1600×1067). Heads are in the picture.

This is not an iPhone or Android certification. WebKit and a real device were not used. `tools/qa_sweep.py` only opens `https://{site}.jarrettwroten.com/`, so it was not run against this folder.

Odyssée (odysseeclinic.com.au, Site of the Day 2026-10-08) is the named reference: words at the edge, the picture in the center. Its computed type, color, and easing were not measured. Blue Pole is our page, not a copy of theirs.

## For Jarrett’s taste

- Phone first screen: the wide film is short on purpose, so a large paper field sits under “619, Las Vegas” until Pause. A tighter film would crop the groom.
- The blue rule is 12px on the phone and 14px on desktop, sampled from the pole in their front photo (`#027ac8`). Paper is `#f3ece4`. Ink is `#07144a`.
- “Chapel” waits the whole walk down the aisle. If that hold is too long, the time is `PAYOFF_AT` in `site.js`.
- The night photo is 500×500 and soft, so it stays at 28rem.
- The bouquet sits in its own white square on the warm paper. It is not scaled up.
- One bouquet, not the floral price list. Storybook interiors are not in the page.
- The right-hand sheet is there because the groom stands on the left of the aisle film.
