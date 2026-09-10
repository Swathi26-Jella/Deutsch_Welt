// ======================================================
// DEUTSCHWELT
// Supabase + Level Page
// ======================================================


// ------------------------------------------------------
// SUPABASE SETTINGS
// ------------------------------------------------------

const SUPABASE_URL =
    "https://llxcyabptsbdtsdhkzkc.supabase.co";

const SUPABASE_ANON_KEY =
    "sb_publishable_MKh0z87kMiDAQX3jnaoADQ_-D0_XXd4";


// ------------------------------------------------------
// GLOBAL VARIABLES
// ------------------------------------------------------

let supabaseClient = null;

let currentLevel = null;

let currentTopics = [];

let currentGrammar = [];


// ------------------------------------------------------
// LEVEL INFORMATION
// ------------------------------------------------------

const levelInfo = {

    A1: {
        title: "A1 – Deutsch von Anfang an",
        eyebrow: "A1 · Anfänger",
        description:
            "Lerne Deutsch Schritt für Schritt – vom Alphabet und den ersten Wörtern bis zu wichtigen Alltagssätzen und grundlegender Grammatik."
    },

    A2: {
        title: "A2 – Deutsch im Alltag",
        eyebrow: "A2 · Grundkenntnisse",
        description:
            "Festige deine Grundlagen und erweitere deinen Wortschatz und deine Grammatik für Alltag, Arbeit und Gespräche."
    },

    B1: {
        title: "B1 – Sicherer Deutsch sprechen",
        eyebrow: "B1 · Mittelstufe",
        description:
            "Baue deinen Wortschatz aus und lerne wichtige Strukturen für Alltag, Beruf, Gespräche und schriftliche Kommunikation."
    },

    B2: {
        title: "B2 – Deutsch sicher anwenden",
        eyebrow: "B2 · Fortgeschritten",
        description:
            "Vertiefe Grammatik, Wortschatz und sprachliche Strukturen für anspruchsvollere Gespräche und Texte."
    }

};


// ------------------------------------------------------
// LOAD SUPABASE
// ------------------------------------------------------

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


        script.onload = () => {

            resolve();

        };


        script.onerror = () => {

            reject(
                new Error(
                    "Supabase JavaScript konnte nicht geladen werden."
                )
            );

        };


        document.head.appendChild(script);

    });

}


// ------------------------------------------------------
// CONNECT SUPABASE
// ------------------------------------------------------

async function connectSupabase() {

    try {

        await loadSupabaseLibrary();


        if (
            !SUPABASE_URL ||
            !SUPABASE_ANON_KEY ||
            SUPABASE_ANON_KEY.includes("PASTE_YOUR")
        ) {

            throw new Error(
                "Supabase API Key wurde noch nicht eingetragen."
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

        console.error(
            "Supabase connection error:",
            error
        );


        showPageError(
            "Die Verbindung zu den Lerninhalten konnte nicht hergestellt werden."
        );


        return false;
    }

}


// ------------------------------------------------------
// GET LEVEL FROM URL
// ------------------------------------------------------

function getLevelFromURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    let level =
        params.get("level");


    if (!level) {

        level = "A1";

    }


    level = level.toUpperCase();


    if (
        !["A1", "A2", "B1", "B2"]
            .includes(level)
    ) {

        level = "A1";

    }


    return level;

}


// ------------------------------------------------------
// UPDATE PAGE HEADER
// ------------------------------------------------------

function updateLevelHeader(level) {

    const info =
        levelInfo[level];


    document.title =
        `DeutschWelt – ${level}`;


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


    if (title) {

        title.textContent =
            info.title;

    }


    if (eyebrow) {

        eyebrow.textContent =
            info.eyebrow;

    }


    if (description) {

        description.textContent =
            info.description;

    }


    updateLevelLinks(level);

}


// ------------------------------------------------------
// ACTIVE LEVEL LINK
// ------------------------------------------------------

function updateLevelLinks(level) {

    const links =
        document.querySelectorAll(
            "[data-level-link]"
        );


    links.forEach(link => {

        const linkLevel =
            link.dataset.levelLink;


        if (linkLevel === level) {

            link.classList.add("selected");

        }

        else {

            link.classList.remove("selected");

        }

    });

}


// ------------------------------------------------------
// GET TOPICS
// ------------------------------------------------------

async function fetchTopics(level) {

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

        console.error(
            "Topic query error:",
            error
        );


        throw error;

    }


    return data || [];

}


