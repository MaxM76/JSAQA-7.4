let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  }, 70000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 60000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-mktg.btn-large-mktg.btn-muted-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Sign up for free")
  }, 80000);
});


describe("GitHub another headers content", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/features");
  });

  test("The page features the header content", async () => {
    await page.waitForSelector("h1");
    const title3 = await page.title();
    expect(title3).toContain("Features | GitHub · GitHub");
  }, 70000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  }, 60000);

  test("The page features the header content", async () => {
    const PageFeatureSelector = ".h1-mktg";
    await page.waitForSelector(PageFeatureSelector, {
      visible: true,
    });
    const actual = await page.$eval(PageFeatureSelector, (link) => link.innerText);
    expect(actual).toContain("The tools you need to build what you want.");
  }, 50000);

  /*
  test("The page features the header content", async () => {
    await page.goto("https://github.com/pricing");
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toContain("Pricing · Plans for every developer · GitHub");
  }, 15000);
  */
});