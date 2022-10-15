import cookie from 'react-cookies'

var CryptoJS = require("crypto-js");


const onLogin = (user) => {
    var d = new Date();
    var t = d.getTime();
    // Encrypt
    //var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(user), 'secret key 123').toString();
    var ciphertext = CryptoJS.AES.encrypt(user, t+ '').toString();
    // Decrypt
    cookie.save('login_time', t+"", {path: '/'})
    cookie.save('userInfo', ciphertext, { path: '/' })
}

const getType = ()=>{
    return cookie.load('account_type')
}

const loginUser = () => {
    if(cookie.load('userInfo')===undefined ||cookie.load('userInfo')===null ){
        return undefined
    }
    var bytes  = CryptoJS.AES.decrypt(cookie.load('userInfo'), cookie.load('login_time'));
    var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData
}
 
 
const logout = () => {
    cookie.remove('userInfo')
    
    
    // window.location.Reload()
}



let cookieMan = {
    onLogin:onLogin,
    loginUser: loginUser,
    logout:logout,
    getType:getType,
 
}

export default cookieMan;