describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  // test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    page.click('journal-entry');
    await page.waitForNavigation();
    expect(page.url()).toBe('http://127.0.0.1:5500/#entry1');
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    await page.waitForSelector('h1');
    let head = await page.$('h1');
    let h1 = await page.evaluate(el => el.textContent, head)
    expect(h1).toBe('Entry 1');
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    await page.waitForSelector('entry-page');
    let entrypage = await page.$('entry-page');
    let entry = await entrypage.getProperty('entry');
    let value = await entry.jsonValue();
    expect(value.title).toBe('You like jazz?');
    expect(value.date).toBe('4/25/2021');
    expect(value.content).toBe("According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.");
    expect(value.image.src).toBe('https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455');
    expect(value.image.alt).toBe('bee with sunglasses');
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */

  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    const element = await page.$("body"); // for ids you can write "#some-id"
    const className = await page.evaluate(body => body.className, element);
    expect(className).toBe('single-entry');
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    page.click('[src="./styles/settings.svg"]');
    await page.waitForNavigation();
    expect(page.url()).toBe('http://127.0.0.1:5500/#settings');
  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    await page.waitForSelector('h1');
    let head = await page.$('h1');
    let h1 = await page.evaluate(el => el.textContent, head)
    expect(h1).toBe('Settings');
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const element = await page.$("body");
    const className = await page.evaluate(body => body.className, element);
    expect(className).toBe('settings');
  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack();
    expect(page.url()).toBe('http://127.0.0.1:5500/#entry1');
  });

  it('Test11: Clicking the back button once should bring the user back to the home page', async() => {
    // implement test11: Clicking the back button once should bring the user back to the home page’
    await page.goBack();
    expect(page.url()).toBe('http://127.0.0.1:5500/');
  });

  it('Test12: When the user is on the homepage, the header title should be “Journal Entries”', async() => {
    // implement test12: When the user is on the homepage, the header title should be “Journal Entries”
    await page.waitForSelector('h1');
    let head = await page.$('h1');
    let h1 = await page.evaluate(el => el.textContent, head)
    expect(h1).toBe('Journal Entries');
  });

  it('Test13: On the home page the <body> element should not have any class attribute', async() => {
    // implement test13: On the home page the <body> element should not have any class attribute
    const element = await page.$("body");
    const className = await page.evaluate(body => body.className, element);
    expect(className).toBe('');
  });

  it('Test14: Verify the url is correct when clicking on the second entry', async() => {
    // implement test14: Verify the url is correct when clicking on the second entry
    let journals = await page.$$('journal-entry');
    await journals[1].click();
    await page.waitForNavigation();
    expect(page.url()).toBe('http://127.0.0.1:5500/#entry2');
  });

  it('Test15: Verify the title is current when clicking on the second entry', async() => {
    // implement test15: Verify the title is current when clicking on the second entry
    await page.waitForSelector('h1');
    let head = await page.$('h1');
    let h1 = await page.evaluate(el => el.textContent, head)
    expect(h1).toBe('Entry 2');
  });

  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it('Test16: Verify the entry page contents is correct when clicking on the second entry', async() => {
    // implement test16: Verify the entry page contents is correct when clicking on the second entry
    let entrypage = await page.$('entry-page');
    let entry = await entrypage.getProperty('entry');
    let value = await entry.jsonValue();
    expect(value.title).toBe('Run, Forrest! Run!');
    expect(value.date).toBe('4/26/2021');
    expect(value.content).toBe("Mama always said life was like a box of chocolates. You never know what you're gonna get.");
    expect(value.image.src).toBe('https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg');
    expect(value.image.alt).toBe('forrest running');
  });

  it('Test17: Clicking header brings back homepage URL', async() => {
    await page.click('h1');
    expect(page.url()).toBe('http://127.0.0.1:5500/');
  });

  it('Test18: Clicking header brings back empty body class', async() => {
    const element = await page.$("body");
    const className = await page.evaluate(body => body.className, element);
    expect(className).toBe('');
  });

  it('Test19: Clicking last entry brings up last entry URL', async() => {
    let journals = await page.$$('journal-entry');
    await journals[9].click();
    await page.waitForNavigation();
    expect(page.url()).toBe('http://127.0.0.1:5500/#entry10');
  });

  it('Test20: Clicking on the last entry replaces the proper Entry title', async() => {
    await page.waitForSelector('h1');
    let head = await page.$('h1');
    let h1 = await page.evaluate(el => el.textContent, head)
    expect(h1).toBe('Entry 10');
  });
  
});
