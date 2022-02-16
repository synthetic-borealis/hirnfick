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
<dt><a href="#transpileToCpp">transpileToCpp(source, indentSize, indentChar)</a> ⇒ <code>string</code></dt>
<dd><p>Converts a Brainfuck program to C++.</p>
</dd>
<dt><a href="#transpileToJavaScript">transpileToJavaScript(source, funcName, indentSize, indentChar)</a> ⇒ <code>string</code></dt>
<dd><p>Converts a Brainfuck program to a JavaScript function.</p>
</dd>
<dt><a href="#transpileToPascal">transpileToPascal(source, programName, indentSize, indentChar)</a> ⇒ <code>string</code></dt>
<dd><p>Converts a Brainfuck program to Pascal.</p>
</dd>
<dt><a href="#transpileToPython">transpileToPython(source)</a> ⇒ <code>string</code></dt>
<dd><p>Converts a Brainfuck program to a Python.</p>
</dd>
<dt><a href="#transpileToQBasicDynamic">transpileToQBasicDynamic(source, indentSize, indentChar)</a> ⇒ <code>string</code></dt>
<dd><p>Converts a Brainfuck program to QBasic (dynamic cells array).</p>
</dd>
<dt><a href="#transpileToQBasicFixed">transpileToQBasicFixed(source, indentSize, indentChar)</a> ⇒ <code>string</code></dt>
<dd><p>Converts a Brainfuck program to QBasic (fixed cells array).</p>
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

