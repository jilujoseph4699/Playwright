let msg1:string="Hello"  //Typescript=JavaScript+types+better error checking
console.log(msg1)
//msg1=2
//console.log(msg1)
let age1:number=20
console.log(age1)
let isInactive:boolean=false
console.log(isInactive)
let numarray:number[]=[1,2,3]
console.log(numarray)
let data:any="Hello"
console.log(data)
data=2
console.log(data)
function add(a:number,b:number):number
{
 return a+b
}
console.log(add(3,4))
let user1:{name:string,age:number}={name:"Bob",age:34}
//user1.location="USA"//not valid in typescript
console.log(user1)