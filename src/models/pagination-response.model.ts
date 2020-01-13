export interface IPaginationResponseModel<T> {
  totalCount: number;
  lastPage: number;
  currentPage: number;
  pageCount: number;
  items: T;
}