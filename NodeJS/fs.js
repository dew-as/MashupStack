var http = require("http")
var fs = require('fs')

// http.createServer((req,res)=>{
//     fs.readFile("readFile.html",(err,data)=>{
//         if (err) throw err
//         res.writeHead("200",{"Content-type":"text/html"})
//         res.write(data)
//         res.end()
//     })
// }).listen(8080)

// fs.appendFile("appendFile.txt","Hello I am appended",(err)=>{
//     if (err) throw err
//     console.log("File Appended!")
// })

// fs.open("openFile.txt","w",(err,file)=>{
//     if (err) {
//         throw err
//     }
//     console.log("File opened!")
// })

// fs.writeFile("writeFile.txt","Hello i am writed",(err) => {
//     if(err) throw err
//     console.log('File Writed!')
// })

// fs.appendFile("appendFile.txt"," I am updated",(err) => {
//     if(err) throw err
//     console.log("File Appended!")
// })

// fs.writeFile("writeFile.txt","Hello i am writed and replaced",(err) => {
//     if(err) throw err
//     console.log("File Writed Replaced")
// })

// fs.unlink("delete.txt",(err)=>{
//     if (err) throw err
//     console.log("Successfully Deleted")
// })

// fs.rename("beforeRenamed.txt","afterRenamed.txt",(err) => {
//     if(err) throw err
//     console.log('Renamed Successfully')
// })