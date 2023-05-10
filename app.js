var sendForm = document.querySelector('#chatform'),
    textInput = document.querySelector('.chatbox'),
    chatList = document.querySelector('.chatlist'),
    userBubble = document.querySelectorAll('.userInput'),
    botBubble = document.querySelectorAll('.bot__output'),
    animateBotBubble = document.querySelectorAll('.bot__input--animation'),
    overview = document.querySelector('.chatbot__overview'),
    hasCorrectInput,
    imgLoader = false,
    animationCounter = 1,
    animationBubbleDelay = 600,
    input,
    previousInput,
    isReaction = false,
    unkwnCommReaction = "I didn't get that ⁉",
    chatbotButton = document.querySelector(".submit-button")

sendForm.onkeydown = function (e) {
    if (e.keyCode == 13) {
        e.preventDefault();

        //No mix ups with upper and lowercases
        var input = textInput.value.toLowerCase();

        //Empty textarea fix
        if (input.length > 0) {
            createBubble(input)
        }
    }
};

sendForm.addEventListener('submit', function (e) {
    //so form doesnt submit page (no page refresh)
    e.preventDefault();

    //No mix ups with upper and lowercases
    var input = textInput.value.toLowerCase();

    //Empty textarea fix
    if (input.length > 0) {
        createBubble(input)
    }
}) //end of eventlistener

var createBubble = function (input) {
    //create input bubble
    var chatBubble = document.createElement('li');
    chatBubble.classList.add('userInput');

    //adds input of textarea to chatbubble list item
    chatBubble.innerHTML = input;

    //adds chatBubble to chatlist
    chatList.appendChild(chatBubble)

    checkInput(input);
}

var checkInput = function (input) {
    hasCorrectInput = false;
    isReaction = false;
    //Checks all text values in possibleInput
    for (var textVal in possibleInput) {
        //If user reacts with "yes" and the previous input was in textVal
        if (input == "yes" || input.indexOf("yes") >= 0) {
            if (previousInput == textVal) {
                console.log("sausigheid");

                isReaction = true;
                hasCorrectInput = true;
                botResponse(textVal);
            }
        }
        if (input == "no" && previousInput == textVal) {
            unkwnCommReaction = "For a list of commands type: Commands";
            unknownCommand("I'm sorry to hear that :(")
            unknownCommand(unkwnCommReaction);
            hasCorrectInput = true;
        }
        //Is a word of the input also in possibleInput object?
        if (input == textVal || input.indexOf(textVal) >= 0 && isReaction == false) {
            console.log("succes");
            hasCorrectInput = true;
            botResponse(textVal);
        }
    }
    //When input is not in possibleInput
    if (hasCorrectInput == false) {
        console.log("failed");
        unknownCommand(unkwnCommReaction);
        hasCorrectInput = true;
    }
}

// debugger;

function botResponse(textVal) {
    //sets previous input to that what was called
    // previousInput = input;

    //create response bubble
    var userBubble = document.createElement('li');
    userBubble.classList.add('bot__output');

    if (isReaction == true) {
        if (typeof reactionInput[textVal] === "function") {
            //adds input of textarea to chatbubble list item
            userBubble.innerHTML = reactionInput[textVal]();
        } else {
            userBubble.innerHTML = reactionInput[textVal];
        }
    }

    if (isReaction == false) {
        //Is the command a function?
        if (typeof possibleInput[textVal] === "function") {
            // console.log(possibleInput[textVal] +" is a function");
            //adds input of textarea to chatbubble list item
            userBubble.innerHTML = possibleInput[textVal]();
        } else {
            userBubble.innerHTML = possibleInput[textVal];
        }
    }
    //add list item to chatlist
    chatList.appendChild(userBubble) //adds chatBubble to chatlist

    // reset text area input
    textInput.value = "";
}

function unknownCommand(unkwnCommReaction) {
    // animationCounter = 1;

    //create response bubble
    var failedResponse = document.createElement('li');

    failedResponse.classList.add('bot__output');
    failedResponse.classList.add('bot__output--failed');

    //Add text to failedResponse
    failedResponse.innerHTML = unkwnCommReaction; //adds input of textarea to chatbubble list item

    //add list item to chatlist
    chatList.appendChild(failedResponse) //adds chatBubble to chatlist

    animateBotOutput();

    // reset text area input
    textInput.value = "";

    //Sets chatlist scroll to bottom
    chatList.scrollTop = chatList.scrollHeight;

    animationCounter = 1;
}

