/*
========================================================
DEUTSCHWELT
========================================================

GitHub:
    Website code

Supabase:
    ALL learning content

Levels:
    A1
    A2
    B1
    B2

Normal future content additions:
    Supabase → Table Editor

No JavaScript changes are needed when you add
normal topics, grammar or vocabulary.
========================================================
*/


// ======================================================
// 1. SUPABASE SETTINGS
// ======================================================

const SUPABASE_URL =
    "https://llxcyabptsbdtsdhkzkc.supabase.co";


const SUPABASE_ANON_KEY =
    "sb_publishable_MKh0z87kMiDAQX3jnaoADQ_-D0_XXd4";


const SUPABASE_CDN =
    "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";


let supabaseClient = null;


// ======================================================
// 2. LEVEL INFORMATION
// ======================================================

const levelInfo = {

    A1: {

        title:
            "Dein erster Schritt",

        tagline:
            "Von Hallo zu deinen ersten Sätzen.",

        goal:
            "Du lernst grundlegende Wörter und Sätze für wichtige Alltagssituationen."

    },


    A2: {

        title:
            "Mehr verstehen. Mehr sagen.",

        tagline:
            "Dein Deutsch wird sicherer und vielseitiger.",

        goal:
            "Du kannst vertraute Alltagssituationen selbstständiger beschreiben und über Erfahrungen sprechen."

    },


    B1: {

        title:
            "Mit Deutsch selbstständig durch die Welt",

        tagline:
            "Zusammenhängend sprechen und schreiben.",

        goal:
            "Du kannst dich zu vertrauten Themen zusammenhängend äußern und deine Meinung begründen."

    },


    B2: {

        title:
            "Sicher und präzise kommunizieren",

        tagline:
            "Komplexere Themen verstehen und differenziert ausdrücken.",

        goal:
            "Du kannst komplexere Inhalte verstehen und deine Gedanken klar und präzise formulieren."

    }

};


// ======================================================
// 3. BASIC HELPERS
// ======================================================

function escapeHTML(
    value = ""
) {

    return String(value).replace(
        /[&<>"']/g,

        function (character) {

            const map = {

                "&": "&amp;",

                "<": "&lt;",

                ">": "&gt;",

                '"': "&quot;",

                "'": "&#39;"

            };

            return map[character];

        }

    );

}


function convertToArray(
    value
) {

    if (!value) {

        return [];

    }


    if (
        Array.isArray(value)
    ) {

        return value;

    }


    try {

        const parsed =
            JSON.parse(value);


        if (
            Array.isArray(parsed)
        ) {

            return parsed;

        }

        return [parsed];

    }

    catch (error) {

        return String(value)
            .split("\n")
            .map(
                item =>
                    item.trim()
            )
            .filter(Boolean);

    }

}


// ======================================================
// 4. CONNECT SUPABASE
// ======================================================

async function connectSupabase() {

    /*
    Check credentials
    */

    if (

        !SUPABASE_URL ||

        SUPABASE_URL.includes(
            "PASTE_"
        ) ||

        !SUPABASE_ANON_KEY ||

        SUPABASE_ANON_KEY.includes(
            "PASTE_"
        )

    ) {

        console.warn(
            "Supabase credentials are missing."
        );

        return false;

    }


    /*
    Load Supabase library
    */

    if (!window.supabase) {

        await new Promise(
            function (
                resolve,
                reject
            ) {

                const script =
                    document.createElement(
                        "script"
                    );


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
                    "Supabase library failed:",
                    error
                );

            }
        );

    }


    if (!window.supabase) {

        return false;

    }


    /*
    Create client
    */

    supabaseClient =
        window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_ANON_KEY
        );


    return true;

}


// ======================================================
// 5. DATABASE QUERY
// ======================================================

async function getData(
    table,
    level
) {

    if (!supabaseClient) {

        return {

            data: null,

            error:
                new Error(
                    "Supabase not connected."
                )

        };

    }


    try {

        return await supabaseClient

            .from(table)

            .select("*")

            .eq(
                "level",
                level
            )

            .eq(
                "published",
                true
            )

            .order(
                "sort_order",
                {
                    ascending: true
                }
            );

    }

    catch (error) {

        return {

            data: null,

            error

        };

    }

}


