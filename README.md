# Lab8_Starter

# Name
Nicholas Tahernia

## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)

A. Within a Github action that runs whenever code is pushed

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.

No, this is a large scale feature that requires extensive testing most likely through automation or something more thorough. Unit testing is for small parts of code and individual features not the entirety of the app as a whole, in this case messaging. It would be very hard to islolate what is causing the error through unit tests.

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters

Yes you could use a unit test to test the max message length, it is a small feature of the app and is only a small part of the overall logic, so a unit test would work.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?

The tests will run without a UI aspect in place, in this case the Chromium browser, so we will just be running the tests without actually seeing them enacted in a GUI format on the browser.

5. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?

  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
    page.click('[src="./styles/settings.svg"]');
  });
