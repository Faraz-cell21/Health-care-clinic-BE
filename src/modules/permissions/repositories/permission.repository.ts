import { Permission } from '../models/permission.model';

export class PermissionRepository {
  async create(data: Record<string, unknown>) {
    return Permission.create(data);
  }

  async findById(id: string) {
    return Permission.findById(id);
  }

  async findByName(name: string) {
    return Permission.findOne({
      name,
    });
  }

  async findAll() {
    return Permission.find();
  }
}