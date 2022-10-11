hirnfick

# hirnfick

## Table of contents

### Classes

- [BracketMismatchError](classes/BracketMismatchError.md)

### Code Cleanup Functions

- [cleanCode](API.md#cleancode)

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

### Other Functions

- [hasInfiniteLoops](API.md#hasinfiniteloops)

### Syntax Checking Functions

- [hasMismatchingLoopBoundaries](API.md#hasmismatchingloopboundaries)

### Utility Functions

- [genIndent](API.md#genindent)

## Code Cleanup Functions

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

[src/utils/clean-code.ts:19](https://github.com/synthetic-borealis/hirnfick/blob/d2814c0/src/utils/clean-code.ts#L19)

___

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

[src/compilers/c.ts:15](https://github.com/synthetic-borealis/hirnfick/blob/d2814c0/src/compilers/c.ts#L15)

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

[src/compilers/cpp.ts:16](https://github.com/synthetic-borealis/hirnfick/blob/d2814c0/src/compilers/cpp.ts#L16)

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

[src/compilers/javascript-base.ts:20](https://github.com/synthetic-borealis/hirnfick/blob/d2814c0/src/compilers/javascript-base.ts#L20)

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

[src/compilers/javascript-deno.ts:15](https://github.com/synthetic-borealis/hirnfick/blob/d2814c0/src/compilers/javascript-deno.ts#L15)

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

[src/compilers/javascript-node.ts:15](https://github.com/synthetic-borealis/hirnfick/blob/d2814c0/src/compilers/javascript-node.ts#L15)

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

[src/compilers/javascript-web.ts:15](https://github.com/synthetic-borealis/hirnfick/blob/d2814c0/src/compilers/javascript-web.ts#L15)

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

[src/compilers/pascal.ts:16](https://github.com/synthetic-borealis/hirnfick/blob/d2814c0/src/compilers/pascal.ts#L16)

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

[src/compilers/python.ts:14](https://github.com/synthetic-borealis/hirnfick/blob/d2814c0/src/compilers/python.ts#L14)

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

[src/compilers/qbasic.ts:16](https://github.com/synthetic-borealis/hirnfick/blob/d2814c0/src/compilers/qbasic.ts#L16)

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

[src/compilers/rust.ts:15](https://github.com/synthetic-borealis/hirnfick/blob/d2814c0/src/compilers/rust.ts#L15)

___

## Other Functions

### hasInfiniteLoops

▸ **hasInfiniteLoops**(`source`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | `string` |

#### Returns

`boolean`

#### Defined in

[src/utils/syntax-checking.ts:23](https://github.com/synthetic-borealis/hirnfick/blob/d2814c0/src/utils/syntax-checking.ts#L23)

___

## Syntax Checking Functions

### hasMismatchingLoopBoundaries

▸ **hasMismatchingLoopBoundaries**(`source`): `boolean`

Checks whether a program contains mismatching loop boundaries.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `source` | `string` | Brainfuck source-code to validate. |

#### Returns

`boolean`

True if the program is valid, false if it's not.

#### Defined in

[src/utils/syntax-checking.ts:7](https://github.com/synthetic-borealis/hirnfick/blob/d2814c0/src/utils/syntax-checking.ts#L7)

___

## Utility Functions

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

[src/utils/gen-indent.ts:9](https://github.com/synthetic-borealis/hirnfick/blob/d2814c0/src/utils/gen-indent.ts#L9)
