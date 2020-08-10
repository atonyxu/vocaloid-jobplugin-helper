# VOCALOID Job Plugin Helper
<center><img src="images/vcoding.png"></center>
<br>
<center><h1>VOCALOID插件编写助手</h1></center>
Version. 0.1.0 Preview
<br>
一款能够为VOCALOID Job Plugin插件编写提供辅助的VSCode插件
<br>

## 主要功能
1. 代码补全
2. 悬停提示
3. 常见操作模板代码
4. 快速在编辑器中打开API文档（在线）
5. 跳转定义（须在项目文件中增加所提供的doc文档）

## 使用/注意事项
* 跳转定义需将的`doc.zip`文件解压后，把`doc`文件夹放到你的项目根目录下
[doc.zip下载](https://raw.githubusercontent.com/Xujiayang12/vocaloid-jobplugin-helper/master/doc.zip)
* 在lua文件的编辑器右键就可以看到`打开VOCALOID Job Plugin文档`的选项
* 插件提供的文档是在Google上面找到的疑似机翻文档，但是总比日文版看的清楚就放进去了，目前也没有人翻译成中文。

## 提供的模板代码
* NoteEditTemplate(音符编辑模板)
```lua
VSSeekToBeginNote()
idx = 1
retCode, noteEx = VSGetNextNoteEx()
while (retCode == 1) do
    noteExList[idx] = noteEx
    retCode, noteEx = VSGetNextNoteEx()
    idx = idx + 1
end

noteCount = table.getn(noteExList)
if (noteCount == 0) then
    VSMessageBox('你需要选择一个音符', 0)
    return 0
end

for idx = 1, noteCount do
    local note = noteExList[idx]
    if (note.posTick >= beginPosTick and note.posTick + note.durTick <= endPosTick) then
    -- 选中区域的音符操作
    end
end
```

* ControlEditTemplate(参数编辑模板)
```lua
for posTick = beginPosTick, endPosTick do
    -- 在posTick位置编辑参数
end
```

* NewDialogTemplate(新建对话框模板)
```lua
VSDlgSetDialogTitle('title')

local dlgStatus
local field = {}

field.name = ''
field.caption = ''
field.initialVal = ''
field.type = 0
dlgStatus = VSDlgAddField(field)

-- 继续在此处添加对话框选项(模板代码)

dlgStatus = VSDlgDoModal()
if (dlgStatus == 2) then
    return 0
end
if ((dlgStatus ~= 1) and (dlgStatus ~= 2)) then
    return 1
end
```

* NewDialogFieldTemplate(新建对话框选项模板)
```lua
field.name = ''
field.caption = ''
field.initialVal = ''
field.type = 0
dlgStatus = VSDlgAddField(field)
```

* function manifest(插件描述模板)
```lua
function manifest()
    myManifest = {
        name = "JobPluginName",
        comment = "JobPluginDescription",
        author = "AuthorName",
        pluginID = "{RandomUUID}",
        pluginVersion = "1.0.0.1",
        apiVersion = "3.0.0.1",
    }
    return myManifest
end
```

* function main(插件主函数模板)
```lua
function main(processParam, envParam)
    local beginPosTick = processParam.beginPosTick
    local endPosTick = processParam.endPosTick
    local songPosTick = processParam.songPosTick

    local scriptDir = envParam.scriptDir
    local scriptName = envParam.scriptName
    local tempDir = envParam.tempDir

    -- statement
    return 0
end
```



## 开发人员
* [白糖の正义铃](https://space.bilibili.com/180668218)：V/SV调教师、初级混音师

## 唠嗑
* 有些API我不知道咋翻译只能凭着自己的理解去翻