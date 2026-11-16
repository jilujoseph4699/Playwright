const {test, expect} =require ("@playwright/test");

test("@api GET REQUEST-Fetch Users",async({request})=>{
    const response= await request.get("https://jsonplaceholder.typicode.com/users")
    expect(response.ok()).toBeTruthy()
    const body= await response.json()
    expect(body.length).toBeGreaterThan(0)//to check if there is content in body
    console.log(body[0].name)
})
test("@api POST REQUEST-Create User",async({request})=>{
    const response=await request.post("https://jsonplaceholder.typicode.com/users",{
        data:{
            name:"John Doe",
            username:"john123",
            email:"john123@gmail.com"
        }
    })
    expect(response.status()).toBe(201)
    const responsebody= await response.json()
    expect(responsebody.name).toBe("John Doe")
})