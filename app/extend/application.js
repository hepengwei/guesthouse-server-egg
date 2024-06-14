const path = require('path');

const getPackage = () => {
  const filePath = path.join(process.cwd(), 'package.json');
  const package = require(filePath);
  return package;
};

module.exports = {
  getPackageInfo(key) {
    const pageageInfo = getPackage();
    return key ? pageageInfo[key] : pageageInfo;
  },
};
