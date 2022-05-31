import * as cluster from 'cluster';
import * as os from 'os';
import { Injectable } from '@nestjs/common';

const numCPUs = process.env.CPUS_TO_USE || os.cpus().length;
console.log('NUM CPUS', numCPUs);

@Injectable()
export class AppClusterService {
  // eslint-disable-next-line @typescript-eslint/ban-types
  static clusterize(callback: Function): void {
    if ((cluster as any).isMaster) {
      console.log(`Master server started on ${process.pid}`);
      for (let i = 0; i < numCPUs; i++) {
        (cluster as any).fork();
      }
      (cluster as any).on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Restarting`);
        (cluster as any).fork();
      });
    } else {
      console.log(`Cluster server started on ${process.pid}`);
      callback();
    }
  }
}
