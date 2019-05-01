#!/bin/bash
cd packages || exit 1
mkdir $1
cp storex/{License,package.json,tsconfig.json,.gitignore} $1
mkdir $1/ts
touch $1/ts/index.ts
cd $1
yarn

echo "================="
echo "      DONE       "
echo "================="
echo "  DON'T FORGET   "
echo " modify pkg JSON "
