const dayjs = require('dayjs');
const md5 = require('md5');

module.exports = {
  getFormatTime(date) {
    if (!date) return '';
    return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
  },

  getTimestamp(date) {
    if (!date) return null;
    return dayjs(date).valueOf();
  },

  unPick(source, arr) {
    if (source && typeof source === 'object') {
      const obj = {};
      if (Array.isArray(arr)) {
        for (let i in source) {
          if (!arr.includes(i)) {
            obj[i] = source[i];
          }
        }
        return obj;
      } else if (arr) {
        for (let i in source) {
          if (i !== arr) {
            obj[i] = source[i];
          }
        }
        return obj;
      }
    }
    return source;
  },

  myMd5(str) {
    return str ? md5(`${str}${this.app.config.salt}`) : '';
  },

  validateMessageToMsg(validateMesage, rule) {
    if (validateMesage && validateMesage.length > 0) {
      const { field, message } = validateMesage[0];
      if (message === 'required') {
        if (rule && rule[field]?.fieldName) {
          return `${rule[field].fieldName}为必填项`;
        }
        return `${field}为必填项`;
      }
      return message;
    }
    return '';
  },

  base64Encode(str = '') {
    return Buffer.from(str).toString('base64');
  },

  base64Decode(str = '') {
    return Buffer.from(str, 'base64').toString();
  },

  toInt(str) {
    if (typeof str === 'number') return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
  },
};
