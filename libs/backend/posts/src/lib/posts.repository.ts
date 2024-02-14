import { Injectable } from "@nestjs/common";
import { Post, Prisma } from "@prisma/client";
import { PrismaService } from "@prisma/prisma";

@Injectable()
export class PostsRepository {

  constructor(
    private prisma: PrismaService,
  ) {}

  async createOnePost(params: { data: Prisma.PostCreateInput }): Promise<Post> {
    const { data } = params;
    console.log("PostRepository params: ", params)
    return this.prisma.post.create({ data });
  }

  async getPosts(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    orderBy?: Prisma.PostOrderByWithRelationInput;
    include?: Prisma.PostInclude;
    where?: Prisma.PostWhereInput
  }): Promise<Post[]> {
    console.log("get posts repository params: ", params)
    return this.prisma.post.findMany({...params});
  }

  async getOnePost(params: {
    include?:Prisma.PostInclude;
    where: Prisma.PostWhereUniqueInput
  }): Promise<Post | null > {
    return this.prisma.post.findUnique({ ...params } )
  }

  async updatePost(params: { // and soft delete
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { where, data } = params;
    console.log("update Post - repository: ", params)
      return this.prisma.post.update({ where, data });
  }

  async softDeletePost(params: { // and soft delete
    where: Prisma.PostWhereUniqueInput;
  }): Promise<Post> {
    const { where } = params;
    const data = {
      isDeletedDT: new(Date),
      isDeleted: Number(1)
    };
    return this.prisma.post.update({ data, where });
  }

  async deletePost(params: { // and soft delete
    where: Prisma.PostWhereUniqueInput;
  }
): Promise<Post> {
  console.log("Delete a Post - repository: " , params)
  const { where } = params;
    return this.prisma.post.delete({ where });
  }


  // For test purpose
  async getAllPosts(): Promise<Post[]> {
    return this.prisma.post.findMany()
  }

  async getAllPostsWithRelated(): Promise<Post[]> {
    return this.prisma.post.findMany({
      include: {
        Categories: true,
        Comments: true,
        LikedBys: true
      }
    })
  }

}
