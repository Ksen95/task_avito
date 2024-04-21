import { test, expect, type Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const elementClass = '.desktop-impact-items-F7T6E';
const outputDir = 'output';
const bugsDir = 'bugs';
const screenshotName = 'screenshot_avito';


test('Сравнение скриншота элемента на Avito', async ({ page }) => {
  await page.goto('https://www.avito.ru/avito-care/eco-impact');

  // Создаём папки, если их нет
  await fs.promises.mkdir(outputDir, { recursive: true });
  // Делаем скриншот элемента
  const screenshot = await page.locator(elementClass).screenshot();
  const referencePath = path.join(outputDir, `${screenshotName}.png`);
  // Проверяем наличие эталонного скриншота
  const referenceExists = await fs.promises.access(referencePath, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);

  if (!referenceExists) {
    // Создаём эталонный скриншот
    console.log('Эталонный скриншот не найден, создаём новый...');
    // Делаем эталонный скриншот элемента
     const screenshotNew = await page.locator(elementClass).screenshot();
      const screenshotPath = path.join(outputDir, `${screenshotName}.png`);
      await fs.promises.writeFile(screenshotPath, screenshotNew);
    }
  // Загружаем эталонный скриншот
  const referenceImg = PNG.sync.read(await fs.promises.readFile(referencePath));
  const screenshotImg = PNG.sync.read(screenshot);
  
  // Сравниваем скриншоты
  const { width, height } = referenceImg;
  const diff = new PNG({ width, height });
  const pixelDiffCount = pixelmatch(
    referenceImg.data,
    screenshotImg.data,
    diff.data,
    width,
    height,
    { threshold: 0.1 }
  );

  if (pixelDiffCount > 0) {
    // Подсвечиваем ТОЛЬКО отличающиеся пиксели полупрозрачным красным
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (width * y + x) << 2;
  
        // Проверяем, есть ли разница в этом пикселе
        if (diff.data[idx + 3] !== 0) { // 0 - нет разницы, > 0 - есть разница
          // Подсвечиваем только этот пиксель
          screenshotImg.data[idx] = 255;     // red
          screenshotImg.data[idx + 1] = 0;   // green
          screenshotImg.data[idx + 2] = 0;   // blue
          screenshotImg.data[idx + 3] = 128; // alpha (полупрозрачный)
        }
      }
    }
    
    // Создаём папки, если их нет
    await fs.promises.mkdir(bugsDir, { recursive: true });

     // Сохраняем изменённый скриншот
     const diffPath = path.join(bugsDir, `${screenshotName}-test1-diff.png`);
     await fs.promises.writeFile(diffPath, PNG.sync.write(diff));

     // Провалить тест 
     throw new Error(`Найдены различия! Скриншот сохранён: ${diffPath}`);
   } else {
     console.log('Различий не найдено.');
   }
});