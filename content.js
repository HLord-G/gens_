/* ======================================= [S] **** [S] ======================================= */
// UI 
/*==============================================================================================*/
function injectUI() {
    let bodyholder = document.querySelector("body");

    bodyholder.insertAdjacentHTML("beforeend", `
        <div style="z-index:9999; position:fixed; bottom:2%; right:2%; color:red;">

            <textarea style="height:90px; width:220px; font-size: 10px;" usergen></textarea><br>
            <input class="" type="text" style="width:220px; font-size: 10px;" emailget placeholder="feee"><br>
            
            <div style="display:flex; flex-flow:row; width:223px;">
                <button style="padding:5px 7px; font-size: 10px; flex:1; border:1px solid red;" genemail> Create </button>
                <button hidden style="padding:5px 7px; font-size: 10px; flex:1; border:1px solid red;" genusername> Gen Username </button>
                <button hidden style="padding:5px 7px; font-size: 10px; flex:1; border:1px solid red;" repot> repot </button>
                <button hidden style="padding:5px 7px; font-size: 10px; flex:1; border:1px solid red;" lagout> lagout </button>
            </div>
            
        </div>
    `);
}

injectUI();
/* ======================================= [E] **** [E] ======================================= */




/* ======================================= [S] **** [S] ======================================= */
// PARA SA USER NAME GENERATOR
/*==============================================================================================*/
let userGen = ""

function randomName() {
    return fetch(chrome.runtime.getURL("usernames.json"))
        .then(response => response.json())
        .then(names => names[Math.floor(Math.random() * names.length)]);
}

// Gamiton sa sulod sa async function
async function init() {
    userGen = await randomName();
    console.log(userGen); // naa na diri ang value ✓
    
    // pwede na gamiton si userGen bisan asa human niini
}

init();
/* ======================================= [E] **** [E] ======================================= */




function hinderClicker(html, delay = 5000) {
    return new Promise((resolve) => {

        let triggered = false;

        const checker = setInterval(() => {

            if (triggered) return;

            $("body *").each(function () {

                const currentHTML = $(this).prop("outerHTML");

                if (
                    currentHTML &&
                    currentHTML.trim() === html.trim() &&
                    $(this).is(":visible")
                ) {

                    triggered = true;

                    const target = this;

                    clearInterval(checker);

                    setTimeout(() => {

                        target.click();

                        // fallback
                        $(target).trigger("click");
                        $(target).mousedown();
                        $(target).mouseup();

                        resolve(target);

                    }, delay);

                    return false;
                }
            });

        }, 500);

    });
}

function hinderInput(html, value, delay = 400) {
    let triggered = false;

    const checker = setInterval(function () {
        if (triggered) return;

        $("body *").each(function () {

            if ($(this).prop("outerHTML") === html && $(this).is(":visible")) {

                triggered = true;

                const input = this;

                setTimeout(async () => {

                    input.focus();
                    input.value = '';

                    const firstPart = value.slice(0, -1);
                    const lastChar = value.slice(-1);

                    // Paste tanan except last character
                    input.value = firstPart;

                    input.dispatchEvent(new Event("input", {
                        bubbles: true
                    }));

                    await new Promise(resolve => setTimeout(resolve, 100));

                    // Type last character
                    input.dispatchEvent(new KeyboardEvent("keydown", {
                        key: lastChar,
                        bubbles: true
                    }));

                    input.value += lastChar;

                    input.dispatchEvent(new Event("input", {
                        bubbles: true
                    }));

                    input.dispatchEvent(new KeyboardEvent("keyup", {
                        key: lastChar,
                        bubbles: true
                    }));

                    input.dispatchEvent(new Event("change", {
                        bubbles: true
                    }));

                }, delay);

                clearInterval(checker);
                return false;
            }

        });
    }, 200);
}


function hinderClicker_oncer(html, delay = 5000) {
    return new Promise((resolve) => {

        let triggered = false;

        const checker = setInterval(() => {

            if (triggered) return;

            $("body *").each(function () {

                const currentHTML = $(this).prop("outerHTML");

                if (
                    currentHTML &&
                    currentHTML.trim() === html.trim() &&
                    $(this).is(":visible")
                ) {

                    triggered = true;

                    const target = this;

                    clearInterval(checker);

                    setTimeout(() => {
                     alert("eh Verify sa ang email haya eh click okay!")
                     run_chnageUsername() 

                        resolve(target);

                    }, delay);

                    return false;
                }
            });

        }, 500);

    });
}


