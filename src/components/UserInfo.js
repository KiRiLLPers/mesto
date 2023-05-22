export default class UserInfo {
  constructor({nameSelector, professionSelector, avatarSelector}) {
    this._name = document.querySelector(nameSelector)
    this._profession = document.querySelector(professionSelector)
    this._avatar = document.querySelector(avatarSelector)
  }

  getUserInfo() {
    const userInfo = {}
    userInfo.heading = this._name.textContent
    userInfo.subheading = this._profession.textContent

    return userInfo
  }

  setUserInfo(dataUserInfo) {
    this._name.textContent = dataUserInfo.name
    this._profession.textContent = dataUserInfo.about
    this._avatar.style.backgroundImage = `url(${dataUserInfo.avatar})`
  }
}
