import { faker } from "@faker-js/faker";
import { Category, Organization, PrismaClient, User } from "@prisma/client";


const prisma = new PrismaClient();

export const createPost = async (iOrg: number,iUser: number, z: number, org: Organization, user: User, cat: Category) => {

  console.log("Posts: ",z,"/Org: ", iOrg,"/User: ", iUser);

    const post = await prisma.post.create({
      data: {
        title: 'post : '+ z.toString + "/ Org: " + iOrg.toString()+ "/User: " + iUser.toString()  ,
        content : faker.lorem.paragraph(),
        published : faker.datatype.boolean(),
        orderPost : faker.number.int(100),
        org: { connect: { id: org.id }},
        owner: { connect: { id: user.id } },
        Categories: { connect: { id: cat.id}}
      }
    })
    return post
  }
