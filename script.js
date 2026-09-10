/*
========================================================
DeutschWelt
========================================================

GitHub:
    HTML
    CSS
    JavaScript
    Website design

Supabase:
    Levels
    Topics
    Grammar
    Vocabulary
    Future learning content

IMPORTANT:
Normal future content additions do NOT require editing
this JavaScript file.
========================================================
*/


// ======================================================
// 1. SUPABASE SETTINGS
// ======================================================

const SUPABASE_URL =
    "PASTE_YOUR_SUPABASE_PROJECT_URL_HERE";


const SUPABASE_ANON_KEY =
    "/*
========================================================
DeutschWelt
========================================================

GitHub:
    HTML
    CSS
    JavaScript
    Website design

Supabase:
    Levels
    Topics
    Grammar
    Vocabulary
    Future learning content

IMPORTANT:
Normal future content additions do NOT require editing
this JavaScript file.
========================================================
*/


// ======================================================
// 1. SUPABASE SETTINGS
// ======================================================

const SUPABASE_URL =
    "https://llxcyabptsbdtsdhkzkc.supabase.co";


const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxseGN5YWJwdHNiZHRzZGhremtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5NjE3NTAsImV4cCI6MjEwNDUzNzc1MH0.cYvadDwigcXKlmbtN7s7jAVJCyXOO82uU3CC3Dz52vg";


const SUPABASE_CDN =
    "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";


let db = null;


const page =
    document.body.dataset.page || "";


// ======================================================
// 2. HELPER FUNCTIONS
// ======================================================

function esc(value = "") {

    return String(value).replace(
        /[&<>"']/g,
        function (character) {

            return {

                "&": "&amp;",

                "<": "&lt;",

                ">": "&gt;",

                '"': "&quot;",

                "'": "&#39;"

            }[character];

        }
    );

}


function listify(value) {

    if (!value) {

        return [];

    }


    if (Array.isArray(value)) {

        return value;

    }


    try {

        return JSON.parse(value);

    } catch (error) {

        return String(value)
            .split(/\n+/)
            .map(item => item.trim())
            .filter(Boolean);

    }

}


// ======================================================
// 3. CONNECT TO SUPABASE
// ======================================================

async function connectSupabase() {

    if (

        !SUPABASE_URL ||

        SUPABASE_URL.includes("PASTE_") ||

        !SUPABASE_ANON_KEY ||

        SUPABASE_ANON_KEY.includes("PASTE_")

    ) {

        console.warn(
            "Supabase credentials have not been added."
        );

        return false;

    }


    /*
    Load Supabase library
    */

    if (!window.supabase) {

        await new Promise(
            function (resolve, reject) {

                const script =
                    document.createElement("script");

                script.src =
                    SUPABASE_CDN;

                script.onload =
                    resolve;

                script.onerror =
                    reject;

                document.head.appendChild(
                    script
                );

            }
        ).catch(
            function (error) {

                console.error(
                    "Supabase library could not be loaded.",
                    error
                );

            }
        );

    }


    if (!window.supabase) {

        return false;

    }


    db =
        window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_ANON_KEY
        );


    return true;

}


// ======================================================
// 4. SUPABASE QUERY
// ======================================================

async function getRows(
    table,
    options = {}
) {

    if (!db) {

        return {

            data: null,

            error:
                new Error(
                    "Supabase is not connected."
                )

        };

    }


    let query =
        db
            .from(table)
            .select(
                options.select || "*"
            );


    /*
    Equal filters
    */

    if (options.eq) {

        for (
            const [column, value]
            of Object.entries(options.eq)
        ) {

            query =
                query.eq(
                    column,
                    value
                );

        }

    }


    /*
    Sorting
    */

    if (options.order) {

        query =
            query.order(
                options.order,
                {
                    ascending: true
                }
            );

    }


    return await query;

}


// ======================================================
// 5. FALLBACK LEVEL DATA
// ======================================================

/*
These are only used when Supabase has not been connected.

Once Supabase works, Supabase data is used.
*/

const fallbackLevels = [

    {

        level: "A1",

        title:
            "Dein erster Schritt",

        tagline:
            "Von Hallo zu deinen ersten Sätzen.",

        goal:
            "Einfache Alltagssituationen verstehen, sich vorstellen und kurze Sätze benutzen.",

        description:
            "Grundlagen für erste Kontakte und einfache Alltagssituationen.",

        theme_count: 0,

        grammar_count: 0

    },


    {

        level: "A2",

        title:
            "Mehr verstehen. Mehr sagen.",

        tagline:
            "Dein Deutsch wird sicherer und vielseitiger.",

        goal:
            "Vertraute Alltagssituationen selbstständiger bewältigen und über Erfahrungen und Pläne sprechen.",

        description:
            "Über vertraute Themen sprechen und mehr Zusammenhänge verstehen.",

        theme_count: 0,

        grammar_count: 0

    },


    {

        level: "B1",

        title:
            "Mit Deutsch selbstständig durch die Welt",

        tagline:
            "Zusammenhängend sprechen und schreiben.",

        goal:
            "Klare Standardsprache verstehen und sich zu vertrauten Themen zusammenhängend äußern.",

        description:
            "Selbstständiger kommunizieren und Gedanken begründen.",

        theme_count: 0,

        grammar_count: 0

    },


    {

        level: "B2",

        title:
            "Sicher und präzise kommunizieren",

        tagline:
            "Komplexere Themen verstehen und differenziert ausdrücken.",

        goal:
            "Komplexe Inhalte verstehen, Standpunkte erklären und sprachlich präziser kommunizieren.",

        description:
            "B2 ist vorbereitet und kann später vollständig mit Supabase-Inhalten gefüllt werden.",

        theme_count: 0,

        grammar_count: 0

    }

];


// ======================================================
// 6. HEADER
// ======================================================

function renderHeader() {

    const host =
        document.getElementById(
            "site-header"
        );


    if (!host) {

        return;

    }


    host.innerHTML = `

        <header class="site-header">

            <div class="shell navbar">


                <a
                    class="brand"
                    href="index.html"
                >

                    <span class="brand-mark">
                        D
                    </span>

                    <span>
                        DeutschWelt
                    </span>

                </a>


                <button
                    class="menu-toggle"
                    id="menuToggle"
                    aria-expanded="false"
                    aria-label="Menü öffnen"
                >

                    ☰

                </button>


                <nav
                    class="nav-links"
                    id="mainNav"
                >

                    <a
                        class="${
                            page === "home"
                                ? "active"
                                : ""
                        }"
                        href="index.html"
                    >

                        Startseite

                    </a>


                    <a
                        class="${
                            page === "learn"
                                ? "active"
                                : ""
                        }"
                        href="lernen.html"
                    >

                        Lernwelten

                    </a>


                    <a
                        class="${
                            page === "vocabulary"
                                ? "active"
                                : ""
                        }"
                        href="wortschatz.html"
                    >

                        Wortschatz

                    </a>


                    <a
                        class="${
                            page === "grammar"
                                ? "active"
                                : ""
                        }"
                        href="grammatik.html"
                    >

                        Grammatik

                    </a>

                </nav>

            </div>

        </header>

    `;


    const menuButton =
        document.getElementById(
            "menuToggle"
        );


    const navigation =
        document.getElementById(
            "mainNav"
        );


    if (
        menuButton &&
        navigation
    ) {

        menuButton.onclick =
            function () {

                const isOpen =
                    navigation.classList.toggle(
                        "open"
                    );


                menuButton.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

            };

    }

}


// ======================================================
// 7. FOOTER
// ======================================================

