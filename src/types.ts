import  {
  ConfigType,
  type Reforge,
} from "@reforge-com/node";
export  {
  type ConditionalValue,
  type ConfigRow,
  ConfigType,
  type ConfigValue,
  ConfigValueType,
  type Provided,
  type Reforge,
} from "@reforge-com/node";

import {  } from "@reforge-com/node";

export type Logger = (category: string | unknown, message: unknown) => void;

export type Config = Exclude<
  ReturnType<typeof Reforge.prototype.raw>,
  undefined
>;

type NewConfig = Omit<
  Config,
  "id" | "createdAt" | "updatedAt" | "changedBy" | "allowableValues"
>;

type NewFlag = Omit<Config, "id" | "createdAt" | "updatedAt" | "changedBy">;

export type GetValue = Exclude<
  ReturnType<typeof Reforge.prototype.get>,
  undefined
>;

export type ConfigTypeValue = (typeof ConfigType)[keyof typeof ConfigType];

export {
  NewConfig,
  NewFlag,
};
