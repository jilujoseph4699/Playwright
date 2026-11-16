class ShippingDetails{
    constructor(page){
        this.page=page
        this.firstname=page.locator("#first-name")
        this.lastname=page.locator("#last-name")
        this.pin=page.locator("#postal-code")
        this.continue=page.locator("#continue")
    }
    async enterUserDetails(fname,lname,pin){
    await this.firstname.fill(fname)
    await this.lastname.fill(lname)
    await this.pin.fill(pin)
    }
    async clickContinue(){
        await this.continue.click()

    }
}
module.exports=ShippingDetails