import Mock from 'mockjs'

Mock.mock("http://localhost:8080/code/phone/login", "post", (data)=>{
  console.log(data.body)
  return {code:0, data:'code'}
})

Mock.mock("http://localhost:8080/login", "post", (data)=>{
  console.log(data.body)
  return {code:0, data:'login'}
})
Mock.mock("http://localhost:8080/code/phone/register", "post", (data)=>{
  console.log(data.body)
  return {code:0, data:'code'}
})
Mock.mock("http://localhost:8080/register", "post", (data)=>{
  console.log(data.body)
  return {code:0, data:'code'}
})
Mock.mock("http://localhost:8080/code/phone/forget", "post", (data)=>{
  console.log(data.body)
  return {code:0, data:'code'}
})
Mock.mock("http://localhost:8080/forget", "post", (data)=>{
  console.log(data.body)
  return {code:0, data:'code'}
})
