@echo off

IF "%~1" == "" GOTO fail

call npm run build
call git add --all
call git commit -m %1
call git push origin master
call git subtree push --prefix build origin gh-pages
echo "Done"
goto:eof

:fail
    echo "Commit msg not specified"
