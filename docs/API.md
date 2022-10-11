hirnfick

# hirnfick

## Table of contents

### Classes

- [BracketMismatchError](classes/BracketMismatchError.md)

### Compilation Functions

- [compileToC](API.md#compiletoc)
- [compileToCpp](API.md#compiletocpp)
- [compileToJsBase](API.md#compiletojsbase)
- [compileToJsDeno](API.md#compiletojsdeno)
- [compileToJsNode](API.md#compiletojsnode)
- [compileToJsWeb](API.md#compiletojsweb)
- [compileToPascal](API.md#compiletopascal)
- [compileToPython](API.md#compiletopython)
- [compileToQBasic](API.md#compiletoqbasic)
- [compileToRust](API.md#compiletorust)

### Syntax Checking Functions

- [hasInfiniteLoops](API.md#hasinfiniteloops)
- [hasMismatchingLoopBoundaries](API.md#hasmismatchingloopboundaries)

### Utility Functions

- [cleanCode](API.md#cleancode)
- [genIndent](API.md#genindent)

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

[src/compilers/c.ts:14](https://github.com/synthetic-borealis/hirnfick/blob/742efe0/src/compilers/c.ts#L14)

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

[src/compilers/cpp.ts:15](https://github.com/synthetic-borealis/hirnfick/blob/742efe0/src/compilers/cpp.ts#L15)

___

### compileToJsBase

▸ **compileToJsBase**(`source`, `isMemoryDynamic`, `enableUserInput`, `indentSize`, `indentChar`): `Object`

Converts a Brainfuck program to JavaScript.

**`Description`**

This function is used by [compileToJsWeb](API.md#compiletojsweb), [compileToJsNode](API.md#compiletojsnode)
and [compileToJsDeno](API.md#compiletojsdeno) to generate their output. You can use it to write functions
that generate output for other JavaScript-based platforms.

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

[src/compilers/javascript-base.ts:19](https://github.com/synthetic-borealis/hirnfick/blob/742efe0/src/compilers/javascript-base.ts#L19)

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

[src/compilers/javascript-deno.ts:15](https://github.com/synthetic-borealis/hirnfick/blob/742efe0/src/compilers/javascript-deno.ts#L15)

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

[src/compilers/javascript-node.ts:15](https://github.com/synthetic-borealis/hirnfick/blob/742efe0/src/compilers/javascript-node.ts#L15)

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

[src/compilers/javascript-web.ts:15](https://github.com/synthetic-borealis/hirnfick/blob/742efe0/src/compilers/javascript-web.ts#L15)

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

[src/compilers/pascal.ts:15](https://github.com/synthetic-borealis/hirnfick/blob/742efe0/src/compilers/pascal.ts#L15)

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

[src/compilers/python.ts:13](https://github.com/synthetic-borealis/hirnfick/blob/742efe0/src/compilers/python.ts#L13)

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

[src/compilers/qbasic.ts:15](https://github.com/synthetic-borealis/hirnfick/blob/742efe0/src/compilers/qbasic.ts#L15)

___

### compileToRust

▸ **compileToRust**(`source`, `isMemoryDynamic?`, `indentSize?`, `indentChar?`): `string`

Converts a Brainfuck program to Rust.

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

Generated Rust code.

#### Defined in

[src/compilers/rust.ts:15](https://github.com/synthetic-borealis/hirnfick/blob/742efe0/src/compilers/rust.ts#L15)

___

## Syntax Checking Functions

### hasInfiniteLoops

▸ **hasInfiniteLoops**(`source`): `boolean`

Checks whether a program contains infinite loops.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | Brainfuck source to check. |

#### Returns

`boolean`

True if the program is contains an infinite loop, false if it doesn't.

#### Defined in

[src/utils/syntax-checking.ts:30](https://github.com/synthetic-borealis/hirnfick/blob/742efe0/src/utils/syntax-checking.ts#L30)

___

### hasMismatchingLoopBoundaries

▸ **hasMismatchingLoopBoundaries**(`source`): `boolean`

Checks whether a program contains mismatching loop boundaries.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | Brainfuck source to check. |

#### Returns

`boolean`

True if the program contains mismatching loop boundaries,
false if it doesn't.

#### Defined in

[src/utils/syntax-checking.ts:8](https://github.com/synthetic-borealis/hirnfick/blob/742efe0/src/utils/syntax-checking.ts#L8)

___

## Utility Functions

### cleanCode

▸ **cleanCode**(`source`): `string`

Strips comments from Brainfuck source and then cleans the code from
anything that's not a Brainfuck command.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | Brainfuck code to clean up. |

#### Returns

`string`

Cleaned up Brainfuck code.

#### Defined in

[src/utils/utils.ts:19](https://github.com/synthetic-borealis/hirnfick/blob/742efe0/src/utils/utils.ts#L19)

___

### genIndent

▸ **genIndent**(`depth`, `size`, `char`): `string`

Generates an indentation string.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `depth` | `number` | Indentation depth. |
| `size` | `number` | Indentation size. |
| `char` | `string` | Indentation character. |

#### Returns

`string`

#### Defined in

[src/utils/utils.ts:31](https://github.com/synthetic-borealis/hirnfick/blob/742efe0/src/utils/utils.ts#L31)