// ------------------------------------------------------
// GET GRAMMAR
// ------------------------------------------------------

async function fetchGrammar(level) {

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

        console.error(
            "Grammar query error:",
            error
        );


        return [];

    }


    return data || [];

}


// ------------------------------------------------------
// ESCAPE HTML
// ------------------------------------------------------

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


// ------------------------------------------------------
// PARSE JSON SAFELY
// ------------------------------------------------------

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


        if (Array.isArray(parsed)) {

            return parsed;

        }


        return [parsed];

    }

    catch {

        return [];

    }

}


// ------------------------------------------------------
// RENDER TOPIC NAVIGATION
// ------------------------------------------------------

function renderTopicNavigation() {

    const navigation =
        document.getElementById(
            "topicNavigation"
        );


    navigation.innerHTML = "";


    if (!currentTopics.length) {

        navigation.innerHTML = `

            <div class="empty-sidebar">

                <div class="empty-icon">
                    📚
                </div>

                <p>
                    Für dieses Niveau wurden
                    noch keine Themen hinzugefügt.
                </p>

            </div>

        `;


        return;

    }


    const categories = {};


    currentTopics.forEach(topic => {

        const category =
            topic.category ||
            "Allgemein";


        if (!categories[category]) {

            categories[category] = [];

        }


        categories[category].push(topic);

    });


    Object.keys(categories).forEach(category => {

        const categoryBlock =
            document.createElement("div");


        categoryBlock.className =
            "topic-category";


        const heading =
            document.createElement("h3");


        heading.textContent =
            category;


        categoryBlock.appendChild(
            heading
        );


        categories[category].forEach(topic => {

            const button =
                document.createElement("button");


            button.type =
                "button";


            button.className =
                "topic-button";


            button.dataset.topicId =
                topic.id;


            button.innerHTML = `

                <span class="topic-icon">
                    ${escapeHTML(topic.icon || "📘")}
                </span>

                <span class="topic-button-text">
                    ${escapeHTML(topic.title)}
                </span>

            `;


            button.addEventListener(
                "click",
                () => {

                    showTopic(topic.id);

                }
            );


            categoryBlock.appendChild(
                button
            );

        });


        navigation.appendChild(
            categoryBlock
        );

    });

}


// ------------------------------------------------------
// SHOW TOPIC
// ------------------------------------------------------

