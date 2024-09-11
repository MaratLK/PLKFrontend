document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.querySelector('.news-container');
    const addNewsBtn = document.getElementById('add-news-btn');
    const newsModal = document.getElementById('news-modal');
    const newsForm = document.getElementById('news-form');
    //let cardIdCounter = 1;

    // Открытие модального окна для создания новости
    addNewsBtn.addEventListener('click', () => {
        newsModal.classList.add('show');
    });

    // Закрытие модального окна (в примере через submit формы)
    newsForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Получаем данные из формы
        const title = document.getElementById('news-title').value;
        const date = document.getElementById('news-date').value;
        const description = document.getElementById('news-description').value;
        const imageFile = document.getElementById('news-image').files[0];

        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageUrl = e.target.result;
                createNewsCard(title, date, description, imageUrl);  // Передаем URL картинки
            };
            reader.readAsDataURL(imageFile);
        }

        // Закрываем модальное окно после создания карточки
        newsModal.classList.remove('show');

        // Очищаем форму
        newsForm.reset();
    });

    // Функция создания карточки новости
    function createNewsCard(title, date, description, imageUrl) {
        const card = document.createElement('div');
        card.classList.add('news-card');
        card.setAttribute('data-id', cardIdCounter);

        card.innerHTML = `
            <div class="news-header">
                <h3>${title}</h3>
                <span class="news-date">${date}</span>
            </div>
            <img src="${imageUrl}" alt="Новостное изображение">
            <p>${description}</p>
            <button class="delete-btn" data-id="${cardIdCounter}">Удалить</button>
        `;

        // Добавляем новую карточку в контейнер
        newsContainer.appendChild(card);

        // Увеличиваем счётчик ID
        cardIdCounter++;

        // Добавляем обработчик для кнопки удаления
        card.querySelector('.delete-btn').addEventListener('click', function() {
            const cardId = this.getAttribute('data-id');
            const cardToDelete = document.querySelector(`.news-card[data-id="${cardId}"]`);
            if (cardToDelete) {
                cardToDelete.remove();
            }
        });
    }
});
