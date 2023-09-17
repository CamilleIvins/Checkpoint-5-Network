import { AppState } from "../AppState.js"
import { Seller } from "../models/Seller.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class SellersService {
    async getSellers() {
        AppState.sellers = []
        const res = await api.get(`api/ads`)
        logger.log('ads coming through?', res.data)
        AppState.sellers = res.data.map(seller => new Seller(seller))
    }
}

export const sellersService = new SellersService