function showTopic(topicId) {

    const topic =
        currentTopics.find(
            item =>
                String(item.id) ===
                String(topicId)
        );


    if (!topic) {

        console.error(
            "Topic not found:",
            topicId
        );


        return;

    }


    // remove active from all buttons

    document
        .querySelectorAll(".topic-button")
        .forEach(button => {

            button.classList.remove(
                "active"
            );

        });


    // activate selected button

    const selectedButton =
        document.querySelector(
            `.topic-button[data-topic-id="${topicId}"]`
        );


    if (selectedButton) {

        selectedButton.classList.add(
            "active"
        );

    }


    const content =
        document.getElementById(
            "topicContent"
        );


    content.innerHTML =
        buildTopicHTML(topic);


    // Move view to content on small screens

    if (
        window.innerWidth < 850
    ) {

        content.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


// ------------------------------------------------------
// BUILD TOPIC CONTENT
// ------------------------------------------------------

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


    let keyPointHTML = "";

    if (keyPoints.length) {

        keyPointHTML = `

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

        `;

    }


    let patternsHTML = "";

    if (patterns.length) {

        patternsHTML = `

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

        `;

    }


    let examplesHTML = "";

    if (examples.length) {

        examplesHTML = `

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

        `;

    }


    let imageHTML = "";

    if (topic.image_url) {

        imageHTML = `

            <div class="topic-image">

                <img
                    src="${escapeHTML(topic.image_url)}"
                    alt="${escapeHTML(topic.title)}"
                >

            </div>

        `;

    }


    return `

        <article class="topic-article">

            <div class="topic-article-header">

                <div class="article-icon">
                    ${escapeHTML(topic.icon || "📘")}
                </div>

                <div>

                    <span class="article-category">
                        ${escapeHTML(topic.category || "")}
                    </span>

                    <h2>
                        ${escapeHTML(topic.title)}
                    </h2>

                    ${
                        topic.summary
                        ?
                        `<p class="article-summary">
                            ${escapeHTML(topic.summary)}
                        </p>`
                        :
                        ""
                    }

                </div>

            </div>


            ${imageHTML}


            <section class="content-section first-section">

                <h3>
                    📖 Einfach erklärt
                </h3>

                <div class="explanation">

                    ${
                        topic.explanation
                        ?
                        escapeHTML(
                            topic.explanation
                        ).replace(
                            /\n/g,
                            "<br>"
                        )
                        :
                        "Noch keine Erklärung vorhanden."
                    }

                </div>

            </section>


            ${keyPointHTML}

            ${patternsHTML}

            ${examplesHTML}


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
                            ${escapeHTML(topic.merke)}
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


// ------------------------------------------------------
// LOAD LEVEL
// ------------------------------------------------------

async function loadLevel(level) {

    currentLevel =
        level;


    updateLevelHeader(
        level
    );


    const navigation =
        document.getElementById(
            "topicNavigation"
        );


    const content =
        document.getElementById(
            "topicContent"
        );


    navigation.innerHTML = `

        <div class="loading-message">

            <div class="loading-spinner"></div>

            Themen werden geladen ...

        </div>

    `;


    content.innerHTML = `

        <div class="welcome-content">

            <div class="welcome-icon">
                ⏳
            </div>

            <h2>
                Inhalte werden geladen ...
            </h2>

        </div>

    `;


    try {

        // Load both at the same time

        const [
            topics,
            grammar
        ] =
            await Promise.all([
                fetchTopics(level),
                fetchGrammar(level)
            ]);


        currentTopics =
            topics;


        currentGrammar =
            grammar;


        renderTopicNavigation();


        if (currentTopics.length) {

            // Automatically show first topic

            showTopic(
                currentTopics[0].id
            );

        }

        else {

            content.innerHTML = `

                <div class="welcome-content">

                    <div class="welcome-icon">
                        📚
                    </div>

                    <h2>
                        Noch keine Inhalte
                    </h2>

                    <p>
                        Für ${level} wurden noch
                        keine Themen veröffentlicht.
                    </p>

                </div>

            `;

        }


    }

    catch (error) {

        console.error(
            "Loading level failed:",
            error
        );


        navigation.innerHTML = `

            <div class="error-message">

                <strong>
                    Inhalte konnten nicht geladen werden.
                </strong>

                <p>
                    Prüfe deine Supabase URL,
                    deinen Public Key und die
                    RLS-Einstellungen.
                </p>

            </div>

        `;


        content.innerHTML = `

            <div class="welcome-content">

                <div class="welcome-icon">
                    ⚠️
                </div>

                <h2>
                    Verbindung fehlgeschlagen
                </h2>

                <p>
                    Die Lerninhalte konnten nicht
                    aus Supabase geladen werden.
                </p>

            </div>

        `;

    }

}


// ------------------------------------------------------
// PAGE ERROR
// ------------------------------------------------------

function showPageError(message) {

    const content =
        document.getElementById(
            "topicContent"
        );


    if (content) {

        content.innerHTML = `

            <div class="welcome-content">

                <div class="welcome-icon">
                    ⚠️
                </div>

                <h2>
                    Fehler
                </h2>

                <p>
                    ${escapeHTML(message)}
                </p>

            </div>

        `;

    }

}


// ------------------------------------------------------
// INITIALIZE LEVEL PAGE
// ------------------------------------------------------

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        const level =
            getLevelFromURL();


        const connected =
            await connectSupabase();


        if (!connected) {

            return;

        }


        await loadLevel(
            level
        );

    }
);