/* ======================================= [S] **** [S] ======================================= */
// PARA SA BIRTHDAY GENERATOR
/*==============================================================================================*/
function hinderBirthday(month, day, year, delay = 400) {
    return new Promise((resolve) => {

        let triggered = false;

        const checker = setInterval(() => {

            if (triggered) return;

            const monthSelect = $('select[name="month"]');
            const daySelect = $('select[name="day"]');
            const yearSelect = $('select[name="year"]');

            if (
                monthSelect.length &&
                daySelect.length &&
                yearSelect.length &&
                monthSelect.is(':visible') &&
                daySelect.is(':visible') &&
                yearSelect.is(':visible')
            ) {

                triggered = true;

                clearInterval(checker);

                setTimeout(async () => {

                    const selects = [
                        { el: monthSelect[0], value: month },
                        { el: daySelect[0], value: day },
                        { el: yearSelect[0], value: year }
                    ];

                    for (const item of selects) {

                        const el = item.el;

                        el.focus();

                        el.dispatchEvent(new MouseEvent('mousedown', {
                            bubbles: true
                        }));

                        el.value = item.value;

                        el.dispatchEvent(new Event('input', {
                            bubbles: true
                        }));

                        el.dispatchEvent(new Event('change', {
                            bubbles: true
                        }));

                        el.dispatchEvent(new MouseEvent('mouseup', {
                            bubbles: true
                        }));

                        el.blur();

                        await new Promise(r => setTimeout(r, 300));
                    }

                    resolve(true);

                }, delay);

            }

        }, 200);

    });
}

function getAdultBirthday(minAge = 20, maxAge = 40) {

    const today = new Date();

    const youngestYear = today.getFullYear() - minAge;
    const oldestYear = today.getFullYear() - maxAge;

    const year = Math.floor(
        Math.random() * (youngestYear - oldestYear + 1)
    ) + oldestYear;

    const month = Math.floor(Math.random() * 12);
    const day = Math.floor(Math.random() * 28) + 1;

    return {
        month: String(month),
        day: String(day),
        year: String(year)
    };
}
/* ======================================= [E] **** [E] ======================================= */

// random username
function randomSelectuser(delay = 1000) {
    return new Promise((resolve) => {

        let triggered = false;

        const checker = setInterval(() => {

            if (triggered) return;

            $("p").each(function () {

                if ($(this).text().trim() === "How about one of these?") {

                    const popup = $(this).closest("div");
                    const buttons = popup.find("button");

                    if (!buttons.length) return;

                    triggered = true;

                    clearInterval(checker);

                    const randomButton = buttons[
                        Math.floor(Math.random() * buttons.length)
                    ];

                    setTimeout(() => {

                        randomButton.click();

                        $(randomButton).trigger("click");
                        $(randomButton).mousedown();
                        $(randomButton).mouseup();

                        resolve(randomButton);

                    }, delay);

                    return false;
                }
            });

        }, 500);

    });
}



/* ======================================= [S] **** [S] ======================================= */
// PARA SA RANDOM ID
/*==============================================================================================*/
function ranID(length = 9) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";
    let result = "";

    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
}
/* ======================================= [E] **** [E] ======================================= */
 



function hinderRememberInputs() {

    const dbName = "HinderDB";
    const storeName = "inputs";

    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = function (e) {
        const db = e.target.result;

        if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName);
        }
    };

    request.onsuccess = function (e) {

        const db = e.target.result;

        function saveValue(key, value) {
            const tx = db.transaction(storeName, "readwrite");
            const store = tx.objectStore(storeName);
            store.put(value, key);
        }

        function loadValue(key, callback) {
            const tx = db.transaction(storeName, "readonly");
            const store = tx.objectStore(storeName);
            const req = store.get(key);

            req.onsuccess = function () {
                callback(req.result);
            };
        }

        const fields = document.querySelectorAll("[usergen], [emailget]");

        fields.forEach((field) => {

            const key =
                field.hasAttribute("usergen")
                    ? "usergen_value"
                    : "emailget_value";

            // Load saved value
            loadValue(key, function (value) {
                if (value !== undefined) {
                    field.value = value;
                }
            });

            // Save on input
            field.addEventListener("input", function () {
                saveValue(key, this.value);
            });

        });
    };
}

