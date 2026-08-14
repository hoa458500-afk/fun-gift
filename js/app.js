/**
 * ==========================================
 * FUN GIFT
 * Mobile Cat Chase
 * Build 007
 * ==========================================
 */


/* ==========================================
   ELEMENTS
========================================== */

const game =
    document.getElementById("game");


const intro =
    document.getElementById("intro");


const startButton =
    document.getElementById("startButton");


const cat =
    document.getElementById("cat");


const speech =
    document.getElementById("speech");


const hint =
    document.getElementById("hint");


const particles =
    document.getElementById("particles");


const flowerBush =
    document.getElementById("flowerBush");


const butterfly =
    document.getElementById("butterfly");


const giftBox =
    document.getElementById("giftBox");


const giftGlow =
    document.getElementById("giftGlow");


const garden =
    document.getElementById("garden");


const finalCard =
    document.getElementById("finalCard");

    const finalLetter =
    document.getElementById(
        "finalLetter"
    );


const replayButton =
    document.getElementById("replayButton");


const petalLayer =
    document.getElementById("petalLayer");

    const tapLayer =
    document.getElementById(
        "tapLayer"
    );


const landingButterfly =
    document.getElementById(
        "landingButterfly"
    );


const soundButton =
    document.getElementById("soundButton");



/* ==========================================
   AUDIO
========================================== */

const bgm =
    document.getElementById("bgm");


const sfxPop =
    document.getElementById("sfxPop");


const sfxRun =
    document.getElementById("sfxRun");


const sfxSlip =
    document.getElementById("sfxSlip");


const sfxBoing =
    document.getElementById("sfxBoing");


const sfxGiftDrop =
    document.getElementById("sfxGiftDrop");


const sfxSparkle =
    document.getElementById("sfxSparkle");


const sfxButterfly =
    document.getElementById(
        "sfxButterfly"
    );



/* ==========================================
   STATE
========================================== */

let started =
    false;


let catchCount =
    0;


let isBusy =
    false;


let gameFinished =
    false;


let giftStage =
    0;


/*
0 = chưa chạm gift
1 = mèo ngồi trên gift
2 = mèo bị hất
3 = gift mở
4 = final
*/


let soundEnabled =
    true;


let audioUnlocked =
    false;


let lookResetTimer =
    null;


let nearReactionCooldown =
    false;


let petalRunning =
    false;


let petalTimer =
    null;


let butterflyFollowTimer =
    null;

let missCount =
    0;

let lastInteractionTime =
    0;

   let speechFollowFrame = null;
    
/* ==========================================
   CAT MOODS
========================================== */

const CAT_MOODS = [

    "mood-curious",

    "mood-cheeky",

    "mood-surprised",

    "mood-smug",

    "mood-happy",

    "mood-embarrassed"

];



/* ==========================================
   START
========================================== */

startButton.addEventListener(
    "pointerdown",
    event => {

        event.preventDefault();

        event.stopPropagation();

        createTapEffect(
    event.clientX,
    event.clientY
);

        startGame();

    }
);


function startGame() {

    if (started) return;


    started =
        true;


    /*
     * PHẢI chạy ngay trong cú bấm
     * MỞ THỬ XEM.
     */

    startBGM();


    startPetals();


    intro.classList.add(
        "hide"
    );


    setTimeout(() => {

        showCat();

    }, 700);

}



/* ==========================================
   SHOW CAT
========================================== */

function showCat() {

    setCatMood(
        "curious"
    );


    setCatPosition(
        52,
        69
    );


    cat.classList.remove(
        "hidden"
    );


    cat.classList.add(
        "show"
    );


    playSFX(
        sfxPop,
        0.28
    );


    showSpeech(
        "Ủa... bà tìm tui hả? 👀",
        1900
    );


    setTimeout(() => {

        hint.classList.remove(
            "hidden"
        );


        hint.classList.add(
            "show"
        );

    }, 1200);

}



/* ==========================================
   CAT TOUCH
========================================== */

cat.addEventListener(
    "pointerdown",
    event => {

        event.preventDefault();
        event.stopPropagation();


        createTapEffect(
            event.clientX,
            event.clientY
        );


        /*
         * QUAN TRỌNG:
         * Nếu mèo đang ngồi trên hộp quà
         * thì ưu tiên tuyệt đối việc hất mèo xuống.
         */

        if (giftStage === 1) {

            knockCatOffGift();

            return;
        }


        /*
         * Chặn double tap cho gameplay bình thường.
         */

        if (
            !allowInteraction(180)
        ) {

            return;
        }


        if (isBusy) return;

        if (gameFinished) return;


        catchCount++;


        switch (catchCount) {

            case 1:

                escapeNormal();

                break;


            case 2:

                slipEscape();

                break;


            case 3:

                hideInFlowers();

                break;


            case 4:

                butterflyScene();

                break;


            default:

                finalCatScene();

                break;
        }

    }
);


/* ==========================================
   NORMAL ESCAPE
========================================== */

function escapeNormal() {

    if (isBusy) return;


    isBusy =
        true;


    hideSpeech();


    resetCatLook();


    setCatMood(
        "cheeky"
    );


    vibrate(
        15
    );


    playSFX(
        sfxRun,
        0.24
    );


    createDust();


    cat.classList.add(
        "running"
    );


    const target =
        getSafeRandomPosition();


    setCatPosition(
        target.x,
        target.y
    );


    followSpeechDuringMotion(
        600
    );


    setTimeout(() => {

        cat.classList.remove(
            "running"
        );


        showSpeech(
            "Ê ê... khoan 😝",
            1750
        );


        isBusy =
            false;

    }, 620);

}



/* ==========================================
   SLIP
========================================== */

