import boom from "@hapi/boom";
class ProductService {
  create() {
    return new Promise((resolve, reject) => {
      resolve("new user created");
    });
  }
  find() {
    return new Promise((resolve, reject) => {
      throw boom.notFound();
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