hinderRememberInputs();




async function hinderRandomImage() {

    // directly pangitaon ang file input, preskip na ang button click
    const input = document.querySelector(
        'input[type="file"][accept*="image"]'
    );

    if (!input) {
        console.log("Input not found!");
        return;
    }

    const images = [
        "user_images/1f52a6efc7fe4599dbacfc542526b0d7.jpg",
        "user_images/2c174b39417c025fa95f8b9e33ed0603.jpg",
        "user_images/02dae8f90794c13695aed06e91d38911.jpg",
        "user_images/2fc0f77649cf1d4b4d9dac49d009db6e.jpg",
        "user_images/3be4abcf755b2320c56d9601edab0c2b.jpg",
        "user_images/4cc502923ba130f7e4d17ea7ad563bf8.jpg",
        "user_images/7e99a5c806c8ed5d085fe9f3da90baef.jpg",
        "user_images/8d7d6e8a296c1e9bde3bf529d65b8fbe.jpg",
        "user_images/9a0e22fcd731c9322026909d7a65d7e2.jpg",
        "user_images/9c24ce5c54b6393386b30263d24b2f95.jpg",
        "user_images/10bc536ef9a4940d72c2e48884fc3d85.jpg",
        "user_images/27e8d3bde2d33200dc17206ffcb9f2da.jpg",
        "user_images/45c8a2b3558519fc98526597e2a95b98.jpg",
        "user_images/62c87aec472de980e9d31867ba7e0195.jpg",
        "user_images/62ed9ed7304722a68420d20b49b30eba.jpg",
        "user_images/75c070f9a2c1ef7e031769d45038a46f.jpg",
        "user_images/85aebf3648e47db3f4da84884201cd29.jpg",
        "user_images/91adc2501c560b83b89ef01cedd6919c.jpg",
        "user_images/127df4fa1b1b7c298aa8495f9f2bfc06.jpg",
        "user_images/220f420c8fbf34c355af2eabd42b7329.jpg",
        "user_images/789ae268ff40bde120f7baaab463b546.jpg",
        "user_images/852e9e84e50000af4537d4535517d3d2.jpg",
        "user_images/1047ce6f4281d4b6d7ccec3a9882b9cf.jpg",
        "user_images/2085d508390a103c99b8ee40b516dc0f.jpg",
        "user_images/5585c54c0c655ebd13f1bfa8952c6ce0.jpg",
        "user_images/6393fb654556c2e1835a402ae1d1b9ca.jpg",
        "user_images/9514a6b87470273d3d07d2174384919e.jpg",
        "user_images/16208ab4b1e4fc803c08f29136b48c97.jpg",
        "user_images/30798b50d4ca9c4dec077f44720d3400.jpg",
        "user_images/48198bfb64b27a19e7091715371afb48.jpg",
        "user_images/48554bd4255f9b8db50117bd67c54280.jpg",
        "user_images/89410ec29ef6d17b57c1049db57fb25c.jpg",
        "user_images/366301eb9a9edc4873801cc0d5a230b7.jpg",
        "user_images/64906346d6e41bb7577de3fcadde05ff.jpg",
        "user_images/a9876b116c859188bfd451d15fa77084.jpg",
        "user_images/a82296eb51515e8273b9b50680ff3afb.jpg",
        "user_images/acded6c65fcb50dd8184e3917d9a1566.jpg",
        "user_images/afe4378c203bcd0bff2b21f0f4c71f15.jpg",
        "user_images/b19b437823aa51e206a78f873d3ae2a3.jpg",
        "user_images/b23342e2f4805deaf6aba6986b3603c6.jpg",
        "user_images/c741a06c93ff5fc47d9e749573f3f34c.jpg",
        "user_images/c08247c09eefa647bd02b285b17e66e3.jpg",
        "user_images/ce6a78bc307954e89cdfbe23d1c06796.jpg",
        "user_images/d0f661eacd83af828ab3a084a2a2e2d9.jpg",
        "user_images/d1a8fff592af20101b2a2dc5e638f9a3.jpg",
        "user_images/d9abb23a460b2bcd51d012fe700d5a6b.jpg",
        "user_images/e15d092fb685ebc1f7e11a60af51bd1d.jpg",
        "user_images/f0d997eb212c5a0a62515992f842df83.jpg",
        "user_images/f7b1e8422685eb1f985b9d2d5171a076.jpg",
        "user_images/f8e165424415a8cde098aae9a1f3a85b.jpg",
        "user_images/download (1).png"
    ];

    const random = images[Math.floor(Math.random() * images.length)];

    const response = await fetch(chrome.runtime.getURL(random));

    const blob = await response.blob();

    const file = new File(
        [blob],
        "random.jpg",
        { type: blob.type || "image/jpeg" }
    );

    const dt = new DataTransfer();
    dt.items.add(file);
    input.files = dt.files;

    input.dispatchEvent(new Event("change", { bubbles: true }));
    input.dispatchEvent(new Event("input", { bubbles: true }));

    console.log("Image selected!");
}






