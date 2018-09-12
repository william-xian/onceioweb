#!/bin/bash

rm -rf dist*
cnpm run build
tar -cvzf dist.tar.gz dist/*

scp dist.tar.gz root@onceio.top:/usr/local/nginx/html/
ssh root@onceio.top 'cd /usr/local/nginx/html/; tar -xf dist.tar.gz; bash reset.sh'
