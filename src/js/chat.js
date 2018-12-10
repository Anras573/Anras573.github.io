let chatForm = document.getElementById('chatForm');
let chat = document.getElementById('chat');
let input = document.getElementById('chatMessage');

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let message = input.value;
    input.value = '';
    console.log(message);
    createHumanReply(message);

    if (window.fetch) {
        getBotReplyWithFetch(message);
    } else {

    }

    return false;
});

function createIntroMessage() {
    setTimeout(() => {
        createBotReply('Hi there!');
    }, 1000);
    
    setTimeout(() => {
        createBotReply("I'm a bot answering on behalf of Anders.");
    }, 2000);
    
    setTimeout(() => {
        createBotReply("Ask me anything you would ask Anders and I'll answer to the best of my capabilities :)");
    }, 3000);
}

function createBotReply(message) {
    let card = createDivWithClass(['card', 'my-3', 'border-bottom', 'col-10']);
    let body = createDivWithClass('card-body');
    let row = createDivWithClass('row');
    let logoContainer = createDivWithClass('col-3');
    let logo = createBotImage();
    let textContainer = createDivWithClass('col');
    let span = document.createElement('span');
    span.innerHTML = message;
    logoContainer.append(logo);
    textContainer.append(span);
    row.append(logoContainer);
    row.append(textContainer);
    body.append(row);
    card.append(body);
    chat.append(card);
}

function createHumanReply(message) {
    let card = createDivWithClass(['card', 'my-3', 'border-bottom', 'col-10', 'bg-primary', 'text-white']);
    let body = createDivWithClass(['card-body', 'text-right']);
    let row = createDivWithClass('row');
    let logoContainer = createDivWithClass('col-3');
    let logo = createHumanImage();
    let textContainer = createDivWithClass('col');
    let span = document.createElement('span');
    span.innerHTML = message;
    logoContainer.append(logo);
    textContainer.append(span);
    row.append(textContainer);
    row.append(logoContainer);
    body.append(row);
    card.append(body);
    chat.append(card);
}

function createDivWithClass(cssClass) {
    let div = document.createElement('div');

    if (Array.isArray(cssClass)) {
        cssClass.forEach(css => {
            div.classList.add(css);
        });
    } else if (cssClass !== undefined) {
        div.classList.add(cssClass);
    }

    return div;
}

function createBotImage() {
    let image = document.createElement('img');
    image.classList.add('rounded-circle');
    image.classList.add('img-thumbnail');
    image.src = 'img/AndersB_bottom.png';
    image.alt = 'Bot profile picture';
    return image;
}

function createHumanImage() {
    let image = document.createElement('img');
    image.classList.add('rounded-circle');
    image.classList.add('img-thumbnail');
    image.src = 'img/user_icon.png';
    image.alt = 'User profile picture';
    return image;
}

function getBotReplyWithFetch(message) {
    let knowledgeBaseId = '11ae6df3-68a6-4718-8bc6-9fae647c2fa1';
    let endpointKey = '4ff95229-6e0c-4c6a-bb82-ab3c20f175aa';
    let url = 'https://anborachatbot.azurewebsites.net/qnamaker/knowledgebases/' + knowledgeBaseId + '/generateAnswer';
    let question = { question: message };

    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'EndpointKey ' + endpointKey,
            'Content-Type': 'Application/json'
        },
        body: JSON.stringify(question)
    })
    .then((response) => {
        response.json()
        .then((json) => {                
            let answer = json.answers[0].answer;
            createBotReply(answer);
        })
        .catch((error) => {
            console.log(error);
            let systemTag = document.createElement('p');

            systemTag.innerHTML = 'Error: Could not connect to bot!'
            chatWindow.append(systemTag);
        });
        
    })
    .catch((error) => {
        console.log(error);
        
        let systemTag = document.createElement('p');
        systemTag.innerHTML = 'Error: Could not connect to bot!'
        chatWindow.append(systemTag);
    });
}

createIntroMessage();