// User Acount Trigger
function userAccountTrigger(delay = 300) {
    return new Promise((resolve) => {

        let triggered = false;

        const checker = setInterval(() => {

            if (triggered) return;

            $('a[href^="/blog/"]:visible').each(function () {

                const target = this;

                triggered = true;

                clearInterval(checker);

                setTimeout(() => {

                    target.click();

                    $(target).trigger("click");
                    $(target).mousedown();
                    $(target).mouseup();

                    resolve(target);

                }, delay);

                return false;
            });

        }, 500);

    });
}

function accountTrigger(delay = 300) {
    return new Promise((resolve) => {

        let triggered = false;

        const checker = setInterval(() => {

            const btn = document.querySelector("#account_button");

            if (!btn || triggered) return;

            triggered = true;

            clearInterval(checker);

            setTimeout(() => {

                [
                    "pointerdown",
                    "mousedown",
                    "pointerup",
                    "mouseup",
                    "click"
                ].forEach(type => {
                    btn.dispatchEvent(
                        new MouseEvent(type, {
                            bubbles: true,
                            cancelable: true,
                            view: window
                        })
                    );
                });

                resolve(btn);

            }, delay);

        }, 500);

    });
}

function blogSettingsTrigger(delay = 300) {
    return new Promise((resolve) => {

        let triggered = false;

        const checker = setInterval(() => {

            if (triggered) return;

            $("a").each(function () {

                const text = $(this).text().trim();

                if (text === "Blog settings" && $(this).is(":visible")) {

                    triggered = true;

                    clearInterval(checker);

                    const target = this;

                    setTimeout(() => {

                        target.click();

                        $(target).trigger("click");
                        $(target).mousedown();
                        $(target).mouseup();

                        resolve(target);

                    }, delay);

                    return false;
                }

            });

        }, 500);

    });
}

function usernameselection(html, value, delay = 200) {

    let triggered = false;

    const checker = setInterval(function() {

        if (triggered) return;

        $("body *").each(function() {

            if (
                $(this).prop("outerHTML") === html &&
                $(this).is(":visible")
            ) {

                triggered = true;

                const input = this;

                clearInterval(checker);

                setTimeout(function() {

                    input.focus();

                    input.value = value;

                    input.dispatchEvent(
                        new Event("input", {
                            bubbles: true
                        })
                    );

                    input.dispatchEvent(
                        new Event("change", {
                            bubbles: true
                        })
                    );

                }, delay);

            }

        });

    }, 100);

}





function tumblrSearch(keyword) {
    const input = document.querySelector('input[name="q"]');

    if (!input) return false;

    input.focus();

    const nativeSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
    ).set;

    nativeSetter.call(input, keyword);

    input.dispatchEvent(new Event("input", {
        bubbles: true
    }));

    setTimeout(() => {
        input.form?.requestSubmit();

        input.dispatchEvent(new KeyboardEvent("keydown", {
            key: "Enter",
            code: "Enter",
            keyCode: 13,
            which: 13,
            bubbles: true
        }));
    }, 300);

    return true;
}





// trigger share event
function clickEventsss(index = 0, delay = 200) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            const buttons = document.querySelectorAll(
                'button[aria-label="Reblog"]'
            );

            const btn = buttons[index];

            if (!btn) {
                reject(`Walay Reblog button sa index ${index}`);
                return;
            }

            btn.click();

            resolve(btn);

        }, delay);

    });

}

function textTransfer(x, y) {

    const textarea = document.querySelector("[usergen]");

    textarea.value += `{
    "userEmail":"${x}",
    "passWord":"${y}"
},\n`;

    textarea.dispatchEvent(new Event("input", {
        bubbles: true
    }));

}



