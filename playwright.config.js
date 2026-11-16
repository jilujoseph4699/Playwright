
const config=({
  testDir:'./tests',
  timeout:40*1000, //40 sec timeout -getting reports
  expect:{
    timeout:40*1000, //report generation timeout if failed inside assertions
  },
  reporter:'html',
  use:{
    browserName:'chromium',
    headless:false,
    screenshot:"on", //to open browser
    video:"on",
    trace:"on"

  }
})
module.exports=config