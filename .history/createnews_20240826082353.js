// Получаем элементы
const modal = document.getElementById("news-modal");
const btn = document.getElementById("add-news-btn");
const closeBtn = document.querySelector(".close-btn");
const form = document.getElementById("news-form");
const newsContainer = document.querySelector(".news-container");

// Открытие модального окна и установка текущей даты
btn.onclick = function () {
  modal.style.display = "block";

  // Устанавливаем текущую дату в поле даты
  const today = new Date().toISOString().split("T")[0]; // Форматируем дату в формате YYYY-MM-DD
  document.getElementById("news-date").value = today;
};

// Закрытие модального окна
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Закрытие модального окна при клике вне его
window.addEventListener("click", (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

// Добавление новой карточки при отправке формы
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = document.getElementById("news-title").value;
  const date = document.getElementById("news-date").value;
  const description = document.getElementById("news-description").value;
  const images = document.getElementById("news-images").files;

  const formData = new FormData();
  formData.append("title", title);
  formData.append("date", date);
  formData.append("description", description);
  
  for (let i = 0; i < images.length; i++) {
    formData.append("images", images[i]);
  }

  try {
    const response = await fetch('https://your-api-url/api/News', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      const news = await response.json();

      const newCard = document.createElement("div");
      newCard.classList.add("news-card");

      newCard.innerHTML = `
          <div class="news-header">
            <h3>${news.title}</h3>
            <span class="news-date">${new Date(news.datePublished).toLocaleDateString(
              "ru-RU",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )}</span>
          </div>
          <p>${news.content.substring(0, 100)}...</p>
          <a href="news/${news.newsID}" class="read-more-btn">Подробнее</a>
        `;

      newsContainer.appendChild(newCard);

      modal.style.display = "none";
      form.reset();
    } else {
      console.error("Error saving news:", response.statusText);
    }
  } catch (error) {
    console.error("Error connecting to the server:", error);
  }
});

// Загрузка и отображение новостей при загрузке страницы
window.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('https://your-api-url/api/News');
    if (response.ok) {
      const newsList = await response.json();

      newsList.forEach(news => {
        const newCard = document.createElement("div");
        newCard.classList.add("news-card");

        newCard.innerHTML = `
            <div class="news-header">
              <h3>${news.title}</h3>
              <span class="news-date">${new Date(news.datePublished).toLocaleDateString(
                "ru-RU",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )}</span>
            </div>
            <p>${news.content.substring(0, 100)}...</p>
            <a href="news/${news.newsID}" class="read-more-btn">Подробнее</a>
          `;

        newsContainer.appendChild(newCard);
      });
    } else {
      console.error("Error fetching news:", response.statusText);
    }
  } catch (error) {
    console.error("Error connecting to the server:", error);
  }
});
