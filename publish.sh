
#!/bin/bash
DIR=$(pwd)
SUB='/lib'
if [[ "$DIR" == *"$SUB"* ]]; 
then
    echo "\n\n PUBLISHING from $(pwd)... \n\n";
else
    echo $(pwd)
    npm version patch --no-git-tag-version
    cp package.json ./lib/package.json
    cp README.md ./lib/README.md
    cp .npmignore ./lib/.npmignore
    cp publish.sh ./lib/publish.sh
    cd ./lib
    npm publish
    echo "💥💥 Ignore the error below! Project has been published from the /core directory 💥💥\n\n"
    exit 1
fi

