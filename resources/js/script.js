let menuActive = false;

function changeBackgroundToDark() {
    let background = getComputedStyle(document.body).backgroundColor;
    let generalLinks = document.querySelectorAll("a");
    let menuLinks = document.getElementsByClassName("navLink");
    let linkWithWhiteBg = document.getElementsByClassName("linkWithWhiteBg");
    let card = document.getElementsByClassName("card");
    let cardFull = document.getElementsByClassName("cardFull");
    let cardStacks = document.getElementsByClassName("cardStacks");

    try {
        document.getElementsByClassName("changeBackgroundButton")[0].innerHTML="🌞︎";
    }
    catch {
        // Do nothing
    }
    

    document.body.style.backgroundColor = "#444444"; // #444444 / rgb(68, 68, 68)
    document.body.style.backgroundImage = "url(resources/img/background/bg-dark.jpg)";
    document.body.style.color = "#F1FBE7"; // #F1FBE7 / rgb(241, 251, 231)

    for (let counter = 0; counter < generalLinks.length; counter++) {
        generalLinks[counter].style.color = "#EAEAFA";
    }
    for (let counter = 0; counter < menuLinks.length; counter++) {
        menuLinks[counter].style.color = "#FFFFFF";
    }
    for (let counter = 0; counter < linkWithWhiteBg.length; counter++) {
        linkWithWhiteBg[counter].style.color = "#DD4F4F";
    }

    for (let counter = 0; counter < card.length; counter++) {
        card[counter].style.color = "#000000";
        card[counter].style.borderColor = "#FFFFFF";
        card[counter].style.backgroundColor = "#FBFBE7";
    }

    for (let counter = 0; counter < cardFull.length; counter++) {
        cardFull[counter].style.color = "#000000";
        cardFull[counter].style.borderColor = "#FFFFFF";
        cardFull[counter].style.backgroundColor = "#FBFBE7";
    }

    for (let counter = 0; counter < cardStacks.length; counter++) {
        cardStacks[counter].style.color = "#000000";
        cardStacks[counter].style.backgroundColor = "#FBFBE7";
    }
}

function changeBackgroundToLight() {
    let background = getComputedStyle(document.body).backgroundColor;
    let generalLinks = document.querySelectorAll("a");
    let menuLinks = document.getElementsByClassName("navLink");
    let linkWithWhiteBg = document.getElementsByClassName("linkWithWhiteBg");
    let card = document.getElementsByClassName("card");
    let cardFull = document.getElementsByClassName("cardFull");
    let cardStacks = document.getElementsByClassName("cardStacks");

    try {
        document.getElementsByClassName("changeBackgroundButton")[0].innerHTML="🌜︎";
    }
    catch {
        // Do nothing
    }
    

    document.body.style.backgroundColor = "#FBFBE7"; // #FBFBE7 / rgb(251, 251, 231)
    document.body.style.backgroundImage = "url(resources/img/background/bg-light.jpg)";
    document.body.style.color = "#000000"; // #000000 / rgb(0, 0, 0)

    for (let counter = 0; counter < generalLinks.length; counter++) {
        generalLinks[counter].style.color = "#DD4F4F";
    }
    for (let counter = 0; counter < menuLinks.length; counter++) {
        menuLinks[counter].style.color = "#FFFFFF";
    }
    for (let counter = 0; counter < linkWithWhiteBg.length; counter++) {
        linkWithWhiteBg[counter].style.color = "#DD4F4F";
    }

    for (let counter = 0; counter < card.length; counter++) {
        card[counter].style.borderColor = "#000000";
        card[counter].style.backgroundColor = "#FFFFFF";
    }

    for (let counter = 0; counter < cardFull.length; counter++) {
        cardFull[counter].style.borderColor = "#000000";
        cardFull[counter].style.backgroundColor = "#FFFFFF";
    }

    for (let counter = 0; counter < cardStacks.length; counter++) {
        cardStacks[counter].style.backgroundColor = "#FFFFFF";
    }
}

