import { Organization, Post, PrismaClient, Task, User } from "@prisma/client";
import {
  fakeCategory,
  fakeComment,
  fakeGroup,
  fakeImage,
  fakeOrg,
  fakeOrgDomain,
  fakeOrgEmail,
  fakeOrgEmailUseTo,
  fakePost,
  fakePostLike,
  fakeProfile,
  fakeStory,
  fakeTask,
  fakeUser,
  fakeUserFollower,
  fakeUserTaskLink
} from "../factories";

const prisma = new PrismaClient();

async function main() {
  const orgs: Organization[] = [];
  const users: User[] = [];
  const posts: Post[] = [];
  const tasks: Task[]= []

  // create an org
    const org = await prisma.organization.create({ data: fakeOrg() });
    await prisma.orgDomain.create({ data: fakeOrgDomain(org)});
    const orgEmail = await prisma.orgEmail.create({ data: fakeOrgEmail(org)});
    await prisma.orgEmailUseTo.create({ data: fakeOrgEmailUseTo(orgEmail)});

    orgs.push(org);



  // creating 2 users
  for (let i = 0; i < 2; i++) {
    const user = await prisma.user.create({ data: fakeUser(org.id) });
    // attaching a profile picture to the user
    await prisma.image.create({ data: fakeImage(user.id, "user") });
    // attaching a profile to the user
    await prisma.profile.create({ data: fakeProfile(user) });

    users.push(user);

    // each user has 3 posts
    for (let j = 0; j < 3; j++) {
      const post = await prisma.post.create({ data: fakePost(user, org) });
      posts.push(post);

      // each post has 2 category
      for (let k = 0; k < 3; k++) {
        await prisma.category.create({ data: fakeCategory(post) });
      }

      // each post has 3 images
      for (let k = 0; k < 3; k++) {
        await prisma.image.create({ data: fakeImage(post.id, "post", k) });
      }

      // each post has 2 comments
      for (let e = 0; e < 3; e++) {
        await prisma.comment.create({ data: fakeComment(user,post) });
      }
    }
    // each user has 2 tasks
    for (let j = 0; j < 2; j++) {
      const task = await prisma.task.create({ data: fakeTask(user, org) });
      tasks.push(task);
    }
    // each user has 2 stories
    for (let j = 0; j < 2; j++) {
      const story = await prisma.story.create({ data: fakeStory(user) });

      // each story has 1 image
      await prisma.image.create({ data: fakeImage(story.id, "story") });
    }
  }



  // create 2 groups
  for (let i = 0; i < 2; i++) {
    const user = users[i];
    await prisma.group.create({data: fakeGroup(user,org)});
  }

  // let's make first 2 users follow each other
  await prisma.userFollower.create({
    data: fakeUserFollower(users[0], users[1]),
  });
  await prisma.userFollower.create({
    data: fakeUserFollower(users[1], users[0]),
  });

  //let's make the second user likes every post of first user
  for (let i = 0; i < 3; i++) {
    await prisma.postLike.create({ data: fakePostLike(users[1], posts[i]) });
  }

// let attribute tasks
await prisma.userTaskLink.create({data: fakeUserTaskLink(users[0],tasks[2])});
await prisma.userTaskLink.create({data: fakeUserTaskLink(users[0],tasks[3])});
await prisma.userTaskLink.create({data: fakeUserTaskLink(users[1],tasks[0])});
await prisma.userTaskLink.create({data: fakeUserTaskLink(users[1],tasks[1])});
}




// copied from https://www.prisma.io/docs/guides/database/seed-database
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

