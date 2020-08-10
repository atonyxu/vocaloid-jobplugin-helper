# Terms
## Naming conventions
Job plug-in script, you can access the language features of all the Lua language provides. Therefore, in order to be seen clearly and avoid collisions with these names and is a Job Plugin API, and then apply the following naming convention is the Job plugin API.

- Prefix of the API name
The Job plug-in API name, and give it the prefix "VS".
- Prefix of Lua table name
Also table name of Lua table, and give it the prefix "VS".
- Variable name
Variable name of the field name of the Lua table, begin with a letter in lower case.
## Data type
There is no data type is basically the Lua language.
However, in order to maintain the integrity of the data VOCALOID3 editor handles, define the following data types for the sake of convenience here, you can choose to the following description using these data types in this document.
- `VSInt32`
Is a 32-bit signed integer.
- `VSFloat`
Single-precision floating-point number.
- `VSBool`
Is a boolean value. When VS_TRUE (1) true, I take VS_FALSE (0) when false.
- `VSCString`
Is a constant string. Available character code is only UTF-8.
## How to define a table type
There is a data structure called a table type in Lua language.
On the Job plug-in API, I used to deal with structure of Musical part data (note information, etc.) table type.
This document describes using a pseudo-grammar structure similar definition of the C + + language as how to define a table type for the sake of convenience.
For example, the definition of the note event type is described as follows.

```c
// Note event type.
struct VSLuaNote {
    VSInt32 posTick; -- Notes ON time
    VSInt32 durTick; -- Notes Duration
    VSInt32 noteNum; -- Tone
    VSInt32 velocity; -- Velocity
    VSCString lyric; -- Lyrics
    VSCString phonemes; -- phonetic symbols (Separated by spaces)
};
```

And, I will treat the following as a Lua table in the Job plug-in script this.

```lua
-- Set of note events.
note = {} -- Generation of note table data.
note.posTick = 1920 -- Set of note ON time.
note. durTick = 480 -- Set of note Duration.
note.noteNum = 69 -- Setting the Tone.
note.velocity = 64 -- Set of velocity.
note.lyric = "spring" -- Set of lyrics.
note.phonemes = "s p r I N" -- Set of phonetic symbols.
```

## How to define prototype of the Job plug-in API
Prototype definition of the Job plug-in API also uses a pseudo-grammar of C + + language similarity.
For example, in the Lua language, you can function return multiple values. Purototai of such API
I proceed as follows: In this document, the definition of a flop.

```c
// I get an integer value that is input from the field of parameter input dialog.
// Parameters:
// fieldName: Field name in the dialog from which to retrieve.
// Returns:
// result: VS_TRUE when you have successfully retrieved, When VS_FALSE of error.
// value: Integer value that is input from the field of parameter input dialog.
VSBool result, VSInt32 value = VSDlgGetIntValue(VSCString fieldname);
```

The above API, which means that it is an API that takes a string argument of one, returns the return code of two 32-bit signed integer and Boolean type.
Use a real example of the Job plug-in script of this API is as follows.

```lua
-- I want to get the input value of the pitch of the note from the parameter input dialog.
result, noteNum = VSDlgGetIntValue("noteNum")
```

Get the input value of 32-bit signed integer type from a field named "noteNum" of parameter input dialog, this example is stored in the variable named noteNum its value. To a variable of Boolean type called result, this API has contains the results of whether or not successful at the same time.

## Character encoding

<Note type="warning">
Character encoding that can be used in the Job plug-in script is only UTF-8
</Note>
