# AVITO тестовое задание.

## Задание 1. Найти баги на скриншоте.
#### Задача.
Дан скриншот страницы Авито с результатами поиска. Изучите скриншот, перечислите все имеющиеся баги на странице поиска, укажите их приоритет (high, medium, low).

**Решение:** [task1](./task1/task1.md)

## Задание 2. Автоматизация скриншот тестов.

**Тест-кейсы:** [TESTCASES](./task2/TESTCASES.md)

Задание выполнено с использование typeScript и playwright.

### Инструкция по запуску теста с GitHub

#### Предполагается:
* У вас установлен Git.
* У вас установлен Node.js и npm.
* У вас установлен Playwright.

#### Если нет, то можете установить: 
1. Скачайте установщик [Git](https://git-scm.com/downloads)
2. Проверка установки:
* Откройте терминал и выполните команду `git --version`. Если установка прошла успешно, вы увидите версию Git.
3. Скачайте установщик [Node.js](https://nodejs.org/en/download/)
4. Проверка установки:
* Откройте терминал и выполните команды `node -v` и `npm -v`. Если установка прошла успешно, вы увидите версии Node.js и npm.
5. Убедитесь, что Playwright установлен глобально (`npm install -g playwright`) или локально в проекте.
2. Установите `pixelmatch` и `pngjs`: `npm install pixelmatch pngjs`

#### Шаги:
1. Клонирование репозитория:
    * Откройте терминал (командную строку).
    * Перейдите в директорию, где хотите сохранить проект.
    * Выполните команду `git clone https://github.com/Ksen95/task_avito.git`
2. Установка зависимостей:
    * Перейдите в директорию проекта `cd task2`.
    * Выполните команду `npm install` (или `yarn install`) для установки зависимостей, указанных в `package.json`.
3. Запуск теста:
    * Важно: при запуске теста с помощью `npx playwright test` будут создаваться эталонные скриншоты.
    * Эталонные скриншот находятся в папке `output` с именем, указанным в коде (`screenshot_avito.png` и `screenshot_avito_clear.png`).

4. Запуск тест-кейсов по отдельности после создание скриншотов:
    * Выполните команду для запуска первого тест кейса `npx playwright test test1-app.spec.ts`.
    * Выполните команду для запуска первого тест кейса `npx playwright test test2-clear-app.spec.ts`.
    * Если есть различия, тест провалится, и вы найдете скриншот с подсвеченными различиями в папке `bugs`.

#### Дополнительные замечания:
* Вы можете настроить параметры запуска тестов в файле конфигурации Playwright (`playwright.config.ts`).
