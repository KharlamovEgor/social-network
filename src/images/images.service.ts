import {injectable} from 'inversify';
import {ImagesServiceInterface} from './images.service.interface';
import {writeFile} from 'fs/promises';
import {join} from 'path';
import {Blob} from 'buffer';

@injectable()
export class ImagesService implements ImagesServiceInterface {
  async load(imageData: Blob, imageName: string): Promise<boolean> {
    const buffer = await new Blob([imageData]).arrayBuffer();

    return await writeFile(
      join(process.cwd(), 'images', imageName),
      new Uint8Array(buffer),
    )
      .then(() => true)
      .catch(() => false);
  }
}
