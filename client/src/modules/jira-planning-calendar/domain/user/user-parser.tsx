import { User } from "./user";
import { Parser } from "../../../shared/parser";

export class UserParser implements Parser<User> {

    fromJson(json: any): User {
        return {
            accountType: json.accountType,
            accountId: json.accountId,
            displayName: json.displayName,
            isActive: json.active
        };
    }

    toJson(object: User) {
        throw new Error("Method not implemented.");
    }

    parseArrayFromJson(data: any): Array<User> {
        const result = new Array<User>();
        data.forEach(user => {
            var parsedUser = this.fromJson(user);
            if (parsedUser.isActive && parsedUser.accountType === 'atlassian') {
                result.push(parsedUser);
            }
        });
        return result;
    }
    parseArrayToJson(data: User[]) {
        throw new Error("Method not implemented.");
    }

}