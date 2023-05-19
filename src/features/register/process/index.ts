import { ProfileService } from "entities/user/services"
import { useCallback, useRef } from "react"
import { instance } from "shared/constants/api/instance"

export const useRegister = () => {
    const profileService = useRef(new ProfileService(instance));
    const registerUser = useCallback(async (user: any) => {
        const data = await profileService.current.createProfile(user)
    }, [])
}