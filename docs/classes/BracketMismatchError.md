[hirnfick](../API.md) / BracketMismatchError

# Class: BracketMismatchError

## Hierarchy

- `Error`

  ↳ **`BracketMismatchError`**

## Table of contents

### Constructors

- [constructor](BracketMismatchError.md#constructor)

### Properties

- [message](BracketMismatchError.md#message)
- [name](BracketMismatchError.md#name)
- [stack](BracketMismatchError.md#stack)
- [prepareStackTrace](BracketMismatchError.md#preparestacktrace)
- [stackTraceLimit](BracketMismatchError.md#stacktracelimit)

### Methods

- [captureStackTrace](BracketMismatchError.md#capturestacktrace)

## Constructors

### constructor

• **new BracketMismatchError**()

BracketMismatch Error constructor.

#### Overrides

Error.constructor

#### Defined in

[src/errors/bracket-mismatch-error.ts:5](https://github.com/synthetic-borealis/hirnfick/blob/9d6c724/src/errors/bracket-mismatch-error.ts#L5)

## Properties

### message

• **message**: `string`

#### Inherited from

Error.message

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1041

___

### name

• **name**: `string`

#### Inherited from

Error.name

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1040

___

### stack

• `Optional` **stack**: `string`

#### Inherited from

Error.stack

#### Defined in

node_modules/typescript/lib/lib.es5.d.ts:1042

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: `Error`, `stackTraces`: `CallSite`[]) => `any`

#### Type declaration

▸ (`err`, `stackTraces`): `any`

Optional override for formatting stack traces

**`See`**

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

##### Parameters

| Name | Type |
| :------ | :------ |
| `err` | `Error` |
| `stackTraces` | `CallSite`[] |

##### Returns

`any`

#### Inherited from

Error.prepareStackTrace

#### Defined in

node_modules/@types/node/ts4.8/globals.d.ts:11

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: `number`

#### Inherited from

Error.stackTraceLimit

#### Defined in

node_modules/@types/node/ts4.8/globals.d.ts:13

## Methods

### captureStackTrace

▸ `Static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Create .stack property on a target object

#### Parameters

| Name | Type |
| :------ | :------ |
| `targetObject` | `object` |
| `constructorOpt?` | `Function` |

#### Returns

`void`

#### Inherited from

Error.captureStackTrace

#### Defined in

node_modules/@types/node/ts4.8/globals.d.ts:4
