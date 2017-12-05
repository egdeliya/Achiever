export interface AchievementInfo {
  theme: string,
  text: string,
  authorName: string,
  likesNumber: string,
  date: string,
  authorId: string,

  // массив пользователей, которые лайкнули достижение
  usersLikesId: string[]
}
