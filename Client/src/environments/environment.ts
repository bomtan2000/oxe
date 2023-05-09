
// ng build --configuration="production"

// export const environment = {
//   production: false,
//   apiUrl: 'http://localhost:4200',
//   urlAPISSO: 'https://mpi.mplogistics.vn:8187/',
//   urlAPIService: 'https://mpi.mplogistics.vn:8187/api/mpi',
//   urlNotifyServer: 'https://pro.igls.vn:8182'
// };

export const environment = {
  production: true
  , apiUrl: 'http://localhost:4200'
  , urlAPIService: 'http://192.168.70.132:5001/'
  , urlAPISSO: 'http://192.168.70.132:5002/'
  , urlNotifyServer: 'https://pro.igls.vn:8182'
  , urlFileServer: 'https://mpi.mplogistics.vn/uploads/'
}
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
