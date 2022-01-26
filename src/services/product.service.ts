class ProductService {
  create() {
    return new Promise((resolve, reject) => {
      resolve("new user created");
    });
  }
  find() {
    return new Promise((resolve, reject) => {
      resolve([
        { name: "Camisa 1", price: 10 },
        { name: "camisa 2", price: 15 },
      ]);
    });
  }
  findOne() {
    return new Promise((resolve, reject) => {
      resolve({ name: "Camisa 1", price: 10 });
    });
  }
  update() {}
  delete() {}
}

export default ProductService;