function inputransfer() {

    const textarea = document.querySelector("[emailget]");

    textarea.value = ``;

    textarea.dispatchEvent(new Event("input", {
        bubbles: true
    }));

}

async function run() {
    let email_input = $("[emailget]").val()
    let passWord_ =ranID(13);
    const birth = getAdultBirthday(20, 40);



    await hinderClicker(
    `<button class="qf5_7 FvWC2 u1icf CZAN9 xhHhD GqZGX" aria-label="Sign up" type="button"><span class="aKdEe">Sign up</span></button>`,
    1
    );

    await hinderClicker(
    `<button aria-label="Continue with email" class="dKGjO"><svg height="24" role="presentation" width="23" xmlns="http://www.w3.org/2000/svg"><use href="#managed-icon__mail"></use></svg>Continue with email</button>`,
    1
    );

    await hinderInput(
    `<input aria-label="email" autocomplete="username" class="sL4Tf" name="email" placeholder="Email" type="email" value="">`,
    `${email_input}`,
        1
    );

    await hinderClicker(
    `<button class="TRX6J CxLjL qjTo7 CguuB qNKBC" aria-label="Next" type="submit" style="--button-text: var(--image-ui-fg); --button-bg: var(--image-ui); border-color: rgba(var(--black), 0.40);"><span class="EvhBA" tabindex="-1">Next<svg height="16" role="presentation" width="16" xmlns="http://www.w3.org/2000/svg" style="--icon-color-primary: var(--image-ui-fg); transform: rotate(180deg); transform-origin: center center;"><use href="#managed-icon__arrow"></use></svg></span></button>`,
    300
    );

    await hinderInput(
    `<input autocomplete="new-password" class="sL4Tf" placeholder="Set a password" type="password" value="" autofocus="">`,
    `${passWord_}`,
        300
    );

    await hinderInput(
    `<input autocomplete="new-password" class="sL4Tf" placeholder="Repeat password" type="password" value="">`,
    `${passWord_}`,
        400
    );

    await hinderClicker(
    `<button class="TRX6J CxLjL qjTo7 CguuB qNKBC" aria-label="Next" type="submit" style="--button-text: var(--image-ui-fg); --button-bg: var(--image-ui); border-color: rgba(var(--black), 0.40);"><span class="EvhBA" tabindex="-1">Next<svg height="16" role="presentation" width="16" xmlns="http://www.w3.org/2000/svg" style="--icon-color-primary: var(--image-ui-fg); transform: rotate(180deg); transform-origin: center center;"><use href="#managed-icon__arrow"></use></svg></span></button>`,
    2000
    );

    await textTransfer(email_input, passWord_);

    await hinderBirthday(
        birth.month,
        birth.day,
        birth.year,
        200
    );

    await hinderClicker(
    `<button class="TRX6J CxLjL qjTo7 CguuB qNKBC" aria-label="Next" type="submit" style="--button-text: var(--image-ui-fg); --button-bg: var(--image-ui); border-color: rgba(var(--black), 0.40);"><span class="EvhBA" tabindex="-1">Next<svg height="16" role="presentation" width="16" xmlns="http://www.w3.org/2000/svg" style="--icon-color-primary: var(--image-ui-fg); transform: rotate(180deg); transform-origin: center center;"><use href="#managed-icon__arrow"></use></svg></span></button>`,
    300
    );


    await hinderInput(
    `<input aria-describedby="blognameDescription" autocomplete="off" class="f1zZG" id="onboardingBlogname" maxlength="32" name="blogName" placeholder="Blog name" type="text" value="">`,
     ` `,
    300
    );

    await randomSelectuser(200);


    await hinderClicker(
    `<button class="TRX6J CxLjL qjTo7 CguuB qNKBC" aria-label="Sign up" type="submit" style="--button-text: var(--image-ui-fg); --button-bg: var(--image-ui); border-color: rgba(var(--black), 0.40);"><span class="EvhBA" tabindex="-1">Sign up<svg height="16" role="presentation" width="16" xmlns="http://www.w3.org/2000/svg" style="--icon-color-primary: var(--image-ui-fg); transform: rotate(180deg); transform-origin: center center;"><use href="#managed-icon__arrow"></use></svg></span></button>`,
    300
    );

 


}