function slipEscape() {

    if (isBusy) return;


    isBusy =
        true;


    hideSpeech();


    resetCatLook();


    setCatMood(
        "cheeky"
    );


    vibrate(
        [
            15,
            25,
            15
        ]
    );


    playSFX(
        sfxRun,
        0.24
    );


    createDust();


    cat.classList.add(
        "running"
    );


    setCatPosition(
        random(
            46,
            70
        ),
        random(
            46,
            61
        )
    );


    followSpeechDuringMotion(
        520
    );


    setTimeout(() => {

        cat.classList.remove(
            "running"
        );


        setCatMood(
            "surprised"
        );


        playSFX(
            sfxSlip,
            0.38
        );


        cat.classList.add(
            "slipping"
        );


        createDust();


        showSpeech(
            "Á... trượt chân 😳",
            1250
        );

    }, 500);


    setTimeout(() => {

        cat.classList.remove(
            "slipping"
        );


        setCatMood(
            "embarrassed"
        );


        showSpeech(
            "Không tính nha 😼",
            1750
        );


        isBusy =
            false;

    }, 1450);

}



/* ==========================================
   HIDE IN FLOWERS
========================================== */

function hideInFlowers() {

    if (isBusy) return;


    isBusy =
        true;


    hideSpeech();


    resetCatLook();


    setCatMood(
        "cheeky"
    );


    createDust();


    flowerBush.classList.remove(
        "hidden"
    );


    flowerBush.classList.add(
        "show"
    );


    requestAnimationFrame(() => {

        const bushRect =
            flowerBush.getBoundingClientRect();


        const gameRect =
            game.getBoundingClientRect();


        const x =
            bushRect.left -
            gameRect.left +
            bushRect.width / 2 -
            cat.offsetWidth / 2;


        const y =
            bushRect.top -
            gameRect.top -
            15;


        playSFX(
            sfxRun,
            0.24
        );


        cat.classList.add(
            "running"
        );


        setCatPixelPosition(
            x,
            y
        );


        followSpeechDuringMotion(
            560
        );

    });


    setTimeout(() => {

        cat.classList.remove(
            "running"
        );


        cat.classList.add(
            "hiding"
        );

    }, 540);


    setTimeout(() => {

        cat.classList.remove(
            "hiding"
        );


        cat.classList.add(
            "peek"
        );


        setCatMood(
            "smug"
        );


        showSpeech(
            "Không thấy tui đâu hết 😌",
            2200
        );


        isBusy =
            false;

    }, 1150);

}



/* ==========================================
   BUTTERFLY SCENE
========================================== */

function butterflyScene() {

    if (isBusy) return;


    isBusy =
        true;


    hideSpeech();


    cat.classList.remove(
        "peek"
    );


    setCatMood(
        "curious"
    );


    showSpeech(
        "Hả?",
        800
    );


    butterfly.classList.remove(
        "hidden",
        "fly"
    );


    void butterfly.offsetWidth;


    butterfly.classList.add(
        "fly"
    );


    playSFX(
        sfxButterfly,
        0.18
    );


    clearInterval(
        butterflyFollowTimer
    );


    butterflyFollowTimer =
        setInterval(() => {

            if (
                !butterfly.classList.contains(
                    "fly"
                )
            ) {

                clearInterval(
                    butterflyFollowTimer
                );

                return;
            }


            const rect =
                butterfly.getBoundingClientRect();


            lookAtPoint(
                rect.left +
                rect.width / 2,

                rect.top +
                rect.height / 2,

                false
            );

        }, 90);


    setTimeout(() => {

        showSpeech(
            "Bướm kìa... 🦋",
            1700
        );

    }, 1300);


    setTimeout(() => {

        clearInterval(
            butterflyFollowTimer
        );


        butterfly.classList.remove(
            "fly"
        );


        butterfly.classList.add(
            "hidden"
        );


        resetCatLook();


        setCatMood(
            "surprised"
        );


        showSpeech(
            "Ủa... bà vẫn còn ở đây hả 😂",
            2200
        );


        isBusy =
            false;

    }, 4200);

}



/* ==========================================
   FINAL CAT SCENE
========================================== */

function finalCatScene() {

    if (gameFinished) return;


    gameFinished =
        true;


    isBusy =
        true;


    hideSpeech();


    hideHint();


    resetCatLook();


    flowerBush.classList.remove(
        "show"
    );


    flowerBush.classList.add(
        "hidden"
    );


    cat.classList.remove(
        "peek",
        "hiding"
    );


    setCatMood(
        "happy"
    );


    setCatPosition(
        18,
        69
    );


    followSpeechDuringMotion(
        600
    );


    setTimeout(() => {

        showSpeech(
            "Thôi được rồi...",
            1300
        );

    }, 500);


    setTimeout(() => {

        showSpeech(
            "Cho bà nè 😌",
            1600
        );

    }, 1850);


    setTimeout(() => {

        dropGift();

    }, 3000);

}



/* ==========================================
   DROP GIFT
========================================== */

function dropGift() {

    giftBox.classList.remove(
        "opening",
        "ready",
        "hidden",
        "show"
    );


    void giftBox.offsetWidth;


    giftBox.classList.add(
        "show"
    );


    setTimeout(() => {

        playSFX(
            sfxGiftDrop,
            0.42
        );


        shakeScreen();


        vibrate(
            [
                20,
                30,
                20
            ]
        );


        createGiftDust();

    }, 630);


    setTimeout(() => {

        setCatMood(
            "curious"
        );


        showSpeech(
            "Bấm thử đi 👀",
            3000
        );

    }, 1100);

}



/* ==========================================
   GIFT TOUCH
========================================== */

