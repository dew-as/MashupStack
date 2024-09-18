const isAutenticated = (allowedEmail) => (req,res,next)=>{
  if(req.session&&req.session.userEmail){
      userEmail = req.session.userEmail
  
  if(!allowedEmail || userEmail===allowedEmail){
      return next();
  }
}
res.render('403',{message:'Only authorized users can access',errors:[]})

}
module.exports = isAutenticated