setTimeout(() => {
    hinderClicker_oncer(`<button class="qf5_7 xmQVN zWFEr jBvzu gx0cT" aria-label="Dismiss" type="button"><span class="aKdEe"><svg height="16" role="presentation" width="16" xmlns="http://www.w3.org/2000/svg"><use href="#managed-icon__ds-ui-x-16"></use></svg></span></button>`,1000)
}, 1000);



async function runFollow() {
    await hinderClicker(
    `<button class="TRX6J CxLjL wmqRB IMvK3 mtwt6 qNKBC" style="--button-text:RGB(var(--white));--button-bg:RGB(var(--white));border-color:rgba(var(--white-on-dark), 0.40)" aria-label="Follow all" aria-pressed="false"><span class="EvhBA" tabindex="-1"><div class="ZVCUC"><svg height="16" role="presentation" width="16" xmlns="http://www.w3.org/2000/svg"><use href="#managed-icon__plus"></use></svg></div>Follow all</span></button>`,
    300
    );


    await hinderClicker(
    `<button class="TRX6J CxLjL qjTo7 CguuB qNKBC" style="--button-text: RGB(var(--black)); --button-bg: RGB(var(--white)); border-color: rgba(var(--black), 0.40);"><span class="EvhBA" tabindex="-1">Next</span></button>`,
    300
    );

}
 runFollow()









async function clickRepost(index = 0, delay = 0) {
    if (delay > 0) {
        await new Promise(resolve => setTimeout(resolve, delay));
    }
    const buttons = document.querySelectorAll('button[aria-label="Reblog"]');
    console.log("Reblog buttons found:", buttons.length);
    if (!buttons[index]) {
        console.warn("Reblog button not found at index:", index);
        return false;
    }
    const btn = buttons[index];
    btn.scrollIntoView({ behavior: "instant", block: "center", inline: "center" });
    btn.focus();
    ["pointerover","pointerenter","mouseover","mouseenter",
     "pointerdown","mousedown","pointerup","mouseup","click"
    ].forEach(type => {
        btn.dispatchEvent(new MouseEvent(type, {
            view: window, bubbles: true, cancelable: true, composed: true
        }));
    });
    btn.click();
    return true;
}

async function clickReshare(delay = 300) {
    // Wait for the menu to appear after clickRepost
    await new Promise(resolve => setTimeout(resolve, delay));

    // Always grab fresh — menu is rendered dynamically after click
    const items = [...document.querySelectorAll('div[role="menuitem"]')]
        .filter(el => el.textContent.trim().includes("Reblog now"));

    console.log("Reblog now found:", items.length);

    if (!items.length) {
        console.warn("Reblog now menu item not found");
        return false;
    }

    // Click the LAST one — it's always the most recently opened menu
    items[items.length - 1].click();
    return true;
}

async function repoty(index = 0) {
    await clickRepost(index);
    await clickReshare(300); // wait 300ms for menu to render
}

function redirectDashboard() {
    location.href = "https://www.tumblr.com/dashboard";
}



