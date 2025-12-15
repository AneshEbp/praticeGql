import { Injectable } from '@nestjs/common';
import { rejects } from 'assert';
import { createWriteStream } from 'fs';
import { FileUpload } from 'graphql-upload-ts';
import { join } from 'path';
// import cloudinary from 'src/config/cloudinary.confog';
 import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class FileService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }
  async saveFile(file: FileUpload): Promise<string> {
    const { createReadStream, filename } = await file;
    const path = join(__dirname, '..', '..', 'uploads', filename);

    return new Promise((resolve, reject) => {
      createReadStream()
        .pipe(createWriteStream(path))
        .on('finish', () => resolve(filename))
        .on('error', (err) => reject(err));
    });
  }

  async uploadToCloudinary(file: FileUpload): Promise<string> {
    const { createReadStream, filename, mimetype } = await file;
    console.log(mimetype)
    return new Promise((resolve, reject) => {
      const stream = createReadStream();
      const cloudStream = cloudinary.uploader.upload_stream(
        {
          floder: 'posts',
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return null;
          resolve(result.secure_url);
        },
      );
      stream.pipe(cloudStream);
    });
  }
}
