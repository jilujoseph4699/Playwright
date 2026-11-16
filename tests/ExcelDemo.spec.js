const {test, expect} =require ("@playwright/test");

test('Popup validations',async({page})=>{
    await page.goto("https://selenium.qabible.in/index.php")
    await page.locator(".nav-item").nth(3).click()
    await page.locator(".list-group-item").nth(3).click()
    const path = require('path')
    const os =require('os')
    const downloadPath=path.join(os.homedir(), 'Downloads')
    const [download]=await Promise.all([page.waitForEvent('download'),page.locator(".dt-button.buttons-excel.buttons-html5").click()])
    await download.saveAs(path.join(downloadPath,download.suggestedFilename()))
    console.log("Download completed successfully")
    const Exceljs= require('exceljs')
    async function writeExcelFile() {
        const workbook= new Exceljs.Workbook()
        await workbook.xlsx.readFile("C:/Users/Jilu/Downloads/Obsqura Testing.xlsx")
        const worksheet= workbook.getWorksheet('Sheet1')
        const output= await readExcelFiles(worksheet)
        const cell=worksheet.getCell(output.row,output.col)
        cell.value="Jilu J"
        await workbook.xlsx.writeFile("C:/Users/Jilu/Downloads/Obsqura Testing.xlsx")//cell value will edit 
    }
    async function readExcelFiles(worksheet) {
        let output={row: -1,col: -1}
        worksheet.eachRow((row,rownumber)=>{
            row.eachCell((cell,colnumber)=>{
                //console.log(cell.value)
                if(cell.value==="Donna Snider"){
                    output.row=rownumber
                    output.col=colnumber
                }
            })
        })
        return output
        
    }
    writeExcelFile()
    await page.goto("https://the-internet.herokuapp.com/upload")
    const filePath= path.join('C:','Users','Jilu','Downloads','Obsqura Testing.xlsx')
    await page.locator("#file-upload").setInputFiles(filePath)
    await page.locator("#file-submit").click()
    await expect(page.getByText("File Uploaded!")).toBeVisible()
    //await page.pause()
   
})