// ======================================================
// 6. UPDATE LEVEL TABS
// ======================================================

function updateActiveTab(
    selectedLevel
) {

    document
        .querySelectorAll(
            ".level-tab"
        )
        .forEach(
            function (button) {

                const isActive =
                    button.dataset
                        .level ===
                    selectedLevel;


                button.classList.toggle(
                    "active",
                    isActive
                );

            }
        );

}


// ======================================================
// 7. CREATE LEVEL HEADER
// ======================================================

function createLevelHeader(
    level
) {

    const info =
        levelInfo[level];


    return `

        <div
            class="level-banner selected-level"
        >

            <div>

                <span class="eyebrow">
                    ${escapeHTML(level)}
                </span>


                <h2>

                    ${escapeHTML(
                        info.title
                    )}

                </h2>


                <p>

                    ${escapeHTML(
                        info.tagline
                    )}

                </p>

            </div>


            <div class="level-goal">

                <strong>
                    Dein Lernziel
                </strong>


                <p>

                    ${escapeHTML(
                        info.goal
                    )}

                </p>

            </div>

        </div>

    `;

}


// ======================================================
// 8. CREATE TOPIC CARD
// ======================================================

function createTopicCard(
    topic
) {

    return `

        <article
            class="topic-card"
        >

            <div class="topic-icon">

                ${escapeHTML(
                    topic.icon ||
                    "📘"
                )}

            </div>


            <span class="eyebrow">

                ${escapeHTML(
                    topic.category ||
                    "Thema"
                )}

            </span>


            <h3>

                ${escapeHTML(
                    topic.title
                )}

            </h3>


            <p>

                ${escapeHTML(
                    topic.summary ||
                    ""
                )}

            </p>


            <button
                class="button secondary"
                data-topic-id="${
                    escapeHTML(
                        topic.id
                    )
                }"
            >

                Inhalt ansehen

            </button>

        </article>

    `;

}


// ======================================================
// 9. CREATE GRAMMAR ITEM
// ======================================================

function createGrammarItem(
    grammar,
    index
) {

    return `

        <article
            class="grammar-item"
        >

            <div
                class="grammar-number"
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

                    ${escapeHTML(
                        grammar.title
                    )}

                </h3>


                <p>

                    ${escapeHTML(
                        grammar.short_explanation ||
                        ""
                    )}

                </p>

            </div>


            <button
                class="button secondary"
                data-grammar-id="${
                    escapeHTML(
                        grammar.id
                    )
                }"
            >

                Ansehen

            </button>

        </article>

    `;

}


// ======================================================
// 10. OPEN DETAIL MODAL
// ======================================================

