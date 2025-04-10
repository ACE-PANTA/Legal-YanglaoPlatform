const CryptoJS = require("crypto-js");

function encrypt(message, secretKey) {
    const iv = CryptoJS.lib.WordArray.random(16); // 随机生成 16 字节的 IV
    const key = CryptoJS.enc.Utf8.parse(secretKey); // 将密钥转换为 WordArray
    const encrypted = CryptoJS.AES.encrypt(message, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    // 返回 IV + 密文，并用 Base64 编码
    return iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);
}

// 示例
const message = "Hello, ASP.NET!";
const secretKey = "my-secret-key-123"; // 密钥必须是 16/24/32 字节
const encryptedMessage = encrypt(message, secretKey);
console.log("Encrypted Message:", encryptedMessage);