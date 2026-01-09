#!/system/bin/sh

FLAG="/data/adb/modules/CatBloat-HOS/.toggle"

if [ -f "$FLAG" ]; then
  rm "$FLAG"
  echo " Enabling Bloatware..."
  sh /data/adb/modules/CatBloat-HOS/enable.sh
else
  touch "$FLAG"
  echo " Disabling Bloatware..."
  sh /data/adb/modules/CatBloat-HOS/disable.sh
fi