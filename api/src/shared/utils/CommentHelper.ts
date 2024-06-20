import {
  UserWithPosts,
  Comment
} from '../../modules/useCases/comment/GetActiveUsersComments/interfaces';
/**
 * @param {Comment[]} comments - La liste des commentaires à regrouper.
 * @returns {UserWithPosts[]} - La liste des utilisateurs avec leurs posts et commentaires regroupés.
 */
export const groupCommentsByUserAndPost = (
  comments: Comment[]
): UserWithPosts[] => {
  // Utilise une Map pour regrouper les commentaires par userId.
  const usersMap = new Map<string, UserWithPosts>();
  // Itère sur chaque commentaire pour les regrouper par userId et postId.
  comments.map((comment) => {
    const { id, userId, postId, content, createdAt, updatedAt, User, Post } =
      comment;

    if (!usersMap.has(userId)) {
      usersMap.set(userId, {
        id: userId,
        userId: User.id,
        userName: User.userName,
        imagePath: User.imagePath,
        posts: []
      });
    }
    // Récupère l'utilisateur avec ses posts.
    const userWithPosts = usersMap.get(userId)!;
    // Cherche le post dans les posts de l'utilisateur.
    let postWithComments = userWithPosts.posts.find(
      (post) => post.postId === postId
    );

    if (!postWithComments) {
      postWithComments = {
        postId,
        title: Post.title,
        content: Post.content,
        imagePost: Post.imagePath,
        comments: [],
        createdAt: Post.createdAt,
        updatedAt: Post.updatedAt
      };
      userWithPosts.posts.push(postWithComments);
    }

    postWithComments.comments.push({
      id,
      userId,
      content,
      createdAt,
      updatedAt
    });
  });

  return Array.from(usersMap.values());
};