- [<code>WrongInputTypeError</code>](#WrongInputTypeError) Input must be a string or an array of strings.
- [<code>BracketMismatchError</code>](#BracketMismatchError) Loop starts must have matching loop ends and vice versa.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| source | <code>string</code> \| <code>Array.&lt;string&gt;</code> |  | Brainfuck source to convert. |
| indentSize | <code>number</code> | <code>1</code> | Indentation size (default = 1). |
| indentChar | <code>string</code> | <code>&quot;\t&quot;</code> | Indentation character (default is tab). |

<a name="transpileToCpp"></a>

## transpileToCpp(source, indentSize, indentChar) ⇒ <code>string</code>
Converts a Brainfuck program to C++.

**Kind**: global function  
**Returns**: <code>string</code> - Generated C++ code.  
**Throws**:

- [<code>WrongInputTypeError</code>](#WrongInputTypeError) Input must be a string or an array of strings.
- [<code>BracketMismatchError</code>](#BracketMismatchError) Loop starts must have matching loop ends and vice versa.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| source | <code>string</code> \| <code>Array.&lt;string&gt;</code> |  | Brainfuck source to convert. |
| indentSize | <code>number</code> | <code>1</code> | Indentation size (default = 1). |
| indentChar | <code>string</code> | <code>&quot;\t&quot;</code> | Indentation character (default is tab). |

<a name="transpileToJavaScript"></a>

## transpileToJavaScript(source, funcName, indentSize, indentChar) ⇒ <code>string</code>
Converts a Brainfuck program to a JavaScript function.

**Kind**: global function  
**Returns**: <code>string</code> - Generated JavaScript function source.  
**Throws**:

- [<code>WrongInputTypeError</code>](#WrongInputTypeError) Input must be a string or an array of strings.
- [<code>BracketMismatchError</code>](#BracketMismatchError) Loop starts must have matching loop ends and vice versa.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| source | <code>string</code> \| <code>Array.&lt;string&gt;</code> |  | Brainfuck source to convert. |
| funcName | <code>string</code> | <code>&quot;run&quot;</code> | Output function name (default = 'run'). |
| indentSize | <code>number</code> | <code>2</code> | Indentation size (default = 2). |
| indentChar | <code>string</code> | <code>&quot; &quot;</code> | Indentation character (default is space). |

<a name="transpileToPascal"></a>

## transpileToPascal(source, programName, indentSize, indentChar) ⇒ <code>string</code>
Converts a Brainfuck program to Pascal.

**Kind**: global function  
**Returns**: <code>string</code> - Generated Pascal code.  
**Throws**:

- [<code>WrongInputTypeError</code>](#WrongInputTypeError) Input must be a string or an array of strings.
- [<code>BracketMismatchError</code>](#BracketMismatchError) Loop starts must have matching loop ends and vice versa.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| source | <code>string</code> \| <code>Array.&lt;string&gt;</code> |  | Brainfuck source to convert. |
| programName | <code>string</code> | <code>&quot;Hirnfick&quot;</code> | Name of the generate program (i.e. program programName;). |
| indentSize | <code>number</code> | <code>2</code> | Indentation size (default = 2). |
| indentChar | <code>string</code> | <code>&quot; &quot;</code> | Indentation character (default is space). |

<a name="transpileToPython"></a>

## transpileToPython(source) ⇒ <code>string</code>
Converts a Brainfuck program to a Python.

**Kind**: global function  
**Returns**: <code>string</code> - Generated Python code.  
**Throws**:

- [<code>WrongInputTypeError</code>](#WrongInputTypeError) Input must be a string or an array of strings.
- [<code>BracketMismatchError</code>](#BracketMismatchError) Loop starts must have matching loop ends and vice versa.


| Param | Type | Description |
| --- | --- | --- |
| source | <code>string</code> \| <code>Array.&lt;string&gt;</code> | Brainfuck source to convert. |

<a name="transpileToQBasicDynamic"></a>

## transpileToQBasicDynamic(source, indentSize, indentChar) ⇒ <code>string</code>
Converts a Brainfuck program to QBasic (dynamic cells array).

**Kind**: global function  
**Returns**: <code>string</code> - Generated QBasic code.  
**Throws**:

- [<code>WrongInputTypeError</code>](#WrongInputTypeError) Input must be a string or an array of strings.
- [<code>BracketMismatchError</code>](#BracketMismatchError) Loop starts must have matching loop ends and vice versa.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| source | <code>string</code> \| <code>Array.&lt;string&gt;</code> |  | Brainfuck source to convert. |
| indentSize | <code>number</code> | <code>2</code> | Indentation size (default = 1). |
| indentChar | <code>string</code> | <code>&quot; &quot;</code> | Indentation character (default is space). |

<a name="transpileToQBasicFixed"></a>

## transpileToQBasicFixed(source, indentSize, indentChar) ⇒ <code>string</code>
Converts a Brainfuck program to QBasic (fixed cells array).

**Kind**: global function  
**Returns**: <code>string</code> - Generated QBasic code.  
**Throws**:

- [<code>WrongInputTypeError</code>](#WrongInputTypeError) Input must be a string or an array of strings.
- [<code>BracketMismatchError</code>](#BracketMismatchError) Loop starts must have matching loop ends and vice versa.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| source | <code>string</code> \| <code>Array.&lt;string&gt;</code> |  | Brainfuck source to convert. |
| indentSize | <code>number</code> | <code>2</code> | Indentation size (default = 1). |
| indentChar | <code>string</code> | <code>&quot; &quot;</code> | Indentation character (default is space). |

<a name="transpileToUwu"></a>

## transpileToUwu(source) ⇒ <code>string</code>
Converts a Brainfuck program to UwU.

**Kind**: global function  
**Returns**: <code>string</code> - Generated UwU code.  
**Throws**:

- [<code>WrongInputTypeError</code>](#WrongInputTypeError) Input must be a string or an array of strings.
- [<code>BracketMismatchError</code>](#BracketMismatchError) Loop starts must have matching loop ends and vice versa.


| Param | Type | Description |
| --- | --- | --- |
| source | <code>string</code> \| <code>Array.&lt;string&gt;</code> | Brainfuck source to convert. |

<a name="isValidProgram"></a>

## isValidProgram(source) ⇒ <code>boolean</code>
Validates a Brainfuck program by looking for umatched loop starts/ends.

**Kind**: global function  
**Returns**: <code>boolean</code> - True if the program is valid, false if it's not.  

| Param | Type | Description |
| --- | --- | --- |
| source | <code>string</code> \| <code>Array.&lt;string&gt;</code> | Brainfuck source-code to validate. |