function renderFooter() {

    const host =
        document.getElementById(
            "site-footer"
        );


    if (!host) {

        return;

    }


    host.innerHTML = `

        <footer class="site-footer">

            <div
                class="shell footer-row"
            >

                <div>

                    <div class="footer-brand">
                        DeutschWelt
                    </div>

                    <p>
                        Deutsch lernen.
                        Verstehen.
                        Wiederholen.
                    </p>

                </div>


                <div>

                    © ${new Date().getFullYear()}
                    DeutschWelt

                </div>

            </div>

        </footer>

    `;

}


// ======================================================
// 8. GET LEVELS
// ======================================================

async function getLevels() {

    const result =
        await getRows(
            "levels",
            {
                order:
                    "sort_order"
            }
        );


    if (
        !result.error &&
        result.data &&
        result.data.length
    ) {

        return result.data;

    }


    return fallbackLevels;

}


// ======================================================
// 9. LEVEL CARD
// ======================================================

function createLevelCard(
    level
) {

    const cssClass =
        String(
            level.level || ""
        ).toLowerCase();


    return `

        <article
            class="
                level-card
                ${cssClass}
            "
        >

            <span
                class="level-badge"
            >

                ${esc(
                    level.level
                )}

            </span>


            <h3>

                ${esc(
                    level.title
                )}

            </h3>


            <p>

                ${esc(
                    level.description ||
                    level.tagline ||
                    ""
                )}

            </p>


            <ul>

                <li>

                    ${esc(
                        level.theme_count ?? 0
                    )}

                    Themen

                </li>


                <li>

                    ${esc(
                        level.grammar_count ?? 0
                    )}

                    Grammatikthemen

                </li>


                <li>

                    Lesen & wiederholen

                </li>

            </ul>


            <a
                class="card-arrow"
                href="
                    lernen.html?level=${
                        encodeURIComponent(
                            level.level
                        )
                    }
                "
            >

                Niveau entdecken →

            </a>

        </article>

    `;

}


// ======================================================
// 10. HOME LEVELS
// ======================================================

async function renderHomeLevels() {

    const host =
        document.getElementById(
            "home-levels"
        );


    if (!host) {

        return;

    }


    host.innerHTML = `

        <div class="loading">

            Lernwelten werden geladen …

        </div>

    `;


    const levels =
        await getLevels();


    host.innerHTML =
        levels
            .map(
                createLevelCard
            )
            .join("");

}


// ======================================================
// 11. CREATE FILTER BUTTONS
// ======================================================

function createFilterButtons(
    host,
    values,
    current,
    onChange
) {

    host.innerHTML =
        values
            .map(
                value => `

                    <button
                        class="
                            filter-btn
                            ${
                                value === current
                                    ? "active"
                                    : ""
                            }
                        "
                        data-filter="${
                            esc(value)
                        }"
                    >

                        ${esc(value)}

                    </button>

                `
            )
            .join("");


    host
        .querySelectorAll(
            "[data-filter]"
        )
        .forEach(
            button => {

                button.onclick =
                    function () {

                        onChange(
                            button.dataset
                                .filter
                        );

                    };

            }
        );

}


// ======================================================
// 12. MODAL
// ======================================================

function createModal() {

    let modal =
        document.getElementById(
            "detailModal"
        );


    if (modal) {

        return modal;

    }


    document.body.insertAdjacentHTML(

        "beforeend",

        `

            <div
                class="detail-modal"
                id="detailModal"
            >

                <div class="modal-card">

                    <button
                        class="modal-close"
                        id="modalClose"
                        aria-label="Schließen"
                    >

                        ✕

                    </button>


                    <div
                        id="modalContent"
                    ></div>

                </div>

            </div>

        `

    );


    modal =
        document.getElementById(
            "detailModal"
        );


    const closeButton =
        document.getElementById(
            "modalClose"
        );


    closeButton.onclick =
        function () {

            modal.classList.remove(
                "open"
            );

        };


    modal.onclick =
        function (event) {

            if (
                event.target === modal
            ) {

                modal.classList.remove(
                    "open"
                );

            }

        };


    return modal;

}


// ======================================================
// 13. DETAIL CONTENT
// ======================================================

function renderDetail(
    row
) {

    const keyPoints =
        listify(
            row.key_points
        );


    const patterns =
        listify(
            row.sentence_patterns
        );


    const examples =
        listify(
            row.examples
        );


    let html = "";


    if (row.explanation) {

        html += `

            <div
                class="detail-block"
            >

                <h3>
                    📖 Einfach erklärt
                </h3>

                <div class="detail-box">

                    ${esc(
                        row.explanation
                    )}

                </div>

            </div>

        `;

    }


    if (
        keyPoints.length
    ) {

        html += `

            <div
                class="detail-block"
            >

                <h3>
                    ⭐ Wichtig
                </h3>

                <div class="detail-box">

                    <ul
                        class="example-list"
                    >

                        ${keyPoints
                            .map(
                                item =>
                                    `<li>
                                        ${esc(item)}
                                    </li>`
                            )
                            .join("")
                        }

                    </ul>

                </div>

            </div>

        `;

    }


    if (
        patterns.length
    ) {

        html += `

            <div
                class="detail-block"
            >

                <h3>
                    💬 Satzmuster
                </h3>

                <div class="detail-box">

                    <ul
                        class="example-list"
                    >

                        ${patterns
                            .map(
                                item =>
                                    `<li>
                                        ${esc(item)}
                                    </li>`
                            )
                            .join("")
                        }

                    </ul>

                </div>

            </div>

        `;

    }


    if (
        examples.length
    ) {

        html += `

            <div
                class="detail-block"
            >

                <h3>
                    💡 Beispiele
                </h3>

                <div class="detail-box">

                    <ul
                        class="example-list"
                    >

                        ${examples
                            .map(
                                item =>
                                    `<li>
                                        ${esc(item)}
                                    </li>`
                            )
                            .join("")
                        }

                    </ul>

                </div>

            </div>

        `;

    }


    if (row.merke) {

        html += `

            <div
                class="detail-block"
            >

                <h3>
                    🧠 Merke
                </h3>

                <div class="detail-box">

                    <strong>

                        ${esc(
                            row.merke
                        )}

                    </strong>

                </div>

            </div>

        `;

    }


    if (row.image_url) {

        html += `

            <div
                class="detail-block"
            >

                <img
                    src="${esc(
                        row.image_url
                    )}"
                    alt=""
                    style="
                        width:100%;
                        border-radius:18px;
                    "
                >

            </div>

        `;

    }


    return html;

}


// ======================================================
// 14. OPEN MODAL
// ======================================================

function openModal(
    title,
    content
) {

    const modal =
        createModal();


    const modalContent =
        document.getElementById(
            "modalContent"
        );


    modalContent.innerHTML = `

        <span class="eyebrow">
            REVISION
        </span>

        <h2>
            ${esc(title)}
        </h2>

        ${content}

    `;


    modal.classList.add(
        "open"
    );

}


// ======================================================
// 15. OPEN TOPIC
// ======================================================

async function openTopic(
    id
) {

    const result =
        await getRows(
            "topics",
            {
                eq: {
                    id
                }
            }
        );


    if (
        !result.error &&
        result.data &&
        result.data.length
    ) {

        openModal(

            result.data[0].title,

            renderDetail(
                result.data[0]
            )

        );

    }

}


// ======================================================
// 16. OPEN GRAMMAR
// ======================================================

async function openGrammar(
    id
) {

    const result =
        await getRows(
            "grammar_topics",
            {
                eq: {
                    id
                }
            }
        );


    if (
        !result.error &&
        result.data &&
        result.data.length
    ) {

        openModal(

            result.data[0].title,

            renderDetail(
                result.data[0]
            )

        );

    }

}


