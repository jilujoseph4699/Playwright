import {test as baseTest } from "@playwright/test"
interface TestDataForOrder{//interface-we can define data
    username: string,
    password: string,
    productname: string

}
export const customtest=baseTest.extend <{testDataForOrder:TestDataForOrder}>({
testDataForOrder:{
    username: "standard_user",
    password: "secret_sauce",
    productname: "Sauce Labs Backpack"
}
})