import { ILookupViewModel } from "@/models/lookup.model";

export interface ICategoryModel extends ILookupViewModel {
  isDeleted: boolean;
  projectId: string;
}
