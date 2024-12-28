function checkAnswers() {
    const answers = {
        question1: "1997",
        question2: "триллер",
        question3: "Дэвид Линч",
        question4: "Фредди",
        question5: "Лос-Анжелес",
        question6: "Потеря идентичности"
    };

    let score = 0;
    const form = document.getElementById('quizForm');

    // Проверка ответов
    for (let question in answers) {
        const userAnswer = form[question].value.trim();
        const resultElement = document.getElementById(`result${question.charAt(question.length - 1)}`);
        
        if (userAnswer.toLowerCase() === answers[question].toLowerCase()) {
            score++;
            resultElement.textContent = "Ответ правильный!";
            resultElement.style.color = "green"; // Стилизация для правильного ответа
        } else {
            resultElement.textContent = `Ответ неправильный, правильный ответ: ${answers[question]}`;
            resultElement.style.color = "red"; // Стилизация для неправильного ответа
        }
    }

    // Отображение результата
    document.getElementById('score').textContent = `Ваш результат: ${score} из ${Object.keys(answers).length}`;
    
    
    // Деактивация кнопки "Пройти тест заново"
    resetButton.disabled = true;
}

function loadLastTestResult() {
    // Здесь вы можете получить результат теста из базы данных или локального хранилища
    const lastResult = "0 из 3"; // Пример результата, замените на реальный
    document.getElementById('lastTestResult').textContent = lastResult; // Отображаем результат
}

document.addEventListener("DOMContentLoaded", function() {
    const username = localStorage.getItem('username'); // Получаем имя пользователя
    if (username) {
        document.getElementById('username').textContent = username; // Устанавливаем имя пользователя в заголовке
    } else {
        document.getElementById('username').textContent = "Гость"; // Если имя пользователя не найдено
    }
});

// Функция сброса теста


// Функция для загрузки результата последнего теста в профиль
function loadLastTestResult() {
    const lastResult = localStorage.getItem('lastTestResult') || "Результат не найден";
    document.getElementById('lastTestResult').textContent = lastResult; // Отображаем результат
}

// Функция выхода из системы
function logout() {
    if (confirm("Вы уверены, что хотите выйти?")) {
        // Очистка данных пользователя при выходе
        localStorage.clear(); 
        alert("Вы вышли из системы.");
        window.location.href = "index.html"; // Перенаправление на страницу входа
    }
}

function saveData() {
    const username = document.getElementById('username').value;
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;

    localStorage.setItem('username', username);
    localStorage.setItem('dob', dob);
    localStorage.setItem('gender', gender);
}

function validateForm() {
    let isValid = true;

    // Проверка логина
    const username = document.getElementById('username').value;
    if (!/^[а-яА-ЯёЁa-zA-Z0-9]{4,10}$/.test(username)) {
        document.getElementById('usernameError').textContent = 'Логин должен содержать 4-10 символов.';
        isValid = false;
    }

    // Проверка даты рождения
    const dob = document.getElementById('dob').value;
    if (!dob) {
        document.getElementById('dobError').textContent = 'Пожалуйста, введите дату рождения.';
        isValid = false;
    }

    // Проверка пола
    const gender = document.getElementById('gender').value;
    if (!gender) {
        document.getElementById('genderError').textContent = 'Пожалуйста, выберите пол.';
        isValid = false;
    }

    // Если форма валидна, сохраняем данные и перенаправляем
    if (isValid) {
        saveData(); // Сохраняем данные в localStorage
        return true; // Позволяем отправить форму
    }

    return false; // Останавливаем отправку формы
}
// Функция для загрузки профиля пользователя
function displayProfile() {
    const username = localStorage.getItem('username');
    const dob = localStorage.getItem('dob');
    const gender = localStorage.getItem('gender');

    // Логирование значений из localStorage
    console.log("Stored Username:", username);
    console.log("Stored Date of Birth:", dob);
    console.log("Stored Gender:", gender);

    // Проверка и отображение данных
    if (username) {
        document.getElementById('profileUsername').textContent = username;
    } else {
        document.getElementById('profileUsername').textContent = "Имя пользователя не найдено";
    }
    if (dob) {
        document.getElementById('profileDob').textContent = dob;
    } else {
        document.getElementById('profileDob').textContent = "Дата рождения не найдена";
    }
    if (gender) {
        document.getElementById('profileGender').textContent = gender;
    } else {
        document.getElementById('profileGender').textContent = "Пол не найден";
    }

    // Загрузка результата последнего теста
    loadLastTestResult();
}

window.onload = function() {
    displayProfile();
};


