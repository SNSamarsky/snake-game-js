# 🐍 Snake Game in JavaScript

<p align="center">
  <img src="https://github.com/user-attachments/assets/a17ed58c-775e-4417-acfa-2830e46d42bd" alt="Snake Game Gameplay" width="400"/>
</p>

<p align="center">
  <a href="#-english-documentation">English Documentation</a> | 
  <a href="#-русская-документация">Русская документация</a>
</p>

## 🇬🇧 English Documentation

A web-based Snake game written in vanilla JavaScript utilizing the HTML5 Canvas API. The project is engineered with a focus on clean architecture, modularity, and strict adherence to Object-Oriented Programming (OOP) principles.

### 🚀 Quick Start & Demo
You can run the game locally without any bundlers or heavy dependencies:
1. Clone the repository: `git clone https://github.com`
2. Open the `index.html` file directly in your browser or use the **Live Server** extension in VS Code.

### 🛠 Tech Stack
- **Language:** JavaScript (ES6+ Modules)
- **Graphics:** HTML5 Canvas API
- **Styling:** CSS3
- **Storage:** LocalStorage API

### 🏗 Architecture & Design Patterns
The codebase has been refactored to enforce the **Single Responsibility Principle (SRP)**:
- **`Game.js` (Core Controller):** Manages game states, orchestrates steps, and evaluates business logic.
- **`Loop.js` (Engine):** Powers a smooth game loop using `requestAnimationFrame` with a time accumulator (`deltaTime`), ensuring independent movement speed regardless of monitor refresh rates (60Hz / 144Hz+).
- **`Snake.js` (Model):** Encapsulates grid coordinates, movement vectors, and an **internal input queue (`inputQueue`)** which completely prevents self-collision bugs caused by rapid keystrokes.
- **`Render.js` (View):** Dedicated solely to graphics. Features a custom `drawText` wrapper to eliminate Canvas boilerplate code.
- **`RecordService.js` (`services/storage.js`):** An isolated service handling game statistics with safe `localStorage` interaction. Records are updated using an Olympic scoring system: score priority first, then fastest completion time.
- **`config.js`:** A centralized configuration file where grid size (`GRID_SIZE`), initial speed, and color palettes can be modified instantly.

### 🎮 Features
- 🕹 **All-in-One Control:** The `Enter` key dynamically shifts game states: Initial Start ➡️ Pause/Unpause ➡️ Restart after game over or victory.
- ⏳ **Real-Time HUD:** The top bar displays current score, session timer, and the high score updated at monitor refresh rate.
- 🏆 **Victory Condition:** Includes a definitive win state when the snake occupies every single board cell. The rendering pipeline automatically hides the food asset upon winning for a clean full-screen view.

---

## 🇷🇺 Русская документация

Веб-игра «Змейка», написанная на чистом JavaScript (Vanilla JS) с использованием Canvas API. Проект выполнен с упором на чистую архитектуру, модульность и соблюдение принципов объектно-ориентированного программирования (ООП).

### 🚀 Быстрый запуск
Вы можете запустить игру локально без необходимости сборщиков и тяжелых зависимостей:
1. Клонируйте репозиторий: `git clone https://github.com`
2. Откройте файл `index.html` прямо в браузере или используйте расширение **Live Server** в VS Code.

### 🛠 Технологический стек
- **Язык:** JavaScript (ES6+ Modules)
- **Графика:** HTML5 Canvas API
- **Стили:** CSS3
- **Хранилище:** LocalStorage API

### 🏗 Архитектурные особенности
Проект полностью разделен по принципу **Single Responsibility (SRP)**:
- **`Game.js` (Главный контроллер):** Управляет состояниями игры, координирует шаги и обрабатывает правила бизнес-логики.
- **`Loop.js` (Движок времени):** Реализует плавный игровой цикл на базе `requestAnimationFrame` с использованием `deltaTime`, что гарантирует независимость скорости змейки от частоты обновления монитора (кадры не привязаны к FPS).
- **`Snake.js` (Модель):** Инкапсулирует в себе координаты тела, логику движения, направления, а также **внутренний буфер ввода (`inputQueue`)**, исключающий баг «самопересечения» при быстрой смене клавиш.
- **`Render.js` (Отображение):** Отвечает исключительно за отрисовку графики. Содержит кастомный движок вывода текста `drawText` для минимизации дублирования Canvas-кода.
- **`RecordService.js` (`services/storage.js`):** Изолированный сервис для работы со статистикой рекордов через `localStorage`. Содержит «умное» сравнение результатов: приоритет по очкам, а при их равенстве — по наименьшему времени.
- **`config.js`:** Централизованный файл конфигурации, где в один клик можно настроить размер сетки (`GRID_SIZE`), начальную скорость или цветовую палитру интерфейса.

### 🎮 Игровые механики и Фичи
- 🕹 **Управление «Всё в одном»:** Клавиша `Enter` контекстно переключает состояния игры: Первый старт ➡️ Пауза/Снятие с паузы ➡️ Рестарт после проигрыша или победы.
- ⏳ **Плавный HUD:** Верхняя панель отображает текущие очки, время сессии и лучший результат в реальном времени с частотой обновления экрана.
- 🏆 **Условие победы (Win State):** При заполнении змейкой всех ячеек поля игра останавливается, скрывает еду и выводит экран триумфа `VICTORY!`, блокируя сторонние клавиши ввода.
