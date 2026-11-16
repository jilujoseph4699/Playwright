import { Locator, Page } from "@playwright/test"

export class ShippingDetails{
    page:Page
    firstname:Locator
    lastname:Locator
    pin:Locator
    continue:Locator
    constructor(page:Page){
        this.page=page
        this.firstname=page.locator("#first-name")
        this.lastname=page.locator("#last-name")
        this.pin=page.locator("#postal-code")
        this.continue=page.locator("#continue")
    }
    async enterUserDetails(fname:string,lname:string,pin:string){
    await this.firstname.fill(fname)
    await this.lastname.fill(lname)
    await this.pin.fill(pin)
    }
    async clickContinue(){
        await this.continue.click()

    }
}
//module.exports=ShippingDetails