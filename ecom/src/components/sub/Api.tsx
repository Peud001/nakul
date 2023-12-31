import { useAppSelector } from "../../app/hook";

export const ApiComponent = () => {
    const api = useAppSelector((state) => state.api.api)
    return api
}