function changeBackground(changeHtml) {
    let background = getComputedStyle(document.body).backgroundColor;
    
    if (changeHtml == false || changeHtml == null) {
        if (background == null || background == "rgb(251, 251, 231)") {
            changeBackgroundToDark();
        }
        else {
            changeBackgroundToLight();
        }
    }
    else {
        if (background == null || background == "rgb(251, 251, 231)") {
            changeBackgroundToLight(); 
        }
        else {
            changeBackgroundToDark();
        }
    }
    
}

function getClicks() {
    let menu = document.getElementById("sub-menu");
    let menuActive = false;

    document.addEventListener("click", event => {
        if ((event.target.classList.contains("hamburgerMenu") || event.target.classList.contains("hamburgerMenuBars")) && menuActive == false) {
            menuActive = true;
            menu.style.display = "block";
            event.preventDefault();
        }
        else if ((event.target.classList.contains("hamburgerMenu") || event.target.classList.contains("hamburgerMenuBars")) && menuActive == true) {
            menuActive = false;
            menu.style.display = "none";
            event.preventDefault();
        }
        else {
            if (menuActive && !event.target.classList.contains("generalMenuButton")) {
                menuActive = false;
                menu.style.display = "none";
            }
        }
    });
}

async function getHtml(lang, fileName) {

    const result = await fetch(`resources/html/${lang}/${fileName}.html`).then(response => response.text());
    return result;
}

async function findHowManyBlogPostsExist(lang, position) {

    let result = [];
    let originalLastPost = 0;
    let lastPost = 0;

    for (let i = 1; i < 1000; i++) {
        /*let xhr = new XMLHttpRequest();

        xhr.open('HEAD', `resources/html/${lang}/blog/${i}.html`, false);
        xhr.send();

        if (xhr.status == "404") {
            break;
        }
        else {
            originalLastPost = i;
            lastPost = i - ((position - 1) * 5);
        }*/

        await fetch(`resources/html/${lang}/blog/${i}.html`, {method: "HEAD"}).then(res => {
            if (res.ok) {
                originalLastPost = i;
                lastPost = i - ((position - 1) * 5);
            }
            else {
                i = 1000000;
            }
        }).catch(err => console.log('Error:', err));
    }

    result.push(originalLastPost);
    result.push(lastPost);

    return result;
}

function copyLinkToClipboard(lang, path, divId) {

    let websitesPort = "";
    if (window.location.port != '') {
        websitesPort = ":" + window.location.port;
    }

    let language = "";
    if (lang != 'en') {
        language = "&lang=" + lang;
    }

    navigator.clipboard.writeText(window.location.hostname + websitesPort + window.location.pathname + path + language);

    let divsName = "copiedBlogPost" + divId;

    if (lang == "ptbr") {
        document.getElementById(divsName).innerHTML = "O link foi copiado com sucesso";
    }
    else {
        document.getElementById(divsName).innerHTML = "The link was successfully copied";
    }
}

