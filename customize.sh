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
com.android.bips
com.android.bookmarkprovider
com.android.cellbroadcastreceiver
com.android.cellbroadcastreceiver.overlay.common
com.android.egg
com.android.emergency
com.android.printspooler
com.android.statementservice
com.android.stk
com.android.wallpaper.livepicker
com.android.providers.downloads.ui
com.android.fmradio
com.android.partnerbookmarks
com.android.providers.partnerbookmarks
com.android.dreams.basic
com.android.wallpaperbackup
com.android.calllogbackup
com.android.sharedstoragebackup
com.android.backupconfirm
com.android.localtransport
com.google.android.apps.tachyon
com.google.android.apps.subscriptions.red
com.google.android.as.css
com.google.android.apps.youtube.music
com.google.android.apps.docs
com.google.android.apps.photos
com.google.android.apps.wellbeing
com.google.android.feedback
com.google.android.marvin.talkback
com.google.android.printservice.recommendation
com.google.android.videos
com.google.android.googlequicksearchbox
com.google.android.onetimeinitializer
com.google.android.partnersetup
com.google.android.gms.location.history
com.google.android.safetycore
com.google.android.apps.tag
com.miui.cloudbackup
com.miui.cloudservice
com.miui.micloudsync
com.miui.backup
com.xiaomi.account
com.xiaomi.xmsf
com.xiaomi.xmsfkeeper
com.xiaomi.metoknlp
com.xiaomi.security.onetrack
com.xiaomi.barrage
com.xiaomi.hypercomm
com.xiaomi.simactivate.service
com.xiaomi.mtb
com.xiaomi.digitalkey
com.miui.player
com.miui.global.shop
com.miui.yellowpage
com.miui.miservice
com.miui.personalassistant
com.miui.globalminusscreen
com.miui.analytics
com.miui.android.fashiongallery
com.miui.bugreport
com.miui.cleanmaster
com.miui.compass
com.miui.hybrid.accessory
com.miui.mishare.connectivity
com.miui.msa.global
com.miui.notes
com.miui.touchassistant
com.miui.userguide
com.miui.videoplayer
com.miui.weather2
com.miui.audiomonitor
com.miui.phrase
com.miui.contentextension
com.miui.misightservice
com.miui.vsimcore
com.miui.qr
com.miui.miwallpaper
com.miui.miwallpaper.config.overlay
com.mi.globalbrowser
com.mi.health
com.mi.webkit.core
com.mipay.wallet.id
com.micredit.in
cn.wps.xiaomi.abroad.lite
com.tencent.soter.soterserver
com.sohu.inputmethod.sogou.xiaomi
com.xiaomi.glqm
com.xiaomi.joyose
com.xiaomi.midrop
com.xiaomi.mipicks
com.xiaomi.payment
com.xiaomi.mirror
com.xiaomi.mi_connect_service
com.xiaomi.continuity.sdkapp
com.amazon.appmanager
com.netflix.partner.activation
com.netflix.mediaclient
com.opera.app.news
com.opera.branding
com.opera.branding.news
com.facebook.appmanager
com.facebook.services
com.facebook.system
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