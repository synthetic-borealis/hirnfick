hirnfick

# hirnfick

## Table of contents

### References

- [compileToJsCli](API.md#compiletojscli)

### Classes

- [BracketMismatchError](classes/BracketMismatchError.md)

### Compilation Functions

- [compileToC](API.md#compiletoc)
- [compileToCpp](API.md#compiletocpp)
- [compileToJsBase](API.md#compiletojsbase)
- [compileToJsDeno](API.md#compiletojsdeno)
- [compileToJsNode](API.md#compiletojsnode)
- [compileToJsWeb](API.md#compiletojsweb)
- [compileToKotlin](API.md#compiletokotlin)
- [compileToPascal](API.md#compiletopascal)
- [compileToPython](API.md#compiletopython)
- [compileToQBasic](API.md#compiletoqbasic)
- [compileToRust](API.md#compiletorust)

### Validation Functions

- [isValidProgram](API.md#isvalidprogram)

## References

### compileToJsCli

Renames and re-exports [compileToJsNode](API.md#compiletojsnode)

## Compilation Functions

### compileToC

▸ **compileToC**(`source`, `indentSize?`, `indentChar?`): `string`

Converts a Brainfuck program to C.

**`Throws`**

[BracketMismatchError](classes/BracketMismatchError.md) if mismatching brackets are detected.

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

[src/compilers/C.ts:15](https://github.com/synthetic-borealis/hirnfick/blob/f43e223/src/compilers/C.ts#L15)

___

### compileToCpp

▸ **compileToCpp**(`source`, `isMemoryDynamic?`, `indentSize?`, `indentChar?`): `string`

Converts a Brainfuck program to C++.

**`Throws`**

[BracketMismatchError](classes/BracketMismatchError.md) if mismatching brackets are detected.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `source` | `string` | `undefined` | Brainfuck source to convert. |
| `isMemoryDynamic` | `boolean` | `true` | Enable dynamic memory array. |
| `indentSize` | `number` | `4` | Indentation size. |
| `indentChar` | `string` | `' '` | Indentation character. |

#### Returns

`string`

Generated C++ code.

#### Defined in

[src/compilers/CPP.ts:16](https://github.com/synthetic-borealis/hirnfick/blob/f43e223/src/compilers/CPP.ts#L16)

___

### compileToJsBase

▸ **compileToJsBase**(`source`, `isMemoryDynamic`, `enableUserInput`, `indentSize`, `indentChar`): `Object`

Converts a Brainfuck program to JavaScript.

**`Description`**

This function is used by [compileToJsWeb](API.md#compiletojsweb) and [compileToJsCli](API.md#compiletojscli) to
generate their output. You can use it to write functions that generate output for other
JavaScript-based platforms.

**`Throws`**

[BracketMismatchError](classes/BracketMismatchError.md) if mismatching brackets are detected.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | Brainfuck source to convert. |
| `isMemoryDynamic` | `boolean` | Enable dynamic memory array. |
| `enableUserInput` | `boolean` | Enable user input handling. |
| `indentSize` | `number` | Indentation size. |
| `indentChar` | `string` | Indentation character. |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `declaration` | `string`[] |
| `definition` | `string`[] |

#### Defined in

[src/compilers/JavaScriptBase.ts:20](https://github.com/synthetic-borealis/hirnfick/blob/f43e223/src/compilers/JavaScriptBase.ts#L20)

___

### compileToJsDeno

▸ **compileToJsDeno**(`source`, `isMemoryDynamic?`, `mainFunctionName?`, `indentSize?`, `indentChar?`): `string`

Converts a Brainfuck program to JavaScript (Deno).

**`Throws`**

[BracketMismatchError](classes/BracketMismatchError.md) if mismatching brackets are detected.

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

[src/compilers/JavaScriptDeno.ts:15](https://github.com/synthetic-borealis/hirnfick/blob/f43e223/src/compilers/JavaScriptDeno.ts#L15)

___

### compileToJsNode

▸ **compileToJsNode**(`source`, `isMemoryDynamic?`, `mainFunctionName?`, `indentSize?`, `indentChar?`): `string`

Converts a Brainfuck program to JavaScript (Node.js).

**`Throws`**

[BracketMismatchError](classes/BracketMismatchError.md) if mismatching brackets are detected.

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

[src/compilers/JavaScriptNode.ts:15](https://github.com/synthetic-borealis/hirnfick/blob/f43e223/src/compilers/JavaScriptNode.ts#L15)

___

### compileToJsWeb

▸ **compileToJsWeb**(`source`, `isMemoryDynamic?`, `mainFunctionName?`, `indentSize?`, `indentChar?`): `string`

Converts a Brainfuck program to JavaScript (Web).

**`Throws`**

[BracketMismatchError](classes/BracketMismatchError.md) if mismatching brackets are detected.

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

[src/compilers/JavaScriptWeb.ts:15](https://github.com/synthetic-borealis/hirnfick/blob/f43e223/src/compilers/JavaScriptWeb.ts#L15)

___

### compileToKotlin

▸ **compileToKotlin**(`source`, `isMemoryDynamic?`, `indentSize?`, `indentChar?`): `string`

Converts a Brainfuck program to Kotlin.

**`Throws`**

[BracketMismatchError](classes/BracketMismatchError.md) if mismatching brackets are detected.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `source` | `string` | `undefined` | Brainfuck source to convert. |
| `isMemoryDynamic` | `boolean` | `true` | Enable dynamic memory array. |
| `indentSize` | `number` | `4` | Indentation size. |
| `indentChar` | `string` | `' '` | Indentation character. |

#### Returns

`string`

Generated Kotlin code.

#### Defined in

[src/compilers/Kotlin.ts:16](https://github.com/synthetic-borealis/hirnfick/blob/f43e223/src/compilers/Kotlin.ts#L16)

___

### compileToPascal

▸ **compileToPascal**(`source`, `programName?`, `indentSize?`, `indentChar?`): `string`

Converts a Brainfuck program to Pascal.

**`Throws`**

[BracketMismatchError](classes/BracketMismatchError.md) if mismatching brackets are detected.

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

[src/compilers/Pascal.ts:16](https://github.com/synthetic-borealis/hirnfick/blob/f43e223/src/compilers/Pascal.ts#L16)

___

### compileToPython

▸ **compileToPython**(`source`, `isMemoryDynamic?`): `string`

Converts a Brainfuck program to a Python.

**`Throws`**

[BracketMismatchError](classes/BracketMismatchError.md) if mismatching brackets are detected.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `source` | `string` | `undefined` | Brainfuck source to convert. |
| `isMemoryDynamic` | `boolean` | `true` | Enable dynamic memory array. |

#### Returns

`string`

Generated Python code.

#### Defined in

[src/compilers/Python.ts:14](https://github.com/synthetic-borealis/hirnfick/blob/f43e223/src/compilers/Python.ts#L14)

___

### compileToQBasic

▸ **compileToQBasic**(`source`, `isMemoryDynamic?`, `indentSize?`, `indentChar?`): `string`

Converts a Brainfuck program to QBasic.

**`Throws`**

[BracketMismatchError](classes/BracketMismatchError.md) if mismatching brackets are detected.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `source` | `string` | `undefined` | Brainfuck source to convert. |
| `isMemoryDynamic` | `boolean` | `false` | Enable dynamic memory array. |
| `indentSize` | `number` | `2` | Indentation size. |
| `indentChar` | `string` | `' '` | Indentation character. |

#### Returns

`string`

Generated QBasic code.

#### Defined in

[src/compilers/QBasic.ts:16](https://github.com/synthetic-borealis/hirnfick/blob/f43e223/src/compilers/QBasic.ts#L16)

___

### compileToRust

▸ **compileToRust**(`source`, `indentSize?`, `indentChar?`): `string`

Converts a Brainfuck program to Rust.

**`Throws`**

[BracketMismatchError](classes/BracketMismatchError.md) if mismatching brackets are detected.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `source` | `string` | `undefined` | Brainfuck source to convert. |
| `indentSize` | `number` | `4` | Indentation size. |
| `indentChar` | `string` | `' '` | Indentation character. |

#### Returns

`string`

Generated Rust code.

#### Defined in

[src/compilers/Rust.ts:15](https://github.com/synthetic-borealis/hirnfick/blob/f43e223/src/compilers/Rust.ts#L15)

___

## Validation Functions

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

[src/utils/isValidProgram.ts:7](https://github.com/synthetic-borealis/hirnfick/blob/f43e223/src/utils/isValidProgram.ts#L7)
