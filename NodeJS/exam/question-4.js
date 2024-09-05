var http = require('http')
var url = require('url')
var qdata,fnum,snum,operator,answer

class Calculate {
    constructor(fnum,operator,snum){
        switch (operator) {
            case "+":
                answer= fnum + snum;
                break
            case "-":
                answer= fnum - snum;  
                break 
            case "x":
                answer= fnum * snum;
                break
            case "/":
                if (snum==0) {
                    answer="Cannot devided By zero"
                    break
                } else {
                    answer= fnum / snum;
                    break
                }
            case "%":
                answer= fnum % snum;
                break
            default:
                break;
        }
    }
}

http.createServer((req,res) => {
    var html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<form action="/calculate" method="get">
    <input name="fnum" type="text" id="fnum" placeholder="first number">
    <select name="operator" id="operator">
        <option>--select-operator--</option>
        <option>+</option>
        <option>-</option>
        <option>x</option>
        <option>/</option>
        <option>%</option>
    </select>
    <input name="snum" type="text" id="snum" placeholder="second number">
    <button id="btn" type="submit">Calculate</button>
</form>
    <p id="result"></p>
    </body>
</html>`

var urlString = url.parse(req.url,true)
    if (urlString.pathname == '/calculate') {
        qdata = urlString.query
        fnum = qdata.fnum
        snum = qdata.snum
        operator = qdata.operator
        new Calculate(Number(fnum),operator,Number(snum));
        console.log(answer)
        res.write(`<h1>${fnum} ${operator} ${snum} = ${answer.toString()}</h1>`)
        res.end()
    }else {
        res.write(html)
        res.end()
    }
}).listen(8080,()=>console.log('Running...'))