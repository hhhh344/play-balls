(function () {
  cc.cloud = {
    initialized: false,
    initialize(config) {
      if (typeof config === 'undefined' || config === null) config = cc_cloud_commonConfig;
      if (config.platform === 'tencent') {
        if (this.initialized) return this.tencentApp;
        tcb && tcb.useAdapters(window.adapter);
        this.tencentApp = tcb ? tcb.init(config.tencent) : null;
        this.initialized = true;
        return this.tencentApp;
      }
      return null;
    },
  };
})()