async function loadBlogPosts(lang, position) {

    document.getElementById("blogging_space").innerHTML = "";
    let background = getComputedStyle(document.body).backgroundColor;

    let result = await findHowManyBlogPostsExist(lang, position);
    let originalLastPost = result[0];
    let lastPost = result[1];

    let basePost = lastPost - 4;
    if (basePost < 1) basePost = 1;

    // Now we write them
    if (originalLastPost < 1) {
        document.getElementById("blogging_space").innerHTML = "No posts";
        document.getElementById("next_threads").style.display = "none";        
    }
    else {

        if (lastPost <= 5) {
            document.getElementById("next_threads").style.display = "none";
        }

        (async function () {
            for (let i = lastPost; i >= basePost; i--) {
                await getHtml(lang, "/blog/" + i).then(response => {
                    if (response == "") {
                        // If it is emprty, do nothing!
                    }
                    else {
                        if (background == null || background == "rgb(251, 251, 231)") {
                            document.getElementById("blogging_space").innerHTML += "<div class='blogPost blogPostLight'>"
                            + response +
                            "<br><br><a class='bloglink' " +
                            "onclick=\"copyLinkToClipboard('" + lang + "', '?page=blog&post=" + i + "', '" + i + "')\">Link</a>"
                            + "<div class='copiedBlogPost' id='copiedBlogPost" + i + "'></div></div>";
                            
                        }
                        else {
                            document.getElementById("blogging_space").innerHTML += "<div class='blogPost blogPostDark'>"
                            + response +
                            "<br><br><a class='bloglink' " +
                            "onclick=\"copyLinkToClipboard('" + lang + "', '?page=blog&post=" + i + "', '" + i + "')\">Link</a>"
                            + "<div class='copiedBlogPost' id='copiedBlogPost" + i + "'></div></div>";
                        }
                    }
                });
            }
        })();
    }

    // Deals with the pagination
    if (originalLastPost > 5) {
        document.getElementById("next_threads").innerHTML = "";
        let postTotal = originalLastPost;
        let postCounter = 1;
        while (postTotal > 0) {
            document.getElementById("next_threads").innerHTML += 
            `<a class="blogPagination" href="#" onclick="loadBlogPosts('${lang}', ${postCounter})">${postCounter}</a>`;
            postCounter++;
            postTotal -= 5;
        }
    }
}

function loadBlogPost(lang, position) {

    document.getElementById("blogging_space").innerHTML = "";
    let background = getComputedStyle(document.body).backgroundColor;

    getHtml(lang, "/blog/" + position).then(response => {
        if (background == null || background == "rgb(251, 251, 231)") {
            document.getElementById("blogging_space").innerHTML += "<div class='blogPost blogPostLight'>"
            + response +
            "<br><br><a class='bloglink' " +
            "onclick=\"copyLinkToClipboard('" + lang + "', '?page=blog&post=" + position + "', '" + position + "')\">Link</a>"
            + "<div class='copiedBlogPost' id='copiedBlogPost" + position + "'></div></div>";
        }
        else {
            document.getElementById("blogging_space").innerHTML += "<div class='blogPost blogPostDark'>"
            + response +
            "<br><br><a class='bloglink' " +
            "onclick=\"copyLinkToClipboard('" + lang + "', '?page=blog&post=" + position + "', '" + position + "')\">Link</a>"
            + "<div class='copiedBlogPost' id='copiedBlogPost" + position + "'></div></div>";
        }
        
    });

    // Deals with the pagination
    document.getElementById("next_threads").innerHTML = "";
    if (lang == "ptbr") {
        document.getElementById("next_threads").innerHTML += 
        `<a href="#" onclick="loadBlogPosts('${lang}', 1)">Voltar para a página incial do blog</a>`;
    }
    else {
        document.getElementById("next_threads").innerHTML += 
        `<a href="#" onclick="loadBlogPosts('${lang}', 1)">Go back to the blog\'s first page</a>`;
    }
    
}

function getBlogTitle(response) {
    let first_h2_position = response.indexOf("<h2>");
    let second_h2_position = response.indexOf("</h2>");

    if (first_h2_position != -1) {
        first_h2_position += 4;
    }

    let BlogTitle = "";

    if (first_h2_position != -1) {
        for (let i = first_h2_position; i < second_h2_position; i++) {
            BlogTitle += response[i];
        }
    }
    else {
        BlogTitle = "—"; 
    }

    return BlogTitle;
}

function changeElementContent(lang, fileName, ElementName) {
    getHtml(lang, fileName).then(response => {
        document.getElementById(ElementName).innerHTML = response;
        changeBackground(true);
    });
}

function blogButton(lang) {
    getHtml(lang, 'blog')
    .then(response => {
        document.getElementById('main_box').innerHTML = response;
        changeBackground(true);
        loadBlogPosts(lang, 1);
    });
}

