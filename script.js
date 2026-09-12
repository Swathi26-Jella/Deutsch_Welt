// ======================================================
// DEUTSCHWELT
// Supabase content + audio
// ======================================================


// ======================================================
// SUPABASE CONFIGURATION
// ======================================================

const SUPABASE_URL =
    "https://llxcyabptsbdtsdhkzkc.supabase.co";

const SUPABASE_ANON_KEY =
    "sb_publishable_MKh0z87kMiDAQX3jnaoADQ_-D0_XXd4";


let supabaseClient = null;

let currentTopics = [];


// ======================================================
// LOAD SUPABASE
// ======================================================

function loadSupabaseLibrary() {

    return new Promise((resolve, reject) => {

        if (window.supabase) {

            resolve();
            return;

        }


        const script =
            document.createElement("script");


        script.src =
            "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";


        script.onload =
            () => resolve();


        script.onerror =
            () => reject(
                new Error(
                    "Supabase library could not be loaded."
                )
            );


        document.head.appendChild(
            script
        );

    });

}


// ======================================================
// CONNECT
// ======================================================

async function connectSupabase() {

    await loadSupabaseLibrary();


    if (
        SUPABASE_URL.includes("PASTE_YOUR") ||
        SUPABASE_ANON_KEY.includes("PASTE_YOUR")
    ) {

        throw new Error(
            "Supabase URL or public key is missing."
        );

    }


    supabaseClient =
        window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_ANON_KEY
        );

}


// ======================================================
// TEXT TO SPEECH
// ======================================================

let germanVoice = null;


function loadGermanVoice() {

    if (
        !("speechSynthesis" in window)
    ) {
        return;
    }


    const voices =
        speechSynthesis.getVoices();


    const german =
        voices.find(
            voice =>
                voice.lang &&
                voice.lang
                    .toLowerCase()
                    .startsWith("de")
        );


    if (german) {
        germanVoice = german;
    }

}


if (
    "speechSynthesis" in window
) {

    loadGermanVoice();

    speechSynthesis.onvoiceschanged =
        loadGermanVoice;

}


function speakGerman(text) {

    if (!text) {
        return;
    }


    if (
        !("speechSynthesis" in window)
    ) {

        alert(
            "Dein Browser unterstützt keine Sprachausgabe."
        );

        return;

    }


    speechSynthesis.cancel();


    const utterance =
        new SpeechSynthesisUtterance(
            String(text)
                .replace(/🔊/g, "")
                .trim()
        );


    utterance.lang =
        "de-DE";


    utterance.rate =
        0.85;


    utterance.pitch =
        1;


    if (germanVoice) {

        utterance.voice =
            germanVoice;

    }


    speechSynthesis.speak(
        utterance
    );

}


// ======================================================
// AUDIO BUTTON
// ======================================================

function audioButton(
    text,
    label = "Anhören"
) {

    if (!text) {
        return "";
    }


    return `

        <button
            type="button"
            class="audio-button"
            title="${escapeHTML(label)}"
            aria-label="${escapeHTML(label)}"
            data-audio-text="${escapeHTML(text)}"
        >
            🔊
        </button>

    `;

}


// ======================================================
// AUDIO CLICK
// ======================================================

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                ".audio-button"
            );


        if (!button) {
            return;
        }


        event.stopPropagation();


        speakGerman(
            button.dataset.audioText
        );

    }
);


// ======================================================
// HTML ESCAPE
// ======================================================

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


// ======================================================
// JSON
// ======================================================

function parseArray(value) {

    if (!value) {
        return [];
    }


    if (Array.isArray(value)) {
        return value;
    }


    try {

        const parsed =
            JSON.parse(value);


        return Array.isArray(parsed)
            ? parsed
            : [];

    } catch {

        return [];

    }

}


// ======================================================
// LEVEL FROM URL
// ======================================================

