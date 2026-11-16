import test, { expect } from "@playwright/test";
test.describe.configure({mode:'parallel'})//executing testcase in parallely('parallel mode') 'serial'-one after the other.sequential and serial are similar
//older method of writing test case
test('first playwright test',async function() {
    
})
//new method
test('Browser Context Playwright test',async({browser})=>{
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://google.com")
    console.log(await page.title())
    await page.goto("https://www.saucedemo.com/")
    await page.locator("#user-name").fill("standarduser")//In playwright , mainly "class and Id" are used for css locators. In playwright "CSS" are used for locating elements
    await page.locator("#password").fill("secret_sauce") //"#" represent id and ". dot" represent classname ."fill" used to pass values
    await page.locator("#login-button").click()
    console.log(await page.locator(".error-message-container.error").textContent())//in classname locator , space will remove using dot (.)operator
    await expect(page.locator(".error-message-container.error")).toHaveText("Epic sadface: Username and password do not match any user in this service")//assertion
    await expect(page.locator(".error-message-container.error")).toContainText("Epic sadface:")
    const username=page.locator("#user-name")
    const login=page.locator("#login-button")
    const cardTitle=page.locator(".inventory_item_name")
    await username.fill(" ")//to empty the field
    await username.fill("standard_user")
    await login.click()
    console.log(await cardTitle.first().textContent())//to print the title of first item , we can use "first()"
    console.log(await cardTitle.nth(1).textContent())//"nth" function will use to print the 0 to 5 elements
    console.log(await cardTitle.allTextContents())//"allTextContents"  will print all items
    //await page.pause()//to pause the page

})

//testcase 2
test('Page context playwright test',async({page})=>{
    await page.goto("https://google.com")
    console.log(await page.title())
    //assertion-conditional checks,if it is true testcase will pass
    await expect(page).toHaveTitle("Google")
})

//testcase3-UI Controls-checkbox, dropdown,radiobutton
test('UI Controls',async({page})=>{
    await page.goto("https://selenium.qabible.in/index.php")
    await page.locator(".nav-item").nth(1).click()
    await page.locator(".list-group-item").nth(1).click()
    await page.locator("#gridCheck").check()
    await expect(page.locator("#gridCheck")).toBeChecked()//assertion1
    expect(await page.locator("#gridCheck").isChecked()).toBeTruthy()//assertion2
    await page.locator(".list-group-item").nth(2).click()
    await page.locator("#inlineRadio1").check()
    await expect(page.locator("#inlineRadio1")).toBeChecked()
    await page.locator("#inlineRadio24").check()
    expect(await page.locator("#inlineRadio24").isChecked()).toBeTruthy()
    await page.locator("//a[normalize-space()='Select Input']").click()
    await page.locator("#single-input-field").selectOption("Red")
    await expect(page.locator("#single-input-field")).toHaveValue("Red")
    await page.locator("//a[normalize-space()='Form Submit']").click()
    await page.locator("#validationCustom01").fill("Jilu")
    await page.locator("#validationCustom02").fill("Joseph")
    await page.locator("#validationCustomUsername").fill("Jilu_123")
    await page.locator("#validationCustom03").fill("Kottayam")
    await page.locator("#validationCustom04").fill("Kerala")
    await page.locator("#validationCustom05").fill("357898")
    await page.locator("#invalidCheck").check()
    await page.locator(".btn.btn-primary").click()
    await expect(page.locator("#message-one")).toHaveText("Form has been submitted successfully!")
    await page.locator(".list-group-item").first().click()
    await page.locator("#single-input-field").fill("Hello World")
    await page.locator("#button-one").click()
    await expect(page.locator("#message-one")).toHaveText("Your Message : Hello World")

    //await page.pause()
})

//child window and new tab
test("Child Window and New tab",async({browser})=>{
    const context= await browser.newContext()
    const page= await context.newPage()
    await page.goto("https://www.github.com")
    const [newpage]= await Promise.all([//multiple window
        context.waitForEvent('page'),
        page.evaluate(()=>window.open('https://google.com'))

    ])
    const newtab=await context.newPage()
    await newtab.goto("https://www.saucedemo.com")
    console.log("New tab and child window opened successfully")
    //await page.pause()
})

//Calendar validation
const date=12
const month=11
test("Calendar validation",async({page})=>{
    await page.goto("https://selenium.qabible.in/index.php")
    await page.locator(".nav-item").nth(2).click()
    await page.locator(".list-group-item").nth(0).click()
    await page.locator("#single-input-field").click()
    await page.locator(".datepicker-days th.datepicker-switch").click()
    await page.locator(".datepicker-months th.datepicker-switch").click()
    const targetyear=1997
    while(true){
        const currentdecade=await page.locator(".datepicker-years th.datepicker-switch").textContent()
        const startdecade=parseInt(currentdecade.split('-')[0])//split return arraya,text converted to integer
        if(targetyear>=startdecade&&targetyear<=startdecade+9)
        {
            break
        }
        if(targetyear<startdecade)
        {
            await page.locator(".datepicker-years th.prev").click()
        }
        else
        {
            await page.locator(".datepicker-years th.next").click()
        }
    }
    await page.getByText(targetyear.toString(),{exact:true}).click()
    await page.locator(".month").nth(month-1).click()
    await page.getByText(date.toString(),{exact :true}).click()
    //await page.pause()
})

//CodeGen tool-automatically we can generate code

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').dblclick();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').press('CapsLock');
  await page.locator('[data-test="firstName"]').fill('J');
  await page.locator('[data-test="firstName"]').press('CapsLock');
  await page.locator('[data-test="firstName"]').fill('Jilu');
  await page.locator('[data-test="lastName"]').click();
  await page.locator('[data-test="lastName"]').press('CapsLock');
  await page.locator('[data-test="lastName"]').fill('J');
  await page.locator('[data-test="lastName"]').press('CapsLock');
  await page.locator('[data-test="lastName"]').fill('Joseph');
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="postalCode"]').click();
  await page.locator('[data-test="postalCode"]').fill('467898');
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();
});
//special locators
test('Special Locators',async({page})=>{
    await page.goto("https://selenium.qabible.in/index.php")
    await page.getByRole("link",{name:"Input Form"}).click()//for hyperlink we can use getByRole
    await page.getByRole("link",{name:"Checkbox Demo"}).click()
    await page.getByLabel("Click on this check box").check()//identify using Label text
    await page.getByRole("link",{name:"Radio Buttons Demo"}).click()
    await page.getByLabel("45 to 60").check()
    await page.getByRole("link",{name:"Select Input"}).click()
    await page.getByLabel("Select Color").selectOption("Red")
    await page.getByRole("link",{name:"Form Submit", exact: true}).click()
    await page.getByPlaceholder("First name").fill("Jilu")
    await page.getByPlaceholder("Last name").fill("Joseph")
    await page.getByPlaceholder("Username").fill("Jilu123")
    await page.getByPlaceholder("City").fill("Kottayam")
    await page.getByPlaceholder("State").fill("Kerala")
    await page.getByPlaceholder("Zip").fill("245896")
    await page.getByLabel("Agree to terms and conditions").check()
    await page.getByRole("button",{name:"Submit form"}).click()
    await expect(page.getByText("Form has been submitted successfully!")).toBeVisible()
    await page.getByRole("link",{name:"Simple Form Demo"}).click()
    await page.getByPlaceholder("Message").fill("Hello World")
    await page.getByRole("button",{name:"Show Message"}).click()
    await expect(page.getByText("Your Message : Hello World")).toBeVisible()
    //await page.pause()
})

// to run in UI Focus - npx playwright test --ui