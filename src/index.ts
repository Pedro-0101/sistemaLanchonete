import AppDataSource from './data-source';

export async function start() {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
}

if (require.main === module) {
  start()
    .then(() => {
      console.log('Data source has been initialized');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err);
    });
}
