const splashScreen = document.getElementById('splash-screen');
const chatContainer = document.getElementById('chat-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const keyboardSound = document.getElementById('keyboard-sound');

const storedMessages = JSON.parse(localStorage.getItem('chatMessages')) || [];

setTimeout(() => {
    showChat();
    resetChatHistory();
    showSystemInfo();
}, 5000);

function showChat() {
    splashScreen.style.display = 'none';
    chatContainer.style.display = 'block';
}

function resetChatHistory() {
    localStorage.removeItem('chatMessages');
}

function showSystemInfo() {
    const systemInfo = document.getElementById('system-info');
    systemInfo.innerHTML = '';

    const systemMessages = [
        'Sistema: RetroChat v1.0',
        'Bem-vindo ao RetroChat!',
        'Conexões estabelecidas com sucesso!'
    ];
    systemMessages.forEach(message => {
        const p = document.createElement('p');
        p.textContent = message;
        systemInfo.appendChild(p);
    });
}

sendButton.addEventListener('click', () => {
    sendMessage();
});

messageInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

messageInput.addEventListener('keydown', (event) => {
    if (event.key.length === 1) {
        keyboardSound.currentTime = 0;
        keyboardSound.play();
    }
});

function sendMessage() {
    const message = messageInput.value.trim();
    if (message !== '') {
        appendMessage(message);
        messageInput.value = '';
        storeMessage(message);
    }
}

function appendMessage(message) {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    chatContainer.appendChild(messageElement);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function storeMessage(message) {
    const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    messages.push(message);
    localStorage.setItem('chatMessages', JSON.stringify(messages));
}
