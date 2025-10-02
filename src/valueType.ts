import {Config, ConfigValueType} from './types.js'

export const valueTypeStringForConfig = (config: Config) => {
  const valueType: string | undefined = valueTypeString(config.valueType)

  if (valueType === undefined) {
    if (config.allowableValues && config.allowableValues.length > 0) {
      return Object.keys(config.allowableValues[0])[0]
    }
  }

  return valueType
}

export const valueTypeString = (valueType: ConfigValueType) => {
  switch (valueType) {
    case ConfigValueType.Int:
      return 'int'
    case ConfigValueType.String:
      return 'string'
    case ConfigValueType.Bytes:
      return 'bytes'
    case ConfigValueType.Double:
      return 'double'
    case ConfigValueType.Bool:
      return 'bool'
    case ConfigValueType.LimitDefinition:
      return 'limitDefinition'
    case ConfigValueType.LogLevel:
      return 'logLevel'
    case ConfigValueType.StringList:
      return 'stringList'
    case ConfigValueType.IntRange:
      return 'intRange'
    case ConfigValueType.Json:
      return 'json'
    default:
      // eslint-disable-next-line no-useless-return
      return;
  }
}
