document.addEventListener('DOMContentLoaded', async () => {
    const newsTitle = document.getElementById('news-title');
    const newsDate = document.getElementById('news-date');
    const newsContent = document.getElementById('news-content');
    const thumbnailsContainer = document.getElementById('thumbnails');
    const mainImage = document.getElementById('main-image');

    // Получаем ID новости из параметров URL
    const urlParams = new URLSearchParams(window.location.search);
    const newsID = urlParams.get('id');

    if (!newsID) {
        alert('Ошибка: новость не найдена.');
        return;
    }

    const API_URL = `https://localhost:7268/api/News/${newsID}`;
    const BASE_URL = 'https://localhost:7268'; // Базовый URL для получения изображений

    try {
        const response = await fetch(API_URL);

        if (response.ok) {
            const news = await response.json();

            // Отображаем заголовок, дату и контент
            newsTitle.textContent = news.title;
            newsDate.textContent = new Date(news.datePublished).toLocaleDateString("ru-RU", {
                day: "numeric", month: "long", year: "numeric"
            });
            newsContent.innerHTML = `<p>${news.content}</p>`;

            let images = [];

            // Обрабатываем изображения
            const sliderContainer = document.querySelector('.slider'); // Находим контейнер слайдера

if (news.newsImages && news.newsImages.$values.length > 0) {
    news.newsImages.$values.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = `${BASE_URL}${image.imageUrl}`;  // Добавляем базовый URL для загрузки изображения
        imgElement.alt = news.title;
        imgElement.classList.add('news-image');  // Класс для стилизации
        newsImages.appendChild(imgElement);
    });
} else {
    sliderContainer.style.display = 'none';  // Если нет изображений, скрываем контейнер слайдера
}
        } else {
            alert('Ошибка при загрузке данных новости.');
        }
    } catch (error) {
        console.error('Ошибка при подключении к API:', error.message);
        alert('Ошибка при подключении к серверу.');
    }
});
