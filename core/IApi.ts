import {IHouse} from "./IHouse";
import {IHouseList} from "./IHouseInfo";
import {ILogger} from "./logger-manager/Ilogger";
import {IGroup} from "./user-system/IGroups";
import {IUserInfo} from "./user-system/IUser";

export interface IApi {
  token: string;
  message: string;
  success: boolean;
  list: any[];
  logger: ILogger;
  house: IHouse;
  user: IUserInfo;
  usersList: IUserInfo[];
  group: IGroup;
  groupList: IGroup[];
  houseList: IHouseList[];
}
