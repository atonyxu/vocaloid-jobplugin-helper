# Structure of Job plug-in scripts
## Syntax
Job plug-in script, conforms to the Syntax of language Lua. Also, I can access the language features of all the Lua language provides.
Remarks about the Syntax of Lua language will be beyond the scope of this document. Please refer to the manual of the commercial and official WEB page of the Lua language.

## Entry point function
Job plug-in script must have a function named "main" always. This function will be used as the entry point of the Job plug-in script. In addition, the end of this function is the end of the entire Job plug-in.
 
## Parameter list
"main" function has two parameters.

Is a table type variable that contains the time of the current song position of the target Musical part, and time of the start and end points selected by the user in the editor, the first parameter is given from VOCALOID3 editor. The unit is Tick which is 0 for the first part of Musical both. Your name and if you run the Job plug-in user can not select anything, the beginning of the part (0), the starting point will be at the end of the end time events that Part will end.
The Job plug-in, you will be able to perform the process of updating the data to take into account the range of time and end this starting point. In addition, the Get range of the data is the Musical part whole, because it does not limit the VOCALOID3 editor side also updatable range, it is also possible to perform the update is more than the above range. However, updating of data significantly above this range are possible results when different from the intention of the user who performed this. Therefore, the update of in excess of this range, you must make the implementation of consideration to fit within reasonable limits, for example, is acceptable as a margin of fade-in / fade-out, etc…
On the other hand, if you want to use like any this parameter, certain degree of freedom is allowed and depending on the processing of the Job each plugin. For example, I will consider using the following method.

- For a plug-in to delete the specified section (Example： DeleteSelection.lua)
The time deleting section all events to define a deletion interval interval time of a start point and an end point selected by the user VOCALOID3 editor, delete all events that are present in the section, is present at the time of the section after I shifted forward only.
The Job plugin to the specifications of the above, data is updated beyond the period of a start point and an end point selected by the user, but if indicated to the user that specification, it is possible to create a Job such plugins I can be thought of as no problem.
- If the Job plug-in to change the lyrics of notes specified time after
In this case, it could also be implemented as a Job plug-in specification is not used and time of start and end points selected by the user in the VOCALOID3 editor, is to change the lyrics note from the time of the song position.
Also in this case, it is likely that if you specify to the user specification, and there is no problem that you want to create a Job such plug-ins.
The second parameter is a table type variable that contains information about the operating environment of the Job plug-in, the following information is included.
- Path to the directory where the source code for the Job plug-in is invoked is disposed
The full path to the Job plug-in script files that are marked with delimiter "\" at the end. In addition, this path is the current directory of Job plug-in runtime.
- Source file name Job plug was started
It is only Job plug-in script file name with the extension, it is not a full path。
- The path of the temporary directory Job plug-in is available
It is the full path marked with delimiter "\" at the end. Job plug-ins, you can create a temporary directory and temporary files freely under this directory.
- Version of current Job plug-in API
Is represented sets of four integer separated by ".", the version of current Job plug-in API. It should be noted that the Get of the above parameters other than the Job plug-in run-time, I will do through the Job plug-in API.

## Return code
"main" function must return a return code of exactly one. Return code is shown below.

- It returns 0 if you want to apply to the Musical part updates from the script to terminate normally.
- Returns a non-zero value if you want to cancel the update from the script or error. There is no agreement about the value of the return code in the case of non-zero.

You can decide freely to the Job each plug-in. However, it is not possible to control the behavior of the editor VOCALOID3 side by the value.

## Example Code
I shows a sample entry point function of the simplest Job plug-in script below, do nothing. 
```lua
function main(processParam, envParam)

    -- Get of the parameters passed to the runtime.
    beginPosTick = processParam.beginPosTick -- Start time of the selection.
    endPosTick = processParam.endPosTick -- End time of the selection.
    songPosTick = processParam.songPosTick -- Current song position time.


    -- I get the execution environment parameters passed at run time.
    scriptDir = envParam.scriptDir -- Directory path where the script is located.
    scriptName = envParam.scriptName -- File name of the script.
    tempDir = envParam.tempDir -- Temporary directory path Job plug-in is available.
    apiVersion = envParam.apiVersion -- Version of the Job plug-in API of current.
    
    -- I do so now following the processing of the Job plug-in.
    -- Successful completion.
    return 0
end

```

## Job plug-in manifest function
### The information provided
to VOCALOID3 editor plug-in from the Job script side, or a thing what the Job plug-in, "manifest" function is a function to provide the information producer, version, etc.. Same function, "main" Job plug-in script, it must be equipped with all means this function.
This value function should return is as follows. Both can not be omitted.

1. The name of the plug-in Job
2. Comment describing the Job or plug-ins do anything
3. Maker's name
4. ID that uniquely identifies the Job plug-in (GUID)
5. version of the Job plug-in (Version of the assembled four it has been joined with a dot)
6. Version of the Job plug-in API to use ("3.0.1.0" at the moment)

In addition, ID that uniquely identifies the Job plug-in the above (GUID), please be generated using the guidgen.exe etc. that comes with the Microsoft Windows SDK. In this case, I want to registry format the format of the GUID to be generated.
### Example Code
Below, I shows a sample plug-in manifest function of the Job plug-in script.

```lua
function manifest()
    myManifest = {
        name = " God Torture plug-in", -- The name of the Job plug-in
        comment = " And God Torture", -- Comment describing the Job plug-ins or do anything
        author = "Plug-in craftsman ", -- Maker's name
        pluginID = "{AE31E35D-2FD4-4608-8D67-C2B45353192A}", -- Job plug-in ID
        pluginVersion = "1.0.0.1", -- Version of the Job plug-in
        apiVersion = "3.0.0.1" -- Version of the Job plug-in API to be used
    }
    return myManifest
end
```