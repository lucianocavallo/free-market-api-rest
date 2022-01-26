class UserService {
  create() {
    return new Promise((resolve, reject) => {
      resolve("new user created");
    });
  }
  find() {
    return new Promise((resolve, reject) => {
      resolve([
        { email: "juancito@mail.com", password: "admin123" },
        { email: "pepito@mail.com", password: "admin123" },
      ]);
    });
  }
  findOne() {
    return new Promise((resolve, reject) => {
      resolve({ email: "juancito@mail.com", password: "admin123" });
    });
  }
  update() {}
  delete() {}
}

export default UserService;
