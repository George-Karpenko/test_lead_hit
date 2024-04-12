export default (authApi) => ({
  namespaced: true,
  state: {
    user: null,
  },
  getters: {
    userIdSite: (state) => state.user?.idSite,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    initialiseStore(state) {
      if (localStorage.getItem("store")) {
        const { user } = JSON.parse(localStorage.getItem("store"));
        state.user = user;
      }
    },
  },
  actions: {
    async login({ commit }, idSite) {
      try {
        const { message } = await authApi.login(idSite);
        if (message === "ok") {
          commit("setUser", { idSite });
          return;
        }
        return "Не известная ошибка";
      } catch (error) {
        if (error.response?.status == 401) {
          return "Поле idSite не вреное";
        }
      }
    },
  },
});
