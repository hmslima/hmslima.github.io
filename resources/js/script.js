async function getHtml(lang, fileName) {
    const result = await fetch(`resources/html/${lang}/${fileName}.html`).then(response => response.text());
    return result;
}

function changeElementContent(lang, fileName, ElementName) {
    return getHtml(lang, fileName).then(response => {
        document.getElementById(ElementName).innerHTML = response;
    });
}

function changeLanguage(lang, sourceMaterial, target) {
    changeElementContent(lang, sourceMaterial, target);
    document.getElementsByTagName('html')[0].setAttribute("lang", lang);
}

async function changeWebsitesLanguage(lang, sourceMaterial, target) {
    await changeLanguage(lang, sourceMaterial, target);
    await changeElementContent(lang, 'menu', 'menu');
}

function showGoBackTotextPage() {
    document.getElementById("goback").style.display = "block";
}

function goBackTotextPage() {
    changeElementContent(lang, sourceMaterial, target);
    document.getElementById("goback").style.display = "none";
}

async function goToText (lang, fileName) {
    await changeElementContent(lang, fileName, 'text');
    await showGoBackTotextPage();
}

async function goToExternalText (lang, textPath) {
    await changeElementContent(lang, 'text', 'content');
    await goToText(lang, textPath, 'text');
}


function start() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let language = urlParams.get('lang');
    const page = urlParams.get('page');
    const article = urlParams.get('article');
    let textPath = "text/" + article;

    
    if (language == 'ptbr') {
        document.getElementsByTagName('html')[0].setAttribute("lang","pt-BR");
    }
    else if (language == 'en') {
        document.getElementsByTagName('html')[0].setAttribute("lang","en");
    }
    else {
        if (navigator.language[0] == 'p' && navigator.language[1] == 't') {
            language = "ptbr";
            document.getElementsByTagName('html')[0].setAttribute("lang","pt-BR");
        }
        else {
            language = "en";
            document.getElementsByTagName('html')[0].setAttribute("lang","en");
        }        
    }

    changeElementContent(language, "menu", 'menu');

    if (page == 'projects') {
        changeElementContent(language, page, 'content');
    }
    else if (page == 'resources') {
        changeElementContent(language, page, 'content');
    }
    else if (page == 'about') {
        changeElementContent(language, page, 'content');
    }
    else if (page == 'text' && !article) {
        changeElementContent(language, page, 'content');
    }
    else if ((page == 'text' && article) || (!page && article)) {
        goToExternalText(language, textPath);
    }
    else {
        changeLanguage(language, 'home', 'content');
    }
}