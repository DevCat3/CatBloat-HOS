#!/system/bin/sh

# Set module temp directory
TMPDIR="${TMPDIR:-/dev/tmp}"
MODPATH="/data/adb/modules_update/CatBloat-HOS"
CONFIG="$MODPATH/pkglist.txt"

# Variables
MODNAME=$(grep_prop name "$TMPDIR/module.prop")
MODVER=$(grep_prop version "$TMPDIR/module.prop")
DV=$(grep_prop author "$TMPDIR/module.prop")

Device=$(getprop ro.product.device)
Model=$(getprop ro.product.model)
Brand=$(getprop ro.product.brand)
Manufacturer=$(getprop ro.product.system.manufacturer)
Architecture=$(getprop ro.product.cpu.abi)
SDK=$(getprop ro.system.build.version.sdk)
ABI=$(getprop ro.system.product.cpu.abilist)
Android=$(getprop ro.system.build.version.release)
Type=$(getprop ro.system.build.type)
Built=$(getprop ro.system.build.date)
Time=$(date "+%d, %b - %H:%M %Z")
FINGERPRINT=$(getprop ro.system.build.fingerprint)
ID=$(getprop ro.system.build.id)
BTAG=$(getprop ro.system.build.tags)
BVER=$(getprop ro.system.build.version.incremental)
SP=$(getprop ro.build.version.security_patch)
HOST=$(getprop ro.build.host)
FBE=$(getprop ro.crypto.state)
FLAVOUR=$(getprop ro.build.flavor)
LOCALE=$(getprop ro.product.locale)
BT=$(getprop bt.max.hfpclient.connections)
CHIPSET=$(getprop ro.device.chipset)
DISPLAY=$(getprop ro.device.display_resolution)
NETFLIX=$(getprop ro.netflix.bsp_rev)
NFC=$(getprop ro.nfc.port)
MAINTAINER=$(getprop ro.device.maintainer)
CID=$(getprop ro.com.google.clientidbase)
SE=$(getenforce)
ROOT=$(whoami)

# Display UI Messages
debug() {
  msg="$1"
  type="$2"

  charcount=$(printf "%s" "$msg" | wc -c)
  line=$(expr "$charcount" + 3)
  [ "$line" -gt 55 ] && line=55

  if [ "$type" = "sar" ]; then
    echo ""
    printf '%*s\n' "$line" | tr ' ' '-'
    echo " $msg"
    printf '%*s\n' "$line" | tr ' ' '-'
    echo ""
  else
    echo "$msg"
  fi
}

# Verify ZIP
#unzip -o "$ZIPFILE" 'verify.sh' -d "$TMPDIR" >&2
#if [ ! -f "$TMPDIR/verify.sh" ]; then
#  debug "- Module files are corrupted, please re-download" 0.2 "sar"
#  exit 1
#fi

# Check integrity
#echo " "
#debug "-------------------------------------"
#debug "- Checking Module Integrity..."
#debug "-------------------------------------"
#sleep 1
#sh "$TMPDIR/verify.sh" || exit 1

# Installation starts
echo " " 
debug "-------------------------------------"
debug " - Fetching module info..."
debug "-------------------------------------"
debug " ✦ Author: $DV"
debug " ✦ Module：$MODNAME"
debug " ✦ Version：$MODVER"
echo -n " ✦ Provider："

if [ "$BOOTMODE" ] && [ "$KSU" ]; then
  ui_print "❤️‍🩹 KernelSU app"
  ui_print " ✦ KernelSU：$KSU_KERNEL_VER_CODE (kernel) + $KSU_VER_CODE (ksud)"
  if [ "$(which magisk)" ]; then
    ui_print "-----------------------------------------------------------"
    ui_print "! Multiple root implementation is NOT supported!"
    abort "-----------------------------------------------------------"
  fi
elif [ "$BOOTMODE" ] && [ "$MAGISK_VER_CODE" ]; then
  ui_print "💀 Magisk app"
else
  ui_print "--------------------------------------------------------"
  ui_print "Installation from recovery is not supported"
  ui_print "Please install from KernelSU / Magisk or Apatch app"
  abort "--------------------------------------------------------"
fi

# Device Info
echo " " 
debug "-------------------------------------"
debug " - Fetching Device info..."
debug "-------------------------------------"
sleep 1
debug " ✦ Brand Name：$Brand"
debug " ✦ Device Name：$Device"
debug " ✦ Model Name：$Model"
debug " ✦ Device Manufacturer: $Manufacturer"
debug " ✦ RAM：$(free | grep Mem | awk '{print $2}')"

