var http = require('http')

http.createServer((req,res) => {
    if (req.url != '/favicon.ico') {
        var n = req.url
        console.log(n)
        console.log(n.split('/'))
        n = n.split('/')[1]
        for(i=1;i<=10;i++){
            res.write(`${i} x ${n} = ${i*n}\n`)
        }
    }
  	res.end()
}).listen(8080,() => console.log('Server running on port : 8080'))