# Introduction
## About Job plug-ins
Job plugin provides a mechanism capable of the script written in (Ver. 5.1.4) programming language Lua, to expand freely according to the needs of the user from the outside, a Musical part editing VOCALOID3 Editor thing. And this mechanism is provided by the Job plug-in API.
Job plug-in API, which consists of providing Musical part information update function and access to the Musical Part information from Lua script, the set of functions. Incidentally, to be referred to as Job the plug-in script, and the script after Lua, written as Job plug in this document.

## Version
Version of the Job plug-in API that is described in this document is 3.0.1.0.

## What someone can and can not do in the Job plug-in API
### What you can do with Job plug-in API You can by using the Job plug-in API.
- Retrieve and update of basic properties of notes Musical Part
- Retrieve and update of facial control parameters of notes Musical Part
- Retrieve and update vibrato type of notes Musical Part
- Retrieve and update vibrato lengths notes Musical Part
- Retrieve and update the control parameters of the Musical Part
- Retrieve and update the properties of Musical Part
- Get of the tempo of the master track
- Get of the time signature of the master track
- Get the properties of the sequence
- Get properties of and WAV part

## It can not be in the Job plug-in API
Currently, we do not disclose the Job plug-in API to do the following.
- Retrieve and update vibrato control parameters of notes Musical Part
- Updating the tempo of the master track
- Updating the time signature of the master track
- Update the properties of a sequence
- Update the properties of a part WAV
- Retrieve and update the information other than those listed above

