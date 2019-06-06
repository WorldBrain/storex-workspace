#!/bin/bash
cd packages || exit 1
package_dir="@worldbrain/$1"
mkdir $package_dir
cp @worldbrain/storex/{License,package.json,tsconfig.json,.gitignore} $package_dir
mkdir $package_dir/ts
touch $package_dir/ts/index.ts
cd $package_dir
yarn

echo "================="
echo "      DONE       "
echo "================="
echo "  DON'T FORGET   "
echo " modify pkg JSON "
