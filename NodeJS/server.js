// ----------Day-1---------

// const num1 = 14
// const num2 = 17

// console.log(`Sum of ${num1} and ${num2} is ${num1+num2}`)
// console.log(`Difference of ${num1} and ${num2} is ${num1-num2}`)
// console.log(`Product of ${num1} and ${num2} is ${num1*num2}`)

// ------------------------

// ----------Day-2---------

// const str = "mashup stack is a software training institute"

// function findMaxLengthWord(words){
//     str_arr = words.split(" ")

//     console.log(str_arr)

//     lengthOfEachWords = []

//     for(i=0;i<str_arr.length;i++){
//         lengthOfEachWords.push(str_arr[i].length)
//     }

//     console.log(lengthOfEachWords)

//     console.log(`The highest word length is ${Math.max(...lengthOfEachWords)}`)
//     const indexOfLargeWord = lengthOfEachWords.indexOf(Math.max(...lengthOfEachWords))
//     console.log(`The highest length word is ${str_arr[indexOfLargeWord]}`);
// }

// findMaxLengthWord(str)

// ------------------------

// ----------Day-3---------

// const prompt = require('prompt');

// prompt.message = 'Enter Three Numbers (comma-separated):';

// prompt.delimiter = '';

// prompt.get(['details'], (err, result) => {
//   const [Number1, Number2, Number3] = result.details.split(',');
//   console.log(`Number 1: ${Number1}, Number 2: ${Number2}, Number 3: ${Number3}`);
//   console.log(`Average of these three numbers is ${(Number(Number1)+Number(Number2)+Number(Number3))/3}`);
// });


// ------------------------

// ---------Day-4----------

// var operations = require("./operationModule.js")

// var num1 = 10
// var num2 = 20
// var operationsAre = ['addition','substraction','division','multiply']

// operationsAre.map((operand)=>{
//   console.log(operations[operand](num1,num2));
// })

// ------------------------

//--------Day-5------------

// var http = require('http')

// var server = http.createServer((req,res) => {
//   console.log(req.url)
//   console.log(req.method) 
//   if(req.method == "GET"){
//     res.statusCode = 200
//     res.write("<h1>Hello World</h1>")
//     res.end()
//   }else {
//     res.statusCode = 404
//     res.statusMessage = "Not found"
//     res.end()
//   }
// })

// server.listen(8080)

// ------------------------

//-----------Day-6---------

// var fs = require("fs")

// fs.readFile("readFile.txt",(err,data) => {
//     if (err) throw err
//     console.log(data.toString())
// })

// fs.writeFile("writeFile.txt","Hello i am writed and replaced",(err) => {
//     if(err) throw err
//     console.log("suucesfully write")
    
// })

//-------------------------

//----------url-parse---------------

// var http = require("http")
// var url = require("url")
// var fs = require("fs")
// // var adr = 'http://localhost:8080/HTML/loginForm.html?course=mern&topic=nodejs'

// http.createServer((req,res)=>{
//     var urlParsed = url.parse(req.url,true)
//     console.log(req.url)
//     console.log(urlParsed.query.course)
//     console.log('Hai')
//     console.log(urlParsed)
    
//     // var fileToServe = ".." + urlParsed.pathname
//     // fs.readFile(fileToServe,(err,data)=> {
//     //     if(err){
//     //         res.writeHead(404,'not found',{"Content-Type":"text/html"})
//     //         return res.end("404 Not found")
//     //     }
//     //     res.writeHead(200,"Success",{"Content-Type":"text/html"})
//     //     res.write(data)
//     //     return res.end()
//     // })
// }).listen(8080)

//-------------------------

//----------events---------------

// var fs = require("fs")
// var rs = fs.createReadStream("readFile.html")

// rs.on("open",()=>console.log('File is Opened!'))
// rs.on('close',()=>console.log('File is Closed'))

// ----------eventEmitter--------------