function getURLLevel() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    let level =
        params.get("level");


    if (!level) {
        level = "A1";
    }


    level =
        level.toUpperCase();


    if (
        ![
            "A1",
            "A2",
            "B1",
            "B2"
        ].includes(level)
    ) {

        level = "A1";

    }


    return level;

}


// ======================================================
// LEARNING PAGE
// ======================================================

async function loadLearningPage() {

    const navigation =
        document.getElementById(
            "topicNavigation"
        );


    if (!navigation) {
        return;
    }


    const content =
        document.getElementById(
            "topicContent"
        );


    const level =
        getURLLevel();


    const titles = {

        A1:
            "A1 – Deutsch von Anfang an",

        A2:
            "A2 – Deutsch im Alltag",

        B1:
            "B1 – Selbstständig Deutsch sprechen",

        B2:
            "B2 – Deutsch sicher anwenden"

    };


    const descriptions = {

        A1:
            "Alphabet, Aussprache, Zahlen, Alltag und grundlegende Grammatik.",

        A2:
            "Erweitere deine Grundlagen und lerne Deutsch für vertraute Alltagssituationen.",

        B1:
            "Sprich über Erfahrungen, Arbeit, Alltag, Pläne und vertraute Themen.",

        B2:
            "Vertiefe deine Kenntnisse für anspruchsvollere Gespräche und Texte."

    };


    document.getElementById(
        "levelTitle"
    ).textContent =
        titles[level];


    document.getElementById(
        "levelEyebrow"
    ).textContent =
        `${level} · Lernstufe`;


    document.getElementById(
        "levelDescription"
    ).textContent =
        descriptions[level];


    document
        .querySelectorAll(
            "[data-level-link]"
        )
        .forEach(link => {

            link.classList.toggle(
                "selected",
                link.dataset.levelLink === level
            );

        });


    navigation.innerHTML = `

        <div class="loading-message">

            <div class="loading-spinner"></div>

            Inhalte werden geladen ...

        </div>

    `;


    try {

        const {
            data,
            error
        } =
            await supabaseClient
                .from("topics")
                .select("*")
                .eq("level", level)
                .eq("published", true)
                .order(
                    "sort_order",
                    {
                        ascending: true
                    }
                );


        if (error) {
            throw error;
        }


        currentTopics =
            data || [];


        renderTopicNavigation();


        if (currentTopics.length) {

            showTopic(
                currentTopics[0].id
            );

        } else {

            content.innerHTML = `

                <div class="welcome-content">

                    <div class="welcome-icon">
                        📚
                    </div>

                    <h2>
                        Noch keine Inhalte
                    </h2>

                    <p>
                        Für ${level} sind momentan
                        keine veröffentlichten Themen
                        vorhanden.
                    </p>

                </div>

            `;

        }


    } catch (error) {

        console.error(
            "Learning page error:",
            error
        );


        navigation.innerHTML = `

            <div class="error-message">

                <strong>
                    Lerninhalte konnten nicht geladen werden.
                </strong>

                <p>
                    ${escapeHTML(
                        error.message
                    )}
                </p>

            </div>

        `;

    }

}


// ======================================================
// TOPIC NAVIGATION
// ======================================================

