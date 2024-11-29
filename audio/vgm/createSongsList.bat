@echo off
setlocal enabledelayedexpansion

:: Delete the songs.txt file first
del songs.txt

:: Loop through all songs in the directory
for %%F in (*.*) do (
    :: Exclude this file from the list
    if "%%F" neq "createSongsList.bat" (
        echo %%F >> songs.txt
    )
)

echo songs.txt created successfully
endlocal
