import {IHouse} from "../../../../core/IHouse";
import {ILogger} from "../../../../core/logger-manager/Ilogger";
import {IUserInfo} from "../../../../core/user-system/IUser";

export interface ApiModel {
  token: string;
  message: string;
  success: boolean;
  list: any[];
  logger: ILogger;
  house: IHouse;
  user: IUserInfo;
}
