// ======================================================
// DEUTSCHWELT
// ======================================================

const SUPABASE_URL =
    "https://llxcyabptsbdtsdhkzkc.supabase.co";

const SUPABASE_ANON_KEY =
    "sb_publishable_MKh0z87kMiDAQX3jnaoADQ_-D0_XXd4";


let supabaseClient = null;

let currentLevel = "A1";

let currentTopics = [];


// ======================================================
// LOAD SUPABASE LIBRARY
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
            resolve;

        script.onerror =
            () => reject(
                new Error(
                    "Supabase konnte nicht geladen werden."
                )
            );

        document.head.appendChild(script);

    });

}


// ======================================================
// CONNECT
// ======================================================

async function connectSupabase() {

    try {

        await loadSupabaseLibrary();

        if (
            !SUPABASE_ANON_KEY ||
            SUPABASE_ANON_KEY.includes("PASTE_YOUR")
        ) {

            throw new Error(
                "Supabase Public Key fehlt."
            );

        }

        supabaseClient =
            window.supabase.createClient(
                SUPABASE_URL,
                SUPABASE_ANON_KEY
            );

        return true;

    }

    catch (error) {

        console.error(error);

        return false;
    }

}


// ======================================================
// ESCAPE HTML
// ======================================================

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// ======================================================
// JSON ARRAY
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

    }

    catch {

        return [];

    }

}


// ======================================================
// LEVEL FROM URL
// ======================================================

function getLevelFromURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    let level =
        params.get("level") || "A1";

    level =
        level.toUpperCase();

    if (
        !["A1", "A2", "B1", "B2"]
            .includes(level)
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


    currentLevel =
        getLevelFromURL();


    const title =
        document.getElementById(
            "levelTitle"
        );

    const eyebrow =
        document.getElementById(
            "levelEyebrow"
        );

    const description =
        document.getElementById(
            "levelDescription"
        );


    const descriptions = {

        A1:
            "Lerne Deutsch von Anfang an – Alphabet, Aussprache, Zahlen, Alltag und grundlegende Grammatik.",

        A2:
            "Erweitere deine Grundlagen und kommuniziere sicherer in vertrauten Alltagssituationen.",

        B1:
            "Sprich zusammenhängend über Erfahrungen, Arbeit, Alltag, Pläne und vertraute Themen.",

        B2:
            "Vertiefe deine Deutschkenntnisse und lerne komplexere Strukturen für Beruf und Alltag."

    };


    const names = {

        A1:
            "A1 – Deutsch von Anfang an",

        A2:
            "A2 – Deutsch im Alltag",

        B1:
            "B1 – Selbstständig Deutsch sprechen",

        B2:
            "B2 – Deutsch sicher anwenden"

    };


    if (title) {

        title.textContent =
            names[currentLevel];

    }


    if (eyebrow) {

        eyebrow.textContent =
            `${currentLevel} · Lernstufe`;

    }


    if (description) {

        description.textContent =
            descriptions[currentLevel];

    }


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
                .eq("level", currentLevel)
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


        renderLearningNavigation();


        if (currentTopics.length) {

            showTopic(
                currentTopics[0].id
            );

        }

        else {

            document.getElementById(
                "topicContent"
            ).innerHTML = `

                <div class="welcome-content">

                    <div class="welcome-icon">
                        📚
                    </div>

                    <h2>
                        Noch keine Inhalte
                    </h2>

                    <p>
                        Für ${currentLevel}
                        wurden noch keine
                        Inhalte veröffentlicht.
                    </p>

                </div>

            `;

        }

    }

    catch (error) {

        console.error(error);

        navigation.innerHTML = `

            <div class="error-message">

                <strong>
                    Inhalte konnten nicht geladen werden.
                </strong>

                <p>
                    Prüfe deine Supabase-Verbindung
                    und die RLS-Regeln.
                </p>

            </div>

        `;

    }

}


// ======================================================
// LEARNING NAVIGATION
// ======================================================

