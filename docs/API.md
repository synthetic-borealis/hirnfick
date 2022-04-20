## Classes

<dl>
<dt><a href="#BracketMismatchError">BracketMismatchError</a></dt>
<dd></dd>
<dt><a href="#WrongInputTypeError">WrongInputTypeError</a></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#transpileToC">transpileToC(source, indentSize, indentChar)</a> ⇒ <code>string</code></dt>
<dd><p>Converts a Brainfuck program to C.</p>
</dd>
<dt><a href="#transpileToCpp">transpileToCpp(source, useDynamicMemory, indentSize, indentChar)</a> ⇒ <code>string</code></dt>
<dd><p>Converts a Brainfuck program to C++.</p>
</dd>
<dt><a href="#transpileToJsCli">transpileToJsCli(source, useDynamicMemory, indentSize, indentChar)</a> ⇒ <code>string</code></dt>
<dd><p>Converts a Brainfuck program to JavaScript (CLI).</p>
</dd>
<dt><a href="#transpileToJsWeb">transpileToJsWeb(source, useDynamicMemory, funcName, indentSize, indentChar)</a> ⇒ <code>string</code></dt>
<dd><p>Converts a Brainfuck program to JavaScript (Web).</p>
</dd>
<dt><a href="#transpileToPascal">transpileToPascal(source, programName, indentSize, indentChar)</a> ⇒ <code>string</code></dt>
<dd><p>Converts a Brainfuck program to Pascal.</p>
</dd>
<dt><a href="#transpileToPython">transpileToPython(source, useDynamicMemory)</a> ⇒ <code>string</code></dt>
<dd><p>Converts a Brainfuck program to a Python.</p>
</dd>
<dt><a href="#transpileToQBasic">transpileToQBasic(source, useDynamicMemory, indentSize, indentChar)</a> ⇒ <code>string</code></dt>
<dd><p>Converts a Brainfuck program to QBasic.</p>
</dd>
<dt><a href="#transpileToUwu">transpileToUwu(source)</a> ⇒ <code>string</code></dt>
<dd><p>Converts a Brainfuck program to UwU.</p>
</dd>
<dt><a href="#isValidProgram">isValidProgram(source)</a> ⇒ <code>boolean</code></dt>
<dd><p>Validates a Brainfuck program by looking for umatched loop starts/ends.</p>
</dd>
</dl>

<a name="BracketMismatchError"></a>

## BracketMismatchError
**Kind**: global class  
<a name="new_BracketMismatchError_new"></a>

### new BracketMismatchError()
BracketMismatch Error constructor.

<a name="WrongInputTypeError"></a>

## WrongInputTypeError
**Kind**: global class  
<a name="new_WrongInputTypeError_new"></a>

### new WrongInputTypeError(message)
WrongInputType Error constructor.


| Param | Type |
| --- | --- |
| message | <code>string</code> | 

<a name="transpileToC"></a>

## transpileToC(source, indentSize, indentChar) ⇒ <code>string</code>
Converts a Brainfuck program to C.

**Kind**: global function  
**Returns**: <code>string</code> - Generated C code.  
**Throws**:

