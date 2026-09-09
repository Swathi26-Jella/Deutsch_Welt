// DeutschWelt – frontend data + optional Supabase integration.
// Add your Supabase URL and anon key below to load database content.

const SUPABASE_URL = "";
const SUPABASE_ANON_KEY = "";

const fallbackLevels = [
  {
    level: "A1",
    title: "Dein erster Schritt",
    description:
      "Von Hallo zu deinen ersten Sätzen. Entdecke die Grundlagen.",
    topics: [
      "Begrüßen & Vorstellen",
      "Einfache Sätze",
      "Alltag",
      "Erste Grammatik",
    ],
    lesson_count: 20,
    featured_count: 5,
  },
  {
    level: "A2",
    title: "Mehr verstehen. Mehr sagen.",
    description:
      "Dein Deutsch wird lebendiger und sicherer.",
    topics: [
      "Erlebnisse erzählen",
      "Alltagssituationen",
      "Wortschatz",
      "Grammatik festigen",
    ],
    lesson_count: 20,
    featured_count: 5,
  },
  {
    level: "B1",
    title: "Mit Deutsch durch die Welt",
    description:
      "Drücke deine Meinung aus und kommuniziere selbstständiger.",
    topics: [
      "Meinung",
      "Zusammenhängend erzählen",
      "Texte",
      "E-Mails",
    ],
    lesson_count: 20,
    featured_count: 5,
  },
  {
    level: "B2",
    title: "Sicher und präzise kommunizieren",
    description:
      "Diskutiere, argumentiere und verstehe komplexere Texte.",
    topics: [
      "Argumentieren",
      "Diskussion",
      "Präsentationen",
      "Berufliche Kommunikation",
    ],
    lesson_count: 20,
    featured_count: 5,
  },
];

const fallbackLessons = [
  {
    level: "A1",
    type: "Kommunikation",
    title: "Hallo! Schön, dich kennenzulernen.",
    description:
      "Begrüßen, vorstellen und erste Kontakte knüpfen.",
    minutes: 8,
    slug: "hallo-und-guten-tag",
  },
  {
    level: "A1",
    type: "Grammatik",
    title: "Der, die, das – kleine Wörter",
    description:
      "Lerne Nomen gleich mit ihrem passenden Artikel.",
    minutes: 10,
    slug: "der-die-das",
  },
  {
    level: "A1",
    type: "Grammatik",
    title: "Ich lerne, du lernst",
    description:
      "Mit Verben im Präsens über deinen Alltag sprechen.",
    minutes: 10,
    slug: "praesens",
  },
  {
    level: "A2",
    type: "Grammatik",
    title: "Was hast du gestern gemacht?",
    description:
      "Mit dem Perfekt von vergangenen Erlebnissen erzählen.",
    minutes: 12,
    slug: "perfekt",
  },
  {
    level: "A2",
    type: "Grammatik",
    title: "Wem hilfst du?",
    description:
      "Den Dativ in einfachen Alltagssätzen entdecken.",
    minutes: 12,
    slug: "dativ",
  },
  {
    level: "A2",
    type: "Wortschatz",
    title: "Groß, größer, am größten",
    description:
      "Menschen und Dinge miteinander vergleichen.",
    minutes: 10,
    slug: "komparativ-superlativ",
  },
  {
    level: "B1",
    type: "Grammatik",
    title: "Weil ich neugierig bin",
    description:
      "Gründe und Gegensätze mit Nebensätzen ausdrücken.",
    minutes: 12,
    slug: "weil-und-obwohl",
  },
  {
    level: "B1",
    type: "Kommunikation",
    title: "Könntest du mir bitte helfen?",
    description:
      "Mit Konjunktiv II freundlich um etwas bitten.",
    minutes: 10,
    slug: "hoeflich-bitten",
  },
  {
    level: "B1",
    type: "Kommunikation",
    title: "Das finde ich wichtig",
    description:
      "Eine Meinung äußern, begründen und fair diskutieren.",
    minutes: 12,
    slug: "meine-meinung",
  },
  {
    level: "B2",
    type: "Kommunikation",
    title: "Was spricht dafür und dagegen?",
    description:
      "Argumente strukturieren und differenziert diskutieren.",
    minutes: 15,
    slug: "argumentieren",
  },
  {
    level: "B2",
    type: "Grammatik",
    title: "Passiv im Alltag und Beruf",
    description:
      "Prozesse und Vorgänge klar beschreiben.",
    minutes: 14,
    slug: "passiv",
  },
  {
    level: "B2",
    type: "Wortschatz",
    title: "Präziser sprechen und schreiben",
    description:
      "Nützliche Verben und Redemittel für differenzierte Aussagen.",
    minutes: 13,
    slug: "praeziser-wortschatz",
  },
];

