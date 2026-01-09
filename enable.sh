#!/system/bin/sh

LOGFILE="/data/local/tmp/bloatlog"
: > "$LOGFILE"  # Clear the log

log() {
  echo "$@" | tee -a "$LOGFILE"
}

log "----------------------------------------------"
log "           Starting Enable Script"
log "----------------------------------------------"
log ""

TOTAL=0
ENABLED=0
NOTFOUND=0
FAILED=0

PKGLIST="/data/adb/modules/CatBloat-HOS/pkglist.txt"
if [ ! -f "$PKGLIST" ]; then
  log "ERROR: Package list not found at $PKGLIST"
  exit 1
fi

while read -r pkg; do
  [ -z "$pkg" ] && continue
  TOTAL=$((TOTAL + 1))

  if ! pm list packages | grep -qw "$pkg"; then
    NOTFOUND=$((NOTFOUND + 1))
    log "🔻  $pkg"
    continue
  fi

  output=$(pm enable "$pkg" 2>&1)

  if echo "$output" | grep -qi "new state: enabled"; then
    ENABLED=$((ENABLED + 1))
    log "🔺  $pkg"
  else
    FAILED=$((FAILED + 1))
    log "FAILED    $pkg"
  fi
done < "$PKGLIST"

log ""
log "----------------------------------------------"
log "Total Packages:   $TOTAL"
log "Enabled:          $ENABLED"
log "Not Found:        $NOTFOUND"
log "Failed:           $FAILED"
log "----------------------------------------------"
log "Completed."