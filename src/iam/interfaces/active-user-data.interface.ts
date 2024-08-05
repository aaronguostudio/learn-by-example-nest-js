import { Role } from 'src/user/enum/role.enum';
import { PermissionType } from 'src/iam/authorization/permission.type';

export interface ActiveUserData {
  sub: string;
  email: string;
  role: Role;
  permissions: PermissionType[];
}
