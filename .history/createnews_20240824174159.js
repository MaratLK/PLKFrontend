document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.querySelector('.news-container');
    const addNewsBtn = document.getElementById('add-news-btn');
    const newsModal = document.getElementById('news-modal');
    const newsForm = document.getElementById('news-form');

    let cardIdCounter = 1;

    addNewsBtn.addEventListener('click', () => {
        console.log('Button clicked');
        newsModal.classList.add('show');
    });

    newsForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const title = document.getElementById('news-title').value;
        const date = document.getElementById('news-date').value;
        const description = document.getElementById('news-description').value;
        const imageFile = document.getElementById('news-image').files[0];

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageUrl = e.target.result;
                createNewsCard(title, date, description, imageUrl);
            };
            reader.readAsDataURL(imageFile);
        }

        newsModal.classList.remove('show');
        newsForm.reset();
    });

    function createNewsCard(title, date, description, imageUrl) {
        const card = document.createElement('div');
        card.classList.add('news-card');
        card.setAttribute('data-id', cardIdCounter);

        card.innerHTML = `
            <div class="news-header">
                <h3>${title}</h3>
                <span class="news-date">${date}</span>
            </div>
            <img src="${imageUrl}" alt="News Image">
            <p>${description}</p>
            <button class="delete-btn" data-id="${cardIdCounter}">Удалить</button>
        `;

        newsContainer.appendChild(card);
        cardIdCounter++;

        card.querySelector('.delete-btn').addEventListener('click', function() {
            const cardId = this.getAttribute('data-id');
            const cardToDelete = document.querySelector(`.news-card[data-id="${cardId}"]`);
            if (cardToDelete) {
                cardToDelete.remove();
            }
        });
    }
});
