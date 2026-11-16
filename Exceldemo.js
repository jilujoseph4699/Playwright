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