// var events = require('events')
// var eventEmitter = new events.EventEmitter()

// const eventHandler = () => {
//     console.log('I heared a ror')
// }

// eventEmitter.on("ror",eventHandler)

// eventEmitter.emit('ror')

//-------------------------

// ----------file-upload--------------

// var http = require("http")
// var fs = require("fs")
// var formidable = require('formidable')

// http.createServer((req,res)=>{
//     if (req.url == '/fileUpload' && req.method.toLowerCase() === 'post') {
//         var form = new formidable.IncomingForm()
//         form.parse(req,(err,fields,files)=>{
//             if (err) {
//                 res.writeHead(500,{'Content-Type':"text/plain"})
//                 res.end('An error occured when file upload')
//             }else {
//                 console.log(fields)
//                 console.log(files)
//                 console.log(files.fileToUpload[0].originalFilename)
//                 var oldPath =  files.fileToUpload[0].filepath
//                 var newPath = 'C:\\Users\\honer\\Desktop\\MashupStack\\NodeJS\\Uploads\\'+files.fileToUpload[0].originalFilename
//                 console.log(newPath)
                
//                 fs.rename(oldPath,newPath,(err) => {
//                     if (err) {
//                         console.log(err)
//                         res.writeHead(500,{'Contetnt-Type':'text/plain'})
//                         res.end("An error occured when moving file")
//                         return
//                     }
//                     res.writeHead(200,{'Content-Type':'text/plain'})
//                     res.end('File uploaded and moved!')
//                 })
//             }
//         })
//     } else {
//         fs.readFile("../HTML/fileUpload.html",(err,data)=> {
//             if(err){
//                 res.writeHead(404,'not found',{"Content-Type":"text/html"})
//                 res.end("404 Not found")
//             }
//             res.writeHead(200,"Success",{"Content-Type":"text/html"})
//             res.write(data)
//             res.end()
//         })
//     }
// }).listen(3000,()=>console.log("in 3000"))

//-------------------------

//----------synchronous---------------

// var fs = require('fs')

// var data = fs.readFileSync('readFile.txt')

// // console.log(data)

// console.log(data.toString())

// console.log('After Reading Completion Program Ended')

// //-------------------------

// //----------asynchronous---------------

// fs.readFile("readFile.txt",(err,data) => {
//     if (err) throw err
//     console.log(data.toString())
// })

// console.log('Before Reading Completion Program Ended')

//-----------self-invoke--------------

// var uname = 'john'
// var text = (function(n){
//     return 'hello '+ n
// }(uname))
// console.log(text)

//-------------------------

//--------node-mailer------

// var nodemailer = require('nodemailer')

// var transport = nodemailer.createTransport({
//     host : "smtp.gmail.com",
//     port : 465,
//     secure:true,
//     auth : {
//         user : 'textitman@gmail.com',
//         pass: 'wwol apcu pjjp ugig'
//     }
// })

// var mailOptions = {
//     from : 'textitman@gmail.com',
//     to : ['dewasdevelops@gmail.com','dewisdevelops@gmail.com','d.e.v.a.s.1.7.0.9.5.6@gmail.com'],
//     subject : 'Nodemailer example',
//     text : 'Did you get it!',
//     attachments: [
//         {
//           filename: 'myImage.jpg',
//           path: "D:\\OneDrive\\Desktop\\myImage.jpg" // path to the file
//         }
//       ]
// }

// transport.sendMail(mailOptions,(err,info) => {
//     if (err) {
//         console.log(err)
//     } else {
//         // console.log(info)
//         console.log('Email sent: ' + info.response)
//     }
// })

//-------------------------

//---------Buffer----------

// var buf = new Buffer.alloc(5)
// var len = buf.write("LearnIt")
// console.log(len);
// console.log(buf.toString());