giftBox.addEventListener(
    "pointerdown",
    event => {

        event.preventDefault();

        event.stopPropagation();

        createTapEffect(
            event.clientX,
            event.clientY
        );


        if (
    !allowInteraction(
        220
    )
) {

    return;
}


        if (giftStage !== 0) {

            return;
        }


        giftStage =
            1;


        fakeGiftOpen();

    }
);



/* ==========================================
   FAKE GIFT OPEN
========================================== */

function fakeGiftOpen() {

    hideSpeech();


    giftBox.classList.add(
        "ready"
    );


    setTimeout(() => {

        setCatMood(
            "surprised"
        );


        showSpeech(
            "Ê khoan...",
            1200
        );

    }, 250);


    setTimeout(() => {

        moveCatToGift();

    }, 900);

}



/* ==========================================
   CAT MOVES TO GIFT
========================================== */

function moveCatToGift() {

    const giftRect =
        giftBox.getBoundingClientRect();


    const gameRect =
        game.getBoundingClientRect();


    const catWidth =
        cat.offsetWidth || 96;


    const catHeight =
        cat.offsetHeight || 96;


    const x =
        giftRect.left -
        gameRect.left +
        giftRect.width / 2 -
        catWidth / 2;


    const y =
        giftRect.top -
        gameRect.top -
        catHeight +
        28;


    setCatMood(
        "smug"
    );


    playSFX(
        sfxRun,
        0.20
    );


    /*
     * Đưa mèo đến hộp
     */

    setCatPixelPosition(
        x,
        y
    );


    /*
     * Mèo phải nhận được touch.
     */

    cat.style.pointerEvents =
        "auto";


    cat.style.zIndex =
        "90";


    /*
     * Khi mèo đã chiếm hộp,
     * hộp không được bắt touch nữa.
     */

    giftBox.style.pointerEvents =
        "none";


    cat.classList.add(
        "on-gift"
    );


    setTimeout(() => {

        showSpeech(
            "Tui ngồi đây rồi 😼",
            1600
        );

    }, 750);


    setTimeout(() => {

        showSpeech(
            "Muốn mở thì bắt tui xuống đi 😌",
            3300
        );

    }, 2300);

}



/* ==========================================
   KNOCK CAT OFF GIFT
========================================== */

function knockCatOffGift() {

    if (giftStage !== 1) {

        return;
    }


    /*
     * Đổi state ngay lập tức
     * để không bị click lần 2.
     */

    giftStage =
        2;


    hideSpeech();


    resetCatLook();


    setCatMood(
        "surprised"
    );


    playSFX(
        sfxBoing,
        0.48
    );


    vibrate(
        [
            20,
            25,
            20
        ]
    );


    /*
     * Rời khỏi hộp.
     */

    cat.classList.remove(
        "on-gift"
    );


    cat.classList.add(
        "cat-boing"
    );


    createDust();


    showSpeech(
        "Áaaaa 😹",
        1000
    );


    /*
     * Sau khi mèo đã bị hất,
     * hộp có thể nhận touch trở lại.
     *
     * Tuy nhiên giftStage = 2
     * nên không thể kích hoạt fake-open lần nữa.
     */

    giftBox.style.pointerEvents =
        "auto";


    setTimeout(() => {

        cat.classList.remove(
            "cat-boing"
        );


        cat.style.transition =
            "none";


        /*
         * Đặt mèo xuống góc trái.
         */

        setCatPosition(
            5,
            72
        );


        cat.style.transform =
            "rotate(-8deg)";


        cat.style.zIndex =
            "35";


        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                cat.style.transition =
                    "";

            });

        });

    }, 1100);


    setTimeout(() => {

        setCatMood(
            "embarrassed"
        );


        showSpeech(
            "Rồi rồi... mở đi 😂",
            1700
        );

    }, 1400);


    /*
     * Tự mở hộp sau khi mèo rơi xuống.
     */

    setTimeout(() => {

        cat.style.transform =
            "";


        openGift();

    }, 2600);

}


/* ==========================================
   OPEN GIFT
========================================== */

function openGift() {

    if (giftStage >= 3) return;


    giftStage =
        3;


    hideSpeech();


    playSFX(
        sfxSparkle,
        0.46
    );


    if (
        bgm &&
        soundEnabled
    ) {

        bgm.volume =
            0.28;
    }


    giftBox.classList.remove(
        "ready"
    );


    giftBox.classList.add(
        "opening"
    );


    vibrate(
        [
            20,
            40,
            25
        ]
    );


    showGiftGlow();


    createMagicStars();


    createConfetti(
        48
    );


    for (
        let i = 0;
        i < 5;
        i++
    ) {

        setTimeout(() => {

            spawnPetal();

        }, i * 170);

    }


    setTimeout(() => {

        shakeScreen();


        revealGarden();

    }, 420);


    setTimeout(() => {

        giftBox.classList.remove(
            "show"
        );


        giftBox.classList.add(
            "hidden"
        );

    }, 820);


    setTimeout(() => {

        showFinalButterflies();

    }, 1050);


    setTimeout(() => {

        setCatMood(
            "happy"
        );


        showSpeech(
            "Hehe 😸",
            1400
        );

    }, 1300);


    setTimeout(() => {

    showFinalCard();

}, 3200);

}



/* ==========================================
   GIFT GLOW
========================================== */

function showGiftGlow() {

    giftGlow.classList.remove(
        "hidden",
        "show"
    );


    void giftGlow.offsetWidth;


    giftGlow.classList.add(
        "show"
    );


    setTimeout(() => {

        giftGlow.classList.remove(
            "show"
        );


        giftGlow.classList.add(
            "hidden"
        );

    }, 1600);

}



/* ==========================================
   REVEAL GARDEN
========================================== */

function revealGarden() {

    garden.classList.remove(
        "hidden",
        "show"
    );


    void garden.offsetWidth;


    garden.classList.add(
        "show"
    );

}