// ======================================================
// 17. GET FALLBACK LEVEL
// ======================================================

function getFallbackLevel(
    level
) {

    return (

        fallbackLevels.find(
            item =>
                item.level === level
        )

    ) || {

        level,

        title:
            level,

        tagline:
            "",

        goal:
            "",

        description:
            "",

        theme_count:
            0,

        grammar_count:
            0

    };

}


// ======================================================
// 18. LEARNWELTEN TABS
// ======================================================

async function renderLearnTabs(
    initialLevel = "A1"
) {

    const content =
        document.getElementById(
            "level-tab-content"
        );


    const buttons =
        document.querySelectorAll(
            "[data-level-tab]"
        );


    if (!content) {

        return;

    }


    let selectedLevel =
        initialLevel;


    /*
    Mark active tab
    */

    function markActive() {

        buttons.forEach(
            button => {

                const active =
                    button.dataset
                        .levelTab ===
                    selectedLevel;


                button.classList.toggle(
                    "active",
                    active
                );


                button.setAttribute(
                    "aria-selected",
                    String(active)
                );

            }
        );

    }


    /*
    Load selected level
    */

    async function loadLevel(
        level
    ) {

        selectedLevel =
            level;


        markActive();


        const fallback =
            getFallbackLevel(
                level
            );


        /*
        First render level shell
        */

        content.innerHTML = `

            <div
                class="selected-level-heading"
            >

                <div>

                    <span class="eyebrow">

                        ${esc(level)}

                    </span>


                    <h2>

                        ${esc(
                            fallback.title
                        )}

                    </h2>


                    <p>

                        ${esc(
                            fallback.tagline
                        )}

                    </p>

                </div>


                <div
                    class="selected-level-goal"
                >

                    <strong>
                        Dein Lernziel
                    </strong>

                    <p>

                        ${esc(
                            fallback.goal
                        )}

                    </p>

                </div>

            </div>


            <div
                class="level-content-columns"
            >

                <section>

                    <div
                        class="
                            section-heading
                            compact
                        "
                    >

                        <div>

                            <span class="eyebrow">
                                THEMEN
                            </span>

                            <h2>
                                Was du lernen kannst
                            </h2>

                        </div>

                    </div>


                    <div
                        id="tab-topics"
                        class="topic-grid"
                    ></div>

                </section>


                <section>

                    <div
                        class="
                            section-heading
                            compact
                        "
                    >

                        <div>

                            <span class="eyebrow">
                                GRAMMATIK
                            </span>

                            <h2>
                                Wichtige Grammatik
                            </h2>

                        </div>

                    </div>


                    <div
                        id="tab-grammar"
                        class="grammar-list"
                    ></div>

                </section>

            </div>

        `;


        const topicsHost =
            document.getElementById(
                "tab-topics"
            );


        const grammarHost =
            document.getElementById(
                "tab-grammar"
            );


        topicsHost.innerHTML = `

            <div class="loading">

                Themen werden geladen …

            </div>

        `;


        grammarHost.innerHTML = `

            <div class="loading">

                Grammatik wird geladen …

            </div>

        `;


        /*
        Load level data,
        topics and grammar together.
        */

        const [
            levelResult,
            topicResult,
            grammarResult

        ] = await Promise.all([

            getRows(
                "levels",
                {
                    eq: {
                        level
                    }
                }
            ),

            getRows(
                "topics",
                {
                    eq: {
                        level
                    },
                    order:
                        "sort_order"
                }
            ),

            getRows(
                "grammar_topics",
                {
                    eq: {
                        level
                    },
                    order:
                        "sort_order"
                }
            )

        ]);


        /*
        Update level introduction
        */

        if (
            !levelResult.error &&
            levelResult.data &&
            levelResult.data.length
        ) {

            const levelData =
                levelResult.data[0];


            const title =
                document.querySelector(
                    ".selected-level-heading h2"
                );


            const tagline =
                document.querySelector(
                    ".selected-level-heading > div:first-child p"
                );


            const goal =
                document.querySelector(
                    ".selected-level-goal p"
                );


            if (title) {

                title.textContent =
                    levelData.title || level;

            }


            if (tagline) {

                tagline.textContent =
                    levelData.tagline || "";

            }


            if (goal) {

                goal.textContent =
                    levelData.goal || "";

            }

        }


        // ==========================================
        // TOPICS
        // ==========================================

        if (
            topicResult.error ||
            !topicResult.data ||
            !topicResult.data.length
        ) {

            if (level === "B2") {

                topicsHost.innerHTML = `

                    <div
                        class="
                            empty-state
                            b2-empty
                        "
                    >

                        <div
                            class="empty-icon"
                        >
                            🌿
                        </div>

                        <h3>
                            B2 ist vorbereitet.
                        </h3>

                        <p>
                            Die B2-Lernwelt ist bereits
                            vorhanden. Füge deine B2-Themen
                            später direkt in Supabase hinzu.
                        </p>

                    </div>

                `;

            } else {

                topicsHost.innerHTML = `

                    <div class="empty-state">

                        Noch keine Themen
                        in Supabase.

                    </div>

                `;

            }

        } else {

            const topics =
                topicResult.data.filter(
                    topic =>
                        topic.published !== false
                );


            topicsHost.innerHTML =
                topics
                    .map(
                        topic => `

                            <article
                                class="topic-card"
                            >

                                <div
                                    class="topic-icon"
                                >

                                    ${esc(
                                        topic.icon ||
                                        "📘"
                                    )}

                                </div>


                                <span
                                    class="eyebrow"
                                >

                                    ${esc(
                                        topic.category ||
                                        "Thema"
                                    )}

                                </span>


                                <h3>

                                    ${esc(
                                        topic.title
                                    )}

                                </h3>


                                <p
                                    class="summary"
                                >

                                    ${esc(
                                        topic.summary ||
                                        ""
                                    )}

                                </p>


                                <button
                                    class="
                                        button
                                        secondary
                                    "
                                    data-topic-id="${
                                        esc(
                                            topic.id
                                        )
                                    }"
                                >

                                    Ansehen

                                </button>

                            </article>

                        `
                    )
                    .join("");


            topicsHost
                .querySelectorAll(
                    "[data-topic-id]"
                )
                .forEach(
                    button => {

                        button.onclick =
                            function () {

                                openTopic(
                                    button.dataset
                                        .topicId
                                );

                            };

                    }
                );

        }


        // ==========================================
        // GRAMMAR
        // ==========================================

        if (
            grammarResult.error ||
            !grammarResult.data ||
            !grammarResult.data.length
        ) {

            if (level === "B2") {

                grammarHost.innerHTML = `

                    <div
                        class="
                            empty-state
                            b2-empty
                        "
                    >

                        <div
                            class="empty-icon"
                        >
                            📖
                        </div>

                        <h3>
                            B2-Grammatik ist vorbereitet.
                        </h3>

                        <p>
                            Füge B2-Grammatik später
                            direkt in der Tabelle
                            <strong>
                                grammar_topics
                            </strong>
                            hinzu.
                        </p>

                    </div>

                `;

            } else {

                grammarHost.innerHTML = `

                    <div class="empty-state">

                        Noch keine Grammatikthemen
                        in Supabase.

                    </div>

                `;

            }

        } else {

            const grammar =
                grammarResult.data.filter(
                    item =>
                        item.published !== false
                );


            grammarHost.innerHTML =
                grammar
                    .map(
                        (item, index) => `

                            <article
                                class="grammar-item"
                            >

                                <div
                                    class="
                                        grammar-number
                                    "
                                >

                                    ${
                                        String(
                                            index + 1
                                        ).padStart(
                                            2,
                                            "0"
                                        )
                                    }

                                </div>


                                <div>

                                    <h3>

                                        ${esc(
                                            item.title
                                        )}

                                    </h3>


                                    <p>

                                        ${esc(
                                            item.short_explanation ||
                                            ""
                                        )}

                                    </p>

                                </div>


                                <button
                                    class="
                                        button
                                        secondary
                                        open-detail
                                    "
                                    data-grammar-id="${
                                        esc(
                                            item.id
                                        )
                                    }"
                                >

                                    Ansehen

                                </button>

                            </article>

                        `
                    )
                    .join("");


            grammarHost
                .querySelectorAll(
                    "[data-grammar-id]"
                )
                .forEach(
                    button => {

                        button.onclick =
                            function () {

                                openGrammar(
                                    button.dataset
                                        .grammarId
                                );

                            };

                    }
                );

        }

    }


    /*
    Tab click
    */

    buttons.forEach(
        button => {

            button.onclick =
                function () {

                    const level =
                        button.dataset
                            .levelTab;


                    loadLevel(
                        level
                    );


                    history.replaceState(
                        null,
                        "",
                        "lernen.html?level=" +
                        encodeURIComponent(
                            level
                        )
                    );

                };

        }
    );


    /*
    Load initial level
    */

    await loadLevel(
        selectedLevel
    );

}