// var tuf = Buffer.from('Alphabets : ')
// var buf = Buffer.from('Alphabets : ')
// var buf = Buffer.alloc(26)
// var ruf = Buffer.alloc(12)
// for(i=0;i<26;i++){
//     buf[i] = i + 97
// }
// console.log(buf);
// console.log(buf.toString());
// console.log(buf.toString('ascii'));
// console.log(buf.toString('utf8',0,5));
// console.log(buf.toJSON());
// console.log(Buffer.concat([tuf,buf]).toString().toUpperCase());
// console.log(buf.compare(tuf));
// tuf.copy(ruf)
// console.log(ruf.toString());
// console.log(buf.slice(0,6).toString());

//-------------------------

//------Global-Object1------

// console.log(__filename);
// console.log(__dirname);

//-------------------------

//-----Global-Object2-------
// console.log('Hello World!');

// console.info('This is an info message');

// console.error('This is an error message');

// console.warn('This is a warning message');

// console.dir({ name: 'John', age: 30 });

// console.time('MyTimer');
// setTimeout(()=>{
//     console.timeEnd('MyTimer');
// },2000)

// function foo() {
//     console.trace('This is a trace message');
//   }
  
//   function bar() {
//     foo();
//   }
  
//   function baz() {
//     bar();
//   }
  
//   baz();
  
//   console.assert(1 === 3, 'This is an assert message');

//-------------------------

//----------Stream-read-------

// var fs = require('fs')
// var rdata = ''

// var rdStreame = fs.createReadStream('sample.txt')
// rdStreame.setEncoding('utf-8')

// rdStreame.on('data',(chunk) => {
//   rdata += chunk
// })

// rdStreame.on('end',() => {
//   console.log(rdata)
// })

// rdStreame.on('error',(err) => {
//   console.log(err.stack)
// })

// console.log('programme ended')

//-------------------------

//--------Stream-write---------

// var fs = require('fs')
// var data = 'Learn Software Development @ MashupStack'

// var wStream = fs.createWriteStream('result.txt')

// wStream.write(data,'utf-8')

// wStream.end()

// wStream.on('finish',() => {
//   console.log('Writing has completed')
// })

// wStream.on('error',() => {
//   console.log(err.stack)
// })

// console.log('Program has ended')

//-------------------------

//-----Stream-Piping-------

// var fs = require('fs')

// var rdStreame = fs.createReadStream('sample.txt')
// var wrStream = fs.createWriteStream('result.txt')

// rdStreame.pipe(wrStream)

// console.log('Program has ended')

//-------------------------

//----------Compress-------

// var fs = require('fs')
// var zlib = require('zlib')

// fs.createReadStream('data.txt')
// .pipe(zlib.createGzip())
// .pipe(fs.createWriteStream('data.txt.gz'))

// console.log('File has been compresses')

///------------------------

//-------Decompress--------

// var fs = require('fs')
// var zlib = require('zlib')

// fs.createReadStream('data.txt.gz')
// .pipe(zlib.createGunzip())
// .pipe(fs.createWriteStream('data.txt'))

// console.log('File decompressed')

//-------------------------

//------Mongo-Intro--------

// const { MongoClient } = require('mongodb');
// const url = 'mongodb://localhost:27017/';

// const connectToDb = async() => {
//   try {
//     const client = await MongoClient.connect(url)
//     console.log('Connected Successfully')
//     const db = client.db("mashupDb")
//     const myObj = {name:'Aswin',age:20}
//     const addData = async()=>{
//       try {
//         await db.collection('Student').insertOne(myObj)
//         console.log("Added successfully")
//         client.close()
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     addData()
//   } catch (error) {
//     console.log(error)
//   }
// }
// connectToDb()

//-------------------------

//------MultipleData-------

// const { MongoClient } = require('mongodb');
// const url = 'mongodb://localhost:27017/';

