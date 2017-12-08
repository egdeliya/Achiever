export interface AchievementInfo {
  theme: string,
  text: string,
  // authorName?: string,
  likesNumber?: number,
  id?:string,
  // date: string,
  authorId?: string,
  photoUrl?: string,
  // массив пользователей, которые лайкнули достижение
  usersLikesId?: string[]
}
