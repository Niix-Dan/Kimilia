@echo off
git add .
git rm --cached package-lock.json
git commit -m %date%
git branch -M main
git push -u origin main
echo.
echo.
echo.
echo.
echo.
echo.
echo Enviado ao github com sucesso!.
echo.