// ======================================================
// 19. VOCABULARY PAGE
// ======================================================

async function renderVocabulary() {

    const grid =
        document.getElementById(
            "vocab-grid"
        );


    const filterHost =
        document.getElementById(
            "vocab-filters"
        );


    if (
        !grid ||
        !filterHost
    ) {

        return;

    }


    const result =
        await getRows(
            "vocabulary",
            {
                order:
                    "sort_order"
            }
        );


    if (
        result.error ||
        !result.data ||
        !result.data.length
    ) {

        grid.innerHTML = `

            <div class="empty-state">

                Noch kein Wortschatz
                in Supabase.

            </div>

        `;

        return;

    }


    const rows =
        result.data.filter(
            item =>
                item.published !== false
        );


    let selectedLevel =
        "Alle";


    let selectedCategory =
        "Alle";


    const levels = [

        "Alle",

        ...new Set(

            rows

                .map(
                    item =>
                        item.level
                )

                .filter(Boolean)

        )

    ];


    const categories = [

        "Alle",

        ...new Set(

            rows

                .map(
                    item =>
                        item.category
                )

                .filter(Boolean)

        )

    ];


    function draw() {

        filterHost.innerHTML = "";


        const levelBox =
            document.createElement(
                "div"
            );


        levelBox.className =
            "filters";


        createFilterButtons(

            levelBox,

            levels,

            selectedLevel,

            function (value) {

                selectedLevel =
                    value;

                draw();

            }

        );


        const categoryBox =
            document.createElement(
                "div"
            );


        categoryBox.className =
            "filters";


        createFilterButtons(

            categoryBox,

            categories,

            selectedCategory,

            function (value) {

                selectedCategory =
                    value;

                draw();

            }

        );


        filterHost.append(
            levelBox,
            categoryBox
        );


        const filtered =
            rows.filter(
                row =>

                    (
                        selectedLevel === "Alle" ||

                        row.level ===
                            selectedLevel
                    )

                    &&

                    (
                        selectedCategory === "Alle" ||

                        row.category ===
                            selectedCategory
                    )

            );


        grid.innerHTML =
            filtered
                .map(
                    word => `

                        <article
                            class="vocab-card"
                        >

                            <span
                                class="eyebrow"
                            >

                                ${esc(
                                    word.level
                                )}

                                ·

                                ${esc(
                                    word.category
                                )}

                            </span>


                            <div
                                class="vocab-word"
                            >

                                ${esc(
                                    word.article
                                        ? word.article + " "
                                        : ""
                                )}

                                ${esc(
                                    word.word
                                )}

                            </div>


                            <div
                                class="vocab-meta"
                            >

                                ${
                                    word.plural
                                        ? "Plural: " +
                                          esc(
                                              word.plural
                                          )
                                        : ""
                                }


                                ${
                                    word.meaning
                                        ? " · " +
                                          esc(
                                              word.meaning
                                          )
                                        : ""
                                }

                            </div>


                            <div
                                class="vocab-example"
                            >

                                ${esc(
                                    word.example ||
                                    ""
                                )}

                            </div>

                        </article>

                    `
                )
                .join("");


        if (!filtered.length) {

            grid.innerHTML = `

                <div class="empty-state">

                    Keine Wörter
                    für diese Auswahl.

                </div>

            `;

        }

    }


    draw();

}


// ======================================================
// 20. GRAMMAR PAGE
// ======================================================

async function renderGrammar() {

    const grid =
        document.getElementById(
            "grammar-grid"
        );


    const filterHost =
        document.getElementById(
            "grammar-filters"
        );


    if (
        !grid ||
        !filterHost
    ) {

        return;

    }


    const result =
        await getRows(
            "grammar_topics",
            {
                order:
                    "sort_order"
            }
        );


    if (
        result.error ||
        !result.data ||
        !result.data.length
    ) {

        grid.innerHTML = `

            <div class="empty-state">

                Noch keine Grammatikthemen
                in Supabase.

            </div>

        `;

        return;

    }


    const rows =
        result.data.filter(
            item =>
                item.published !== false
        );


    let selectedLevel =
        "Alle";


    const levels = [

        "Alle",

        ...new Set(

            rows

                .map(
                    item =>
                        item.level
                )

                .filter(Boolean)

        )

    ];


    function draw() {

        createFilterButtons(

            filterHost,

            levels,

            selectedLevel,

            function (value) {

                selectedLevel =
                    value;

                draw();

            }

        );


        const filtered =
            rows.filter(
                row =>

                    selectedLevel === "Alle" ||

                    row.level ===
                        selectedLevel

            );


        grid.innerHTML =
            filtered
                .map(
                    grammar => `

                        <article
                            class="grammar-card"
                        >

                            <span
                                class="level-badge"
                            >

                                ${esc(
                                    grammar.level
                                )}

                            </span>


                            <h3>

                                ${esc(
                                    grammar.title
                                )}

                            </h3>


                            <p>

                                ${esc(
                                    grammar.short_explanation ||
                                    ""
                                )}

                            </p>


                            <div
                                class="rule"
                            >

                                ${esc(
                                    grammar.rule_preview ||
                                    ""
                                )}

                            </div>


                            <br>


                            <button
                                class="
                                    button
                                    secondary
                                "
                                data-grammar-open="${
                                    esc(
                                        grammar.id
                                    )
                                }"
                            >

                                Ansehen

                            </button>

                        </article>

                    `
                )
                .join("");


        grid
            .querySelectorAll(
                "[data-grammar-open]"
            )
            .forEach(
                button => {

                    button.onclick =
                        function () {

                            openGrammar(
                                button.dataset
                                    .grammarOpen
                            );

                        };

                }
            );

    }


    draw();

}


// ======================================================
// 21. ESCAPE KEY
// ======================================================

document.addEventListener(
    "keydown",

    function (event) {

        if (
            event.key === "Escape"
        ) {

            const modal =
                document.querySelector(
                    ".detail-modal.open"
                );


            if (modal) {

                modal.classList.remove(
                    "open"
                );

            }

        }

    }

);


// ======================================================
// 22. START WEBSITE
// ======================================================

