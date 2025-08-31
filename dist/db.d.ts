import mongoose from "mongoose";
export declare const UserModel: mongoose.Model<{
    username: string;
    password: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    username: string;
    password: string;
}, {}, mongoose.DefaultSchemaOptions> & {
    username: string;
    password: string;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    username: string;
    password: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    username: string;
    password: string;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    username: string;
    password: string;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export declare const ContentModel: mongoose.Model<{
    tags: mongoose.Types.ObjectId[];
    userId: mongoose.Types.ObjectId;
    link?: string | null;
    title?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    tags: mongoose.Types.ObjectId[];
    userId: mongoose.Types.ObjectId;
    link?: string | null;
    title?: string | null;
}, {}, mongoose.DefaultSchemaOptions> & {
    tags: mongoose.Types.ObjectId[];
    userId: mongoose.Types.ObjectId;
    link?: string | null;
    title?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    tags: mongoose.Types.ObjectId[];
    userId: mongoose.Types.ObjectId;
    link?: string | null;
    title?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    tags: mongoose.Types.ObjectId[];
    userId: mongoose.Types.ObjectId;
    link?: string | null;
    title?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    tags: mongoose.Types.ObjectId[];
    userId: mongoose.Types.ObjectId;
    link?: string | null;
    title?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export declare const LinkModel: mongoose.Model<{
    userId: mongoose.Types.ObjectId;
    hash?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    userId: mongoose.Types.ObjectId;
    hash?: string | null;
}, {}, mongoose.DefaultSchemaOptions> & {
    userId: mongoose.Types.ObjectId;
    hash?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    userId: mongoose.Types.ObjectId;
    hash?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    hash?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    userId: mongoose.Types.ObjectId;
    hash?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
//# sourceMappingURL=db.d.ts.map