function renderTopicNavigation() {

    const navigation =
        document.getElementById(
            "topicNavigation"
        );


    navigation.innerHTML = "";


    if (!currentTopics.length) {
        return;
    }


    const categories = {};


    currentTopics.forEach(
        topic => {

            const category =
                topic.category ||
                "Allgemein";


            if (
                !categories[category]
            ) {

                categories[category] =
                    [];

            }


            categories[category]
                .push(topic);

        }
    );


    Object.keys(categories)
        .forEach(
            category => {

                const wrapper =
                    document.createElement(
                        "div"
                    );


                wrapper.className =
                    "topic-category";


                const heading =
                    document.createElement(
                        "h3"
                    );


                heading.textContent =
                    category;


                wrapper.appendChild(
                    heading
                );


                categories[category]
                    .forEach(
                        topic => {

                            const button =
                                document.createElement(
                                    "button"
                                );


                            button.type =
                                "button";


                            button.className =
                                "topic-button";


                            button.dataset.topicId =
                                topic.id;


                            button.innerHTML = `

                                <span class="topic-icon">

                                    ${escapeHTML(
                                        topic.icon || "📘"
                                    )}

                                </span>

                                <span class="topic-button-text">

                                    ${escapeHTML(
                                        topic.title
                                    )}

                                </span>

                                <span
                                    class="topic-nav-audio"
                                    title="Titel anhören"
                                >
                                    🔊
                                </span>

                            `;


                            button.addEventListener(
                                "click",
                                event => {

                                    if (
                                        event.target.closest(
                                            ".topic-nav-audio"
                                        )
                                    ) {

                                        event.stopPropagation();

                                        speakGerman(
                                            topic.title
                                        );

                                        return;

                                    }


                                    showTopic(
                                        topic.id
                                    );

                                }
                            );


                            wrapper.appendChild(
                                button
                            );

                        }
                    );


                navigation.appendChild(
                    wrapper
                );

            }
        );

}


// ======================================================
// SHOW TOPIC
// ======================================================

function showTopic(id) {

    const topic =
        currentTopics.find(
            item =>
                String(item.id) ===
                String(id)
        );


    if (!topic) {
        return;
    }


    document
        .querySelectorAll(
            ".topic-button"
        )
        .forEach(
            button => {

                button.classList.toggle(
                    "active",
                    String(
                        button.dataset.topicId
                    ) ===
                    String(id)
                );

            }
        );


    document.getElementById(
        "topicContent"
    ).innerHTML =
        buildTopicHTML(
            topic
        );

}


// ======================================================
// TOPIC CONTENT
// ======================================================

function buildTopicHTML(topic) {

    const keyPoints =
        parseArray(
            topic.key_points
        );


    const patterns =
        parseArray(
            topic.sentence_patterns
        );


    const examples =
        parseArray(
            topic.examples
        );


    return `

        <article class="topic-article">


            <div class="topic-article-header">

                <div class="article-icon">

                    ${escapeHTML(
                        topic.icon || "📘"
                    )}

                </div>


                <div class="topic-title-area">

                    <span class="article-category">

                        ${escapeHTML(
                            topic.category || ""
                        )}

                    </span>


                    <h2>

                        ${escapeHTML(
                            topic.title
                        )}

                        ${audioButton(
                            topic.title,
                            "Thema anhören"
                        )}

                    </h2>


                    <p class="article-summary">

                        ${escapeHTML(
                            topic.summary || ""
                        )}

                    </p>

                </div>

            </div>


            <section class="content-section first-section">

                <h3>
                    📖 Einfach erklärt
                </h3>

                <div class="explanation">

                    ${escapeHTML(
                        topic.explanation || ""
                    ).replace(
                        /\n/g,
                        "<br>"
                    )}

                </div>

            </section>


            ${
                keyPoints.length
                ?
                `

                <section class="content-section">

                    <h3>
                        ⭐ Wichtig
                    </h3>

                    <ul class="content-list">

                        ${keyPoints.map(
                            item => `

                            <li>

                                <span>
                                    ${escapeHTML(item)}
                                </span>

                                ${audioButton(
                                    item
                                )}

                            </li>

                        `).join("")}

                    </ul>

                </section>

                `
                :
                ""
            }


            ${
                patterns.length
                ?
                `

                <section class="content-section">

                    <h3>
                        🧩 Satzmuster
                    </h3>

                    <div class="pattern-list">

                        ${patterns.map(
                            item => `

                            <div class="pattern-box">

                                <span>
                                    ${escapeHTML(item)}
                                </span>

                                ${audioButton(
                                    item,
                                    "Satzmuster anhören"
                                )}

                            </div>

                        `).join("")}

                    </div>

                </section>

                `
                :
                ""
            }


            ${
                examples.length
                ?
                `

                <section class="content-section">

                    <h3>
                        💬 Beispiele
                    </h3>

                    <div class="example-list">

                        ${examples.map(
                            item => `

                            <div class="example-box">

                                <span>
                                    ${escapeHTML(item)}
                                </span>

                                ${audioButton(
                                    item,
                                    "Beispiel anhören"
                                )}

                            </div>

                        `).join("")}

                    </div>

                </section>

                `
                :
                ""
            }


            ${
                topic.merke
                ?
                `

                <section class="merke-box">

                    <div class="merke-icon">
                        💡
                    </div>

                    <div>

                        <strong>
                            Merke
                        </strong>

                        <p>

                            ${escapeHTML(
                                topic.merke
                            )}

                            ${audioButton(
                                topic.merke,
                                "Merksatz anhören"
                            )}

                        </p>

                    </div>

                </section>

                `
                :
                ""
            }


        </article>

    `;

}


