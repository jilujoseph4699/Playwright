const {test, expect} =require ("@playwright/test");

test('Popup validations',async({page})=>{
    await page.goto("https://www.saucedemo.com")
    await expect(page.locator(".error-message-container error")).toBeHidden()
    await page.locator("#login-button").click()
    //await expect(page.locator(".error-message-container error")).toBeVisible()
    await page.goto("https://selenium.qabible.in/index.php")
    await page.getByRole("link",{name: 'Alerts and Modals'}).click()
    await page.getByRole("link",{name: 'Javascript Alert'}).click()
    page.on('dialog',async dialog=>{            //page.on -refereing dialog box
         await page.waitForTimeout(3000)
         await dialog.accept()//accept() - ok , dismiss()- cancel
    })
    await page.locator(".btn.btn-warning").click()///after line no 10 , line no 15 will execute because line 11 is asyncronus
    await page.getByRole("link",{name:'others'}).hover()
    await page.goto("https://demoqa.com/frames")
    const framepage= page.frameLocator("#frame1")
    console.log(await framepage.locator("#sampleHeading").textContent())
    await expect(framepage.locator("#sampleHeading")).toHaveText("This is a sample page")
    await page.pause()

})
test("Screenshots",async({page})=>{
    await page.goto("https://www.saucedemo.com")
    await expect(page.locator(".error-message-container.error")).toBeHidden()
    await page.locator("#login-button").click()
    await page.locator(".error-message-container.error").screenshot({path:'error.png'}) //saved directly in playwright//screenshot()-will take screenshot
    await expect(page.locator(".error-message-container.error")).toBeVisible()
    await page.screenshot({path:'error1.png'})//entire page screenshot
    //await page.pause()
})
//Visual comparison-using images for assertion
test("Visual Comparison",async({page})=>{
    await page.goto("https://www.saucedemo.com")
    expect(await page.screenshot()).toMatchSnapshot('saucedemo.png')//will fail
})