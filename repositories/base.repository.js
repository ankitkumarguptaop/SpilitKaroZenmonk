exports.base_repository = class base_repository {
  constructor(model) {
    this.model = model;
  }
  async findAll(id, filters) {
    return await this.model.find({ $and: [{ $nor: [{ _id: id }] }, filters] });
  }
  async update(id, body) {
    return;
  }
};
