import { app } from './app';
import { Logger } from './utils/logger';

const PORT = (process.env.NODE_DOCKER_PORT as unknown as number) || 8080;
app.listen(PORT, () => {
  Logger.info(`Server is running on port ${PORT}.`);
});
