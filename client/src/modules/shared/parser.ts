export interface Parser<T> {
  fromJson(data: any): T;
  toJson(data: T): any;
  parseArrayFromJson(data: any): Array<T>;
  parseArrayToJson(data: Array<T>): any;
}