// ======================================================
// VOCABULARY PAGE
// ======================================================

async function loadVocabulary(
    level
) {

    const grid =
        document.getElementById(
            "vocabularyGrid"
        );


    if (!grid) {
        return;
    }


    grid.innerHTML = `

        <div class="loading-message">

            <div class="loading-spinner"></div>

            Wortschatz wird geladen ...

        </div>

    `;


    try {

        const {
            data,
            error
        } =
            await supabaseClient
                .from("vocabulary")
                .select("*")
                .eq("level", level)
                .eq("published", true)
                .order(
                    "sort_order",
                    {
                        ascending: true
                    }
                );


        if (error) {
            throw error;
        }


        if (!data || !data.length) {

            grid.innerHTML = `

                <div class="welcome-content">

                    <div class="welcome-icon">
                        📚
                    </div>

                    <h2>
                        Noch kein Wortschatz
                    </h2>

                    <p>
                        Für ${level} wurden noch
                        keine veröffentlichten
                        Wörter hinzugefügt.
                    </p>

                </div>

            `;

            return;
        }


        const categories = {};


        data.forEach(
            word => {

                const category =
                    word.category ||
                    "Allgemein";


                if (
                    !categories[category]
                ) {

                    categories[category] =
                        [];

                }


                categories[category]
                    .push(word);

            }
        );


        grid.innerHTML = `

            <div class="vocabulary-page-content">

                ${
                    Object.keys(categories)
                        .map(
                            category => `

                            <section class="vocabulary-category">

                                <h2>
                                    ${escapeHTML(
                                        category
                                    )}
                                </h2>

                                <div class="vocabulary-grid">

                                    ${
                                        categories[category]
                                            .map(
                                                word =>
                                                    buildVocabularyCard(
                                                        word
                                                    )
                                            )
                                            .join("")
                                    }

                                </div>

                            </section>

                        `
                        )
                        .join("")
                }

            </div>

        `;

    } catch (error) {

        console.error(
            "Vocabulary error:",
            error
        );


        grid.innerHTML = `

            <div class="error-message">

                <strong>
                    Wortschatz konnte nicht geladen werden.
                </strong>

                <p>
                    ${escapeHTML(
                        error.message
                    )}
                </p>

            </div>

        `;

    }

}


// ======================================================
// VOCABULARY CARD
// ======================================================

