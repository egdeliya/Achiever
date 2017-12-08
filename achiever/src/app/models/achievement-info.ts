export interface AchievementInfo {
  theme: string,
  text: string,
  // authorName?: string,
  likesNumber?: number,
  id?:string,
  // date: string,
  authorId?: string,
  authorName?:string,
  authPhoto?:string,
  photoUrl?: string,
  // массив пользователей, которые лайкнули достижение
  usersLikesId?: string[]
}
