# Audio

Worship audio is served locally from this folder. **Only host audio you have the
right to use.** Do not download or redistribute copyrighted songs from YouTube,
Spotify, or similar services.

## Structure

```
public/audio/worship/en/<file>.mp3   # English worship
public/audio/worship/id/<file>.mp3   # Indonesian worship
```

## The files shipped here

The four `.mp3` files included are **original, royalty-free ambient pads**
generated for this project as gentle placeholders. They are not worship songs.
Replace them with properly licensed music when you go live.

## Adding or changing tracks

1. Drop your licensed `.mp3` file into the matching language folder.
2. Register it in `lib/content/worship.ts` with a `title`, `artist`, `lang`, and
   `src` (e.g. `/audio/worship/en/my-song.mp3`).

If a file is missing at runtime, the player degrades gracefully and invites the
user to worship in their own way — the journey never breaks.