const fallbackVocabulary = [
  {
    topic: "Alltag",
    word: "Termin",
    article: "der",
    plural: "die Termine",
    example: "Ich habe morgen einen Termin beim Arzt.",
  },
  {
    topic: "Arbeit & Beruf",
    word: "Bewerbung",
    article: "die",
    plural: "die Bewerbungen",
    example: "Ich habe gestern meine Bewerbung abgeschickt.",
  },
  {
    topic: "Reisen",
    word: "Unterkunft",
    article: "die",
    plural: "die Unterkünfte",
    example: "Wir suchen eine günstige Unterkunft in Berlin.",
  },
  {
    topic: "Gesundheit",
    word: "Beschwerde",
    article: "die",
    plural: "die Beschwerden",
    example: "Welche Beschwerden haben Sie?",
  },
  {
    topic: "Wohnen",
    word: "Mietvertrag",
    article: "der",
    plural: "die Mietverträge",
    example: "Bitte lesen Sie den Mietvertrag genau.",
  },
  {
    topic: "Weitere Themen",
    word: "Möglichkeit",
    article: "die",
    plural: "die Möglichkeiten",
    example: "Es gibt mehrere Möglichkeiten.",
  },
];

const fallbackGrammar = [
  {
    level: "A1",
    title: "Personalpronomen",
    description: "ich, du, er, sie, wir, ihr, sie",
  },
  {
    level: "A1",
    title: "Präsens",
    description: "Über Gegenwart und Alltag sprechen",
  },
  {
    level: "A2",
    title: "Perfekt",
    description: "Über vergangene Erlebnisse erzählen",
  },
  {
    level: "A2",
    title: "Dativ",
    description: "Wem? und wichtige Dativ-Verben",
  },
  {
    level: "B1",
    title: "Nebensätze",
    description: "weil, obwohl, dass, wenn",
  },
  {
    level: "B1",
    title: "Konjunktiv II",
    description: "Höflichkeit, Wünsche und Situationen",
  },
  {
    level: "B2",
    title: "Passiv",
    description: "Vorgänge und Prozesse beschreiben",
  },
  {
    level: "B2",
    title: "Konjunktiv II Vergangenheit",
    description:
      "Irreale Situationen in der Vergangenheit",
  },
];

