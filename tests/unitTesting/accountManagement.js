const { Builder, By, Key, until } = require("selenium-webdriver");

async function selectDropdownByText(selectElement, visibleText) {
  await selectElement.click(); // Open the dropdown
  const option = await selectElement.findElement(
    By.xpath(`//option[text()="${visibleText}"]`)
  );
  await option.click();
}

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

async function testSignup(driver) {
  try {
    console.log("Starting Signup Test...");

    // Navigate to the signup page
    await driver.get("http://localhost:3000/sign-up");

    const typeRadio = await driver.findElement(By.css('input[id="Employer"]'));

    // Scroll into view and click the radio button
    await driver.executeScript("arguments[0].scrollIntoView(true);", typeRadio);
    await typeRadio.click();

    // Click the "Join as Employer" button
    const joinButton = await driver.findElement(
      By.xpath("//button[contains(text(), 'Join as Employer')]")
    );
    await driver.executeScript(
      "arguments[0].scrollIntoView(true);",
      joinButton
    );
    await joinButton.click();

    // Wait for the username input to load
    const inputUsername = await driver.wait(
      until.elementLocated(By.name("regUsername")),
      10000 // Wait for up to 10 seconds
    );
    // Perform signup actions
    //const inputUsername = await driver.findElement(By.name("regUsername"));
    const inputEmail = await driver.findElement(By.name("email"));
    const inputPassword1 = await driver.findElement(By.name("regPassword"));
    const inputPassword2 = await driver.findElement(By.name("regPassword2"));
    const inLname = await driver.findElement(By.name("lastName"));
    const inFname = await driver.findElement(By.name("firstName"));
    const gender = await driver.findElement(By.name("gender"));
    const bday = await driver.findElement(By.name("bday"));
    const signupButton = await driver.findElement(
      By.className("signup-button")
    );

    // Fill the form fields
    await inputUsername.sendKeys("newuser");
    await inputEmail.sendKeys("test@example.com");
    await inputPassword1.sendKeys("Testing123");
    await inputPassword2.sendKeys("Testing123");
    await inLname.sendKeys("adrean");
    await inFname.sendKeys("sorono");
    // Select Gender
    const selectGender = await driver.findElement(By.name("gender"));
    await selectDropdownByText(selectGender, "Male");

    await bday.sendKeys("1999-11-30");

    // Click the signup button
    await signupButton.click();

    // Wait for the success action (e.g., redirect or success message)
    await driver.wait(until.urlIs("http://localhost:3000/sign-in"), 10000);
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
    //await testLogin(driver);
    await testSignup(driver);
    // ... add more testing shit here...
  } finally {
    // Teardown
    await driver.quit();
  }
})();
