import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async editProfile(formData) {
    //There's NO 'api' in front⬇️
    const res = await api.put('/account', formData)
    logger.log("edit account details", res.data)

    const resume = formData.target.resume || formData.dataTransfer.resume
    if (!resume.length) {
      return;
    } else {
      this.resume(resume[0])

    }
    const updatedAccount = new Account(res.data)
    AppState.account = updatedAccount

    // form.reset()
  }
}

export const accountService = new AccountService()
