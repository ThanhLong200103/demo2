

import type { RoleType } from "../types/role";
import BaseService from "./BaseService";

export default class RoleService extends BaseService {
    async getAllRole (): Promise<Array<RoleType>> {
    const res =  await this.http.get("/admin/roles");
    return res.data
    }
}