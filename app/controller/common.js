const BaseController = require('./base');

class CommonController extends BaseController {
  async getCitys() {
    // const { app } = this;
    try {
      //   const result = await app.httpclient.request(
      //     'https://apis.imooc.com/?icode=89773B5DA84CA283',
      //     { dataType: 'json' }
      //   );
      //   if (result.status === 200) {
      //     this.success(result.data);
      //   } else {
      //     this.error('获取城市数据失败');
      //   }
      this.success([
        { label: '所有', value: 'all' },
        { label: '北京', value: '10001' },
        { label: '武汉', value: '10002' },
        { label: '深圳', value: '10003' },
        { label: '上海', value: '10004' },
      ]);
    } catch (err) {
      console.log('获取城市数据失败:', err);
      this.error('获取城市数据失败');
    }
  }
}

module.exports = CommonController;