function responseText(e) {

    var response = document.createElement('li');

    response.classList.add('bot__output');

    //Adds whatever is given to responseText() to response bubble
    response.innerHTML = e;

    chatList.appendChild(response);

    animateBotOutput();

    console.log(response.clientHeight);

    //Sets chatlist scroll to bottom
    setTimeout(function () {
        chatList.scrollTop = chatList.scrollHeight;
        console.log(response.clientHeight);
    }, 0)
}

function responseImg(e) {
    var image = new Image();

    image.classList.add('bot__output');
    //Custom class for styling
    image.classList.add('bot__outputImage');
    //Gets the image
    image.src = "/images/" + e;
    chatList.appendChild(image);

    animateBotOutput()
    if (image.completed) {
        chatList.scrollTop = chatList.scrollTop + image.scrollHeight;
    }
    else {
        image.addEventListener('load', function () {
            chatList.scrollTop = chatList.scrollTop + image.scrollHeight;
        })
    }
}

//change to SCSS loop
function animateBotOutput() {
    chatList.lastElementChild.style.animationDelay = (animationCounter * animationBubbleDelay) + "ms";
    animationCounter++;
    chatList.lastElementChild.style.animationPlayState = "running";
}

function commandReset(e) {
    animationCounter = 1;
    previousInput = Object.keys(possibleInput)[e];
}

// hlep

var possibleInput = {
    // "hlep" : this.help(),
    "help": function () {
        responseText("You can type a command in the chatbox")
        responseText("Something like &quot;Boty, please show me Kishan&rsquo; best work&quot;")
        responseText("Did you find a bug or problem? Drop a mail Please")
        commandReset(0);
        return
    },
    "hi": function () {
        responseText("👋 Hii there, How can i help you ? ");
        commandReset(0);
        return
    },
    "bye": function () {
        responseText("Bye !, See you later ❤");
        commandReset(0);
    },
    "best work": function () {
        responseText("I will show you some best work!");
        responseText("These are his <a href='https://www.linkedin.com/pulse/easy-website-hosting-firebase-kishan-patel'>Webhosting Article on linkedln</a>")
        responseText("These are his <a href='http://github.com/kishxnpatel'>Github projects</a>")
        responseText("Would you like to see how I was built? (Yes/No)")
        commandReset(2);
        return
    },
    "about": function () {
        responseText("This is me, Kishan Patel ");
        responseText("I'm a 21 year old Computer Science student");
        responseText("My ambition is to become a great Creative Front-End Developer");
        responseText("Would you like to know about my vision? (Yes/No)");
        commandReset(2);
        return
    },
    "experience": function () {
        responseText("previously worked at:");
        responseText("OnePrismtech as a junior Front-end Developer");
        commandReset(1);
        return
    },
    "hobbies": function () {
        responseText("Kishan loves:");
        responseText("Coding complicated chatbots");
        responseText("Football ⚽");
        responseText("E-Sports");
        responseText("Working out 👾");
        commandReset(4);
        return
    },
    "interests": function () {
        responseText("Kishan loves:");
        responseText("Coding complicated chatbots");
        responseText("Football ⚽");
        responseText("E-Sports");
        responseText("Working out 👾");
        commandReset(5);
        return
    },
    "vision": function () {
        responseText("Things I want to learn or do:");
        responseText("Get great at CSS & JS animation");
        responseText("Create 3D browser experiences");
        responseText("Learn Three.js and WebGL");
        responseText("Combine Motion Design with Front-End");
        commandReset(6);
        return
    },
    "contact": function () {
        responseText("Email: <a href='mailto:kishnptll@gmail.com?Subject=Hello%20Kishan' target='_top'>send me a message</a>");
        responseText("linkedln: <a href='https://linkedln.com/in/kishnpatel'>@KishnPatel</a>");
        commandReset(7);
        return
    },
    "commands": function () {
        responseText("This is a list of commands Boty knows:")
        responseText("help, best work, about, vision, experience, hobbies / interests, contact");
        commandReset(8);
        return
    },
    // "Social": function () {
    //   window.location.href = "https://instagram.com/kishxnpatel"
    //},
    // work experience
}

var reactionInput = {
    "best work": function () {
        //Redirects you to a different page after 3 secs
        responseText("On this GitHub page you'll find everything about Boty");
        responseText("<a href='https://github.com/kishxnpatel/chatbot'>Boty on GitHub</a>")
        animationCounter = 1;
        return
    },
    "about": function () {
        responseText("Things I want to learn or do:");
        responseText("Get great at CSS & JS animation");
        responseText("Create 3D browser experiences");
        responseText("Learn Three.js and WebGL");
        responseText("Combine Motion Design with Front-End");
        animationCounter = 1;
        return
    }
}
