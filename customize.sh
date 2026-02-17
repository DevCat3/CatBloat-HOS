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
com.android.updater
com.miui.powerkeeper
com.miui.miservice
com.miui.msa.global
com.miui.analytics
com.miui.bugreport
com.miui.yellowpage
com.miui.mishare.connectivity
com.miui.daemon
com.miui.cloudservice
com.miui.cotaservice
com.miui.thirdappassistant
com.miui.cleaner
com.miui.compass
com.miui.fm
com.miui.fmservice
com.mi.healthglobal
com.miui.guardprovider
com.miui.cloudbackup
com.miui.backup
com.miui.systemui.devices.overlay
com.miui.systemui.overlay.devices.android
com.miui.settings.intelligence
com.miui.globallayout
com.miui.system.overlay
com.miui.phone.carriers.overlay.vodafone
com.miui.phone.carriers.overlay.h3g
com.miui.systemui.carriers.overlay
com.miui.settings.rro.device.hide.statusbar.overlay
com.miui.settings.rro.device.type.overlay
com.xiaomi.midrop
com.xiaomi.account
com.xiaomi.finddevice
com.xiaomi.payment
com.xiaomi.ugd
com.xiaomi.barrage
com.xiaomi.micloud.sdk
com.xiaomi.glgm
com.xiaomi.xmsfkeeper
com.xiaomi.phone.overlay
com.xiaomi.phone
com.xiaomi.simactivate.service
com.xiaomi.misettings
com.xiaomi.joyose
com.google.android.apps.wellbeing
com.google.android.feedback
com.google.android.printservice.recommendation
com.google.android.apps.subscriptions.red
com.google.android.apps.restore
com.google.ar.core
com.google.mainline.telemetry
com.google.android.googlequicksearchbox
com.google.android.apps.maps
com.google.android.apps.docs
com.google.android.apps.messaging
com.google.android.apps.safetyhub
com.google.android.apps.tachyon
com.google.android.tts
com.google.android.gm
com.google.android.inputmethod.latin
com.google.android.projection.gearhead
com.google.android.healthconnect.controller
com.google.android.health.connect.backuprestore
com.google.android.syncadapters.calendar
com.google.android.gms.supervision
com.google.android.partnersetup
com.google.android.ondevicepersonalization.services
com.google.android.federatedcompute
com.google.android.sdksandbox
com.google.android.modulemetadata
com.google.android.ext.services
com.google.android.ext.shared
com.google.android.permissioncontroller
com.google.android.configupdater
com.google.android.connectivity.resources
com.google.android.networkstack.overlay
com.google.android.networkstack.tethering
com.google.android.networkstack.tethering.overlay
com.google.android.networkstack.overlay.miui
com.google.android.overlay.gmsconfig.common
com.google.android.overlay.gmsconfig.gsa
com.google.android.overlay.gmsconfig.comms
com.google.android.overlay.gmsconfig.personalsafety
com.google.android.overlay.gmsconfig.geotz
com.google.android.overlay.gmsconfig.asi
com.google.android.overlay.gmscontactprovider
com.google.android.overlay.gmssettings
com.google.android.overlay.gmssettingprovider
com.google.android.overlay.modules.permissioncontroller
com.google.android.overlay.modules.permissioncontroller.forframework
com.google.android.overlay.modules.healthfitness.forframework
com.google.android.overlay.modules.captiveportallogin.forframework
com.google.android.overlay.modules.documentsui
com.google.android.overlay.modules.ext.services
com.google.android.overlay.modules.modulemetadata.forframework
com.android.bookmarkprovider
com.android.companiondevicemanager
com.android.cts.ctsshim
com.android.cts.priv.ctsshim
com.android.providers.downloads.ui
com.android.statementservice
com.android.traceur
com.android.devicediagnostics
com.android.dreams.basic
com.android.apps.tag
com.android.htmlviewer
com.android.egg
com.android.printspooler
com.android.calllogbackup
com.android.backupconfirm
com.android.sharedstoragebackup
com.android.avatarpicker
com.android.soundrecorder
com.android.soundpicker
com.android.musicfx
com.android.wallpaperbackup
com.android.localtransport
com.android.hotwordenrollment.okgoogle
com.android.hotwordenrollment.xgoogle
com.android.virtualmachine.res
com.android.microdroid.empty_payload
com.android.role.notes.enabled
com.mediatek.voicecommand
com.mediatek.voiceunlock
com.mediatek.duraspeed
com.mediatek.engineermode
com.mediatek.callrecorder
com.mediatek.miravision.ui
com.mediatek.mdmconfig
com.mediatek.mdmlsample
com.mediatek.atci.service
com.mediatek.atmwifimeta
com.mediatek.batterywarning
com.mediatek.capctrl.service
com.mediatek.datachannel.service
com.mediatek.gbaservice
com.mediatek.location.lppe.main
com.mediatek.cellbroadcastuiresoverlay
com.mediatek.FrameworkResOverlayExt
com.mediatek.SettingsProviderResOverlay
com.mediatek.frameworkresoverlay
tafsan.utgyzt.uynwdw
me.itejo443.remalwack
com.bestandroidaboudemaybas.masebha
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