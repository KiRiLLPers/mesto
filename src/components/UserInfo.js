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

  setUserInfo({ name, about, avatar, id }) {
    this._name.textContent = name
    this._profession.textContent = about
    this._avatar.style.backgroundImage = `url(${avatar})`
    // оставил id не приватным, т.к. обращаюсь к нему в сабмите создания карточки
    this.id = id;
  }
}
