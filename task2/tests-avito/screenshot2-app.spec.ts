import { test, expect, type Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { PNG } from 'pngjs';

const outputDir = 'output';
const screenshotName = 'screenshot_avito_clear';
const elementClass = '.desktop-impact-items-F7T6E';
const elementsToHideClass = ['.desktop-value-Nd1tR', '.desktop-avatar-cJSQ4'];

test('"Эталонный скриншота элемента на Avito', async ({ page }) => {
  await page.goto('https://www.avito.ru/avito-care/eco-impact');

  // Делаем эталонный скриншот элемента
   // Скрываем ненужные элементы
   await Promise.all(elementsToHideClass.map(async classToHide => {
    await page.$$eval(classToHide, elements => {
      elements.forEach(element => element.style.display = 'none');
    });
  }));
  const screenshot = await page.locator(elementClass).screenshot();
  const screenshotPath = path.join(outputDir, `${screenshotName}.png`);
  await fs.promises.writeFile(screenshotPath, screenshot);
  
  // Загружаем эталонный скриншот
  const referenceImg = PNG.sync.read(await fs.promises.readFile(screenshotPath));
  const screenshotImg = PNG.sync.read(screenshot);

});