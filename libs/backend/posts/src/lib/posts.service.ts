import { Injectable } from '@nestjs/common';
import { Post, Prisma, User } from '@prisma/client';
import { PrismaService } from '@prisma/prisma';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {

  constructor(
    private prisma: PrismaService,
    // private enhancedPrisma: EnhancedPrismaService,
    private repository: PostsRepository
  ) {}

   async createOnePost(params: {
    content: Post[`content`];
    title: Post[`title`];
    ownerId: User[`id`];
    orgId: Post[`orgId`]
    }) {
        const { title , content, ownerId, orgId } = params;
        const data: Prisma.PostCreateInput = {
          title,
          content,
          orderPost: 0,
          owner: {
            connect: {
              id: ownerId
            }
          },
          org: {
            connect: {
              id: orgId
            }
          }
        };
      const post = await this.repository.createOnePost({ data: data });
      console.log("Create a Post - service: ", post)
      return post;
  }

  async getPosts(params: {
      skip?: number,
      take?: number,
      cursor?: Prisma.PostWhereUniqueInput,
      orderBy?: Prisma.PostOrderByWithRelationInput,
      orgId?: Post[`orgId`],
      ownerId?: Post[`ownerId`],
      withCategories?: string,
      withComments?: string,
      withLikedBys?: string
    })
    {
      const { ownerId, orgId, withCategories, withComments, withLikedBys} = params
      let withCategoriesBoolean = true;
      let withCommentsBoolean = true;
      let withLikedBysBoolean = true;
      if(withCategories === 'false') { withCategoriesBoolean = false}
      if(withComments === 'false') { withCommentsBoolean = false}
      if(withLikedBys === 'false') { withLikedBysBoolean = false}
      return await this.repository.getPosts( {
        include: { Comments: withCommentsBoolean, Categories: withCategoriesBoolean, LikedBys: withLikedBysBoolean},
        where: { ownerId, orgId }
      });
    }

  async getOnePost(postId: string, data: {
    withCategories: string,
    withComments: string,
    withLikedBys: string
  }): Promise<Post | null> {
    const {withCategories, withComments, withLikedBys} = data
    // let withPostsboolean = true
    // if(withPosts === 'false') { withPostsboolean = false}
    return await this.repository.getOnePost({
      include: {
        Categories: JSON.parse(withCategories),
        Comments: JSON.parse(withComments),
        LikedBys: JSON.parse(withLikedBys)
      },
      where: { id: postId}})
  }

  async updatePost( params: {
    where: Prisma.PostWhereUniqueInput,
    data: Prisma.PostUpdateInput,
  }): Promise<Post>
  {
    const {where, data} = params;
    console.log("update Post Service: ", params)
    return await this.repository.updatePost({where, data});
  }

  async softDeletePost( params: {
    postId: Post[`id`],
  })
  {
    const { postId } = params
    return await this.repository.softDeletePost({where: { id: postId}});
  }

  async deletePost(params: { postId: Post[`id`],}) {
    console.log("Delete a Post - service: " , params)
    const { postId } = params;
    return await this.repository.deletePost({where: { id: postId}})
  }


  // For test purpose
  async getAllPosts(){
    return await this.repository.getAllPosts();
  }

  async getAllPostsWithRelated(): Promise<Post[]>{
    return await this.repository.getAllPostsWithRelated();
  }


}