function buildVocabularyCard(
    word
) {

    const fullWord =
        `${word.article || ""} ${word.word || ""}`
            .trim();


    return `

        <article class="vocabulary-card">

            <div class="vocabulary-word">

                <span class="vocabulary-article">

                    ${escapeHTML(
                        word.article || ""
                    )}

                </span>


                <strong>

                    ${escapeHTML(
                        word.word
                    )}

                </strong>


                ${audioButton(
                    fullWord,
                    "Wort anhören"
                )}

            </div>


            ${
                word.plural
                ?
                `

                <div class="vocabulary-plural">

                    Plural:
                    ${escapeHTML(
                        word.plural
                    )}

                    ${audioButton(
                        `Plural ${word.plural}`,
                        "Plural anhören"
                    )}

                </div>

                `
                :
                ""
            }


            <div class="vocabulary-meaning">

                ${escapeHTML(
                    word.meaning || ""
                )}

            </div>


            ${
                word.example
                ?
                `

                <div class="vocabulary-example">

                    <span>

                        ${escapeHTML(
                            word.example
                        )}

                    </span>

                    ${audioButton(
                        word.example,
                        "Beispielsatz anhören"
                    )}

                </div>

                `
                :
                ""
            }


            ${
                word.note
                ?
                `

                <div class="vocabulary-note">

                    💡
                    ${escapeHTML(
                        word.note
                    )}

                </div>

                `
                :
                ""
            }

        </article>

    `;

}


// ======================================================
// GRAMMAR PAGE
// ======================================================

async function loadGrammar(
    level
) {

    const grid =
        document.getElementById(
            "grammarGrid"
        );


    if (!grid) {
        return;
    }


    grid.innerHTML = `

        <div class="loading-message">

            <div class="loading-spinner"></div>

            Grammatik wird geladen ...

        </div>

    `;


    try {

        const {
            data,
            error
        } =
            await supabaseClient
                .from("grammar_topics")
                .select("*")
                .eq("level", level)
                .eq("published", true)
                .order(
                    "sort_order",
                    {
                        ascending: true
                    }
                );


        if (error) {
            throw error;
        }


        if (!data || !data.length) {

            grid.innerHTML = `

                <div class="welcome-content">

                    <div class="welcome-icon">
                        📘
                    </div>

                    <h2>
                        Noch keine Grammatik
                    </h2>

                    <p>
                        Für ${level} wurden noch
                        keine veröffentlichten
                        Grammatikthemen hinzugefügt.
                    </p>

                </div>

            `;

            return;
        }


        grid.innerHTML = `

            <div class="grammar-grid">

                ${data.map(
                    item =>
                        buildGrammarCard(
                            item
                        )
                ).join("")}

            </div>

        `;

    } catch (error) {

        console.error(
            "Grammar error:",
            error
        );


        grid.innerHTML = `

            <div class="error-message">

                <strong>
                    Grammatik konnte nicht geladen werden.
                </strong>

                <p>
                    ${escapeHTML(
                        error.message
                    )}
                </p>

            </div>

        `;

    }

}


// ======================================================
// GRAMMAR CARD
// ======================================================

