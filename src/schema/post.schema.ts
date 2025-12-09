import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  authorId: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;
}

export const postSchema = SchemaFactory.createForClass(Post);