const lessonDetails = {
  "hallo-und-guten-tag": {
    explanation:
      "Du kannst mit einfachen Sätzen jemanden begrüßen und dich vorstellen.",
    example:
      "Hallo! Ich heiße Anna. Ich komme aus Spanien. Freut mich, dich kennenzulernen!",
    question:
      "Wie antwortest du? – Hallo! Ich ___ Anna.",
    options: ["heiße", "heißt", "heißen"],
    answer: 0,
  },

  "der-die-das": {
    explanation:
      "Viele Nomen haben einen festen Artikel. Lerne das Nomen am besten immer mit Artikel.",
    example:
      "der Tisch · die Lampe · das Fenster",
    question: "___ Tisch ist groß.",
    options: ["Der", "Die", "Das"],
    answer: 0,
  },

  praesens: {
    explanation:
      "Das Präsens benutzt du für die Gegenwart und oft auch für regelmäßige Abläufe.",
    example:
      "Ich lerne Deutsch. Du arbeitest heute. Wir wohnen in Dresden.",
    question:
      "Ich ___ jeden Tag Deutsch.",
    options: ["lerne", "lernst", "lernen"],
    answer: 0,
  },

  perfekt: {
    explanation:
      "Für viele Gespräche über die Vergangenheit brauchst du das Perfekt: haben/sein + Partizip II.",
    example:
      "Ich habe gearbeitet. Wir sind gestern nach Berlin gefahren.",
    question:
      "Ich ___ gestern gearbeitet.",
    options: ["habe", "bin", "werde"],
    answer: 0,
  },

  dativ: {
    explanation:
      "Der Dativ antwortet oft auf die Frage ‚Wem?‘. Bestimmte Verben verlangen den Dativ.",
    example:
      "Ich helfe meiner Freundin. Wem hilfst du? – Meiner Freundin.",
    question: "Ich helfe ___ Mann.",
    options: ["dem", "den", "der"],
    answer: 0,
  },

  "komparativ-superlativ": {
    explanation:
      "Mit Komparativ und Superlativ vergleichst du Personen und Dinge.",
    example:
      "groß – größer – am größten",
    question:
      "Anna ist ___ als Paul.",
    options: [
      "größer",
      "groß",
      "am größten",
    ],
    answer: 0,
  },

  "weil-und-obwohl": {
    explanation:
      "In Nebensätzen mit weil und obwohl steht das konjugierte Verb am Ende.",
    example:
      "Ich lerne Deutsch, weil ich in Deutschland lebe. Obwohl ich müde bin, lerne ich weiter.",
    question:
      "Ich bleibe zu Hause, weil ich ___ bin.",
    options: [
      "krank",
      "bin krank",
      "krank bin",
    ],
    answer: 2,
  },

  "hoeflich-bitten": {
    explanation:
      "Mit Konjunktiv II kannst du Wünsche und Bitten höflich formulieren.",
    example:
      "Könntest du mir bitte helfen? Würdest du das wiederholen?",
    question:
      "___ Sie mir bitte helfen?",
    options: [
      "Könnten",
      "Können",
      "Konnten",
    ],
    answer: 0,
  },

  "meine-meinung": {
    explanation:
      "Eine gute Meinungsäußerung besteht aus Meinung, Begründung und Beispiel.",
    example:
      "Ich finde öffentliche Verkehrsmittel wichtig, weil sie umweltfreundlicher sind.",
    question:
      "Welcher Satz begründet eine Meinung?",
    options: [
      "Ich finde das gut.",
      "Ich finde das gut, weil es Zeit spart.",
      "Das ist ein Satz.",
    ],
    answer: 1,
  },

  argumentieren: {
    explanation:
      "Auf B2 kannst du Argumente abwägen und sprachlich strukturieren: einerseits – andererseits, zwar – aber, dennoch.",
    example:
      "Einerseits ist Homeoffice flexibel, andererseits kann der direkte Austausch fehlen.",
    question:
      "Welches Paar signalisiert einen Gegensatz?",
    options: [
      "zwar – aber",
      "deshalb – deshalb",
      "und – und",
    ],
    answer: 0,
  },

  passiv: {
    explanation:
      "Mit dem Passiv liegt der Fokus auf der Handlung oder dem Vorgang, nicht auf der handelnden Person.",
    example:
      "Die E-Mail wird heute versendet.",
    question:
      "Der Bericht ___ morgen veröffentlicht.",
    options: [
      "wird",
      "hat",
      "ist",
    ],
    answer: 0,
  },

  "praeziser-wortschatz": {
    explanation:
      "Präziser Wortschatz hilft dir, Aussagen im beruflichen und akademischen Kontext differenziert zu formulieren.",
    example:
      "Die Ergebnisse zeigen einen deutlichen Anstieg der Nachfrage.",
    question:
      "Welches Wort ist am präzisesten?",
    options: [
      "machen",
      "durchführen",
      "tun",
    ],
    answer: 1,
  },
};

let levels = [...fallbackLevels];
let lessons = [...fallbackLessons];
let vocabulary = [...fallbackVocabulary];
let grammar = [...fallbackGrammar];

let selectedLevel = "Alle";
let selectedType = "Alle";

function esc(value) {
  return String(value ?? "").replace(
    /[&<>'"]/g,
    (ch) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      }[ch])
  );
}

function renderLevels() {
  const host = document.getElementById("levelGrid");

  if (!host) return;

  host.innerHTML = levels
    .map(
      (l) => `
        <article class="level-card">

          <div class="level-header">
            <span class="level-badge">
              ${esc(l.level)}
            </span>

            <span class="level-meta">
              ${esc(l.lesson_count)} Themen
            </span>
          </div>

          <h3>
            ${esc(l.title)}
          </h3>

          <p>
            ${esc(l.description)}
          </p>

          <ul>
            ${(l.topics || [])
              .map(
                (t) =>
                  `<li>${esc(t)}</li>`
              )
              .join("")}
          </ul>

          <div class="level-meta">

            <span>
              ${esc(l.featured_count)}
              Startlektionen
            </span>

            <a
              class="btn btn-secondary btn-small"
              href="#uebungen"
              data-jump-level="${esc(l.level)}"
            >
              Entdecken
            </a>

          </div>

        </article>
      `
    )
    .join("");

  host
    .querySelectorAll("[data-jump-level]")
    .forEach((btn) => {
      btn.addEventListener("click", () =>
        setLevel(btn.dataset.jumpLevel)
      );
    });
}

