import cookie from 'react-cookies'

var CryptoJS = require("crypto-js");


const onLogin = (user, account_type,email, address) => {
    var d = new Date();
    var t = d.getTime();
    // Encrypt
    //var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(user), 'secret key 123').toString();
    var ciphertext = CryptoJS.AES.encrypt(user, t+ '').toString();
    // Decrypt
    cookie.save('login_time', t+"", {path: '/'})
    cookie.save('userInfo', ciphertext, { path: '/' })
    cookie.save('account_type', account_type, { path: '/' })
    cookie.save('email',email, { path: '/' })
    cookie.save('address', address, { path: '/' })

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
const getEmail = () => {
    return cookie.load('email')
}
const getAddress = () => {
    return cookie.load('address')
}
 
const logout = () => {
    cookie.remove('userInfo')
    cookie.remove('account_type')
    cookie.remove('address')
    cookie.remove('email')
    // window.location.Reload()
}



let cookieMan = {
    onLogin:onLogin,
    loginUser: loginUser,
    logout:logout,
    getType:getType,
    getEmail:getEmail,
    getAddress:getAddress
}

export default cookieMan;