function openDetail(
    title,
    record
) {

    let modal =
        document.getElementById(
            "detailModal"
        );


    /*
    Create modal
    */

    if (!modal) {

        document.body.insertAdjacentHTML(

            "beforeend",

            `

                <div
                    class="detail-modal"
                    id="detailModal"
                >

                    <div
                        class="modal-card"
                    >

                        <button
                            class="modal-close"
                            id="modalClose"
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


        document
            .getElementById(
                "modalClose"
            )
            .onclick =
                function () {

                    modal.classList.remove(
                        "open"
                    );

                };


        modal.onclick =
            function (event) {

                if (
                    event.target ===
                    modal
                ) {

                    modal.classList.remove(
                        "open"
                    );

                }

            };

    }


    const keyPoints =
        convertToArray(
            record.key_points
        );


    const sentencePatterns =
        convertToArray(
            record.sentence_patterns
        );


    const examples =
        convertToArray(
            record.examples
        );


    let html = `

        <span class="eyebrow">
            REVISION
        </span>


        <h2>

            ${escapeHTML(
                title
            )}

        </h2>

    `;


    /*
    Explanation
    */

    if (
        record.explanation
    ) {

        html += `

            <div
                class="detail-block"
            >

                <h3>
                    📖 Einfach erklärt
                </h3>


                <div
                    class="detail-box"
                >

                    ${escapeHTML(
                        record.explanation
                    )}

                </div>

            </div>

        `;

    }


    /*
    Important points
    */

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


                <div
                    class="detail-box"
                >

                    <ul>

                        ${keyPoints
                            .map(
                                item =>
                                    `
                                        <li>
                                            ${escapeHTML(
                                                item
                                            )}
                                        </li>
                                    `
                            )
                            .join("")
                        }

                    </ul>

                </div>

            </div>

        `;

    }


    /*
    Sentence patterns
    */

    if (
        sentencePatterns.length
    ) {

        html += `

            <div
                class="detail-block"
            >

                <h3>
                    💬 Satzmuster
                </h3>


                <div
                    class="detail-box"
                >

                    <ul>

                        ${sentencePatterns
                            .map(
                                item =>
                                    `
                                        <li>
                                            ${escapeHTML(
                                                item
                                            )}
                                        </li>
                                    `
                            )
                            .join("")
                        }

                    </ul>

                </div>

            </div>

        `;

    }


    /*
    Examples
    */

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


                <div
                    class="detail-box"
                >

                    <ul>

                        ${examples
                            .map(
                                item =>
                                    `
                                        <li>
                                            ${escapeHTML(
                                                item
                                            )}
                                        </li>
                                    `
                            )
                            .join("")
                        }

                    </ul>

                </div>

            </div>

        `;

    }


    /*
    Merke
    */

    if (
        record.merke
    ) {

        html += `

            <div
                class="detail-block"
            >

                <h3>
                    🧠 Merke
                </h3>


                <div
                    class="detail-box"
                >

                    <strong>

                        ${escapeHTML(
                            record.merke
                        )}

                    </strong>

                </div>

            </div>

        `;

    }


    /*
    Image
    */

    if (
        record.image_url
    ) {

        html += `

            <div
                class="detail-block"
            >

                <img
                    class="detail-image"
                    src="${escapeHTML(
                        record.image_url
                    )}"
                    alt=""
                >

            </div>

        `;

    }


    document
        .getElementById(
            "modalContent"
        )
        .innerHTML =
            html;


    modal.classList.add(
        "open"
    );

}


// ======================================================
// 11. LOAD ONE LEVEL
// ======================================================

async function loadLevel(
    level
) {

    const content =
        document.getElementById(
            "levelContent"
        );


    if (!content) {

        return;

    }


    /*
    Update active A1/A2/B1/B2 button
    */

    updateActiveTab(
        level
    );


    /*
    Show loading message
    */

    content.innerHTML = `

        ${createLevelHeader(level)}

        <div class="loading">

            ${escapeHTML(level)}
            wird geladen …

        </div>

    `;


    /*
    Get topics and grammar
    */

    const [
        topicsResult,
        grammarResult
    ] = await Promise.all([

        getData(
            "topics",
            level
        ),

        getData(
            "grammar_topics",
            level
        )

    ]);


    const topics =
        topicsResult.data || [];


    const grammar =
        grammarResult.data || [];


    /*
    Create page
    */

    let html =
        createLevelHeader(
            level
        );


    // ==============================================
    // TOPICS
    // ==============================================

    html += `

        <section
            class="content-section"
        >

            <span class="eyebrow">
                THEMEN
            </span>


            <h2>
                ${escapeHTML(level)}
                Themen
            </h2>

    `;


    if (
        topicsResult.error
    ) {

        html += `

            <div class="empty-state">

                <strong>
                    Supabase-Fehler
                </strong>

                <p>
                    Die Themen konnten nicht
                    geladen werden.
                </p>

            </div>

        `;

    }

    else if (
        !topics.length
    ) {

        html += `

            <div class="empty-state">

                Für ${escapeHTML(level)}
                wurden noch keine Themen
                in Supabase hinzugefügt.

                <br><br>

                Du kannst sie später in
                <strong>
                    Supabase → topics
                </strong>
                hinzufügen.

            </div>

        `;

    }

    else {

        html += `

            <div class="topic-grid">

                ${topics
                    .map(
                        createTopicCard
                    )
                    .join("")
                }

            </div>

        `;

    }


    html += `
        </section>
    `;


    // ==============================================
    // GRAMMAR
    // ==============================================

    html += `

        <section
            class="content-section"
        >

            <span class="eyebrow">
                GRAMMATIK
            </span>


            <h2>
                Grammatik
            </h2>

    `;


    if (
        grammarResult.error
    ) {

        html += `

            <div class="empty-state">

                <strong>
                    Supabase-Fehler
                </strong>

                <p>
                    Die Grammatik konnte nicht
                    geladen werden.
                </p>

            </div>

        `;

    }

    else if (
        !grammar.length
    ) {

        html += `

            <div class="empty-state">

                Für ${escapeHTML(level)}
                wurden noch keine Grammatikthemen
                in Supabase hinzugefügt.

                <br><br>

                Du kannst sie später in
                <strong>
                    Supabase → grammar_topics
                </strong>
                hinzufügen.

            </div>

        `;

    }

    else {

        html += `

            <div class="grammar-list">

                ${grammar
                    .map(
                        createGrammarItem
                    )
                    .join("")
                }

            </div>

        `;

    }


    html += `
        </section>
    `;


    /*
    Display content
    */

    content.innerHTML =
        html;


    /*
    Topic click events
    */

    content
        .querySelectorAll(
            "[data-topic-id]"
        )
        .forEach(
            function (button) {

                button.onclick =
                    async function () {

                        const result =
                            await getRows(
                                "topics",
                                level
                            );


                        if (
                            result.error
                        ) {

                            return;

                        }


                        const topic =
                            result.data.find(
                                item =>
                                    String(
                                        item.id
                                    ) ===
                                    String(
                                        button.dataset
                                            .topicId
                                    )
                            );


                        if (topic) {

                            openDetail(
                                topic.title,
                                topic
                            );

                        }

                    };

            }
        );


    /*
    Grammar click events
    */

    content
        .querySelectorAll(
            "[data-grammar-id]"
        )
        .forEach(
            function (button) {

                button.onclick =
                    async function () {

                        const result =
                            await getData(
                                "grammar_topics",
                                level
                            );


                        if (
                            result.error
                        ) {

                            return;

                        }


                        const grammarItem =
                            result.data.find(
                                item =>
                                    String(
                                        item.id
                                    ) ===
                                    String(
                                        button.dataset
                                            .grammarId
                                    )
                            );


                        if (
                            grammarItem
                        ) {

                            openDetail(
                                grammarItem.title,
                                grammarItem
                            );

                        }

                    };

            }
        );


    /*
    Keep URL synchronized.
    */

    history.replaceState(
        null,
        "",
        "index.html?level=" +
        encodeURIComponent(
            level
        )
    );

}


// ======================================================
// 12. LEVEL BUTTON EVENTS
// ======================================================

function setupLevelButtons() {

    document
        .querySelectorAll(
            ".level-tab"
        )
        .forEach(
            function (button) {

                button.onclick =
                    function () {

                        loadLevel(
                            button.dataset.level
                        );


                        document
                            .getElementById(
                                "levels"
                            )
                            ?.scrollIntoView({
                                behavior:
                                    "smooth"
                            });

                    };

            }
        );

}


// ======================================================
// 13. START WEBSITE
// ======================================================

document.addEventListener(
    "DOMContentLoaded",
    async function () {


        /*
        Current year
        */

        const year =
            document.getElementById(
                "currentYear"
            );


        if (year) {

            year.textContent =
                new Date()
                    .getFullYear();

        }


        /*
        Connect Supabase
        */

        try {

            await connectSupabase();

        }

        catch (error) {

            console.error(
                "Supabase connection error:",
                error
            );

        }


        /*
        Setup A1/A2/B1/B2
        */

        setupLevelButtons();


        /*
        Check URL
        */

        const urlLevel =
            new URLSearchParams(
                window.location.search
            ).get(
                "level"
            );


        const validLevels = [

            "A1",
            "A2",
            "B1",
            "B2"

        ];


        const initialLevel =
            validLevels.includes(
                urlLevel
            )

                ? urlLevel

                : "A1";


        /*
        Load initial level
        */

        await loadLevel(
            initialLevel
        );

    }
);


// ======================================================
// 14. ESCAPE TO CLOSE MODAL
// ======================================================

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key !==
            "Escape"
        ) {

            return;

        }


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
);