// const connectToDb = async() => {
//   try {
//     const client = await MongoClient.connect(url)
//     console.log('Connected Successfully')
//     const db = client.db("mashupDb")
//     const myArray = [
//       {name: 'Aswin', age: 20},
//       {name: 'Bharat', age: 25},
//       {name: 'Charan', age: 22},
//       {name: 'Dinesh', age: 28},
//       {name: 'Eshan', age: 21},
//       {name: 'Faisal', age: 26},
//       {name: 'Gaurav', age: 24},
//       {name: 'Hari', age: 27},
//       {name: 'Ishan', age: 23},
//       {name: 'Jatin', age: 29}
//     ]
//     const addData = async()=>{
//       try {
//         await db.collection('Student').insertMany(myArray)
//         console.log("Added successfully")
//         client.close()
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     addData()
//   } catch (error) {
//     console.log(error)
//   }
// }
// connectToDb()

//------------------------

//---------FindOneAAndMany-----------

// const { MongoClient } = require('mongodb');
// const url = 'mongodb://localhost:27017/';

// const connectToDb = async() => {
//   try {
//     const client = await MongoClient.connect(url)
//     console.log('Connected Successfully')
//     const db = client.db("mashupDb")
//     const myArray = [
//       {name: 'Aswin', age: 20},
//       {name: 'Bharat', age: 25},
//       {name: 'Charan', age: 22},
//       {name: 'Dinesh', age: 28},
//       {name: 'Eshan', age: 21},
//       {name: 'Faisal', age: 26},
//       {name: 'Gaurav', age: 24},
//       {name: 'Hari', age: 27},
//       {name: 'Ishan', age: 23},
//       {name: 'Jatin', age: 29}
//     ]
//     const addData = async()=> {
//       try {
//         // const data = await db.collection('Student').findOne()
//         // const data = await db.collection('Student').find().toArray()
//         // const data = await db.collection('Student').findOne({},{projection:{_id:0,age:0}})
//         console.log(data)
//         client.close()
//       } catch (error) {
//         console.log(error)
//       }
//     }
//     addData()
//   } catch (error) {
//     console.log(error)
//   }
// }
// connectToDb()
 
//------------------------

//------UpdateOne---------

// const { MongoClient } = require('mongodb')
// const url = 'mongodb://localhost:27017/'

// const connectToDb = async() => {
//   try {
//     const client = await MongoClient.connect(url)
//     console.log('Connected Successfully')
//     const oldObj = {name:'Charan'}
//     const newObj = {$set: {name:'Raman'}}
//     const db = client.db('mashupDb')
//     const res = await db.collection('Student').updateOne(oldObj,newObj)
//     console.log(res)
//   } catch (error) {
//     console.log(error);
//   }
// }

// connectToDb()

//------------------------

//--------UpdateMany------

// const { MongoClient } = require('mongodb')
// const url = 'mongodb://localhost:27017/'

// const connectToDb = async() => {
//   const client = new MongoClient(url)
//   try {
//     const data = await client.connect()
//     console.log('Connection Success')
//     const db = data.db("mashupDb")
//     const collection = db.collection("Student")
//     const filter = {
//       age : 31
//     }
//     const updateDoc = {
//       $set : {
//         age : 29
//       }
//     }
//     await collection.updateMany(filter,updateDoc)
//     console.log('Successfully updated')
//   } catch (error) {
//     console.log(error)
//   }finally{
//     client.close()
//   }
// }

// connectToDb()

//------------------------

//--------Delete----------

// const { MongoClient } = require('mongodb')
// const url = 'mongodb://localhost:27017/'

// const connectToDb = async() => {
//   const client = new MongoClient(url)
//   try {
//     const data = await client.connect()
//     console.log('Connection Success')
//     const db = data.db("mashupDb")
//     const collection = db.collection("Student")
//     const del = {
//       age : 31
//     }
//     await collection.deleteMany(del)
//     // await collection.deleteOne(del)
//     console.log('Successfully Deleted')
//   } catch (error) {
//     console.log(error)
//   }finally{
//     client.close()
//   }
// }

// connectToDb()

//------------------------