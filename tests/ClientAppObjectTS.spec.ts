import test, { expect } from "@playwright/test"
import { POManager } from "../pagesTS/POManager"
import { customtest } from "../UtilsTS/testBase"

/*const {expect,test } = require("@playwright/test");
const Login = require("./pages/Login");
const Dashboard = require("./pages/Dashboard");
const Cart = require("./pages/Cart");
const ShippingDetails = require("./pages/ShippingDetails");
const Summary = require("./pages/Summary");
const POManager = require("./pages/POManager");
const { customtest } = require("../Utils/TestBase");*/
const TestData=JSON.parse(JSON.stringify(require("../Utils/placeOrderTestData.json")))//json will convert string data using parse method

for(const data of TestData){
test(`Automation of shopping cart Application using Page Object Model to add ${data.productname} to the cart`,async({page})=>{//to display product name in the title
    /*const username="standard_user"
    const password="secret_sauce"
    const productname="Sauce Labs Backpack"*/
    const pomanager= new POManager(page)
    //const login=new Login(page)
    const login=pomanager.getLogin()
    await login.goTo()
    await login.validLogin(data.username,data.password)

    //const dashboard=new Dashboard(page)
    const dashboard=pomanager.getDashboard()
    await dashboard.selectProduct(data.productname)
    await dashboard.moveToCart()

    //const cart=new Cart(page)
    const cart=pomanager.getCart()
    await cart.validateCart()
    await cart.clickCheckOut()

    //const shipping=new ShippingDetails(page)
    const shipping=pomanager.getShipping()
    await shipping.enterUserDetails("Jilu","Jo","7654")
    await shipping.clickContinue()

    //const summary=new Summary(page)
    const summary=pomanager.getSummary()
    await summary.validateSummary()
    await summary.clickFinish()

    await expect(page.locator(".complete-header")).toHaveText("Thank you for your order!")
    //await page.pause()

})
}
customtest("Customised TestCase",async({page,testDataForOrder})=>{
    const pomanager= new POManager(page)
    //const login=new Login(page)
    const login=pomanager.getLogin()
    await login.goTo()
    await login.validLogin(testDataForOrder.username,testDataForOrder.password)

    //const dashboard=new Dashboard(page)
    const dashboard=pomanager.getDashboard()
    await dashboard.selectProduct(testDataForOrder.productname)
    await dashboard.moveToCart()

    //const cart=new Cart(page)
    const cart=pomanager.getCart()
    await cart.validateCart()
    await cart.clickCheckOut()

})