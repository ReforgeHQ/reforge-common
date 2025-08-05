import type {
  Reforge,
  ConfigRow,
  ConfigValue,
  Provided,
  ConditionalValue,
} from "@reforge-com/node";
import { ConfigType, ConfigValueType } from "@reforge-com/node";

export type Logger = (category: any, message: unknown) => void;

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
  ConditionalValue,
  ConfigRow,
  ConfigType,
  ConfigValue,
  ConfigValueType,
  NewConfig,
  NewFlag,
  Provided,
};
