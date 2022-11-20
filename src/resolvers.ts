import postModel from "./model/post.model";
const resolvers = {
  Query: {
    hello: () => {
      return "hello world";
    },
    getAllPost: async () => {
      const posts = await postModel.find();
      return posts;
    },
    getPostById: async (parent: any, { id }: any, context: any, info: any) => {
      return await postModel.findById(id);
    },
  },
  Mutation: {
    createPost: async (parent: any, args: any, context: any, info: any) => {
      const { title, description } = args.post;
      const post = new postModel({ title, description });
      await post.save();
      return post;
    },
    deletePost: async (parent: any, args: any, context: any, info: any) => {
      const { id } = args;
      await postModel.findByIdAndDelete(id);
      return "OK POST DELETED";
    },
    updatePost: async (parent: any, args: any, context: any, info: any) => {
      const { id } = args;
      const { title, description } = args.post;
      const post = await postModel.findByIdAndUpdate(
        id,
        { title, description },
        { new: true }
      );
      return post;
    },
  },
};
export default resolvers;