function buildGrammarCard(
    item
) {

    const points =
        parseArray(
            item.key_points
        );


    const patterns =
        parseArray(
            item.sentence_patterns
        );


    const examples =
        parseArray(
            item.examples
        );


    return `

        <article class="grammar-card">


            <span class="article-category">
                Grammatik
            </span>


            <h2>

                ${escapeHTML(
                    item.title
                )}

                ${audioButton(
                    item.title,
                    "Grammatikthema anhören"
                )}

            </h2>


            ${
                item.short_explanation
                ?
                `

                <p class="grammar-short">

                    ${escapeHTML(
                        item.short_explanation
                    )}

                </p>

                `
                :
                ""
            }


            ${
                item.rule_preview
                ?
                `

                <div class="grammar-rule">

                    <span>

                        ${escapeHTML(
                            item.rule_preview
                        )}

                    </span>

                    ${audioButton(
                        item.rule_preview,
                        "Regel anhören"
                    )}

                </div>

                `
                :
                ""
            }


            ${
                item.explanation
                ?
                `

                <p class="grammar-explanation">

                    ${escapeHTML(
                        item.explanation
                    )}

                </p>

                `
                :
                ""
            }


            ${
                points.length
                ?
                `

                <h3>
                    ⭐ Wichtig
                </h3>

                <ul class="content-list">

                    ${points.map(
                        point => `

                        <li>

                            <span>
                                ${escapeHTML(
                                    point
                                )}
                            </span>

                            ${audioButton(
                                point
                            )}

                        </li>

                    `
                    ).join("")}

                </ul>

                `
                :
                ""
            }


            ${
                patterns.length
                ?
                `

                <h3>
                    🧩 Satzmuster
                </h3>

                <div class="pattern-list">

                    ${patterns.map(
                        pattern => `

                        <div class="pattern-box">

                            <span>
                                ${escapeHTML(
                                    pattern
                                )}
                            </span>

                            ${audioButton(
                                pattern
                            )}

                        </div>

                    `
                    ).join("")}

                </div>

                `
                :
                ""
            }


            ${
                examples.length
                ?
                `

                <h3>
                    💬 Beispiele
                </h3>

                <div class="example-list">

                    ${examples.map(
                        example => `

                        <div class="example-box">

                            <span>
                                ${escapeHTML(
                                    example
                                )}
                            </span>

                            ${audioButton(
                                example
                            )}

                        </div>

                    `
                    ).join("")}

                </div>

                `
                :
                ""
            }


            ${
                item.merke
                ?
                `

                <div class="merke-box">

                    <div class="merke-icon">
                        💡
                    </div>

                    <div>

                        <strong>
                            Merke
                        </strong>

                        <p>

                            ${escapeHTML(
                                item.merke
                            )}

                            ${audioButton(
                                item.merke
                            )}

                        </p>

                    </div>

                </div>

                `
                :
                ""
            }


        </article>

    `;

}


// ======================================================
// INITIALIZE
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        try {

            await connectSupabase();


            // ------------------------------
            // Lernwelten
            // ------------------------------

            if (
                document.getElementById(
                    "topicNavigation"
                )
            ) {

                await loadLearningPage();

            }


            // ------------------------------
            // Wortschatz
            // ------------------------------

            const vocabularyGrid =
                document.getElementById(
                    "vocabularyGrid"
                );


            if (vocabularyGrid) {

                const buttons =
                    document.querySelectorAll(
                        "[data-vocab-level]"
                    );


                buttons.forEach(
                    button => {

                        button.addEventListener(
                            "click",
                            async () => {

                                buttons.forEach(
                                    b =>
                                        b.classList.remove(
                                            "active"
                                        )
                                );


                                button.classList.add(
                                    "active"
                                );


                                await loadVocabulary(
                                    button.dataset.vocabLevel
                                );

                            }
                        );

                    }
                );


                await loadVocabulary(
                    "A1"
                );

            }


            // ------------------------------
            // Grammatik
            // ------------------------------

            const grammarGrid =
                document.getElementById(
                    "grammarGrid"
                );


            if (grammarGrid) {

                const buttons =
                    document.querySelectorAll(
                        "[data-grammar-level]"
                    );


                buttons.forEach(
                    button => {

                        button.addEventListener(
                            "click",
                            async () => {

                                buttons.forEach(
                                    b =>
                                        b.classList.remove(
                                            "active"
                                        )
                                );


                                button.classList.add(
                                    "active"
                                );


                                await loadGrammar(
                                    button.dataset.grammarLevel
                                );

                            }
                        );

                    }
                );


                await loadGrammar(
                    "A1"
                );

            }


        } catch (error) {

            console.error(
                "DeutschWelt error:",
                error
            );


            const message =
                document.querySelector(
                    ".loading-message"
                );


            if (message) {

                message.innerHTML = `

                    <div class="error-message">

                        <strong>
                            Verbindung zu den Inhalten fehlgeschlagen.
                        </strong>

                        <p>
                            ${escapeHTML(
                                error.message
                            )}
                        </p>

                    </div>

                `;

            }

        }

    }
);