(async function init() {


    renderHeader();


    renderFooter();


    /*
    Connect to Supabase
    */

    try {

        await connectSupabase();

    } catch (error) {

        console.error(
            "Supabase connection failed:",
            error
        );

    }


    /*
    Decide which page is open
    */

    if (
        page === "home"
    ) {

        await renderHomeLevels();

    }


    else if (
        page === "learn"
    ) {

        const levelFromUrl =
            new URLSearchParams(
                window.location.search
            ).get("level");


        const allowedLevels = [
            "A1",
            "A2",
            "B1",
            "B2"
        ];


        await renderLearnTabs(

            allowedLevels.includes(
                levelFromUrl
            )
                ? levelFromUrl
                : "A1"

        );

    }


    else if (
        page === "vocabulary"
    ) {

        await renderVocabulary();

    }


    else if (
        page === "grammar"
    ) {

        await renderGrammar();

    }

})();";


const SUPABASE_CDN =
    "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";


let db = null;


const page =
    document.body.dataset.page || "";


// ======================================================
// 2. HELPER FUNCTIONS
// ======================================================

function esc(value = "") {

    return String(value).replace(
        /[&<>"']/g,
        function (character) {

            return {

                "&": "&amp;",

                "<": "&lt;",

                ">": "&gt;",

                '"': "&quot;",

                "'": "&#39;"

            }[character];

        }
    );

}


function listify(value) {

    if (!value) {

        return [];

    }


    if (Array.isArray(value)) {

        return value;

    }


    try {

        return JSON.parse(value);

    } catch (error) {

        return String(value)
            .split(/\n+/)
            .map(item => item.trim())
            .filter(Boolean);

    }

}


// ======================================================
// 3. CONNECT TO SUPABASE
// ======================================================

async function connectSupabase() {

    if (

        !SUPABASE_URL ||

        SUPABASE_URL.includes("PASTE_") ||

        !SUPABASE_ANON_KEY ||

        SUPABASE_ANON_KEY.includes("PASTE_")

    ) {

        console.warn(
            "Supabase credentials have not been added."
        );

        return false;

    }


    /*
    Load Supabase library
    */

    if (!window.supabase) {

        await new Promise(
            function (resolve, reject) {

                const script =
                    document.createElement("script");

                script.src =
                    SUPABASE_CDN;

                script.onload =
                    resolve;

                script.onerror =
                    reject;

                document.head.appendChild(
                    script
                );

            }
        ).catch(
            function (error) {

                console.error(
                    "Supabase library could not be loaded.",
                    error
                );

            }
        );

    }


    if (!window.supabase) {

        return false;

    }


    db =
        window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_ANON_KEY
        );


    return true;

}


// ======================================================
// 4. SUPABASE QUERY
// ======================================================

async function getRows(
    table,
    options = {}
) {

    if (!db) {

        return {

            data: null,

            error:
                new Error(
                    "Supabase is not connected."
                )

        };

    }


    let query =
        db
            .from(table)
            .select(
                options.select || "*"
            );


    /*
    Equal filters
    */

    if (options.eq) {

        for (
            const [column, value]
            of Object.entries(options.eq)
        ) {

            query =
                query.eq(
                    column,
                    value
                );

        }

    }


    /*
    Sorting
    */

    if (options.order) {

        query =
            query.order(
                options.order,
                {
                    ascending: true
                }
            );

    }


    return await query;

}


// ======================================================
// 5. FALLBACK LEVEL DATA
// ======================================================

/*
These are only used when Supabase has not been connected.

Once Supabase works, Supabase data is used.
*/

const fallbackLevels = [

    {

        level: "A1",

        title:
            "Dein erster Schritt",

        tagline:
            "Von Hallo zu deinen ersten Sätzen.",

        goal:
            "Einfache Alltagssituationen verstehen, sich vorstellen und kurze Sätze benutzen.",

        description:
            "Grundlagen für erste Kontakte und einfache Alltagssituationen.",

        theme_count: 0,

        grammar_count: 0

    },


    {

        level: "A2",

        title:
            "Mehr verstehen. Mehr sagen.",

        tagline:
            "Dein Deutsch wird sicherer und vielseitiger.",

        goal:
            "Vertraute Alltagssituationen selbstständiger bewältigen und über Erfahrungen und Pläne sprechen.",

        description:
            "Über vertraute Themen sprechen und mehr Zusammenhänge verstehen.",

        theme_count: 0,

        grammar_count: 0

    },


    {

        level: "B1",

        title:
            "Mit Deutsch selbstständig durch die Welt",

        tagline:
            "Zusammenhängend sprechen und schreiben.",

        goal:
            "Klare Standardsprache verstehen und sich zu vertrauten Themen zusammenhängend äußern.",

        description:
            "Selbstständiger kommunizieren und Gedanken begründen.",

        theme_count: 0,

        grammar_count: 0

    },


    {

        level: "B2",

        title:
            "Sicher und präzise kommunizieren",

        tagline:
            "Komplexere Themen verstehen und differenziert ausdrücken.",

        goal:
            "Komplexe Inhalte verstehen, Standpunkte erklären und sprachlich präziser kommunizieren.",

        description:
            "B2 ist vorbereitet und kann später vollständig mit Supabase-Inhalten gefüllt werden.",

        theme_count: 0,

        grammar_count: 0

    }

];


// ======================================================
// 6. HEADER
// ======================================================

function renderHeader() {

    const host =
        document.getElementById(
            "site-header"
        );


    if (!host) {

        return;

    }


    host.innerHTML = `

        <header class="site-header">

            <div class="shell navbar">


                <a
                    class="brand"
                    href="index.html"
                >

                    <span class="brand-mark">
                        D
                    </span>

                    <span>
                        DeutschWelt
                    </span>

                </a>


                <button
                    class="menu-toggle"
                    id="menuToggle"
                    aria-expanded="false"
                    aria-label="Menü öffnen"
                >

                    ☰

                </button>


                <nav
                    class="nav-links"
                    id="mainNav"
                >

                    <a
                        class="${
                            page === "home"
                                ? "active"
                                : ""
                        }"
                        href="index.html"
                    >

                        Startseite

                    </a>


                    <a
                        class="${
                            page === "learn"
                                ? "active"
                                : ""
                        }"
                        href="lernen.html"
                    >

                        Lernwelten

                    </a>


                    <a
                        class="${
                            page === "vocabulary"
                                ? "active"
                                : ""
                        }"
                        href="wortschatz.html"
                    >

                        Wortschatz

                    </a>


                    <a
                        class="${
                            page === "grammar"
                                ? "active"
                                : ""
                        }"
                        href="grammatik.html"
                    >

                        Grammatik

                    </a>

                </nav>

            </div>

        </header>

    `;


    const menuButton =
        document.getElementById(
            "menuToggle"
        );


    const navigation =
        document.getElementById(
            "mainNav"
        );


    if (
        menuButton &&
        navigation
    ) {

        menuButton.onclick =
            function () {

                const isOpen =
                    navigation.classList.toggle(
                        "open"
                    );


                menuButton.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

            };

    }

}


// ======================================================
// 7. FOOTER
// ======================================================

function renderFooter() {

    const host =
        document.getElementById(
            "site-footer"
        );


    if (!host) {

        return;

    }


    host.innerHTML = `

        <footer class="site-footer">

            <div
                class="shell footer-row"
            >

                <div>

                    <div class="footer-brand">
                        DeutschWelt
                    </div>

                    <p>
                        Deutsch lernen.
                        Verstehen.
                        Wiederholen.
                    </p>

                </div>


                <div>

                    © ${new Date().getFullYear()}
                    DeutschWelt

                </div>

            </div>

        </footer>

    `;

}


// ======================================================
// 8. GET LEVELS
// ======================================================

async function getLevels() {

    const result =
        await getRows(
            "levels",
            {
                order:
                    "sort_order"
            }
        );


    if (
        !result.error &&
        result.data &&
        result.data.length
    ) {

        return result.data;

    }


    return fallbackLevels;

}


