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
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("news-title").value;
  const date = document.getElementById("news-date").value;
  const description = document.getElementById("news-description").value;
  const images = document.getElementById("news-images").files;

  const pageName = `news-${Date.now()}.html`;
  const pageUrl = `./${pageName}`;

  let imagesHtml = "";
  if (images.length > 0) {
    for (let i = 0; i < Math.min(images.length, 5); i++) {
      const imgURL = URL.createObjectURL(images[i]);
      imagesHtml += `<img src="${imgURL}" alt="Новость изображение" style="max-width: 100%; margin-top: 10px;">`;
    }
  }

  const pageContent = `
           <!DOCTYPE html>
           <html lang="en">
           <head>
             <meta charset="UTF-8">
             <meta name="viewport" content="width=device-width, initial-scale=1.0">
             <title>${title}</title>
             <style>
               body {
                 font-family: Arial, sans-serif;
                 margin: 20px;
                 padding: 20px;
                 max-width: 800px;
                 margin: auto;
                 background-color: #f9f9f9;
               }
               h1 {
                 color: #25427e;
               }
               .content-images img {
                 max-width: 100%;
                 border-radius: 10px;
                 margin-bottom: 20px;
               }
               .content-description {
                 margin-bottom: 30px;
                 color: #555;
               }
               .back-btn {
                 display: inline-block;
                 padding: 10px 20px;
                 background-color: #25427e;
                 color: white;
                 border: none;
                 border-radius: 5px;
                 text-decoration: none;
                 font-size: 16px;
                 cursor: pointer;
                 transition: background-color 0.3s;
               }
               .back-btn:hover {
                 background-color: #1a3362;
               }
             </style>
           </head>
           <body>
             <h1>${title}</h1>
             <div class="content-images">
               ${imagesHtml}
             </div>
             <div class="content-description">
               <p>${description}</p>
             </div>
             <a href="index.html" class="back-btn">Вернуться назад</a>
           </body>
           </html>
         `;

  const blob = new Blob([pageContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = pageName;
  a.click();

  const newCard = document.createElement("div");
  newCard.classList.add("news-card");

  newCard.innerHTML = `
           <div class="news-header">
             <h3>${title}</h3>
             <span class="news-date">${new Date(date).toLocaleDateString(
               "ru-RU",
               {
                 day: "numeric",
                 month: "long",
                 year: "numeric",
               }
             )}</span>
           </div>
           <p>${description.substring(0, 100)}...</p>
           <a href="${pageUrl}" class="read-more-btn">Подробнее</a>
         `;

  newsContainer.appendChild(newCard);

  modal.style.display = "none";
  form.reset();
});
