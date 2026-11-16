class Summary{
    constructor(page){
        this.page=page
        this.item=page.locator(".inventory_item_name")
        this.subtotal=page.locator(".summary_subtotal_label")
        this.finsishBtn=page.locator("#finish")
    }
    async validateSummary(){
        await this.item.waitFor()
        console.log(await this.subtotal.textContent())
            
    }
    async clickFinish(){
        await this.finsishBtn.click()

    }

}
module.exports=Summary