// ======================================================
// 9. LEVEL CARD
// ======================================================

function createLevelCard(
    level
) {

    const cssClass =
        String(
            level.level || ""
        ).toLowerCase();


    return `

        <article
            class="
                level-card
                ${cssClass}
            "
        >

            <span
                class="level-badge"
            >

                ${esc(
                    level.level
                )}

            </span>


            <h3>

                ${esc(
                    level.title
                )}

            </h3>


            <p>

                ${esc(
                    level.description ||
                    level.tagline ||
                    ""
                )}

            </p>


            <ul>

                <li>

                    ${esc(
                        level.theme_count ?? 0
                    )}

                    Themen

                </li>


                <li>

                    ${esc(
                        level.grammar_count ?? 0
                    )}

                    Grammatikthemen

                </li>


                <li>

                    Lesen & wiederholen

                </li>

            </ul>


            <a
                class="card-arrow"
                href="
                    lernen.html?level=${
                        encodeURIComponent(
                            level.level
                        )
                    }
                "
            >

                Niveau entdecken →

            </a>

        </article>

    `;

}


// ======================================================
// 10. HOME LEVELS
// ======================================================

async function renderHomeLevels() {

    const host =
        document.getElementById(
            "home-levels"
        );


    if (!host) {

        return;

    }


    host.innerHTML = `

        <div class="loading">

            Lernwelten werden geladen …

        </div>

    `;


    const levels =
        await getLevels();


    host.innerHTML =
        levels
            .map(
                createLevelCard
            )
            .join("");

}


// ======================================================
// 11. CREATE FILTER BUTTONS
// ======================================================

function createFilterButtons(
    host,
    values,
    current,
    onChange
) {

    host.innerHTML =
        values
            .map(
                value => `

                    <button
                        class="
                            filter-btn
                            ${
                                value === current
                                    ? "active"
                                    : ""
                            }
                        "
                        data-filter="${
                            esc(value)
                        }"
                    >

                        ${esc(value)}

                    </button>

                `
            )
            .join("");


    host
        .querySelectorAll(
            "[data-filter]"
        )
        .forEach(
            button => {

                button.onclick =
                    function () {

                        onChange(
                            button.dataset
                                .filter
                        );

                    };

            }
        );

}


// ======================================================
// 12. MODAL
// ======================================================

function createModal() {

    let modal =
        document.getElementById(
            "detailModal"
        );


    if (modal) {

        return modal;

    }


    document.body.insertAdjacentHTML(

        "beforeend",

        `

            <div
                class="detail-modal"
                id="detailModal"
            >

                <div class="modal-card">

                    <button
                        class="modal-close"
                        id="modalClose"
                        aria-label="Schließen"
                    >

                        ✕

                    </button>


                    <div
                        id="modalContent"
                    ></div>

                </div>

            </div>

        `

    );


    modal =
        document.getElementById(
            "detailModal"
        );


    const closeButton =
        document.getElementById(
            "modalClose"
        );


    closeButton.onclick =
        function () {

            modal.classList.remove(
                "open"
            );

        };


    modal.onclick =
        function (event) {

            if (
                event.target === modal
            ) {

                modal.classList.remove(
                    "open"
                );

            }

        };


    return modal;

}


// ======================================================
// 13. DETAIL CONTENT
// ======================================================

function renderDetail(
    row
) {

    const keyPoints =
        listify(
            row.key_points
        );


    const patterns =
        listify(
            row.sentence_patterns
        );


    const examples =
        listify(
            row.examples
        );


    let html = "";


    if (row.explanation) {

        html += `

            <div
                class="detail-block"
            >

                <h3>
                    📖 Einfach erklärt
                </h3>

                <div class="detail-box">

                    ${esc(
                        row.explanation
                    )}

                </div>

            </div>

        `;

    }


    if (
        keyPoints.length
    ) {

        html += `

            <div
                class="detail-block"
            >

                <h3>
                    ⭐ Wichtig
                </h3>

                <div class="detail-box">

                    <ul
                        class="example-list"
                    >

                        ${keyPoints
                            .map(
                                item =>
                                    `<li>
                                        ${esc(item)}
                                    </li>`
                            )
                            .join("")
                        }

                    </ul>

                </div>

            </div>

        `;

    }


    if (
        patterns.length
    ) {

        html += `

            <div
                class="detail-block"
            >

                <h3>
                    💬 Satzmuster
                </h3>

                <div class="detail-box">

                    <ul
                        class="example-list"
                    >

                        ${patterns
                            .map(
                                item =>
                                    `<li>
                                        ${esc(item)}
                                    </li>`
                            )
                            .join("")
                        }

                    </ul>

                </div>

            </div>

        `;

    }


    if (
        examples.length
    ) {

        html += `

            <div
                class="detail-block"
            >

                <h3>
                    💡 Beispiele
                </h3>

                <div class="detail-box">

                    <ul
                        class="example-list"
                    >

                        ${examples
                            .map(
                                item =>
                                    `<li>
                                        ${esc(item)}
                                    </li>`
                            )
                            .join("")
                        }

                    </ul>

                </div>

            </div>

        `;

    }


    if (row.merke) {

        html += `

            <div
                class="detail-block"
            >

                <h3>
                    🧠 Merke
                </h3>

                <div class="detail-box">

                    <strong>

                        ${esc(
                            row.merke
                        )}

                    </strong>

                </div>

            </div>

        `;

    }


    if (row.image_url) {

        html += `

            <div
                class="detail-block"
            >

                <img
                    src="${esc(
                        row.image_url
                    )}"
                    alt=""
                    style="
                        width:100%;
                        border-radius:18px;
                    "
                >

            </div>

        `;

    }


    return html;

}


// ======================================================
// 14. OPEN MODAL
// ======================================================

function openModal(
    title,
    content
) {

    const modal =
        createModal();


    const modalContent =
        document.getElementById(
            "modalContent"
        );


    modalContent.innerHTML = `

        <span class="eyebrow">
            REVISION
        </span>

        <h2>
            ${esc(title)}
        </h2>

        ${content}

    `;


    modal.classList.add(
        "open"
    );

}


// ======================================================
// 15. OPEN TOPIC
// ======================================================

async function openTopic(
    id
) {

    const result =
        await getRows(
            "topics",
            {
                eq: {
                    id
                }
            }
        );


    if (
        !result.error &&
        result.data &&
        result.data.length
    ) {

        openModal(

            result.data[0].title,

            renderDetail(
                result.data[0]
            )

        );

    }

}


// ======================================================
// 16. OPEN GRAMMAR
// ======================================================

async function openGrammar(
    id
) {

    const result =
        await getRows(
            "grammar_topics",
            {
                eq: {
                    id
                }
            }
        );


    if (
        !result.error &&
        result.data &&
        result.data.length
    ) {

        openModal(

            result.data[0].title,

            renderDetail(
                result.data[0]
            )

        );

    }

}


// ======================================================
// 17. GET FALLBACK LEVEL
// ======================================================

function getFallbackLevel(
    level
) {

    return (

        fallbackLevels.find(
            item =>
                item.level === level
        )

    ) || {

        level,

        title:
            level,

        tagline:
            "",

        goal:
            "",

        description:
            "",

        theme_count:
            0,

        grammar_count:
            0

    };

}


// ======================================================
// 18. LEARNWELTEN TABS
// ======================================================