function renderLearningNavigation() {

    const navigation =
        document.getElementById(
            "topicNavigation"
        );


    navigation.innerHTML = "";


    const categories = {};


    currentTopics.forEach(topic => {

        const category =
            topic.category ||
            "Allgemein";


        if (!categories[category]) {

            categories[category] = [];

        }


        categories[category].push(
            topic
        );

    });


    Object.keys(categories)
        .forEach(category => {

            const block =
                document.createElement(
                    "div"
                );

            block.className =
                "topic-category";


            const heading =
                document.createElement(
                    "h3"
                );

            heading.textContent =
                category;


            block.appendChild(
                heading
            );


            categories[category]
                .forEach(topic => {

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

                    `;


                    button.addEventListener(
                        "click",
                        () => {

                            showTopic(
                                topic.id
                            );

                        }
                    );


                    block.appendChild(
                        button
                    );

                });


            navigation.appendChild(
                block
            );

        });

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
        .forEach(button => {

            button.classList.remove(
                "active"
            );

        });


    const selected =
        document.querySelector(
            `.topic-button[data-topic-id="${id}"]`
        );


    if (selected) {

        selected.classList.add(
            "active"
        );

    }


    document.getElementById(
        "topicContent"
    ).innerHTML =
        buildTopicHTML(
            topic
        );

}


// ======================================================
// TOPIC HTML
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

                <div>

                    <span class="article-category">
                        ${escapeHTML(
                            topic.category || ""
                        )}
                    </span>

                    <h2>
                        ${escapeHTML(
                            topic.title
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

                        ${keyPoints.map(item => `
                            <li>
                                ${escapeHTML(item)}
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

                        ${patterns.map(item => `
                            <div class="pattern-box">
                                ${escapeHTML(item)}
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

                        ${examples.map(item => `
                            <div class="example-box">
                                ${escapeHTML(item)}
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

async function loadVocabulary(level) {

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
                        keine Wörter hinzugefügt.
                    </p>

                </div>

            `;

            return;

        }


        grid.innerHTML = `

            <div class="vocabulary-grid">

                ${data.map(word => `

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
                            </div>
                            `
                            :
                            ""
                        }


                        <div class="vocabulary-meaning">

                            ${escapeHTML(
                                word.meaning
                            )}

                        </div>


                        <div class="vocabulary-example">

                            ${escapeHTML(
                                word.example
                            )}

                        </div>


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

                `).join("")}

            </div>

        `;

    }

    catch (error) {

        console.error(error);

        grid.innerHTML = `

            <div class="error-message">

                Die Wörter konnten nicht
                geladen werden.

            </div>

        `;

    }

}


// ======================================================
// GRAMMAR PAGE
// ======================================================

async function loadGrammar(level) {

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
                        keine Grammatikthemen
                        hinzugefügt.
                    </p>

                </div>

            `;

            return;

        }


        grid.innerHTML = `

            <div class="grammar-grid">

                ${data.map(item => {

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
                                ${level}
                            </span>


                            <h2>
                                ${escapeHTML(
                                    item.title
                                )}
                            </h2>


                            <p class="grammar-short">

                                ${escapeHTML(
                                    item.short_explanation || ""
                                )}

                            </p>


                            <div class="grammar-rule">

                                ${escapeHTML(
                                    item.rule_preview || ""
                                )}

                            </div>


                            ${
                                item.explanation
                                ?
                                `
                                <p>
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

                                    ${points.map(point => `
                                        <li>
                                            ${escapeHTML(
                                                point
                                            )}
                                        </li>
                                    `).join("")}

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

                                ${patterns.map(pattern => `
                                    <div class="pattern-box">
                                        ${escapeHTML(
                                            pattern
                                        )}
                                    </div>
                                `).join("")}
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

                                ${examples.map(example => `
                                    <div class="example-box">
                                        ${escapeHTML(
                                            example
                                        )}
                                    </div>
                                `).join("")}
                                `
                                :
                                ""
                            }


                            ${
                                item.merke
                                ?
                                `
                                <div class="merke-box">

                                    <div>
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
                                        </p>

                                    </div>

                                </div>
                                `
                                :
                                ""
                            }

                        </article>

                    `;

                }).join("")}

            </div>

        `;

    }

    catch (error) {

        console.error(error);

        grid.innerHTML = `

            <div class="error-message">

                Grammatik konnte nicht geladen werden.

            </div>

        `;

    }

}


// ======================================================
// PAGE INITIALIZATION
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        const connected =
            await connectSupabase();


        if (!connected) {
            return;
        }


        // Learning page

        if (
            document.getElementById(
                "topicNavigation"
            )
        ) {

            await loadLearningPage();

        }


        // Vocabulary page

        if (
            document.getElementById(
                "vocabularyGrid"
            )
        ) {

            const buttons =
                document.querySelectorAll(
                    "[data-vocab-level]"
                );


            buttons.forEach(button => {

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

            });


            await loadVocabulary("A1");

        }


        // Grammar page

        if (
            document.getElementById(
                "grammarGrid"
            )
        ) {

            const buttons =
                document.querySelectorAll(
                    "[data-grammar-level]"
                );


            buttons.forEach(button => {

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

            });


            await loadGrammar("A1");

        }

    }
);