- [<code>WrongInputTypeError</code>](#WrongInputTypeError) Input must be a string.
- [<code>BracketMismatchError</code>](#BracketMismatchError) Loop starts must have matching loop ends and vice versa.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| source | <code>string</code> |  | Brainfuck source to convert. |
| indentSize | <code>number</code> | <code>1</code> | Indentation size. |
| indentChar | <code>string</code> | <code>&quot;\t&quot;</code> | Indentation character. |

<a name="transpileToCpp"></a>

## transpileToCpp(source, useDynamicMemory, indentSize, indentChar) ⇒ <code>string</code>
Converts a Brainfuck program to C++.

**Kind**: global function  
**Returns**: <code>string</code> - Generated C++ code.  
**Throws**:

- [<code>WrongInputTypeError</code>](#WrongInputTypeError) Input must be a string.
- [<code>BracketMismatchError</code>](#BracketMismatchError) Loop starts must have matching loop ends and vice versa.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| source | <code>string</code> |  | Brainfuck source to convert. |
| useDynamicMemory | <code>boolean</code> | <code>true</code> | Enable dynamic memory array. |
| indentSize | <code>number</code> | <code>1</code> | Indentation size. |
| indentChar | <code>string</code> | <code>&quot;\t&quot;</code> | Indentation character. |

<a name="transpileToJsCli"></a>

## transpileToJsCli(source, useDynamicMemory, indentSize, indentChar) ⇒ <code>string</code>
Converts a Brainfuck program to JavaScript (CLI).

**Kind**: global function  
**Returns**: <code>string</code> - Generated JavaScript code.  
**Throws**:

- [<code>WrongInputTypeError</code>](#WrongInputTypeError) Input must be a string.
- [<code>BracketMismatchError</code>](#BracketMismatchError) Loop starts must have matching loop ends and vice versa.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| source | <code>string</code> |  | Brainfuck source to convert. |
| useDynamicMemory | <code>boolean</code> | <code>true</code> | Enable dynamic memory array. |
| indentSize | <code>number</code> | <code>2</code> | Indentation size. |
| indentChar | <code>string</code> | <code>&quot; &quot;</code> | Indentation character. |

<a name="transpileToJsWeb"></a>

## transpileToJsWeb(source, useDynamicMemory, funcName, indentSize, indentChar) ⇒ <code>string</code>
Converts a Brainfuck program to JavaScript (Web).

**Kind**: global function  
**Returns**: <code>string</code> - Generated JavaScript function source.  
**Throws**:

- [<code>WrongInputTypeError</code>](#WrongInputTypeError) Input must be a string.
- [<code>BracketMismatchError</code>](#BracketMismatchError) Loop starts must have matching loop ends and vice versa.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| source | <code>string</code> |  | Brainfuck source to convert. |
| useDynamicMemory | <code>boolean</code> | <code>true</code> | Enable dynamic memory array. |
| funcName | <code>string</code> | <code>&quot;main&quot;</code> | Output function name. |
| indentSize | <code>number</code> | <code>2</code> | Indentation size. |
| indentChar | <code>string</code> | <code>&quot; &quot;</code> | Indentation character. |

<a name="transpileToPascal"></a>

## transpileToPascal(source, programName, indentSize, indentChar) ⇒ <code>string</code>
Converts a Brainfuck program to Pascal.

**Kind**: global function  
**Returns**: <code>string</code> - Generated Pascal code.  
**Throws**:

- [<code>WrongInputTypeError</code>](#WrongInputTypeError) Input must be a string.
- [<code>BracketMismatchError</code>](#BracketMismatchError) Loop starts must have matching loop ends and vice versa.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| source | <code>string</code> |  | Brainfuck source to convert. |
| programName | <code>string</code> | <code>&quot;Hirnfick&quot;</code> | Name of the generate program (i.e. program programName;). |
| indentSize | <code>number</code> | <code>2</code> | Indentation size. |
| indentChar | <code>string</code> | <code>&quot; &quot;</code> | Indentation character. |

<a name="transpileToPython"></a>

## transpileToPython(source, useDynamicMemory) ⇒ <code>string</code>
Converts a Brainfuck program to a Python.

**Kind**: global function  
**Returns**: <code>string</code> - Generated Python code.  
**Throws**:

- [<code>WrongInputTypeError</code>](#WrongInputTypeError) Input must be a string.
- [<code>BracketMismatchError</code>](#BracketMismatchError) Loop starts must have matching loop ends and vice versa.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| source | <code>string</code> |  | Brainfuck source to convert. |
| useDynamicMemory | <code>boolean</code> | <code>true</code> | Enable dynamic memory array. |

<a name="transpileToQBasic"></a>

## transpileToQBasic(source, useDynamicMemory, indentSize, indentChar) ⇒ <code>string</code>
Converts a Brainfuck program to QBasic.

**Kind**: global function  
**Returns**: <code>string</code> - Generated QBasic code.  
**Throws**:

- [<code>WrongInputTypeError</code>](#WrongInputTypeError) Input must be a string.
- [<code>BracketMismatchError</code>](#BracketMismatchError) Loop starts must have matching loop ends and vice versa.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| source | <code>string</code> |  | Brainfuck source to convert. |
| useDynamicMemory | <code>boolean</code> | <code>false</code> | Enable dynamic memory array. |
| indentSize | <code>number</code> | <code>2</code> | Indentation size. |
| indentChar | <code>string</code> | <code>&quot; &quot;</code> | Indentation character. |

<a name="transpileToUwu"></a>

## transpileToUwu(source) ⇒ <code>string</code>
Converts a Brainfuck program to UwU.

**Kind**: global function  
**Returns**: <code>string</code> - Generated UwU code.  
**Throws**:

- [<code>WrongInputTypeError</code>](#WrongInputTypeError) Input must be a string.
- [<code>BracketMismatchError</code>](#BracketMismatchError) Loop starts must have matching loop ends and vice versa.


| Param | Type | Description |
| --- | --- | --- |
| source | <code>string</code> | Brainfuck source to convert. |

<a name="isValidProgram"></a>

## isValidProgram(source) ⇒ <code>boolean</code>
Validates a Brainfuck program by looking for umatched loop starts/ends.

**Kind**: global function  
**Returns**: <code>boolean</code> - True if the program is valid, false if it's not.  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>string</code> | Brainfuck source-code to validate. |

