var http = require('http')

http.createServer((req,res) => {
    if (req.url != '/favicon.ico') {
        var n = req.url
        console.log(n)
        console.log(n.split('/'))
        n = n.split('/')[1]
        for(i=1;i<=n;i++){
            for(j=1;j<=i;j++){
                res.write("* ")
            }
            res.write("\n")
        }
    }
  	res.end()
}).listen(8080,() => console.log('Server running on port : 8080'))