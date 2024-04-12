export default (http) => ({
  async login(login) {
    let { data } = await http.get("test_auth", {
      headers: {
        "Leadhit-Site-Id": login,
      },
    });
    return data;
  },
});