/* ==========================================
   FINAL BUTTERFLIES
========================================== */

function showFinalButterflies() {

    createDynamicButterfly(
        7,
        67,
        76,
        25,
        3800
    );


    setTimeout(() => {

        createDynamicButterfly(
            88,
            58,
            17,
            34,
            4200
        );

    }, 250);


    setTimeout(() => {

        createDynamicButterfly(
            15,
            73,
            83,
            42,
            4500
        );

    }, 550);

}



/* ==========================================
   CREATE DYNAMIC BUTTERFLY
========================================== */

function createDynamicButterfly(

    startX,
    startY,
    endX,
    endY,
    duration

) {

    const el =
        document.createElement(
            "span"
        );


    el.className =
        "dynamic-butterfly";


    el.innerHTML = `

        <span class="butterfly-body"></span>

        <span
            class="
                butterfly-wing
                butterfly-wing-left
            "
        ></span>

        <span
            class="
                butterfly-wing
                butterfly-wing-right
            "
        ></span>

    `;


    el.style.left =
        `${startX}%`;


    el.style.top =
        `${startY}%`;


    el.style.transform =
        `scale(${random(0.75,1.05)})`;


    el.style.transition =
        `
        left ${duration}ms cubic-bezier(.35,.05,.55,1),
        top ${duration}ms cubic-bezier(.3,.1,.6,1),
        opacity 700ms ease
        `;


    game.appendChild(
        el
    );


    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            el.style.left =
                `${endX}%`;


            el.style.top =
                `${endY}%`;

        });

    });


    setTimeout(() => {

        el.style.opacity =
            "0";

    }, duration - 600);


    setTimeout(() => {

        el.remove();

    }, duration + 150);

}



/* ==========================================
   FINAL CARD
========================================== */

function showFinalCard() {

    giftStage =
        4;


    hideSpeech();


    hideHint();


    resetCatLook();


    /*
     * Cat final pose
     */

    cat.classList.remove(
        "running",
        "slipping",
        "peek",
        "hiding",
        "cat-boing",
        "on-gift"
    );


    setCatMood(
        "happy"
    );


    /*
     * Mèo nằm phía dưới bên trái.
     */

    setCatPosition(
        7,
        71
    );


    followSpeechDuringMotion(
        650
    );


    setTimeout(() => {

        cat.classList.add(
            "final-pose"
        );

    }, 650);


    /*
     * Show letter
     */

    finalCard.classList.remove(
        "hidden",
        "show"
    );


    void finalCard.offsetWidth;


    finalCard.classList.add(
        "show"
    );


    /*
     * Small final sparkle
     */

    setTimeout(() => {

        createConfetti(
            16
        );

    }, 650);


    /*
     * Butterfly approaches
     */

    setTimeout(() => {

        playSFX(
            sfxButterfly,
            0.12
        );


        butterflyLandOnCat();

    }, 950);


    /*
     * Background music
     */

    if (
        bgm &&
        soundEnabled
    ) {

        bgm.volume =
            0.36;

    }

}



/* ==========================================
   CAT LOOK SYSTEM
========================================== */

game.addEventListener(
    "pointerdown",
    event => {

        if (!started) return;


        /*
         * Tap visual
         */

        createTapEffect(
            event.clientX,
            event.clientY
        );


        if (
            giftStage === 4
        ) {

            return;
        }


        /*
         * Cat looks at touch
         */

        lookAtPoint(
            event.clientX,
            event.clientY
        );

    }
);


function lookAtPoint(

    clientX,
    clientY,
    resetAfter = true

) {

    if (
        cat.classList.contains(
            "hidden"
        )
    ) {

        return;
    }


    const catRect =
        cat.getBoundingClientRect();


    const catCenterX =
        catRect.left +
        catRect.width / 2;


    const catCenterY =
        catRect.top +
        catRect.height / 2;


    const dx =
        clientX -
        catCenterX;


    const dy =
        clientY -
        catCenterY;


    const eyeX =
        clamp(
            dx / 45,
            -2.4,
            2.4
        );


    const eyeY =
        clamp(
            dy / 55,
            -1.5,
            1.5
        );


    const headRotate =
        clamp(
            dx / 35,
            -7,
            7
        );


    cat
        .querySelectorAll(
            ".cat-eye"
        )
        .forEach(
            eye => {

                eye.style.setProperty(
                    "--look-x",
                    `${eyeX}px`
                );


                eye.style.setProperty(
                    "--look-y",
                    `${eyeY}px`
                );

            }
        );


    const head =
        cat.querySelector(
            ".cat-head"
        );


    if (head) {

        head.style.setProperty(
            "--head-look",
            `${headRotate}deg`
        );

    }


    if (!resetAfter) {

        return;
    }


    clearTimeout(
        lookResetTimer
    );


    lookResetTimer =
        setTimeout(() => {

            resetCatLook();

        }, 1200);

}



/* ==========================================
   RESET CAT LOOK
========================================== */

function resetCatLook() {

    clearTimeout(
        lookResetTimer
    );


    cat
        .querySelectorAll(
            ".cat-eye"
        )
        .forEach(
            eye => {

                eye.style.setProperty(
                    "--look-x",
                    "0px"
                );


                eye.style.setProperty(
                    "--look-y",
                    "0px"
                );

            }
        );


    const head =
        cat.querySelector(
            ".cat-head"
        );


    if (head) {

        head.style.setProperty(
            "--head-look",
            "0deg"
        );

    }

}



/* ==========================================
   NEAR CAT REACTION
========================================== */

