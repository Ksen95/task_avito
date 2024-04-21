import { test, expect, type Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { PNG } from 'pngjs';

const outputDir = 'output';
const screenshotName = 'screenshot_avito';
const elementClass = '.desktop-impact-items-F7T6E';

test('"Эталонный скриншота элемента на Avito', async ({ page }) => {
  await page.goto('https://www.avito.ru/avito-care/eco-impact');

 
  // Делаем эталонный скриншот элемента
  const screenshot = await page.locator(elementClass).screenshot();
  const screenshotPath = path.join(outputDir, `${screenshotName}.png`);
  await fs.promises.writeFile(screenshotPath, screenshot);
  
  // Загружаем эталонный скриншот
  const referenceImg = PNG.sync.read(await fs.promises.readFile(screenshotPath));
  const screenshotImg = PNG.sync.read(screenshot);

});