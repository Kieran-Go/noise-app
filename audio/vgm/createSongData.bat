@echo off
setlocal enabledelayedexpansion

:: First delete songData.js
del songData.js 

:: Create the start of the SONG_DATA array
echo const SONG_DATA = [ >> songData.js

:: Loop through all files in the directory and add their names to the array
for %%F in (*.*) do (
    :: Exclude the batch file itself (createSongData.bat) and songData.js
    if "%%F" neq "createSongData.bat" if "%%F" neq "songData.js" (
        :: Append each filename to the array
        echo "%%F", >> songData.js
    )
)

:: Close the array on the last line
echo ] >> songData.js

echo songData.js created successfully
endlocal