game.addEventListener(
    "pointerdown",
    event => {

        if (!started) return;

        if (isBusy) return;

        if (gameFinished) return;

        if (nearReactionCooldown) return;


        const rect =
            cat.getBoundingClientRect();


        const centerX =
            rect.left +
            rect.width / 2;


        const centerY =
            rect.top +
            rect.height / 2;


        const dx =
            event.clientX -
            centerX;


        const dy =
            event.clientY -
            centerY;


        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );


        if (
            distance < 120 &&
            distance > 58
        ) {

            nearReactionCooldown =
                true;


            setCatMood(
                "surprised"
            );


            cat.classList.add(
                "cat-startled"
            );


            showSpeech(
                "Ê... gần rồi đó 😳",
                900
            );


            vibrate(
                10
            );


            setTimeout(() => {

                cat.classList.remove(
                    "cat-startled"
                );


                setCatMood(
                    "cheeky"
                );


                nearReactionCooldown =
                    false;

            }, 1000);

        }

    }
);



/* ==========================================
   CAT MOOD
========================================== */

function setCatMood(mood) {

    CAT_MOODS.forEach(
        className => {

            cat.classList.remove(
                className
            );

        }
    );


    cat.classList.add(
        `mood-${mood}`
    );

}



/* ==========================================
   CAT POSITION - PERCENT
========================================== */

function setCatPosition(

    xPercent,
    yPercent

) {

    const rect =
        game.getBoundingClientRect();


    const catWidth =
        cat.offsetWidth || 96;


    const catHeight =
        cat.offsetHeight || 96;


    const minX =
        10;


    const maxX =
        rect.width -
        catWidth -
        10;


    const minY =
        105;


    const maxY =
        rect.height -
        catHeight -
        55;


    let x =
        rect.width *
        (
            xPercent / 100
        );


    let y =
        rect.height *
        (
            yPercent / 100
        );


    x =
        clamp(
            x,
            minX,
            maxX
        );


    y =
        clamp(
            y,
            minY,
            maxY
        );


    cat.style.left =
        `${x}px`;


    cat.style.top =
        `${y}px`;


    followSpeechDuringMotion(
        600
    );

}



/* ==========================================
   CAT POSITION - PIXEL
========================================== */

function setCatPixelPosition(

    x,
    y

) {

    const rect =
        game.getBoundingClientRect();


    const catWidth =
        cat.offsetWidth || 96;


    const catHeight =
        cat.offsetHeight || 96;


    const safeX =
        clamp(
            x,
            10,
            rect.width -
            catWidth -
            10
        );


    const safeY =
        clamp(
            y,
            90,
            rect.height -
            catHeight -
            50
        );


    cat.style.left =
        `${safeX}px`;


    cat.style.top =
        `${safeY}px`;


    followSpeechDuringMotion(
        600
    );

}



/* ==========================================
   SPEECH FOLLOW
========================================== */

function followSpeechDuringMotion(
    duration = 600
) {

    const start =
        performance.now();


    function frame(now) {

        updateSpeechPosition();


        if (
            now - start <
            duration
        ) {

            requestAnimationFrame(
                frame
            );

        }

    }


    requestAnimationFrame(
        frame
    );

}



/* ==========================================
   SAFE RANDOM POSITION
========================================== */

function getSafeRandomPosition() {

    const positions = [

        {

            x:
                random(
                    8,
                    24
                ),

            y:
                random(
                    40,
                    61
                )
        },

        {

            x:
                random(
                    59,
                    76
                ),

            y:
                random(
                    39,
                    61
                )
        },

        {

            x:
                random(
                    18,
                    38
                ),

            y:
                random(
                    55,
                    70
                )
        },

        {

            x:
                random(
                    54,
                    72
                ),

            y:
                random(
                    56,
                    70
                )
        },

        {

            x:
                random(
                    32,
                    55
                ),

            y:
                random(
                    35,
                    48
                )
        }

    ];


    return positions[
        Math.floor(
            Math.random() *
            positions.length
        )
    ];

}



/* ==========================================
   SPEECH
========================================== */

function showSpeech(
    text,
    duration = 1700
) {

    clearTimeout(
        showSpeech.timer
    );

    speech.textContent =
        text;

    speech.classList.remove(
        "hidden"
    );

    speech.classList.add(
        "show"
    );

    startSpeechFollow();

    showSpeech.timer =
        setTimeout(() => {

            hideSpeech();

        }, duration);
}



/* ==========================================
   HIDE SPEECH
========================================== */

function hideSpeech() {

    clearTimeout(
        showSpeech.timer
    );

    speech.classList.remove(
        "show"
    );

    speech.classList.add(
        "hidden"
    );

    stopSpeechFollow();
}

function startSpeechFollow() {

    stopSpeechFollow();


    function follow() {

        if (
            !speech.classList.contains(
                "show"
            )
        ) {

            speechFollowFrame =
                null;

            return;
        }


        updateSpeechPosition();


        speechFollowFrame =
            requestAnimationFrame(
                follow
            );
    }


    speechFollowFrame =
        requestAnimationFrame(
            follow
        );
}


function stopSpeechFollow() {

    if (
        speechFollowFrame !== null
    ) {

        cancelAnimationFrame(
            speechFollowFrame
        );

        speechFollowFrame =
            null;
    }
}



/* ==========================================
   SPEECH POSITION
   ALWAYS ABOVE CAT
========================================== */

function updateSpeechPosition() {

    if (
        !cat ||
        !speech ||
        cat.classList.contains(
            "hidden"
        )
    ) {

        return;
    }


    const catRect =
        cat.getBoundingClientRect();


    const gameRect =
        game.getBoundingClientRect();


    const speechWidth =
        speech.offsetWidth || 180;


    const speechHeight =
        speech.offsetHeight || 45;


    let left =
        catRect.left -
        gameRect.left +
        catRect.width / 2 -
        speechWidth / 2;


    let top =
        catRect.top -
        gameRect.top -
        speechHeight -
        16;


    const padding =
        12;


    left =
        clamp(
            left,
            padding,
            gameRect.width -
            speechWidth -
            padding
        );


    top =
        Math.max(
            12,
            top
        );


    speech.style.left =
        `${left}px`;


    speech.style.top =
        `${top}px`;

}



