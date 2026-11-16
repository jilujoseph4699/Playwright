
const {devices}=require("@playwright/test")
const { workers } = require("node:cluster")
const { permission } = require("node:process")
const config=({
  testDir:'./tests',
  retries:1,
  workers:4,
  timeout:40*1000, //40 sec timeout -getting reports
  expect:{
    timeout:40*1000, //report generation timeout if failed inside assertions
  },
  reporter:'html',
  projects:[
    {
      name:'safari',
  use:{
    browserName:'webkit',
    headless:true,
    screenshot:"only-on-failure", //to open browser
    video:"off",
    trace:"on"

  }},
  {
      name:'chrome',
  use:{
    browserName:'chromium',
    headless:false,
    screenshot:'on', //to open browser
    video:'retain-on-failure',
    trace:'on-first-retry',
    //viewport:{width:720,height:720},
    //...devices["iPhone 11"],
    ignoreHttpsErrors:true,
    Permissions:['goLocation'],//allow to know our site


  }} 
]
})
module.exports=config