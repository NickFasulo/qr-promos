const QRCode = require("qrcode");

module.exports = {
  generateQR: (str) => {
    return new Promise((resolve, reject) => {
      QRCode.toDataURL(str)
        .then(url => {
          const res = QRCode.toDataURL(str);
      
          resolve(res)
        })
        .catch(err => {
          reject(err.stack);
        });
    })
  }
}