# ROM Info
echo " " 
debug "-------------------------------------"
debug " - Fetching ROM info..."
debug "-------------------------------------"
sleep 1
debug " ✦ Security Patch：$SP"
debug " ✦ Data Encryption：$FBE"
debug " ✦ Build ID：$ID"
debug " ✦ Build Tag：$BTAG"
debug " ✦ ROM Build Date：$Built"
debug " ✦ ROM Build Type：$Type"

# System Info
echo " " 
debug "-------------------------------------"
debug " - Fetching System info..."
debug "-------------------------------------"
sleep 1
debug " ✦ SE Linux Status：$SE"
debug " ✦ Default Language：$LOCALE"
debug " ✦ Client ID：$CID"
debug " ✦ ABI SUPPORT：$ABI"
debug " ✦ Android Version：$Android"
debug " ✦ Kernel: $(uname -r)"
debug " ✦ CPU Architecture：$Architecture"
debug " ✦ SDK Version：$SDK"

echo " " 
debug "-------------------------------------"
debug " - Optimizing Module Files"
debug "-------------------------------------"
echo " " 
sleep 2

# Remove verification script 
rm -f "$MODPATH/verify.sh"

#Build package list
debug " ✦ Building Configuration File"
cat <<EOF > "$CONFIG"
com.google.android.adservices.api 
com.miui.analytics 
com.google.android.marvin.talkback 
com.google.android.projection.gearhead 
com.google.android.apps.restore 
com.mi.globalminusscreen 
com.mi.appfinder 
com.xiaomi.bluetooth 
com.miui.misightservice 
com.xiaomi.barrage 
com.android.providers.calendar 
com.android.calllogbackup 
com.google.android.cellbroadcastservice 
com.miui.cleaner 
com.miui.phrase 
com.miui.cloudbackup 
com.android.emergency 
com.android.imsserviceentitlement 
com.google.android.ondevicepersonalization.services 
com.google.android.federatedcompute 
com.google.android.overlay.devicelockcontroller 
com.mediatek.batterywarning 
com.xiaomi.touchservice 
com.google.ambient.streaming 
com.google.android.apps.wellbeing 
com.android.providers.downloads.ui 
com.mediatek.engineermode 
com.huaqin.factory 
com.miui.bugreport 
com.mi.android.globalFileexplorer 
com.xiaomi.finddevice 
com.miui.fm 
com.miui.fmservice 
com.xiaomi.glgm 
com.google.android.inputmethod.latin 
com.xiaomi.mipicks 
com.android.hotwordenrollment.xgoogle 
com.android.hotwordenrollment.okgoogle 
com.google.android.syncadapters.calendar 
com.google.android.apps.subscriptions.red 
com.google.android.onetimeinitializer 
com.google.android.partnersetup 
com.google.android.videos 
com.google.android.healthconnect.controller 
com.mi.healthglobal 
org.ifaa.aidl.manager 
com.milink.service 
com.xiaomi.joyose 
com.google.android.feedback 
com.miui.mediaviewer 
com.google.android.apps.tachyon 
com.android.mms 
com.facebook.system 
com.facebook.appmanager 
com.facebook.services 
com.mi.globalbrowser
com.xiaomi.payment
com.xiaomi.mircs 
com.miui.videoplayer 
com.miui.micloudsync 
com.xiaomi.trustservice 
com.miui.msa.global 
com.miui.player 
com.android.carrierdefaultapp 
com.wdstechnology.android.kryten 
com.miui.global.packageinstaller 
com.google.android.apps.safetyhub 
com.android.printspooler 
com.google.android.as.oss 
com.android.rkpdapp 
com.huaqin.sarcontroller 
com.miui.miservice 
com.android.stk 
com.tencent.soter.soterserver 
com.google.android.tts 
com.google.mainline.telemetry  
com.xiaomi.discover 
com.miui.daemon 
com.google.android.gms.supervision 
com.miui.guardprovider 
com.android.traceur 
com.android.updater 
com.miui.audiomonitor 
com.mediatek.voicecommand 
com.android.DeviceAsWebcam 
com.google.android.cellbroadcastreceiver 
com.android.managedprovisioning 
com.xiaomi.account 
com.miui.cloudservice 
com.xiaomi.aicr 
com.xiaomi.xmsf 
com.xiaomi.xmsfkeeper 
com.miui.mishare.connectivity 
com.xiaomi.simactivate.service 
com.miui.yellowpage 
com.google.android.apps.youtube.music
EOF

# Skip Pixel Launcher components 
if pm list packages | grep -q "com.google.android.apps.nexuslauncher"; then
    sed -i '/com.google.android.settings.intelligence/d' $CONFIG
    sed -i '/com.google.android.as.oss/d' $CONFIG
fi

# Permissions
chmod +x "$MODPATH/action.sh"
chmod +x "$MODPATH/freeze.sh"
chmod +x "$MODPATH/unfreeze.sh"
chmod 666 "$CONFIG"

# Finish
debug " ✦ Installation success 😼"