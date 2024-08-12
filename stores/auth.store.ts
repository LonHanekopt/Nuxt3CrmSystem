interface IAUTHSTORE {
    email: string
    name: string
    status: boolean
}

const defaultValue: {user: IAUTHSTORE} = {
    user: {
        email: '',
        name: '',
        status: false
    }
}

export const useAuthStore = defineStore('auth', {
    state: () => defaultValue,
    getters: {
        isAuth: state => state.user.status,
    },
    actions: {
        clear(){
            this.$patch(defaultValue)
        },
        set(input: IAUTHSTORE){
            this.$patch({user: input})
            console.log(this.$state);
            
        }
    },
})

export const useLoadingStore = defineStore('isLoading', {
    state: () => ({
        isLoading: true
    }),
    getters: {
        loading: state => state.isLoading,
    },
    actions: {
       set(data: boolean){
        this.$patch({isLoading: data})
       }
    },
})