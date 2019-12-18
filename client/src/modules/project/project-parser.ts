import { Parser } from "../shared/parser";
import { Project } from "./project";

export class ProjectParser implements Parser<Project> {
  fromJson(json: any): Project {
    return {
      key: json.key,
      name: json.name
    };
  }

  toJson(object: Project) {
    throw new Error("Method not implemented.");
  }

  parseArrayFromJson(data: any): Array<Project> {
    const result = new Array<Project>();
    data.forEach(element => {
      result.push(this.fromJson(element));
    });
    return result;
  }
  parseArrayToJson(data: Project[]) {
    throw new Error("Method not implemented.");
  }
}
