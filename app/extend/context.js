module.exports = {
  getParams(key, fromParams = false) {
    const { method, body } = this.request;
    if (method === 'GET') {
      let data = this.query;
      if (fromParams) {
        data = this.params;
      }
      return key ? data[key] : data;
    }
    let data = body;
    if (fromParams) {
      data = this.params;
    }
    return key ? data[key] : data;
  },

  get userName() {
    const { header } = this.request;
    if (header?.authorization) {
      const tokenCache = this.app.jwt.verify(
        header.authorization,
        this.app.config.jwt.secret
      );
      return tokenCache?.userName || '';
    }
    return '';
  },

  get userId() {
    const { header } = this.request;
    if (header?.authorization) {
      const tokenCache = this.app.jwt.verify(
        header.authorization,
        this.app.config.jwt.secret
      );
      return tokenCache?.userId || 0;
    }
    return '';
  },
};
