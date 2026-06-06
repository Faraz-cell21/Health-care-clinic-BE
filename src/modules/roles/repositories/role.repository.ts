import { Role } from '../models/role.model';

export class RoleRepository {
  async create(data: Record<string, unknown>) {
    return Role.create(data);
  }

  async findById(id: string) {
    return Role.findById(id).populate(
      'permissions',
    );
  }

  async findByName(name: string) {
    return Role.findOne({
      name,
    }).populate('permissions');
  }

  async findAll() {
    return Role.find().populate(
      'permissions',
    );
  }
}