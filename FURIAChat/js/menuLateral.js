const menuButton = document.getElementById('menu-button');
const sidebar = document.getElementById('sidebar');
const content = document.getElementById('content');

menuButton.addEventListener('click', () => {
    sidebar.classList.toggle('closed');
    content.classList.toggle('shifted');
});

function toggleMessages(section) {
    const messages = document.getElementById(section + 'Messages');
    if (messages.style.display === 'none') {
        messages.style.display = 'block';
    } else {
        messages.style.display = 'none';
    }
}

