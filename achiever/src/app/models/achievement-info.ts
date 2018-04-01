export interface AchievementInfo {
  theme: string,
  text: string,
  likesNumber?: number,
  id?:string,
  authorId?: string,
  authorName?:string,
  authPhoto?:string,
  photoUrl?: string,

  // массив пользователей, которые лайкнули достижение
  usersLikesId?: string[]
}