async function renderLearnTabs(
    initialLevel = "A1"
) {

    const content =
        document.getElementById(
            "level-tab-content"
        );


    const buttons =
        document.querySelectorAll(
            "[data-level-tab]"
        );


    if (!content) {

        return;

    }


    let selectedLevel =
        initialLevel;


    /*
    Mark active tab
    */

    function markActive() {

        buttons.forEach(
            button => {

                const active =
                    button.dataset
                        .levelTab ===
                    selectedLevel;


                button.classList.toggle(
                    "active",
                    active
                );


                button.setAttribute(
                    "aria-selected",
                    String(active)
                );

            }
        );

    }


    /*
    Load selected level
    */

    async function loadLevel(
        level
    ) {

        selectedLevel =
            level;


        markActive();


        const fallback =
            getFallbackLevel(
                level
            );


        /*
        First render level shell
        */

        content.innerHTML = `

            <div
                class="selected-level-heading"
            >

                <div>

                    <span class="eyebrow">

                        ${esc(level)}

                    </span>


                    <h2>

                        ${esc(
                            fallback.title
                        )}

                    </h2>


                    <p>

                        ${esc(
                            fallback.tagline
                        )}

                    </p>

                </div>


                <div
                    class="selected-level-goal"
                >

                    <strong>
                        Dein Lernziel
                    </strong>

                    <p>

                        ${esc(
                            fallback.goal
                        )}

                    </p>

                </div>

            </div>


            <div
                class="level-content-columns"
            >

                <section>

                    <div
                        class="
                            section-heading
                            compact
                        "
                    >

                        <div>

                            <span class="eyebrow">
                                THEMEN
                            </span>

                            <h2>
                                Was du lernen kannst
                            </h2>

                        </div>

                    </div>


                    <div
                        id="tab-topics"
                        class="topic-grid"
                    ></div>

                </section>


                <section>

                    <div
                        class="
                            section-heading
                            compact
                        "
                    >

                        <div>

                            <span class="eyebrow">
                                GRAMMATIK
                            </span>

                            <h2>
                                Wichtige Grammatik
                            </h2>

                        </div>

                    </div>


                    <div
                        id="tab-grammar"
                        class="grammar-list"
                    ></div>

                </section>

            </div>

        `;


        const topicsHost =
            document.getElementById(
                "tab-topics"
            );


        const grammarHost =
            document.getElementById(
                "tab-grammar"
            );


        topicsHost.innerHTML = `

            <div class="loading">

                Themen werden geladen …

            </div>

        `;


        grammarHost.innerHTML = `

            <div class="loading">

                Grammatik wird geladen …

            </div>

        `;


        /*
        Load level data,
        topics and grammar together.
        */

        const [
            levelResult,
            topicResult,
            grammarResult

        ] = await Promise.all([

            getRows(
                "levels",
                {
                    eq: {
                        level
                    }
                }
            ),

            getRows(
                "topics",
                {
                    eq: {
                        level
                    },
                    order:
                        "sort_order"
                }
            ),

            getRows(
                "grammar_topics",
                {
                    eq: {
                        level
                    },
                    order:
                        "sort_order"
                }
            )

        ]);


        /*
        Update level introduction
        */

        if (
            !levelResult.error &&
            levelResult.data &&
            levelResult.data.length
        ) {

            const levelData =
                levelResult.data[0];


            const title =
                document.querySelector(
                    ".selected-level-heading h2"
                );


            const tagline =
                document.querySelector(
                    ".selected-level-heading > div:first-child p"
                );


            const goal =
                document.querySelector(
                    ".selected-level-goal p"
                );


            if (title) {

                title.textContent =
                    levelData.title || level;

            }


            if (tagline) {

                tagline.textContent =
                    levelData.tagline || "";

            }


            if (goal) {

                goal.textContent =
                    levelData.goal || "";

            }

        }


        // ==========================================
        // TOPICS
        // ==========================================

        if (
            topicResult.error ||
            !topicResult.data ||
            !topicResult.data.length
        ) {

            if (level === "B2") {

                topicsHost.innerHTML = `

                    <div
                        class="
                            empty-state
                            b2-empty
                        "
                    >

                        <div
                            class="empty-icon"
                        >
                            🌿
                        </div>

                        <h3>
                            B2 ist vorbereitet.
                        </h3>

                        <p>
                            Die B2-Lernwelt ist bereits
                            vorhanden. Füge deine B2-Themen
                            später direkt in Supabase hinzu.
                        </p>

                    </div>

                `;

            } else {

                topicsHost.innerHTML = `

                    <div class="empty-state">

                        Noch keine Themen
                        in Supabase.

                    </div>

                `;

            }

        } else {

            const topics =
                topicResult.data.filter(
                    topic =>
                        topic.published !== false
                );


            topicsHost.innerHTML =
                topics
                    .map(
                        topic => `

                            <article
                                class="topic-card"
                            >

                                <div
                                    class="topic-icon"
                                >

                                    ${esc(
                                        topic.icon ||
                                        "📘"
                                    )}

                                </div>


                                <span
                                    class="eyebrow"
                                >

                                    ${esc(
                                        topic.category ||
                                        "Thema"
                                    )}

                                </span>


                                <h3>

                                    ${esc(
                                        topic.title
                                    )}

                                </h3>


                                <p
                                    class="summary"
                                >

                                    ${esc(
                                        topic.summary ||
                                        ""
                                    )}

                                </p>


                                <button
                                    class="
                                        button
                                        secondary
                                    "
                                    data-topic-id="${
                                        esc(
                                            topic.id
                                        )
                                    }"
                                >

                                    Ansehen

                                </button>

                            </article>

                        `
                    )
                    .join("");


            topicsHost
                .querySelectorAll(
                    "[data-topic-id]"
                )
                .forEach(
                    button => {

                        button.onclick =
                            function () {

                                openTopic(
                                    button.dataset
                                        .topicId
                                );

                            };

                    }
                );

        }


        // ==========================================
        // GRAMMAR
        // ==========================================

        if (
            grammarResult.error ||
            !grammarResult.data ||
            !grammarResult.data.length
        ) {

            if (level === "B2") {

                grammarHost.innerHTML = `

                    <div
                        class="
                            empty-state
                            b2-empty
                        "
                    >

                        <div
                            class="empty-icon"
                        >
                            📖
                        </div>

                        <h3>
                            B2-Grammatik ist vorbereitet.
                        </h3>

                        <p>
                            Füge B2-Grammatik später
                            direkt in der Tabelle
                            <strong>
                                grammar_topics
                            </strong>
                            hinzu.
                        </p>

                    </div>

                `;

            } else {

                grammarHost.innerHTML = `

                    <div class="empty-state">

                        Noch keine Grammatikthemen
                        in Supabase.

                    </div>

                `;

            }

        } else {

            const grammar =
                grammarResult.data.filter(
                    item =>
                        item.published !== false
                );


            grammarHost.innerHTML =
                grammar
                    .map(
                        (item, index) => `

                            <article
                                class="grammar-item"
                            >

                                <div
                                    class="
                                        grammar-number
                                    "
                                >

                                    ${
                                        String(
                                            index + 1
                                        ).padStart(
                                            2,
                                            "0"
                                        )
                                    }

                                </div>


                                <div>

                                    <h3>

                                        ${esc(
                                            item.title
                                        )}

                                    </h3>


                                    <p>

                                        ${esc(
                                            item.short_explanation ||
                                            ""
                                        )}

                                    </p>

                                </div>


                                <button
                                    class="
                                        button
                                        secondary
                                        open-detail
                                    "
                                    data-grammar-id="${
                                        esc(
                                            item.id
                                        )
                                    }"
                                >

                                    Ansehen

                                </button>

                            </article>

                        `
                    )
                    .join("");


            grammarHost
                .querySelectorAll(
                    "[data-grammar-id]"
                )
                .forEach(
                    button => {

                        button.onclick =
                            function () {

                                openGrammar(
                                    button.dataset
                                        .grammarId
                                );

                            };

                    }
                );

        }

    }


    /*
    Tab click
    */

    buttons.forEach(
        button => {

            button.onclick =
                function () {

                    const level =
                        button.dataset
                            .levelTab;


                    loadLevel(
                        level
                    );


                    history.replaceState(
                        null,
                        "",
                        "lernen.html?level=" +
                        encodeURIComponent(
                            level
                        )
                    );

                };

        }
    );


    /*
    Load initial level
    */

    await loadLevel(
        selectedLevel
    );

}


