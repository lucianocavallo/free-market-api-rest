class CategoryService {
  create() {
    return new Promise((resolve, reject) => {
      resolve("new user created");
    });
  }
  find() {
    return new Promise((resolve, reject) => {
      resolve([
        { name: "Juegos", image: "http://images.com/640" },
        { name: "Electrónica", image: "http://images.com/640" },
      ]);
    });
  }
  findOne() {
    return new Promise((resolve, reject) => {
      resolve({ name: "Juegos", image: "http://images.com/640" });
    });
  }
  update() {}
  delete() {}
}

export default CategoryService;
