const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const linkedinController = {};

linkedinController.searchLinkedin = async (req, res, next) => {
  console.log(
    'Inside LINKEDIN CONTROLLER --->',
    req.body,
    req.body.jobLocation,
    req.body.jobTitle
  );
  try {
    const browser = await puppeteer.launch({
      headless: true,
      defaultViewport: false,
      args: [
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--no-first-run',
        '--no-sandbox',
        '--no-zygote',
        '--single-process',
      ],
    });

    const page = await browser.newPage();
    await page.goto(
      `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=${req.body.jobTitle}&location=${req.body.jobLocation}&start=0`
    );

    await page.screenshot({ path: 'linkedin-screenshot.png' });

    const data = await page.evaluate(() => {
      const jobElements = document.querySelectorAll('.base-search-card__info');
      const results = [];

      jobElements.forEach(jobElement => {
        const jobTitle = jobElement
          .querySelector('.base-search-card__title')
          .textContent.trim();
        console.log(jobTitle);

        // const priceTitleElement = jobElement.querySelector(
        //   '.metadata.salary-snippet-container'
        // );
        let priceTitle;

        // if (priceTitleElement !== null) {
        //   const childPriceElement = priceTitleElement.querySelector(
        //     '.css-1cvo3fd.eu4oa1w0'
        //   );

        //   priceTitle = childPriceElement.textContent.trim();
        // } else {
        priceTitle = 'Salary not found';
        // }

        const quickApplyLinkElement = jobElement.querySelector(
          '.hidden-nested-link'
        );

        const quickApplyLink = quickApplyLinkElement
          ? quickApplyLinkElement.href
          : 'quick apply condition';

        const companyNameElement = jobElement.querySelector(
          '.base-search-card__subtitle'
        );
        const companyName = companyNameElement
          ? companyNameElement.textContent.trim()
          : 'Company not found';

        const src = 'Linkedin';

        results.push({
          jobTitle,
          priceTitle,
          quickApplyLink,
          companyName,
          src,
        });
      });

      return results;
    });

    console.log('Results from linkedinController DATA --->', data[0]);
    res.locals.linkedinResults = data;
    await browser.close();
    next();
  } catch (error) {
    return next({
      log: 'LINKEDINController error handler',
      status: 500,
      message: error.msg,
    });
  }
};

module.exports = linkedinController;
