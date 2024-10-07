import axios from "axios"
import { API_URL } from "./config"

export const customFetch = axios.create({
    baseURL: API_URL,
});

export const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}