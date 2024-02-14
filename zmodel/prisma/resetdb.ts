import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {



  await prisma.configParam.deleteMany();
  await prisma.userFollower.deleteMany();
  await prisma.story.deleteMany();
  await prisma.postLike.deleteMany();
  await prisma.post.deleteMany();
  await prisma.task.deleteMany();
  await prisma.userTaskLink.deleteMany();
  await prisma.user.deleteMany();
  await prisma.userSecret.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();

  await prisma.category.deleteMany();

  await prisma.group.deleteMany();
  await prisma.orgDomain.deleteMany();
  await prisma.orgEmailUseTo.deleteMany();
  await prisma.orgEmail.deleteMany();
  await prisma.organization.deleteMany();


  await prisma.appEmailDomain.deleteMany();

  await prisma.comment.deleteMany();
  await prisma.file.deleteMany();
  await prisma.configParam.deleteMany();
  await prisma.file.deleteMany();



  await prisma.image.deleteMany();
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });

  /*
const deleteRelation = await prisma.labelplaylist.delete({
        where: {
            playlistId_labelId: {
                playlistId: playListIdVariable, //replace with appropriate variable
                labelId: labelIdVariable, //replace with appropriate variable
            },
        },
    });
  */
