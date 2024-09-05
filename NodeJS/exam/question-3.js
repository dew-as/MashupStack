var http = require('http')

http.createServer((req,res) => {
    var myArray = [{id:1,name:'rajesh'},{id:2,name:'rahul'},{id:3,name:'sruthi'}]
    if (req.url != '/favicon.ico' && req.url.split('/')[1] >=1 && req.url.split('/')[1] <= 3 ) {
        var n = req.url
        console.log(n)
        console.log(n.split('/'))
        n = n.split('/')[1]
        for(i=0;i<myArray.length;i++){
            if (myArray[i].id == n) {
                res.write(myArray[i].name)
                break
            }
        }
    }else{
        res.write('Invalid input')
    }
  	res.end()
}).listen(8080,() => console.log('Server running on port : 8080'))