/* ==========================================
   PETAL SYSTEM
========================================== */

function startPetals() {

    if (petalRunning) return;


    petalRunning =
        true;


    schedulePetal();

}



function schedulePetal() {

    if (!petalRunning) return;


    clearTimeout(
        petalTimer
    );


    const delay =
        random(
            2400,
            5000
        );


    petalTimer =
        setTimeout(() => {

            spawnPetal();


            schedulePetal();

        }, delay);

}



function spawnPetal() {

    if (!petalLayer) return;


    const existing =
        petalLayer.querySelectorAll(
            ".flying-petal"
        );


    if (existing.length >= 4) {

        return;
    }


    const petal =
        document.createElement(
            "span"
        );


    petal.className =
        "flying-petal";


    petal.style.left =
        `${random(4,94)}%`;


    petal.style.setProperty(
        "--petal-scale",
        random(
            0.65,
            1.05
        )
    );


    petal.style.setProperty(
        "--petal-x1",
        `${random(-45,55)}px`
    );


    petal.style.setProperty(
        "--petal-x2",
        `${random(-65,75)}px`
    );


    petal.style.setProperty(
        "--petal-x3",
        `${random(-90,100)}px`
    );


    const duration =
        random(
            6500,
            9500
        );


    petal.style.setProperty(
        "--petal-duration",
        `${duration}ms`
    );


    petalLayer.appendChild(
        petal
    );


    setTimeout(() => {

        petal.remove();

    }, duration + 150);

}



/* ==========================================
   PARTICLES
========================================== */

function createDust() {

    const catRect =
        cat.getBoundingClientRect();


    const gameRect =
        game.getBoundingClientRect();


    const x =
        catRect.left -
        gameRect.left +
        catRect.width / 2;


    const y =
        catRect.bottom -
        gameRect.top -
        10;


    spawnDust(
        x,
        y,
        7
    );

}



function createGiftDust() {

    const giftRect =
        giftBox.getBoundingClientRect();


    const gameRect =
        game.getBoundingClientRect();


    const x =
        giftRect.left -
        gameRect.left +
        giftRect.width / 2;


    const y =
        giftRect.bottom -
        gameRect.top;


    spawnDust(
        x,
        y,
        12
    );

}



function spawnDust(

    x,
    y,
    amount

) {

    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const dust =
            document.createElement(
                "span"
            );


        dust.className =
            "dust";


        dust.style.left =
            `${x}px`;


        dust.style.top =
            `${y}px`;


        const size =
            random(
                5,
                10
            );


        dust.style.width =
            `${size}px`;


        dust.style.height =
            `${size}px`;


        dust.style.setProperty(
            "--dx",
            `${random(-48,48)}px`
        );


        dust.style.setProperty(
            "--dy",
            `${random(-32,14)}px`
        );


        particles.appendChild(
            dust
        );


        setTimeout(() => {

            dust.remove();

        }, 800);

    }

}



/* ==========================================
   CONFETTI
========================================== */

function createConfetti(amount) {

    const colors = [

        "#ffb3c7",

        "#ffe38d",

        "#aee6b1",

        "#9edcff",

        "#d6b5ff",

        "#ffffff"

    ];


    const gameRect =
        game.getBoundingClientRect();


    const originX =
        gameRect.width / 2;


    const originY =
        gameRect.height * 0.70;


    for (
        let i = 0;
        i < amount;
        i++
    ) {

        const piece =
            document.createElement(
                "span"
            );


        piece.className =
            "confetti";


        piece.style.left =
            `${originX}px`;


        piece.style.top =
            `${originY}px`;


        piece.style.background =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];


        piece.style.width =
            `${random(6,11)}px`;


        piece.style.height =
            `${random(9,16)}px`;


        piece.style.setProperty(
            "--x",
            `${random(-150,150)}px`
        );


        piece.style.setProperty(
            "--x2",
            `${random(-210,210)}px`
        );


        piece.style.setProperty(
            "--up",
            `${random(-240,-110)}px`
        );


        piece.style.setProperty(
            "--down",
            `${random(90,290)}px`
        );


        const duration =
            random(
                1600,
                2600
            );


        piece.style.setProperty(
            "--duration",
            `${duration}ms`
        );


        particles.appendChild(
            piece
        );


        setTimeout(() => {

            piece.remove();

        }, duration + 200);

    }

}



/* ==========================================
   MAGIC STARS
========================================== */

function createMagicStars() {

    const giftRect =
        giftBox.getBoundingClientRect();


    const gameRect =
        game.getBoundingClientRect();


    const originX =
        giftRect.left -
        gameRect.left +
        giftRect.width / 2;


    const originY =
        giftRect.top -
        gameRect.top +
        giftRect.height / 2;


    const icons = [

        "✨",
        "✦",
        "⭐",
        "✧",
        "✨"

    ];


    for (
        let i = 0;
        i < 16;
        i++
    ) {

        const star =
            document.createElement(
                "span"
            );


        star.className =
            "magic-star";


        star.textContent =
            icons[
                Math.floor(
                    Math.random() *
                    icons.length
                )
            ];


        star.style.left =
            `${originX}px`;


        star.style.top =
            `${originY}px`;


        star.style.fontSize =
            `${random(13,22)}px`;


        star.style.setProperty(
            "--sx",
            `${random(-155,155)}px`
        );


        star.style.setProperty(
            "--sy",
            `${random(-210,-55)}px`
        );


        particles.appendChild(
            star
        );


        setTimeout(() => {

            star.remove();

        }, 1800);

    }

}



