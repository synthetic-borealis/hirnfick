hirnfick

# hirnfick

## Table of contents

### Classes

- [BracketMismatchError](classes/BracketMismatchError.md)

### Functions

- [compileToC](API.md#compiletoc)
- [compileToCpp](API.md#compiletocpp)
- [compileToJsBase](API.md#compiletojsbase)
- [compileToJsCli](API.md#compiletojscli)
- [compileToJsWeb](API.md#compiletojsweb)
- [compileToKotlin](API.md#compiletokotlin)
- [compileToPascal](API.md#compiletopascal)
- [compileToPython](API.md#compiletopython)
- [compileToQBasic](API.md#compiletoqbasic)
- [isValidProgram](API.md#isvalidprogram)

## Functions

### compileToC

▸ **compileToC**(`source`, `indentSize?`, `indentChar?`): `string`

Converts a Brainfuck program to C.

**`Throws`**

if mismatching brackets are detected.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `source` | `string` | `undefined` | Brainfuck source to convert. |
| `indentSize` | `number` | `4` | Indentation size. |
| `indentChar` | `string` | `' '` | Indentation character. |

#### Returns

`string`

Generated C code.

#### Defined in

[src/compilers/C.ts:14](https://github.com/synthetic-borealis/hirnfick.js/blob/8c6a9c1/src/compilers/C.ts#L14)

___

### compileToCpp

▸ **compileToCpp**(`source`, `useDynamicMemory?`, `indentSize?`, `indentChar?`): `string`

Converts a Brainfuck program to C++.

**`Throws`**

if mismatching brackets are detected.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `source` | `string` | `undefined` | Brainfuck source to convert. |
| `useDynamicMemory` | `boolean` | `true` | Enable dynamic memory array. |
| `indentSize` | `number` | `4` | Indentation size. |
| `indentChar` | `string` | `' '` | Indentation character. |

#### Returns

`string`

Generated C++ code.

#### Defined in

[src/compilers/CPP.ts:15](https://github.com/synthetic-borealis/hirnfick.js/blob/8c6a9c1/src/compilers/CPP.ts#L15)

___

### compileToJsBase

▸ **compileToJsBase**(`source`, `isMemoryDynamic`, `enableUserInput`, `indentSize`, `indentChar`): `Object`

Converts a Brainfuck program to JavaScript.

**`Description`**

This function is used by [compileToJsWeb](API.md#compiletojsweb) and [compileToJsCli](API.md#compiletojscli) to
generate their output. You can use it to write functions that generate output for other
JavaScript-based platforms.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | Brainfuck source to convert. |
| `isMemoryDynamic` | `boolean` | Enable dynamic memory array. |
| `enableUserInput` | `boolean` |  |
| `indentSize` | `number` | Indentation size. |
| `indentChar` | `string` | Indentation character. |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `declaration` | `string`[] |
| `definition` | `string`[] |

#### Defined in

[src/compilers/JavaScriptBase.ts:18](https://github.com/synthetic-borealis/hirnfick.js/blob/8c6a9c1/src/compilers/JavaScriptBase.ts#L18)

___

### compileToJsCli

▸ **compileToJsCli**(`source`, `isMemoryDynamic?`, `mainFunctionName?`, `indentSize?`, `indentChar?`): `string`

Converts a Brainfuck program to JavaScript (CLI).

**`Throws`**

if mismatching brackets are detected.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `source` | `string` | `undefined` | Brainfuck source to convert. |
| `isMemoryDynamic` | `boolean` | `true` | Enable dynamic memory array. |
| `mainFunctionName` | `string` | `'main'` | Main function name. |
| `indentSize` | `number` | `2` | Indentation size. |
| `indentChar` | `string` | `' '` | Indentation character. |

#### Returns

`string`

Generated JavaScript code.

#### Defined in

[src/compilers/JavaScriptCLI.ts:14](https://github.com/synthetic-borealis/hirnfick.js/blob/8c6a9c1/src/compilers/JavaScriptCLI.ts#L14)

___

### compileToJsWeb

▸ **compileToJsWeb**(`source`, `isMemoryDynamic?`, `mainFunctionName?`, `indentSize?`, `indentChar?`): `string`

Converts a Brainfuck program to JavaScript (Web).

**`Throws`**

if mismatching brackets are detected.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `source` | `string` | `undefined` | Brainfuck source to convert. |
| `isMemoryDynamic` | `boolean` | `true` | Enable dynamic memory array. |
| `mainFunctionName` | `string` | `'main'` | Output function name. |
| `indentSize` | `number` | `2` | Indentation size. |
| `indentChar` | `string` | `' '` | Indentation character. |

#### Returns

`string`

Generated JavaScript function source.

#### Defined in

[src/compilers/JavaScriptWeb.ts:14](https://github.com/synthetic-borealis/hirnfick.js/blob/8c6a9c1/src/compilers/JavaScriptWeb.ts#L14)

___

### compileToKotlin

▸ **compileToKotlin**(`source`, `useDynamicMemory?`, `indentSize?`, `indentChar?`): `string`

Converts a Brainfuck program to Kotlin.

**`Throws`**

if mismatching brackets are detected.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `source` | `string` | `undefined` | Brainfuck source to convert. |
| `useDynamicMemory` | `boolean` | `true` | Enable dynamic memory array. |
| `indentSize` | `number` | `4` | Indentation size. |
| `indentChar` | `string` | `' '` | Indentation character. |

#### Returns

`string`

Generated Kotlin code.

#### Defined in

[src/compilers/Kotlin.ts:15](https://github.com/synthetic-borealis/hirnfick.js/blob/8c6a9c1/src/compilers/Kotlin.ts#L15)

___

### compileToPascal

▸ **compileToPascal**(`source`, `programName?`, `indentSize?`, `indentChar?`): `string`

Converts a Brainfuck program to Pascal.

**`Throws`**

if mismatching brackets are detected.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `source` | `string` | `undefined` | Brainfuck source to convert. |
| `programName` | `string` | `'Hirnfick'` | Name of the generate program (i.e. 'program programName;'). |
| `indentSize` | `number` | `2` | Indentation size. |
| `indentChar` | `string` | `' '` | Indentation character. |

#### Returns

`string`

Generated Pascal code.

#### Defined in

[src/compilers/Pascal.ts:15](https://github.com/synthetic-borealis/hirnfick.js/blob/8c6a9c1/src/compilers/Pascal.ts#L15)

___

### compileToPython

▸ **compileToPython**(`source`, `useDynamicMemory?`): `string`

Converts a Brainfuck program to a Python.

**`Throws`**

if mismatching brackets are detected.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `source` | `string` | `undefined` | Brainfuck source to convert. |
| `useDynamicMemory` | `boolean` | `true` | Enable dynamic memory array. |

#### Returns

`string`

Generated Python code.

#### Defined in

[src/compilers/Python.ts:13](https://github.com/synthetic-borealis/hirnfick.js/blob/8c6a9c1/src/compilers/Python.ts#L13)

___

### compileToQBasic

▸ **compileToQBasic**(`source`, `useDynamicMemory?`, `indentSize?`, `indentChar?`): `string`

Converts a Brainfuck program to QBasic.

**`Throws`**

if mismatching brackets are detected.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `source` | `string` | `undefined` | Brainfuck source to convert. |
| `useDynamicMemory` | `boolean` | `false` | Enable dynamic memory array. |
| `indentSize` | `number` | `2` | Indentation size. |
| `indentChar` | `string` | `' '` | Indentation character. |

#### Returns

`string`

Generated QBasic code.

#### Defined in

[src/compilers/QBasic.ts:15](https://github.com/synthetic-borealis/hirnfick.js/blob/8c6a9c1/src/compilers/QBasic.ts#L15)

___

### isValidProgram

▸ **isValidProgram**(`source`): `boolean`

Validates a Brainfuck program by looking for unmatched loop starts/ends.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | Brainfuck source-code to validate. |

#### Returns

`boolean`

True if the program is valid, false if it's not.

#### Defined in

[src/utils/isValidProgram.ts:7](https://github.com/synthetic-borealis/hirnfick.js/blob/8c6a9c1/src/utils/isValidProgram.ts#L7)
