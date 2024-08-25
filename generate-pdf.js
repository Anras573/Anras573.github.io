const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
    const dist = path.join(__dirname, 'dist');
    const filePath = path.join(dist, 'output.pdf');

    if (!fs.existsSync(dist)) {
        fs.mkdirSync(dist, { recursive: true });
    }

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('http://localhost:8080', { waitUntil: 'networkidle2' });

    await page.pdf({ path: filePath, format: 'A4' });

    await browser.close();
})();