function renderLessons() {
  const host = document.getElementById("lessonGrid");

  if (!host) return;

  const filtered = lessons.filter(
    (l) =>
      (selectedLevel === "Alle" ||
        l.level === selectedLevel) &&
      (selectedType === "Alle" ||
        l.type === selectedType)
  );

  if (!filtered.length) {
    host.innerHTML = `
      <div class="empty-state">
        Für diese Auswahl sind noch keine Lektionen vorhanden.
      </div>
    `;
    return;
  }

  host.innerHTML = filtered
    .map(
      (l) => `
        <article class="lesson-card">

          <div class="lesson-tag">
            <span>${esc(l.level)}</span>
            <span>•</span>
            <span>${esc(l.type)}</span>
          </div>

          <h3>
            ${esc(l.title)}
          </h3>

          <p>
            ${esc(l.description)}
          </p>

          <div class="lesson-footer">

            <span>
              ⏱ ${esc(l.minutes)} Min.
            </span>

            <button
              class="lesson-link"
              data-slug="${esc(l.slug)}"
            >
              Lektion starten →
            </button>

          </div>

        </article>
      `
    )
    .join("");

  host
    .querySelectorAll("[data-slug]")
    .forEach((btn) => {
      btn.addEventListener("click", () =>
        openLesson(btn.dataset.slug)
      );
    });
}

function renderVocabulary() {
  const host = document.getElementById("vocabTopics");

  if (!host) return;

  const topics = [
    ...new Set(
      vocabulary.map((v) => v.topic)
    ),
  ];

  host.innerHTML = topics
    .map(
      (t) =>
        `<span class="topic-pill">${esc(t)}</span>`
    )
    .join("");
}

function renderGrammar() {
  const host = document.getElementById("grammarGrid");

  if (!host) return;

  host.innerHTML = grammar
    .map(
      (g) => `
        <article class="grammar-card">

          <span class="level-badge">
            ${esc(g.level)}
          </span>

          <h3>
            ${esc(g.title)}
          </h3>

          <p>
            ${esc(g.description)}
          </p>

        </article>
      `
    )
    .join("");
}

function setLevel(level) {
  selectedLevel = level;

  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => {
      b.classList.toggle(
        "active",
        b.dataset.level === level
      );
    });

  renderLessons();

  const section =
    document.getElementById("uebungen");

  if (section) {
    section.scrollIntoView({
      behavior: "smooth",
    });
  }
}

function setType(type) {
  selectedType = type;

  document
    .querySelectorAll(".type-filter")
    .forEach((b) => {
      b.classList.toggle(
        "active",
        b.dataset.type === type
      );
    });

  renderLessons();
}

function openLesson(slug) {
  const lesson = lessons.find(
    (l) => l.slug === slug
  );

  if (!lesson) return;

  const details =
    lessonDetails[slug] || {
      explanation:
        "Diese Lektion ist vorbereitet und kann als Nächstes mit ausführlichen Inhalten erweitert werden.",

      example:
        "Hier können deine Erklärung, Beispiele und Übungen stehen.",

      question:
        "Welche Antwort passt?",

      options: [
        "Antwort A",
        "Antwort B",
        "Antwort C",
      ],

      answer: 0,
    };

  const modalKicker =
    document.getElementById("modalKicker");

  const modalTitle =
    document.getElementById("modalTitle");

  const modalDescription =
    document.getElementById("modalDescription");

  const modalBody =
    document.getElementById("modalBody");

  const modal =
    document.getElementById("lessonModal");

  if (
    !modalKicker ||
    !modalTitle ||
    !modalDescription ||
    !modalBody ||
    !modal
  ) {
    return;
  }

  modalKicker.textContent =
    `${lesson.level} · ${lesson.type}`;

  modalTitle.textContent =
    lesson.title;

  modalDescription.textContent =
    details.explanation;

  modalBody.innerHTML = `
    <div class="modal-example">

      <strong>💡 Beispiel</strong>

      <br>

      ${esc(details.example)}

    </div>

    <div class="quiz-box">

      <strong>✏️ Mini-Übung</strong>

      <p>
        ${esc(details.question)}
      </p>

      ${details.options
        .map(
          (o, i) =>
            `
              <button
                class="quiz-option"
                data-option="${i}"
              >
                ${esc(o)}
              </button>
            `
        )
        .join("")}

      <div
        class="quiz-feedback"
        id="quizFeedback"
      ></div>

    </div>
  `;

  modal.classList.add("open");

  modal.setAttribute(
    "aria-hidden",
    "false"
  );

  document
    .querySelectorAll(".quiz-option")
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(
          btn.dataset.option
        );

        const feedback =
          document.getElementById(
            "quizFeedback"
          );

        document
          .querySelectorAll(".quiz-option")
          .forEach((b) =>
            b.classList.remove(
              "correct",
              "wrong"
            )
          );

        if (idx === details.answer) {
          btn.classList.add("correct");

          feedback.textContent =
            "✅ Richtig! Sehr gut.";
        } else {
          btn.classList.add("wrong");

          feedback.textContent =
            "❌ Noch einmal versuchen.";
        }
      });
    });
}

