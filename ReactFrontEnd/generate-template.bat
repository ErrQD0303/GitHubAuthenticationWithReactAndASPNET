@echo off
setlocal enabledelayedexpansion

set template_folders=components exceptions features hooks layouts logs pages routes services shared store styles types
for %%f in (%template_folders%) do (
    mkdir src\%%f
)

endlocal