var FtpDeploy = require('ftp-deploy');
var ftpDeploy = new FtpDeploy();
 
var config = {
    user: process.env.FTPUSER,
    password: process.env.FTPPASSWORD,
    host: process.env.FTPHOST,
    port: 21,
    localRoot: __dirname + "/../build/",
    remoteRoot: "/projects/steel_member/ci_test",
    include: ['test.txt'],
    deleteRemote: false,
    forcePasv: true
}
    
ftpDeploy.deploy(config, function(err) {
    if (err) console.log(err)
    else console.log('finished');
});