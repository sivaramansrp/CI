import { withModuleFederation } from '@nx/angular/module-federation';
import config from './module-federation.config';

export default withModuleFederation(config);


// const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

// const webpackConfig = withModuleFederationPlugin(config)

// module.exports = {
//   ...webpackConfig,
//   output: {
//     ...webpackConfig.output,
//     scriptType: 'text/javascript'
//   }
// };