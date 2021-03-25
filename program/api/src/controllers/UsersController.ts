import { getUsersRepo, User } from "../database/models/User";

const repo = getUsersRepo();

export default {
  async find(id: string) {
    return await repo.findOne(id);
  },
  async create(data: Omit<User, "id">) {
    return await repo.save(repo.create(data));
  },
};
