import type { Scripture } from "./types";

// English text is the World English Bible (WEB), which is in the public domain,
// so it is licensing-safe to host and display verbatim. Scripture is never modified.
// Indonesian verse text is intentionally omitted (null) rather than shipping an
// unofficial translation; the Scripture view handles this gracefully and offers a
// link to read the passage in an Indonesian translation elsewhere.
//
// To change the Scripture source, replace the entries below (or swap in a provider
// in lib/content/index.ts). The rest of the app depends only on this shape.

const WEB = { en: "World English Bible", id: "World English Bible" };

export const scriptures: Scripture[] = [
  {
    id: "ps100",
    themes: ["praise"],
    reference: { en: "Psalm 100:1-5", id: "Mazmur 100:1-5" },
    book: "Psalm",
    chapter: 100,
    translation: WEB,
    verses: {
      en: [
        { v: 1, t: "Shout for joy to Yahweh, all you lands!" },
        { v: 2, t: "Serve Yahweh with gladness. Come before his presence with singing." },
        { v: 3, t: "Know that Yahweh, he is God. It is he who has made us, and we are his. We are his people, and the sheep of his pasture." },
        { v: 4, t: "Enter into his gates with thanksgiving, and into his courts with praise. Give thanks to him, and bless his name." },
        { v: 5, t: "For Yahweh is good. His loving kindness endures forever, his faithfulness to all generations." },
      ],
      id: null,
    },
  },
  {
    id: "ps103",
    themes: ["praise"],
    reference: { en: "Psalm 103:1-5", id: "Mazmur 103:1-5" },
    book: "Psalm",
    chapter: 103,
    translation: WEB,
    verses: {
      en: [
        { v: 1, t: "Praise Yahweh, my soul! All that is within me, praise his holy name!" },
        { v: 2, t: "Praise Yahweh, my soul, and don't forget all his benefits," },
        { v: 3, t: "who forgives all your sins, who heals all your diseases," },
        { v: 4, t: "who redeems your life from destruction, who crowns you with loving kindness and tender mercies," },
        { v: 5, t: "who satisfies your desire with good things, so that your youth is renewed like the eagle's." },
      ],
      id: null,
    },
  },
  {
    id: "th5",
    themes: ["praise", "intercession"],
    reference: { en: "1 Thessalonians 5:16-18", id: "1 Tesalonika 5:16-18" },
    book: "1 Thessalonians",
    chapter: 5,
    translation: WEB,
    verses: {
      en: [
        { v: 16, t: "Always rejoice." },
        { v: 17, t: "Pray without ceasing." },
        { v: 18, t: "In everything give thanks, for this is the will of God in Christ Jesus toward you." },
      ],
      id: null,
    },
  },
  {
    id: "ps63",
    themes: ["praise", "with-god"],
    reference: { en: "Psalm 63:1-4", id: "Mazmur 63:1-4" },
    book: "Psalm",
    chapter: 63,
    translation: WEB,
    verses: {
      en: [
        { v: 1, t: "God, you are my God. I will earnestly seek you. My soul thirsts for you. My flesh longs for you, in a dry and weary land, where there is no water." },
        { v: 2, t: "So I have seen you in the sanctuary, watching your power and your glory." },
        { v: 3, t: "Because your loving kindness is better than life, my lips shall praise you." },
        { v: 4, t: "So I will bless you while I live. I will lift up my hands in your name." },
      ],
      id: null,
    },
  },
  {
    id: "ps46",
    themes: ["peace", "unsure"],
    reference: { en: "Psalm 46:1-3, 10", id: "Mazmur 46:1-3, 10" },
    book: "Psalm",
    chapter: 46,
    translation: WEB,
    verses: {
      en: [
        { v: 1, t: "God is our refuge and strength, a very present help in trouble." },
        { v: 2, t: "Therefore we won't be afraid, though the earth changes, though the mountains are shaken into the heart of the seas;" },
        { v: 3, t: "though its waters roar and are troubled, though the mountains tremble with their swelling. Selah." },
        { v: 10, t: "\u201cBe still, and know that I am God. I will be exalted among the nations. I will be exalted in the earth.\u201d" },
      ],
      id: null,
    },
  },
  {
    id: "php4",
    themes: ["peace", "intercession"],
    reference: { en: "Philippians 4:6-7", id: "Filipi 4:6-7" },
    book: "Philippians",
    chapter: 4,
    translation: WEB,
    verses: {
      en: [
        { v: 6, t: "In nothing be anxious, but in everything, by prayer and petition with thanksgiving, let your requests be made known to God." },
        { v: 7, t: "And the peace of God, which surpasses all understanding, will guard your hearts and your thoughts in Christ Jesus." },
      ],
      id: null,
    },
  },
  {
    id: "mt11",
    themes: ["peace", "unsure"],
    reference: { en: "Matthew 11:28-30", id: "Matius 11:28-30" },
    book: "Matthew",
    chapter: 11,
    translation: WEB,
    verses: {
      en: [
        { v: 28, t: "\u201cCome to me, all you who labor and are heavily burdened, and I will give you rest." },
        { v: 29, t: "Take my yoke upon you and learn from me, for I am gentle and humble in heart; and you will find rest for your souls." },
        { v: 30, t: "For my yoke is easy, and my burden is light.\u201d" },
      ],
      id: null,
    },
  },
  {
    id: "ps23",
    themes: ["peace", "reflect", "with-god", "unsure"],
    reference: { en: "Psalm 23:1-6", id: "Mazmur 23:1-6" },
    book: "Psalm",
    chapter: 23,
    translation: WEB,
    verses: {
      en: [
        { v: 1, t: "Yahweh is my shepherd; I shall lack nothing." },
        { v: 2, t: "He makes me lie down in green pastures. He leads me beside still waters." },
        { v: 3, t: "He restores my soul. He guides me in the paths of righteousness for his name's sake." },
        { v: 4, t: "Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me. Your rod and your staff, they comfort me." },
        { v: 5, t: "You prepare a table before me in the presence of my enemies. You anoint my head with oil. My cup runs over." },
        { v: 6, t: "Surely goodness and loving kindness shall follow me all the days of my life, and I will dwell in Yahweh's house forever." },
      ],
      id: null,
    },
  },
  {
    id: "ps121",
    themes: ["intercession", "guidance"],
    reference: { en: "Psalm 121:1-4", id: "Mazmur 121:1-4" },
    book: "Psalm",
    chapter: 121,
    translation: WEB,
    verses: {
      en: [
        { v: 1, t: "I will lift up my eyes to the hills. Where does my help come from?" },
        { v: 2, t: "My help comes from Yahweh, who made heaven and earth." },
        { v: 3, t: "He will not allow your foot to be moved. He who keeps you will not slumber." },
        { v: 4, t: "Behold, he who keeps Israel will neither slumber nor sleep." },
      ],
      id: null,
    },
  },
  {
    id: "pr3",
    themes: ["guidance"],
    reference: { en: "Proverbs 3:5-6", id: "Amsal 3:5-6" },
    book: "Proverbs",
    chapter: 3,
    translation: WEB,
    verses: {
      en: [
        { v: 5, t: "Trust in Yahweh with all your heart, and don't lean on your own understanding." },
        { v: 6, t: "In all your ways acknowledge him, and he will make your paths straight." },
      ],
      id: null,
    },
  },
  {
    id: "is40",
    themes: ["guidance"],
    reference: { en: "Isaiah 40:31", id: "Yesaya 40:31" },
    book: "Isaiah",
    chapter: 40,
    translation: WEB,
    verses: {
      en: [
        { v: 31, t: "but those who wait for Yahweh will renew their strength. They will mount up with wings like eagles. They will run, and not be weary. They will walk, and not faint." },
      ],
      id: null,
    },
  },
  {
    id: "jn15",
    themes: ["guidance", "reflect", "with-god"],
    reference: { en: "John 15:4-5", id: "Yohanes 15:4-5" },
    book: "John",
    chapter: 15,
    translation: WEB,
    verses: {
      en: [
        { v: 4, t: "Remain in me, and I in you. As the branch can't bear fruit by itself unless it remains in the vine, so neither can you, unless you remain in me." },
        { v: 5, t: "I am the vine. You are the branches. He who remains in me and I in him bears much fruit, for apart from me you can do nothing." },
      ],
      id: null,
    },
  },
  {
    id: "ps139",
    themes: ["reflect", "with-god"],
    reference: { en: "Psalm 139:1-4", id: "Mazmur 139:1-4" },
    book: "Psalm",
    chapter: 139,
    translation: WEB,
    verses: {
      en: [
        { v: 1, t: "Yahweh, you have searched me, and you know me." },
        { v: 2, t: "You know my sitting down and my rising up. You perceive my thoughts from afar." },
        { v: 3, t: "You search out my path and my lying down, and are acquainted with all my ways." },
        { v: 4, t: "For there is not a word on my tongue, but behold, Yahweh, you know it altogether." },
      ],
      id: null,
    },
  },
  {
    id: "lam3",
    themes: ["reflect", "unsure"],
    reference: { en: "Lamentations 3:22-23", id: "Ratapan 3:22-23" },
    book: "Lamentations",
    chapter: 3,
    translation: WEB,
    verses: {
      en: [
        { v: 22, t: "It is because of Yahweh's loving kindnesses that we are not consumed, because his compassion doesn't fail." },
        { v: 23, t: "They are new every morning. Great is your faithfulness." },
      ],
      id: null,
    },
  },
];

export const scriptureById = (id: string): Scripture | undefined =>
  scriptures.find((s) => s.id === id);
