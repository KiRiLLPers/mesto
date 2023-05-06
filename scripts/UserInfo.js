export default class UserInfo {
  constructor({nameSelector, professionSelector}) {
    this._name = document.querySelector(nameSelector)
    this._profession = document.querySelector(professionSelector)
  }

  getUserInfo() {
    const userInfo = {}
    userInfo.heading = this._name.textContent
    userInfo.subheading = this._profession.textContent

    return userInfo
  }

  setUserInfo(dataUserInfo) {
    this._name.textContent = dataUserInfo.heading
    this._profession.textContent = dataUserInfo.subheading
  }
}
