document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.querySelector('.news-container');
    const prevBtn = document.querySelector('.news-prev');
    const nextBtn = document.querySelector('.news-next');
    const addNewsBtn = document.getElementById('add-news-btn'); // Кнопка "Добавить новость"
    const API_URL = 'https://localhost:7268/api/News';
    let currentIndex = 0;
    let newsList = [];

    // Получаем пользователя из локального хранилища
    const user = JSON.parse(localStorage.getItem('user'));

    // Проверяем роль пользователя и скрываем кнопку "Добавить новость", если он не администратор
    if (!user || user.role !== 'Admin') {
        addNewsBtn.style.display = 'none';
    } else {
        // Если пользователь администратор, добавляем обработчик события на кнопку
        addNewsBtn.addEventListener('click', () => {
            const modal = document.getElementById('news-modal');
            modal.style.display = 'block';
        });
    }

    async function fetchNews() {
        try {
            const response = await fetch(API_URL);
            if (response.ok) {
                const result = await response.json();
                newsList = result.$values || result; // Обрабатываем, если данные приходят в объекте $values
                loadNewsSlides();
            } else {
                console.error('Ошибка при загрузке новостей:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при подключении к серверу:', error);
        }
    }

    function loadNewsSlides() {
        newsContainer.innerHTML = ''; // Очищаем контейнер
        updateSlider();
    }

    function updateSlider() {
        // Очищаем контейнер и добавляем три новости, начиная с currentIndex
        newsContainer.innerHTML = '';

        let visibleNews = newsList.slice(currentIndex, currentIndex + 3);

        // Если мы находимся в конце списка и осталось меньше трех новостей
        if (visibleNews.length < 3) {
            visibleNews = visibleNews.concat(newsList.slice(0, 3 - visibleNews.length));
        }

        visibleNews.forEach((news, index) => {
            const newsCard = document.createElement('div');
            newsCard.classList.add('news-card');
            if (index === 1) {
                newsCard.classList.add('center'); // Делает центральную новость больше
            }

            newsCard.innerHTML = `
                <h3>${news.title}</h3>
                <p class="news-date">${new Date(news.datePublished).toLocaleDateString("ru-RU", {
                    day: "numeric", month: "long", year: "numeric"
                })}</p>
                <p>${news.content.length > 100 ? news.content.substring(0, 100) + '...' : news.content}</p>
                <a href="news.html?id=${news.newsID}" class="read-more-btn">Подробнее</a>
            `;

            // Если пользователь - администратор, добавляем кнопки редактирования и удаления
            if (user && user.role === 'Admin') {
                const adminControls = document.createElement('div');
                adminControls.classList.add('admin-controls');

                // Кнопка редактирования
                const editButton = document.createElement('button');
                editButton.classList.add('edit-btn');
                editButton.innerHTML = '<i class="fas fa-pencil-alt"></i>'; // Иконка карандаша
                editButton.addEventListener('click', () => {
                    console.log(`Редактировать новость: ${news.newsID}`);
                });

                // Кнопка удаления
                const deleteButton = document.createElement('button');
                deleteButton.classList.add('delete-btn');
                deleteButton.innerHTML = '<i class="fas fa-trash"></i>'; // Иконка мусорного ведра
                deleteButton.addEventListener('click', () => {
                    if (confirm('Вы уверены, что хотите удалить эту новость?')) {
                        deleteNews(news.newsID);
                    }
                });

                adminControls.appendChild(editButton);
                adminControls.appendChild(deleteButton);
                newsCard.appendChild(adminControls);
            }

            newsContainer.appendChild(newsCard);
        });
    }

    async function deleteNews(newsID) {
        try {
            const response = await fetch(`${API_URL}/${newsID}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                // Успешно удалено, обновляем слайдер
                newsList = newsList.filter(news => news.newsID !== newsID);
                updateSlider();
            } else {
                console.error('Ошибка при удалении новости:', response.statusText);
            }
        } catch (error) {
            console.error('Ошибка при подключении к серверу:', error);
        }
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + newsList.length) % newsList.length;
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % newsList.length;
        updateSlider();
    });

    fetchNews();
});
