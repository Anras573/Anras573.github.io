import { launch } from 'puppeteer';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

(async () => {
    const dist = join(import.meta.dirname, 'dist');
    const filePath = join(dist, 'output.pdf');

    if (!existsSync(dist)) {
        mkdirSync(dist, { recursive: true });
    }

    const browser = await launch();
    const page = await browser.newPage();

    await page.goto('http://localhost:8080', { waitUntil: 'networkidle2' });

    await page.pdf({ path: filePath, format: 'A4' });

    await browser.close();
})();