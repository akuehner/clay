var _iconTimer = null;
var _iconTimerScoped = null;

// refreshIcons() — no scope: deferred full-document icon scan (one per frame)
// refreshIcons(el) — scoped: immediate scan limited to el subtree, skipped if
//   a full scan is already queued (the full scan will cover it anyway).
export function refreshIcons(scope) {
  if (scope) {
    // If a full-document refresh is already pending, it will handle this scope.
    if (_iconTimer) return;
    if (_iconTimerScoped) {
      // Already have a scoped pending — upgrade to full scan so both are covered.
      cancelAnimationFrame(_iconTimerScoped);
      _iconTimerScoped = null;
      _iconTimer = requestAnimationFrame(function () {
        _iconTimer = null;
        lucide.createIcons();
      });
      return;
    }
    _iconTimerScoped = requestAnimationFrame(function () {
      _iconTimerScoped = null;
      // lucide.createIcons accepts { nodes } to limit scope
      lucide.createIcons({ nodes: [scope] });
    });
    return;
  }
  // Full-document scan — cancel any pending scoped scan (redundant)
  if (_iconTimerScoped) { cancelAnimationFrame(_iconTimerScoped); _iconTimerScoped = null; }
  if (_iconTimer) return;
  _iconTimer = requestAnimationFrame(function () {
    _iconTimer = null;
    lucide.createIcons();
  });
}

export function iconHtml(name, wrapperClass) {
  if (wrapperClass) {
    return '<span class="' + wrapperClass + '"><i data-lucide="' + name + '"></i></span>';
  }
  return '<i data-lucide="' + name + '"></i>';
}

export var thinkingVerbs = [
  "Accomplishing", "Actioning", "Actualizing", "Architecting", "Baking", "Beaming",
  "Beboppin'", "Befuddling", "Billowing", "Blanching", "Bloviating", "Boogieing",
  "Boondoggling", "Booping", "Bootstrapping", "Brewing", "Burrowing", "Calculating",
  "Canoodling", "Caramelizing", "Cascading", "Catapulting", "Cerebrating", "Channeling",
  "Channelling", "Choreographing", "Churning", "Clauding", "Coalescing", "Cogitating",
  "Combobulating", "Composing", "Computing", "Concocting", "Considering", "Contemplating",
  "Cooking", "Crafting", "Creating", "Crunching", "Crystallizing", "Cultivating",
  "Deciphering", "Deliberating", "Determining", "Dilly-dallying", "Discombobulating",
  "Doing", "Doodling", "Drizzling", "Ebbing", "Effecting", "Elucidating", "Embellishing",
  "Enchanting", "Envisioning", "Evaporating", "Fermenting", "Fiddle-faddling", "Finagling",
  "Flambing", "Flibbertigibbeting", "Flowing", "Flummoxing", "Fluttering", "Forging",
  "Forming", "Frolicking", "Frosting", "Gallivanting", "Galloping", "Garnishing",
  "Generating", "Germinating", "Gitifying", "Grooving", "Gusting", "Harmonizing",
  "Hashing", "Hatching", "Herding", "Honking", "Hullaballooing", "Hyperspacing",
  "Ideating", "Imagining", "Improvising", "Incubating", "Inferring", "Infusing",
  "Ionizing", "Jitterbugging", "Julienning", "Kneading", "Leavening", "Levitating",
  "Lollygagging", "Manifesting", "Marinating", "Meandering", "Metamorphosing", "Misting",
  "Moonwalking", "Moseying", "Mulling", "Mustering", "Musing", "Nebulizing", "Nesting",
  "Newspapering", "Noodling", "Nucleating", "Orbiting", "Orchestrating", "Osmosing",
  "Perambulating", "Percolating", "Perusing", "Philosophising", "Photosynthesizing",
  "Pollinating", "Pondering", "Pontificating", "Pouncing", "Precipitating",
  "Prestidigitating", "Processing", "Proofing", "Propagating", "Puttering", "Puzzling",
  "Quantumizing", "Razzle-dazzling", "Razzmatazzing", "Recombobulating", "Reticulating",
  "Roosting", "Ruminating", "Sauting", "Scampering", "Schlepping", "Scurrying", "Seasoning",
  "Shenaniganing", "Shimmying", "Simmering", "Skedaddling", "Sketching", "Slithering",
  "Smooshing", "Sock-hopping", "Spelunking", "Spinning", "Sprouting", "Stewing",
  "Sublimating", "Swirling", "Swooping", "Symbioting", "Synthesizing", "Tempering",
  "Thinking", "Thundering", "Tinkering", "Tomfoolering", "Topsy-turvying", "Transfiguring",
  "Transmuting", "Twisting", "Undulating", "Unfurling", "Unravelling", "Vibing", "Waddling",
  "Wandering", "Warping", "Whatchamacalliting", "Whirlpooling", "Whirring", "Whisking",
  "Wibbling", "Working", "Wrangling", "Zesting", "Zigzagging"
];

export function randomThinkingVerb() {
  return thinkingVerbs[Math.floor(Math.random() * thinkingVerbs.length)];
}