function click_gen(){
    setTimeout(() => {
        $("[repot]").click()
    }, 2000);
} 




 async function run_chnageUsername() {
 
    await hinderClicker(
        `<button class="qf5_7 xmQVN zWFEr jBvzu gx0cT" aria-label="Dismiss" type="button"><span class="aKdEe"><svg height="16" role="presentation" width="16" xmlns="http://www.w3.org/2000/svg"><use href="#managed-icon__ds-ui-x-16"></use></svg></span></button>`,
        30
    );
 
    await accountTrigger();
    await userAccountTrigger(300);
    await blogSettingsTrigger();
    await hinderClicker(
        `<button class="TRX6J CxLjL qjTo7 IMvK3 v8miJ" style="--button-text: #000000; --button-bg: #ffffff; border-color: rgba(var(--black), 0.40);"><span class="EvhBA" tabindex="-1">Edit appearance</span></button>`,
        30
    );

    usernameselection(`<input aria-label="Blog title" class="c1JQY qC1o8 qZTLo" placeholder="Title" spellcheck="false" tabindex="0" forwardedref="[object Object]" value="Untitled" style="font-family: Gibson, sans-serif; color: rgb(0, 0, 0); font-weight: bold; text-decoration-color: rgb(0, 184, 255);">`, 
        `${userGen}`, 
        200);

    await hinderClicker(
        `<button aria-label="Edit blog avatar image" class="uEsQE" tabindex="0" forwardedref="[object Object]"><svg height="16" role="presentation" width="16" xmlns="http://www.w3.org/2000/svg"><use href="#managed-icon__post"></use></svg></button>`,
        30
    );
 

    await hinderRandomImage();
    
    await hinderClicker(
        `<button class="TRX6J CxLjL qjTo7 IMvK3 MyRtW" style="--button-text: rgba(var(--black), 0.80); --button-bg: RGB(var(--white)); border-color: rgba(var(--black), 0.40);"><span class="EvhBA" tabindex="-1" style="width: fit-content;">Save</span></button>`,
        30
    );
    
    await hinderInput(
        `<input aria-label="Search" autocapitalize="on" autocomplete="off" class="j8Eiw Qqfho" name="q" placeholder="Search Tumblr" type="text" value="">`,
        "#anime",
        3000
    );



    await hinderClicker(
        `<a class="pBLQq J1Yq3 QxY_t" href="/search/%23anime?src=typed_query"><svg class="Rzekl" height="24" role="presentation" width="24" xmlns="http://www.w3.org/2000/svg" style="--icon-color-primary: rgba(var(--black), 0.60);"><use href="#managed-icon__search-round"></use></svg><span class="L29Yf">search for </span><span class="Eguk6">#anime</span></a>`,
        20
    );

    await hinderClicker(
        `<button class="TRX6J wl0Ka" aria-label="Top"><span class="EvhBA OPOal" tabindex="-1">Top</span></button>`,
        30
    );


    await clickEventsss(0, 200);

    await hinderClicker(
            `<div role="menuitem" class="f4BvS" id=":tumblrr4o:" tabindex="-1" data-active-item="true" data-tabindex="0"><span class="KFKnW"><div aria-hidden="true" class="ifcVH"><svg height="24" role="presentation" width="24" xmlns="http://www.w3.org/2000/svg"><use href="#managed-icon__ds-reblog-24"></use></svg></div><span class="xg1mq">Reblog now</span></span><div aria-label="(Shortcut: SHIFT + R)" class="xCGeu">SHIFT + R</div></div>`,
            30
        );
 
 } 



 

function watchURL() {
    // Ayaw na i-run kung nahuman na
    if (localStorage.getItem("click_gen_done") === "true") return;

    let lastURL = "";

    const interval = setInterval(() => {
        if (location.href !== lastURL) {
            lastURL = location.href;

            if (
                location.pathname === "/search/%23anime" &&
                location.search === "?src=typed_query"
            ) {
                click_gen();

                // Save nga nahuman na
                localStorage.setItem("click_gen_done", "true");

                // Stop checking
                clearInterval(interval);
            }
        }
    }, 500);
}

watchURL();

 

async function run_logout() {

    await inputransfer();

    await hinderClicker(
            `<button class="TRX6J Vp4ma" aria-label="Log out"><span class="EvhBA" tabindex="-1">Log out</span></button>`,
            30
        );
    
    await hinderClicker(
            `<button class="TRX6J CxLjL qjTo7 IMvK3 B5hil" aria-label="OK" style="--button-text: RGB(var(--navy)); --button-bg: RGB(var(--deprecated-accent)); border-color: rgba(var(--black), 0.40);"><span class="EvhBA" tabindex="-1">OK</span></button>`,
            30
        );
}


$(document).on("click", "[genemail]", function(){
   run()
})
$(document).on("click", "[genusername]", async function(){
    await run_chnageUsername()
})


$(document).on("click", "[repot]", async  function(){
   await  repoty(0)
   await  repoty(1)
   await  repoty(2)
   await  repoty(3)
   await  repoty(4)
   await  repoty(5)
   await  repoty(6)
   await  repoty(7)
   await  repoty(8)
   await  repoty(9)
   await  repoty(10)
   await  repoty(11)
   await  repoty(12)
   await  repoty(13)
   await  repoty(14)
   await  repoty(15)
   await  repoty(16)
   await  repoty(17)
   await  repoty(18)
   await  repoty(19)
   await  repoty(20)
   await  repoty(21)

    await redirectDashboard();
 
}) 


$(document).on("click", "[lagout]",  function(){
        run_logout() 
})




//  https://cheapluxurymail.xyz/
// https://www.tumblr.com/

/*
    emailget
    genemail
*/ 