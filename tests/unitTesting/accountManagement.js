const { Builder, By, Key, until } = require('selenium-webdriver');

// Set up the WebDriver
async function setupDriver() {
    return new Builder().forBrowser('chrome').build();
}

// login account module 
async function testLogin(driver) {
    try {
        console.log("Starting Login Test...");

        // Navigate to the login page
        await driver.get('http://localhost:3000/sign-in');

        // Perform login actions
        const inputUsername = await driver.findElement(By.name('username'));
        const inputPassword = await driver.findElement(By.name('password'));
        const loginButton = await driver.findElement(By.id('buttonSignin'));

        // add values and perform action click
        await inputUsername.sendKeys('monde');
        await inputPassword.sendKeys('Password1');
        await loginButton.click();

        // Validate login success
        await driver.wait(until.urlIs('http://localhost:3000/dashboard/home/'), 5000);
        console.log("Login Test Passed!");
    } catch (err) {
        console.error("Login Test Failed:", err.message);
    }
}

// initial sa
async function testSignup(driver) {
    try {
        console.log("Starting Signup Test...");

        // Navigate to the signup page
        await driver.get('http://localhost:3000/sign-up');

        // Perform signup actions
        const inputUsername = await driver.findElement(By.name('username'));
        const inputEmail = await driver.findElement(By.name('email'));
        const inputPassword = await driver.findElement(By.name('password'));
        const signupButton = await driver.findElement(By.id('buttonSignup'));

        await inputUsername.sendKeys('newuser');
        await inputEmail.sendKeys('newuser@example.com');
        await inputPassword.sendKeys('password123');
        await signupButton.click();

        // Validate signup success
        await driver.wait(until.urlIs('http://localhost:3000/'), 5000);
        console.log("Signup Test Passed!");
    } catch (err) {
        console.error("Signup Test Failed:", err.message);
    }
}

// run all unit test cases module...
(async function runAccountModuleTests() {
    const driver = await setupDriver();

    try {
        // Run test cases
        await testLogin(driver);
        // await testSignup(driver);
        // ... add more testing shit here...

    } finally {
        // Teardown
        await driver.quit();
    }
})();
