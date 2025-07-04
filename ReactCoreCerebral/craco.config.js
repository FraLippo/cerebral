
module.exports = {
  webpack: {
    configure: (config) => {
      config.module.rules.forEach(rule => {
        if (!rule.oneOf) return;

        rule.oneOf.forEach(one => {
          if (one.type === 'asset' && one.parser?.dataUrlCondition?.maxSize) {
            one.type = 'asset/resource';
            delete one.parser.dataUrlCondition;
          }
        });
      });
      return config;
    }
  }
};