ts=$(date +%Y.%m.%d)
pkg=grid-background-$ts.zip

zip $pkg -r background.js images LICENSE js manifest.json popup.html
