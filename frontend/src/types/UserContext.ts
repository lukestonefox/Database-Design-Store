import { Role } from './Role';

export interface UserContextType { 
    role: Role;
    setRole: (role: Role) => void;
}