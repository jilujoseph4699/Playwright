class Login{
    constructor(page){
        this.page=page
        this.username=page.locator("#user-name")
        this.password=page.locator("#password")
        this.loginbtn=page.locator("#login-button")
    }
    async goTo(){
        await this.page.goto("https://www.saucedemo.com")
    }
    async validLogin(username,password){
        await this.username.fill("standard_user")
        await this.password.fill("secret_sauce")
        await this.loginbtn.click()
    }
}
module.exports=Login