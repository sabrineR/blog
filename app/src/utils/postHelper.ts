export const getPostsIn24Hours = (posts: any) => {
  posts.filter((post: any) => {
    const createdDate = new Date(post.createdAt);
    const currentDate = new Date();
    const timeDiff = currentDate.getTime() - createdDate.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    return hoursDiff <= 24;
  });
};