/* ==========================================
   AUDIO SYSTEM
========================================== */

function unlockAudio() {

    audioUnlocked =
        true;


    startBGM();

}



function playSFX(

    audio,
    volume = 0.5

) {

    if (!soundEnabled) return;

    if (!audio) return;


    try {

        audio.pause();


        audio.currentTime =
            0;


        audio.volume =
            volume;


        audio.play().catch(
            () => {}
        );

    }

    catch (error) {

        // Ignore unavailable audio files.

    }

}



function toggleSound() {

    soundEnabled =
        !soundEnabled;


    if (soundEnabled) {

        soundButton.textContent =
            "🔊";


        soundButton.classList.remove(
            "muted"
        );


        if (started) {

            startBGM();

        }

    }

    else {

        soundButton.textContent =
            "🔇";


        soundButton.classList.add(
            "muted"
        );


        if (bgm) {

            bgm.pause();

        }

    }

}

/* ==========================================
   START BACKGROUND MUSIC
========================================== */

function startBGM() {

    if (!bgm) {

        console.warn(
            "Không tìm thấy bgm"
        );

        return;
    }


    if (!soundEnabled) {

        return;
    }


    /*
     * Tăng âm lượng.
     *
     * 0.22 trước đây hơi nhỏ.
     */

    bgm.volume =
        0.42;


    /*
     * Nếu nhạc đã chạy rồi
     * thì không restart.
     */

    if (!bgm.paused) {

        return;
    }


    const promise =
        bgm.play();


    if (
        promise &&
        typeof promise.then ===
        "function"
    ) {

        promise
            .then(() => {

                audioUnlocked =
                    true;


                console.log(
                    "BGM started"
                );

            })

            .catch(error => {

                console.warn(
                    "BGM không phát:",
                    error
                );

            });

    }

}



/* ==========================================
   SOUND BUTTON
========================================== */

soundButton.addEventListener(
    "pointerdown",
    event => {

        event.preventDefault();

        event.stopPropagation();


        /*
         * Nếu chưa bắt đầu game,
         * cú chạm này cũng là user gesture.
         */

        if (!audioUnlocked) {

            audioUnlocked =
                true;
        }


        toggleSound();

    }
);



/* ==========================================
   SHAKE
========================================== */

function shakeScreen() {

    game.classList.remove(
        "shake"
    );


    void game.offsetWidth;


    game.classList.add(
        "shake"
    );


    setTimeout(() => {

        game.classList.remove(
            "shake"
        );

    }, 350);

}



/* ==========================================
   VIBRATION
========================================== */

function vibrate(pattern) {

    if (
        "vibrate" in navigator
    ) {

        navigator.vibrate(
            pattern
        );
    }

}



/* ==========================================
   HINT
========================================== */

function hideHint() {

    hint.classList.remove(
        "show"
    );


    hint.classList.add(
        "hidden"
    );

}



/* ==========================================
   REPLAY
========================================== */

replayButton.addEventListener(
    "pointerdown",
    event => {

        event.preventDefault();

        event.stopPropagation();


        location.reload();

    }
);



/* ==========================================
   HELPERS
========================================== */

function random(

    min,
    max

) {

    return (
        Math.random() *
        (
            max -
            min
        ) +
        min
    );

}



function clamp(

    value,
    min,
    max

) {

    return Math.min(
        Math.max(
            value,
            min
        ),
        max
    );

}



/* ==========================================
   RESIZE
========================================== */

let resizeTimer =
    null;


window.addEventListener(
    "resize",
    () => {

        clearTimeout(
            resizeTimer
        );


        resizeTimer =
            setTimeout(() => {

                updateSpeechPosition();


                /*
                 * Nếu butterfly đã đáp
                 * thì căn lại theo mèo.
                 */

                if (
                    landingButterfly &&
                    landingButterfly
                        .classList
                        .contains(
                            "landed"
                        )
                ) {

                    positionButterflyOnCat();

                }

            }, 120);

    }
);



window.addEventListener(
    "orientationchange",
    () => {

        setTimeout(() => {

            updateSpeechPosition();

        }, 250);

    }

);

/* ==========================================
   TAP EFFECT
========================================== */

function createTapEffect(
    clientX,
    clientY
) {

    if (!tapLayer) return;


    const gameRect =
        game.getBoundingClientRect();


    const x =
        clientX -
        gameRect.left;


    const y =
        clientY -
        gameRect.top;


    /*
     * Ring
     */

    const ring =
        document.createElement(
            "span"
        );


    ring.className =
        "tap-ring";


    ring.style.left =
        `${x}px`;


    ring.style.top =
        `${y}px`;


    tapLayer.appendChild(
        ring
    );


    setTimeout(() => {

        ring.remove();

    }, 600);


    /*
     * Tiny sparks
     */

    const icons = [
        "✦",
        "·",
        "✧"
    ];


    for (
        let i = 0;
        i < 3;
        i++
    ) {

        const spark =
            document.createElement(
                "span"
            );


        spark.className =
            "tap-spark";


        spark.textContent =
            icons[
                Math.floor(
                    Math.random() *
                    icons.length
                )
            ];


        spark.style.left =
            `${x}px`;


        spark.style.top =
            `${y}px`;


        spark.style.setProperty(
            "--spark-x",
            `${random(-24,24)}px`
        );


        spark.style.setProperty(
            "--spark-y",
            `${random(-28,10)}px`
        );


        tapLayer.appendChild(
            spark
        );


        setTimeout(() => {

            spark.remove();

        }, 750);

    }

}

/* ==========================================
   MISS REACTION
========================================== */

