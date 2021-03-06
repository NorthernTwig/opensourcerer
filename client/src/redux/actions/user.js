import { getInitialEvents, getNewEvents } from '../../lib/http'

export const experienceUpdate = experience => ({ type: 'EXPERIENCE_UPDATE', experience })
export const levelUpdate = level => ({ type: 'LEVEL_UPDATE', level })
export const avatarUpdate = avatarUrl => ({ type: 'AVATAR_UPDATE', avatarUrl })
export const titleUpdate = title => ({ type: 'TITLE_UPDATE', title })
export const updateUserData = userData => ({ type: 'UPDATE_USER_DATA', userData })
export const userLevelup = newUserData => ({ type: 'USER_LEVELUP', newUserData })