function changeLanguage(lang, currentLocation) {
    changeElementContent(lang, 'menu', 'desktopMenuContainerId');
    changeElementContent(lang, 'menu', 'sub-menu');
    changeElementContent(lang, currentLocation, 'main_box');    
}

function loadSingleBlogPost(lang, post) {
    getHtml(lang, 'blog')
    .then(response => {
        document.getElementById('main_box').innerHTML = response;
        changeBackground(true);
        loadBlogPost(lang, parseInt(post));
    });
}

async function loadAllBlogPostsTitles(lang, searchContent = "") {
    let mainBox = document.getElementById("main_box");
    mainBox.innerHTML = "";
    let background = getComputedStyle(document.body).backgroundColor;

    let result = await findHowManyBlogPostsExist(lang, 1);
    let originalLastPost = result[0];

    let postCanBeSent = true;

    if (originalLastPost < 1) {
        mainBox.innerHTML = "No posts";
    }
    else {
        (async function () {
            for (let i = originalLastPost; i >= 1; i--) {

                if (searchContent != "") {
                    postCanBeSent = false;
                    searchContent = searchContent.toLowerCase();
                }
                else {
                    postCanBeSent = true;
                }

                await getHtml(lang, "/blog/" + i).then(response => {

                    if (response == "") {
                        // Do nothing!
                    }
                    else {
                        const allText = response.toLowerCase();

                        if (!postCanBeSent) {
                            if (allText.includes(searchContent)) postCanBeSent = true;
                        }

                        if (postCanBeSent) {
                            let blogTitle = getBlogTitle(response);

                            if (background == null || background == "rgb(251, 251, 231)") {
                                mainBox.innerHTML += "<div class='blogItem blogPostLight'>" +
                                "<a href='#' onclick=\"loadSingleBlogPost('" + lang + "', " + i + ")\">" + blogTitle + "</a></div>";
                                
                            }
                            else {
                                mainBox.innerHTML += "<div class='blogItem blogPostDark'>" +
                                "<a href='#' onclick=\"loadSingleBlogPost('" + lang + "', " + i + ")\">" + blogTitle + "</a></div>";
                            }
                        }
                    }
                });
            }
        })();
    }
}

function searchBlogPosts(lang) {
    const content = document.getElementById("blogSearchedContent").value;
    loadAllBlogPostsTitles(lang, content);
}

function start() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let language = urlParams.get('lang');
    const page = urlParams.get('page');
    const mode = urlParams.get('mode');
    const post = urlParams.get('post');

    
    if (language == 'ptbr') {
        document.getElementsByTagName('html')[0].setAttribute("lang","pt-BR");
    }
    else {
        if (navigator.language[0] == 'p' && navigator.language[1] == 't') {
            language = "ptbr";
            document.getElementsByTagName('html')[0].setAttribute("lang","pt-BR");
        }
        else if (navigator.language[0] == 'e' && navigator.language[1] == 's'){
            language = "es";
            document.getElementsByTagName('html')[0].setAttribute("lang","es");
        }
        else {
            language = "en";
            document.getElementsByTagName('html')[0].setAttribute("lang","en");
        }        
    }

    if (page == 'pro') {
        changeLanguage(language, page);
    }
    else if (page == 'projects') {
        changeLanguage(language, page);
    }
    else if (page == 'settings') {
        changeLanguage(language, page);
    }
    else if (page == 'blog') {
        changeLanguage(language, page);
        if (post == null) {
            blogButton(language);
        }
        else {
            loadSingleBlogPost(language, post);
        }
    }
    else {
        changeLanguage(language, 'home');
    }


    if (mode == 'dark') {
        changeBackgroundToDark();
    }
    else {
        if (window.matchMedia) {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                changeBackgroundToDark();
            }
            else {
                changeBackgroundToLight();
            }
        }
        else {
            changeBackgroundToLight();
        }
    }
    
    // Well, get the clicks
    getClicks();
}