game.addEventListener(
    "pointerdown",
    event => {

        if (!started) return;

        if (isBusy) return;

        if (gameFinished) return;


        const catRect =
            cat.getBoundingClientRect();

            const centerX =
    catRect.left +
    catRect.width / 2;


const centerY =
    catRect.top +
    catRect.height / 2;


const dx =
    event.clientX -
    centerX;


const dy =
    event.clientY -
    centerY;


const distance =
    Math.sqrt(
        dx * dx +
        dy * dy
    );


/*
 * Near reaction sẽ xử lý vùng này.
 */

if (
    distance < 125
) {

    return;
}


        /*
         * Nếu chạm ngay vào mèo
         * thì bỏ qua.
         */

        if (
            event.clientX >=
                catRect.left &&

            event.clientX <=
                catRect.right &&

            event.clientY >=
                catRect.top &&

            event.clientY <=
                catRect.bottom
        ) {

            return;
        }


        missCount++;


        /*
         * Không nói mỗi lần chạm.
         *
         * Cứ 3 lần hụt mới trêu một câu.
         */

        if (
            missCount % 3 !== 0
        ) {

            return;
        }


        setCatMood(
            "smug"
        );


        showSpeech(
            "Ở đây nè 😼",
            900
        );


        setTimeout(() => {

            if (
                !isBusy &&
                !gameFinished
            ) {

                setCatMood(
                    "cheeky"
                );

            }

        }, 950);

    }
);

/* ==========================================
   BUTTERFLY LANDS ON CAT
========================================== */

function butterflyLandOnCat() {

    if (
        !landingButterfly
    ) {

        return;
    }


    /*
     * Start outside screen
     */

    const gameRect =
        game.getBoundingClientRect();


    landingButterfly.classList.remove(
        "hidden",
        "landed",
        "flying"
    );


    landingButterfly.style.left =
        `${gameRect.width + 50}px`;


    landingButterfly.style.top =
        `${gameRect.height * 0.25}px`;


    landingButterfly.style.transform =
        "rotate(-15deg) scale(0.75)";


    void landingButterfly.offsetWidth;


    landingButterfly.classList.add(
        "flying"
    );


    /*
     * Target = top of cat head
     */

    requestAnimationFrame(() => {

        const catRect =
            cat.getBoundingClientRect();


        const currentGameRect =
            game.getBoundingClientRect();


        const targetX =
            catRect.left -
            currentGameRect.left +
            catRect.width * 0.46 -
            landingButterfly.offsetWidth / 2;


        const targetY =
            catRect.top -
            currentGameRect.top -
            24;


        landingButterfly.style.left =
            `${targetX}px`;


        landingButterfly.style.top =
            `${targetY}px`;


        landingButterfly.style.transform =
            "rotate(2deg) scale(0.72)";

    });


    /*
     * Cat watches butterfly
     */

    const tracking =
        setInterval(() => {

            const rect =
                landingButterfly
                    .getBoundingClientRect();


            lookAtPoint(

                rect.left +
                rect.width / 2,

                rect.top +
                rect.height / 2,

                false

            );

        }, 80);


    /*
     * Land
     */

    setTimeout(() => {

        clearInterval(
            tracking
        );


        landingButterfly
            .classList
            .remove(
                "flying"
            );


        landingButterfly
            .classList
            .add(
                "landed"
            );


        setCatMood(
            "surprised"
        );


        setTimeout(() => {

            setCatMood(
                "happy"
            );


            resetCatLook();

        }, 650);

    }, 2850);

}

/* ==========================================
   NETWORK STATUS
========================================== */

function updateNetworkStatus() {

    if (!offlineNotice) return;


    if (navigator.onLine) {

        offlineNotice.classList.remove(
            "show"
        );

    }

    else {

        offlineNotice.classList.add(
            "show"
        );

    }

}


window.addEventListener(
    "online",
    updateNetworkStatus
);


window.addEventListener(
    "offline",
    updateNetworkStatus
);


updateNetworkStatus();

/* ==========================================
   PRELOAD AUDIO
========================================== */

const AUDIO_FILES = [

    bgm,

    sfxPop,

    sfxRun,

    sfxSlip,

    sfxBoing,

    sfxGiftDrop,

    sfxSparkle,

    sfxButterfly

];


function preloadAudio() {

    AUDIO_FILES.forEach(
        audio => {

            if (!audio) return;


            try {

                audio.load();

            }

            catch (error) {

                // Không ảnh hưởng game.

            }

        }
    );

}

preloadAudio();

/* ==========================================
   TAP GUARD
========================================== */

function allowInteraction(
    delay = 180
) {

    const now =
        performance.now();


    if (
        now -
        lastInteractionTime <
        delay
    ) {

        return false;

    }


    lastInteractionTime =
        now;


    return true;

}

/* ==========================================
   PAGE VISIBILITY
========================================== */

document.addEventListener(
    "visibilitychange",
    () => {

        if (!bgm) return;


        /*
         * Người dùng rời khỏi trang
         */

        if (
            document.hidden
        ) {

            bgm.pause();

            return;
        }


        /*
         * Quay lại trang
         */

        if (
            started &&
            soundEnabled &&
            audioUnlocked
        ) {

            bgm.play().catch(
                () => {}
            );

        }

    }
);

/* ==========================================
   POSITION BUTTERFLY ON CAT
========================================== */

function positionButterflyOnCat() {

    if (!landingButterfly) return;


    const catRect =
        cat.getBoundingClientRect();


    const gameRect =
        game.getBoundingClientRect();


    const x =
        catRect.left -
        gameRect.left +
        catRect.width * 0.46 -
        landingButterfly.offsetWidth / 2;


    const y =
        catRect.top -
        gameRect.top -
        24;


    landingButterfly.style.left =
        `${x}px`;


    landingButterfly.style.top =
        `${y}px`;

}