// ======================================================
// 19. VOCABULARY PAGE
// ======================================================

async function renderVocabulary() {

    const grid =
        document.getElementById(
            "vocab-grid"
        );


    const filterHost =
        document.getElementById(
            "vocab-filters"
        );


    if (
        !grid ||
        !filterHost
    ) {

        return;

    }


    const result =
        await getRows(
            "vocabulary",
            {
                order:
                    "sort_order"
            }
        );


    if (
        result.error ||
        !result.data ||
        !result.data.length
    ) {

        grid.innerHTML = `

            <div class="empty-state">

                Noch kein Wortschatz
                in Supabase.

            </div>

        `;

        return;

    }


    const rows =
        result.data.filter(
            item =>
                item.published !== false
        );


    let selectedLevel =
        "Alle";


    let selectedCategory =
        "Alle";


    const levels = [

        "Alle",

        ...new Set(

            rows

                .map(
                    item =>
                        item.level
                )

                .filter(Boolean)

        )

    ];


    const categories = [

        "Alle",

        ...new Set(

            rows

                .map(
                    item =>
                        item.category
                )

                .filter(Boolean)

        )

    ];


    function draw() {

        filterHost.innerHTML = "";


        const levelBox =
            document.createElement(
                "div"
            );


        levelBox.className =
            "filters";


        createFilterButtons(

            levelBox,

            levels,

            selectedLevel,

            function (value) {

                selectedLevel =
                    value;

                draw();

            }

        );


        const categoryBox =
            document.createElement(
                "div"
            );


        categoryBox.className =
            "filters";


        createFilterButtons(

            categoryBox,

            categories,

            selectedCategory,

            function (value) {

                selectedCategory =
                    value;

                draw();

            }

        );


        filterHost.append(
            levelBox,
            categoryBox
        );


        const filtered =
            rows.filter(
                row =>

                    (
                        selectedLevel === "Alle" ||

                        row.level ===
                            selectedLevel
                    )

                    &&

                    (
                        selectedCategory === "Alle" ||

                        row.category ===
                            selectedCategory
                    )

            );


        grid.innerHTML =
            filtered
                .map(
                    word => `

                        <article
                            class="vocab-card"
                        >

                            <span
                                class="eyebrow"
                            >

                                ${esc(
                                    word.level
                                )}

                                ·

                                ${esc(
                                    word.category
                                )}

                            </span>


                            <div
                                class="vocab-word"
                            >

                                ${esc(
                                    word.article
                                        ? word.article + " "
                                        : ""
                                )}

                                ${esc(
                                    word.word
                                )}

                            </div>


                            <div
                                class="vocab-meta"
                            >

                                ${
                                    word.plural
                                        ? "Plural: " +
                                          esc(
                                              word.plural
                                          )
                                        : ""
                                }


                                ${
                                    word.meaning
                                        ? " · " +
                                          esc(
                                              word.meaning
                                          )
                                        : ""
                                }

                            </div>


                            <div
                                class="vocab-example"
                            >

                                ${esc(
                                    word.example ||
                                    ""
                                )}

                            </div>

                        </article>

                    `
                )
                .join("");


        if (!filtered.length) {

            grid.innerHTML = `

                <div class="empty-state">

                    Keine Wörter
                    für diese Auswahl.

                </div>

            `;

        }

    }


    draw();

}


// ======================================================
// 20. GRAMMAR PAGE
// ======================================================

async function renderGrammar() {

    const grid =
        document.getElementById(
            "grammar-grid"
        );


    const filterHost =
        document.getElementById(
            "grammar-filters"
        );


    if (
        !grid ||
        !filterHost
    ) {

        return;

    }


    const result =
        await getRows(
            "grammar_topics",
            {
                order:
                    "sort_order"
            }
        );


    if (
        result.error ||
        !result.data ||
        !result.data.length
    ) {

        grid.innerHTML = `

            <div class="empty-state">

                Noch keine Grammatikthemen
                in Supabase.

            </div>

        `;

        return;

    }


    const rows =
        result.data.filter(
            item =>
                item.published !== false
        );


    let selectedLevel =
        "Alle";


    const levels = [

        "Alle",

        ...new Set(

            rows

                .map(
                    item =>
                        item.level
                )

                .filter(Boolean)

        )

    ];


    function draw() {

        createFilterButtons(

            filterHost,

            levels,

            selectedLevel,

            function (value) {

                selectedLevel =
                    value;

                draw();

            }

        );


        const filtered =
            rows.filter(
                row =>

                    selectedLevel === "Alle" ||

                    row.level ===
                        selectedLevel

            );


        grid.innerHTML =
            filtered
                .map(
                    grammar => `

                        <article
                            class="grammar-card"
                        >

                            <span
                                class="level-badge"
                            >

                                ${esc(
                                    grammar.level
                                )}

                            </span>


                            <h3>

                                ${esc(
                                    grammar.title
                                )}

                            </h3>


                            <p>

                                ${esc(
                                    grammar.short_explanation ||
                                    ""
                                )}

                            </p>


                            <div
                                class="rule"
                            >

                                ${esc(
                                    grammar.rule_preview ||
                                    ""
                                )}

                            </div>


                            <br>


                            <button
                                class="
                                    button
                                    secondary
                                "
                                data-grammar-open="${
                                    esc(
                                        grammar.id
                                    )
                                }"
                            >

                                Ansehen

                            </button>

                        </article>

                    `
                )
                .join("");


        grid
            .querySelectorAll(
                "[data-grammar-open]"
            )
            .forEach(
                button => {

                    button.onclick =
                        function () {

                            openGrammar(
                                button.dataset
                                    .grammarOpen
                            );

                        };

                }
            );

    }


    draw();

}


// ======================================================
// 21. ESCAPE KEY
// ======================================================

document.addEventListener(
    "keydown",

    function (event) {

        if (
            event.key === "Escape"
        ) {

            const modal =
                document.querySelector(
                    ".detail-modal.open"
                );


            if (modal) {

                modal.classList.remove(
                    "open"
                );

            }

        }

    }

);


// ======================================================
// 22. START WEBSITE
// ======================================================

(async function init() {


    renderHeader();


    renderFooter();


    /*
    Connect to Supabase
    */

    try {

        await connectSupabase();

    } catch (error) {

        console.error(
            "Supabase connection failed:",
            error
        );

    }


    /*
    Decide which page is open
    */

    if (
        page === "home"
    ) {

        await renderHomeLevels();

    }


    else if (
        page === "learn"
    ) {

        const levelFromUrl =
            new URLSearchParams(
                window.location.search
            ).get("level");


        const allowedLevels = [
            "A1",
            "A2",
            "B1",
            "B2"
        ];


        await renderLearnTabs(

            allowedLevels.includes(
                levelFromUrl
            )
                ? levelFromUrl
                : "A1"

        );

    }


    else if (
        page === "vocabulary"
    ) {

        await renderVocabulary();

    }


    else if (
        page === "grammar"
    ) {

        await renderGrammar();

    }

})();