function closeModal() {
  const modal =
    document.getElementById("lessonModal");

  if (!modal) return;

  modal.classList.remove("open");

  modal.setAttribute(
    "aria-hidden",
    "true"
  );
}

function renderWord(index = 0) {
  const host =
    document.getElementById(
      "todayWordCard"
    );

  if (
    !host ||
    vocabulary.length === 0
  ) {
    return;
  }

  const v =
    vocabulary[
      index % vocabulary.length
    ];

  host.innerHTML = `
    <div class="mini-label">
      WORT DES TAGES
    </div>

    <div class="word-article">
      ${esc(v.article)}
    </div>

    <h3>
      ${esc(v.word)}
    </h3>

    <div class="word-meta">
      Plural:
      <strong>
        ${esc(v.plural)}
      </strong>
    </div>

    <p>
      ${esc(v.example)}
    </p>

    <button
      class="btn btn-secondary btn-small"
      id="nextWordBtn"
    >
      Nächstes Wort
    </button>
  `;

  const nextButton =
    document.getElementById(
      "nextWordBtn"
    );

  if (nextButton) {
    nextButton.addEventListener(
      "click",
      () =>
        renderWord(
          (index + 1) %
            vocabulary.length
        )
    );
  }
}

async function trySupabase() {
  if (
    !SUPABASE_URL ||
    !SUPABASE_ANON_KEY ||
    !window.supabase
  ) {
    return;
  }

  try {
    const client =
      window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
      );

    const [
      lv,
      le,
      vo,
      gr,
    ] = await Promise.all([
      client
        .from("levels")
        .select("*")
        .order("sort_order"),

      client
        .from("lessons")
        .select("*")
        .eq("published", true)
        .order("sort_order"),

      client
        .from("vocabulary")
        .select("*"),

      client
        .from("grammar_topics")
        .select("*")
        .order("sort_order"),
    ]);

    if (
      !lv.error &&
      lv.data?.length
    ) {
      levels = lv.data;
    }

    if (
      !le.error &&
      le.data?.length
    ) {
      lessons = le.data;
    }

    if (
      !vo.error &&
      vo.data?.length
    ) {
      vocabulary = vo.data;
    }

    if (
      !gr.error &&
      gr.data?.length
    ) {
      grammar = gr.data;
    }

    renderLevels();
    renderLessons();
    renderVocabulary();
    renderGrammar();
    renderWord(0);

  } catch (error) {
    console.warn(
      "Supabase konnte nicht geladen werden. Fallback-Daten werden verwendet.",
      error
    );
  }
}

function setup() {
  renderLevels();
  renderLessons();
  renderVocabulary();
  renderGrammar();
  renderWord(0);

  document
    .querySelectorAll(".filter-btn")
    .forEach((btn) => {
      btn.addEventListener(
        "click",
        () =>
          setLevel(
            btn.dataset.level
          )
      );
    });

  document
    .querySelectorAll(".type-filter")
    .forEach((btn) => {
      btn.addEventListener(
        "click",
        () =>
          setType(
            btn.dataset.type
          )
      );
    });

  document
    .querySelectorAll(".practice-card")
    .forEach((btn) => {
      btn.addEventListener(
        "click",
        () => {
          const type =
            btn.dataset.filter;

          if (type === "Gemischt") {
            setType("Alle");
            setLevel("Alle");
          } else if (
            [
              "Grammatik",
              "Wortschatz",
            ].includes(type)
          ) {
            setType(type);
          } else {
            setType("Alle");
            setLevel("Alle");
          }
        }
      );
    });

  document
    .querySelectorAll(
      "[data-close-modal]"
    )
    .forEach((el) => {
      el.addEventListener(
        "click",
        closeModal
      );
    });

  document.addEventListener(
    "keydown",
    (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    }
  );

  const toggle =
    document.getElementById(
      "menuToggle"
    );

  const nav =
    document.getElementById(
      "mainNav"
    );

  if (toggle && nav) {
    toggle.addEventListener(
      "click",
      () => {
        const open =
          nav.classList.toggle(
            "open"
          );

        toggle.setAttribute(
          "aria-expanded",
          String(open)
        );
      }
    );

    nav
      .querySelectorAll("a")
      .forEach((a) => {
        a.addEventListener(
          "click",
          () =>
            nav.classList.remove(
              "open"
            )
        );
      });
  }

  trySupabase();
}

document.addEventListener(
  "DOMContentLoaded",
  setup
);
