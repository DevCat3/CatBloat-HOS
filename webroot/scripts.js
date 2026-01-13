const MODDIR = "/data/adb/modules/CatBloat-HOS";
const DISABLE = `${MODDIR}/disable.sh`;
const ENABLE = `${MODDIR}/enable.sh`;
const PROP = `${MODDIR}/module.prop`;

// 🔶 AGGRESSIVE MODE - 200+ Google Services (May break features)
const GOOGLE_AGGRESSIVE_SERVICES = [
  "com.google.android.gms/com.google.android.gms.ads.identifier.service.AdvertisingIdNotificationService",
  "com.google.android.gms/com.google.android.gms.ads.identifier.service.AdvertisingIdService",
  "com.google.android.gms/com.google.android.gms.nearby.mediums.nearfieldcommunication.NfcAdvertisingService",
  "com.google.android.gms/com.google.android.gms.analytics.AnalyticsTaskService",
  "com.google.android.gms/com.google.android.gms.analytics.internal.PlayLogReportingService",
  "com.google.android.gms/com.google.android.gms.stats.eastworld.EastworldService",
  "com.google.android.gms/com.google.android.gms.stats.service.DropBoxEntryAddedService",
  "com.google.android.gms/com.google.android.gms.stats.PlatformStatsCollectorService",
  "com.google.android.gms/com.google.android.gms.common.stats.GmsCoreStatsService",
  "com.google.android.gms/com.google.android.gms.common.stats.StatsUploadService",
  "com.google.android.gms/com.google.android.gms.backup.stats.BackupStatsService",
  "com.google.android.gms/com.google.android.gms.checkin.CheckinApiService",
  "com.google.android.gms/com.google.android.gms.tron.CollectionService",
  "com.google.android.gms/com.google.android.gms.common.config.PhenotypeCheckinService",
  "com.google.android.gms/com.google.android.location.internal.server.HardwareArProviderService",
  "com.google.android.gms/com.google.android.gms.feedback.FeedbackAsyncService",
  "com.google.android.gms/com.google.android.gms.feedback.LegacyBugReportService",
  "com.google.android.gms/com.google.android.gms.feedback.OfflineReportSendTaskService",
  "com.google.android.gms/com.google.android.gms.googlehelp.metrics.ReportBatchedMetricsGcmTaskService",
  "com.google.android.gms/com.google.android.location.reporting.service.ReportingAndroidService",
  "com.google.android.gms/com.google.android.location.reporting.service.ReportingSyncService",
  "com.google.android.gms/com.google.android.gms.common.stats.net.NetworkReportService",
  "com.google.android.gms/com.google.android.gms.presencemanager.service.PresenceManagerPresenceReportService",
  "com.google.android.gms/com.google.android.gms.usagereporting.service.UsageReportingIntentService",
  "com.google.android.gms/com.google.android.gms.cast.media.CastMediaRoute2ProviderService",
  "com.google.android.gms/com.google.android.gms.cast.media.CastMediaRoute2ProviderService_Isolated",
  "com.google.android.gms/com.google.android.gms.cast.media.CastMediaRoute2ProviderService_Persistent",
  "com.google.android.gms/com.google.android.gms.cast.media.CastMediaRouteProviderService",
  "com.google.android.gms/com.google.android.gms.cast.media.CastMediaRouteProviderService_Isolated",
  "com.google.android.gms/com.google.android.gms.cast.media.CastMediaRouteProviderService_Persistent",
  "com.google.android.gms/com.google.android.gms.cast.media.CastRemoteDisplayProviderService",
  "com.google.android.gms/com.google.android.gms.cast.media.CastRemoteDisplayProviderService_Isolated",
  "com.google.android.gms/com.google.android.gms.cast.media.CastRemoteDisplayProviderService_Persistent",
  "com.google.android.gms/com.google.android.gms.cast.service.CastPersistentService_Persistent",
  "com.google.android.gms/com.google.android.gms.cast.service.CastSocketMultiplexerLifeCycleService",
  "com.google.android.gms/com.google.android.gms.cast.service.CastSocketMultiplexerLifeCycleService_Isolated",
  "com.google.android.gms/com.google.android.gms.cast.service.CastSocketMultiplexerLifeCycleService_Persistent",
  "com.google.android.gms/com.google.android.gms.chimera.CastPersistentBoundBrokerService",
  "com.google.android.gms/com.google.android.gms.nearby.messages.debug.DebugPokeService",
  "com.google.android.gms/com.google.android.gms.clearcut.debug.ClearcutDebugDumpService",
  "com.google.firebase.components.ComponentDiscoveryService",
  "com.google.android.gms/com.google.android.gms.nearby.discovery.service.DiscoveryService",
  "com.google.android.gms/com.google.mlkit.common.internal.MlKitComponentDiscoveryService",
  "com.google.android.gms/com.google.android.gms.geotimezone.GeoTimeZoneService",
  "com.google.android.gms/com.google.android.gms.location.geocode.GeocodeService",
  "com.google.android.gms/com.google.android.gms.chimera.GmsIntentOperationService_AuthAccountIsolate",
  "com.google.android.gms/com.google.android.gms.chimera.PersistentApiService_AuthAccountIsolated",
  "com.google.android.gms/com.google.android.gms.chimera.PersistentIntentOperationService_AuthAccountIsolated",
  "com.google.android.gms/com.google.android.gms.auth.folsom.service.FolsomPublicKeyUpdateService",
  "com.google.android.gms/com.google.android.gms.fonts.update.UpdateSchedulerService",
  "com.google.android.gms/com.google.android.gms.icing.proxy.IcingInternalCorporaUpdateService",
  "com.google.android.gms/com.google.android.gms.instantapps.routing.DomainFilterUpdateService",
  "com.google.android.gms/com.google.android.gms.mobiledataplan.service.PeriodicUpdaterService",
  "com.google.android.gms/com.google.android.gms.phenotype.service.sync.PackageUpdateTaskService",
  "com.google.android.gms/com.google.android.gms.update.SystemUpdateGcmTaskService",
  "com.google.android.gms/com.google.android.gms.update.SystemUpdateService",
  "com.google.android.gms/com.google.android.gms.update.UpdateFromSdCardService",
  "com.google.android.gms/com.google.android.gms.backup.wear.BackupSettingsListenerService",
  "com.google.android.gms/com.google.android.gms.dck.service.DckWearableListenerService",
  "com.google.android.gms/com.google.android.gms.fitness.service.wearable.WearableSyncAccountService",
  "com.google.android.gms/com.google.android.gms.fitness.service.wearable.WearableSyncConfigService",
  "com.google.android.gms/com.google.android.gms.fitness.service.wearable.WearableSyncConnectionService",
  "com.google.android.gms/com.google.android.gms.fitness.service.wearable.WearableSyncMessageService",
  "com.google.android.gms/com.google.android.gms.fitness.wearables.WearableSyncService",
  "com.google.android.gms/com.google.android.gms.wearable.service.WearableControlService",
  "com.google.android.gms/com.google.android.gms.wearable.service.WearableService",
  "com.google.android.gms/com.google.android.gms.nearby.fastpair.service.WearableDataListenerService",
  "com.google.android.gms/com.google.android.location.wearable.WearableLocationService",
  "com.google.android.gms/com.google.android.location.fused.wearable.GmsWearableListenerService",
  "com.google.android.gms/com.google.android.gms.mdm.services.MdmPhoneWearableListenerService",
  "com.google.android.gms/com.google.android.gms.tapandpay.wear.WearProxyService",
  "com.google.android.gms/com.google.android.gms.auth.trustagent.GoogleTrustAgent",
  "com.google.android.gms/com.google.android.gms.trustagent.api.bridge.TrustAgentBridgeService",
  "com.google.android.gms/com.google.android.gms.trustagent.api.state.TrustAgentState",
  "com.google.android.gms/com.google.android.gms.enpromo.PromoInternalPersistentService",
  "com.google.android.gms/com.google.android.gms.enpromo.PromoInternalService",
  "com.google.android.gms/com.google.android.gms.thunderbird.EmergencyLocationService",
  "com.google.android.gms/com.google.android.gms.thunderbird.EmergencyPersistentService",
  "com.google.android.gms/com.google.android.gms.kids.chimera.KidsServiceProxy",
  "com.google.android.gms/com.google.android.gms.personalsafety.service.PersonalSafetyService",
  "com.google.android.gms/com.google.android.gms.fitness.cache.DataUpdateListenerCacheService",
  "com.google.android.gms/com.google.android.gms.fitness.service.ble.FitBleBroker",
  "com.google.android.gms/com.google.android.gms.fitness.service.config.FitConfigBroker",
  "com.google.android.gms/com.google.android.gms.fitness.service.goals.FitGoalsBroker",
  "com.google.android.gms/com.google.android.gms.fitness.service.history.FitHistoryBroker",
  "com.google.android.gms/com.google.android.gms.fitness.service.internal.FitInternalBroker",
  "com.google.android.gms/com.google.android.gms.fitness.service.proxy.FitProxyBroker",
  "com.google.android.gms/com.google.android.gms.fitness.service.recording.FitRecordingBroker",
  "com.google.android.gms/com.google.android.gms.fitness.service.sensors.FitSensorsBroker",
  "com.google.android.gms/com.google.android.gms.fitness.service.sessions.FitSessionsBroker",
  "com.google.android.gms/com.google.android.gms.fitness.sensors.sample.CollectSensorService",
  "com.google.android.gms/com.google.android.gms.fitness.sync.FitnessSyncAdapterService",
  "com.google.android.gms/com.google.android.gms.fitness.sync.SyncGcmTaskService",
  "com.google.android.gms/com.google.android.gms.nearby.bootstrap.service.NearbyBootstrapService",
  "com.google.android.gms/com.google.android.gms.nearby.connection.service.NearbyConnectionsAndroidService",
  "com.google.location.nearby.direct.service.NearbyDirectService",
  "com.google.android.gms/com.google.android.gms.nearby.messages.service.NearbyMessagesService",
  "com.google.android.gms/com.google.android.gms.romanesco.ContactsLoggerUploadService",
  "com.google.android.gms/com.google.android.gms.magictether.logging.DailyMetricsLoggerService",
  "com.google.android.gms/com.google.android.gms.checkin.EventLogService",
  "com.google.android.gms/com.google.android.gms.backup.component.FullBackupJobLoggerService",
  "com.google.android.gms/com.google.android.gms.security.verifier.ApkUploadService",
  "com.google.android.gms/com.google.android.gms.security.verifier.InternalApkUploadService",
  "com.google.android.gms/com.google.android.gms.security.snet.SnetIdleTaskService",
  "com.google.android.gms/com.google.android.gms.security.snet.SnetNormalTaskService",
  "com.google.android.gms/com.google.android.gms.security.snet.SnetService",
  "com.google.android.gms/com.google.android.gms.tapandpay.security.StorageKeyCacheService",
  "com.google.android.gms/com.google.android.gms.droidguard.DroidGuardGcmTaskService",
  "com.google.android.gms/com.google.android.gms.pay.security.storagekey.service.StorageKeyCacheService",
  "com.google.android.gms/com.google.android.gms.tapandpay.globalactions.QuickAccessWalletService",
  "com.google.android.gms/com.google.android.gms.tapandpay.globalactions.WalletQuickAccessWalletService",
  "com.google.android.gms/com.google.android.gms.pay.gcmtask.PayGcmTaskService",
  "com.google.android.gms/com.google.android.gms.pay.hce.service.PayHceService",
  "com.google.android.gms/com.google.android.gms.pay.notifications.PayNotificationService",
  "com.google.android.gms/com.google.android.gms.wallet.service.WalletGcmTaskService",
  "com.google.android.gms/com.google.android.location.fused.FusedLocationService",
  "com.google.android.gms/com.google.android.location.internal.server.GoogleLocationService",
  "com.google.android.gms/com.google.android.location.network.NetworkLocationService",
  "com.google.android.gms/com.google.android.location.persistent.LocationPersistentService",
  "com.google.android.gms/com.google.android.location.reporting.service.LocationHistoryInjectorService",
  "com.google.android.gms/com.google.android.location.util.LocationAccuracyInjectorService",
  "com.google.android.gms/com.google.android.location.wearable.WearableLocationService",
  "com.google.android.gms/com.google.android.gms.locationsharing.service.LocationSharingSettingInjectorService",
  "com.google.android.gms/com.google.android.gms.locationsharing.service.LocationSharingService",
  "com.google.android.gms/com.google.android.gms.semanticlocation.service.SemanticLocationService",
  "com.google.android.gms/com.google.android.gms.games.chimera.GamesSignInIntentServiceProxy",
  "com.google.android.gms/com.google.android.gms.games.chimera.GamesSyncServiceNotificationProxy",
  "com.google.android.gms/com.google.android.gms.games.chimera.GamesUploadServiceProxy",
  "com.google.android.gms/com.google.android.gms.gp.gameservice.GameService",
  "com.google.android.gms/com.google.android.gms.gp.gameservice.GameSessionService",
  "com.google.android.gms/com.google.android.gms.chimera.GmsApiServiceNoInstantApps",
  "com.google.android.gms/com.google.android.gms.chimera.PersistentApiServiceNoInstantApps",
  "com.google.android.gms/com.google.android.gms.instantapps.service.InstantAppsService",
  "com.google.android.gms/com.google.android.gms.chimera.UiApiServiceNoInstantApps"
];

// 🔷 SAFE MODE - Only safe-to-disable services
const GOOGLE_SAFE_SERVICES = [
  "com.android.vending/com.google.android.finsky.instantapps.InstantAppsLoggingService",
  "com.google.android.gms/.instantapps.service.InstantAppsService",
  "com.google.android.gms/com.google.android.finsky.instantapps.InstantAppsLoggingService",
  "com.google.android.apps.work.clouddpc/.base.policy.services.ReportingPartialCollectionJobService",
  "com.google.android.apps.work.clouddpc/.base.policy.services.StatusReportJobService",
  "com.google.android.apps.work.clouddpc/.vanilla.bugreport.jobs.RemoteBugReportJobService",
  "com.google.android.gms/.ads.AdRequestBrokerService",
  "com.google.android.gms/.ads.cache.CacheBrokerService",
  "com.google.android.gms/.ads.config.FlagsReceiver",
  "com.google.android.gms/.ads.identifier.service.AdvertisingIdNotificationService",
  "com.google.android.gms/.ads.identifier.service.AdvertisingIdService",
  "com.google.android.gms/.ads.jams.NegotiationService",
  "com.google.android.gms/.ads.measurement.GmpConversionTrackingBrokerService",
  "com.google.android.gms/.ads.social.GcmSchedulerWakeupService",
  "com.google.android.gms/.adsidentity.service.AdServicesExtDataStorageService",
  "com.google.android.gms/.analytics.AnalyticsReceiver",
  "com.google.android.gms/.analytics.AnalyticsService",
  "com.google.android.gms/.analytics.AnalyticsTaskService",
  "com.google.android.gms/.analytics.internal.PlayLogReportingService",
  "com.google.android.gms/.analytics.service.AnalyticsService",
  "com.google.android.gms/.auth.trustagent.ActiveUnlockTrustAgent",
  "com.google.android.gms/.auth.trustagent.GoogleTrustAgent",
  "com.google.android.gms/.backup.component.FullBackupJobLoggerService",
  "com.google.android.gms/.backup.stats.BackupStatsService",
  "com.google.android.gms/.checkin.EventLogService",
  "com.google.android.gms/.chimera.GmsIntentOperationService",
  "com.google.android.gms/.chimera.container.logger.ExternalDebugLoggerService",
  "com.google.android.gms/.common.appdoctor.LocalAppDoctorReceiver",
  "com.google.android.gms/.common.stats.GmsCoreStatsService",
  "com.google.android.gms/.common.stats.StatsUploadService",
  "com.google.android.gms/.feedback.LegacyBugReportService",
  "com.google.android.gms/.feedback.OfflineReportSendTaskService",
  "com.google.android.gms/.googlehelp.metrics.ReportBatchedMetricsGcmTaskService",
  "com.google.android.gms/.location.reporting.service.GcmBroadcastReceiver",
  "com.google.android.gms/.magictether.logging.DailyMetricsLoggerService",
  "com.google.android.gms/.measurement.AppMeasurementJobService",
  "com.google.android.gms/.measurement.AppMeasurementReceiver",
  "com.google.android.gms/.measurement.AppMeasurementService",
  "com.google.android.gms/.measurement.PackageMeasurementReceiver",
  "com.google.android.gms/.romanesco.ContactsLoggerUploadService",
  "com.google.android.gms/.stats.PlatformStatsCollectorService",
  "com.google.android.gms/.stats.eastworld.EastworldService",
  "com.google.android.gms/.stats.service.DropBoxEntryAddedReceiver",
  "com.google.android.gms/.stats.service.DropBoxEntryAddedService",
  "com.google.android.gms/.tron.AlarmReceiver",
  "com.google.android.gms/.tron.CollectionService",
  "com.google.android.gms/.udc.gcm.GcmBroadcastReceiver",
  "com.google.android.gms/.usagereporting.service.UsageReportingIntentService",
  "com.google.android.gms/com.google.android.gms.mdm.receivers.MdmDeviceAdminReceiver"
];

let lineCount = 0;
let allApps = [];

function isMMRL() {
  return navigator.userAgent.includes("com.dergoogler.mmrl");
}

function runShell(command) {
  return new Promise((resolve, reject) => {
    if (typeof ksu === "object" && typeof ksu.exec === "function") {
      const cb = `cb_${Date.now()}`;
      window[cb] = (code, stdout, stderr) => {
        delete window[cb];
        code === 0 ? resolve(stdout) : reject(stderr || "Shell error");
      };
      ksu.exec(command, "{}", cb);
      return;
    }

    if (isMMRL() && typeof window.execShell === "function") {
      window.execShell(command)
        .then(resolve)
        .catch(err => reject(err || "Shell error"));
      return;
    }

    reject("No supported shell API found (KernelSU or MMRL).");
  });
}

function popup(message, duration = 3000) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, duration);
}

function logOutput(text) {
  const output = document.getElementById("output-log");
  const lines = text.trim().split("\n");

  for (const line of lines) {
    if (!line.trim()) continue;
    
    lineCount++;
    const entry = document.createElement("pre");
    entry.textContent = `${lineCount.toString().padStart(3, " ")} | ${line}`;
    entry.style.opacity = "0";
    entry.style.transform = "translateY(10px)";
    output.appendChild(entry);
    
    setTimeout(() => {
      entry.style.transition = "opacity 0.3s, transform 0.3s";
      entry.style.opacity = "1";
      entry.style.transform = "translateY(0)";
    }, 10);
    
    output.scrollTop = output.scrollHeight;
  }
}

function clearOutput() {
  lineCount = 0;
  const output = document.getElementById("output-log");
  output.style.opacity = "0";
  setTimeout(() => {
    output.innerHTML = "";
    output.style.opacity = "1";
  }, 200);
}

function validatePackageName(name) {
  return /^[a-zA-Z][\w.]*[a-zA-Z0-9]$/.test(name) && name.includes('.');
}

async function isAppDisabled(packageName) {
  try {
    const result = await runShell("pm list packages -d");
    return result.includes(packageName);
  } catch {
    return false;
  }
}

async function enableAppFromList(packageName) {
  popup(`⏳ Enabling ${packageName}...`);
  clearOutput();
  logOutput(`[*] Enabling: ${packageName}`);

  try {
    await runShell(`pm enable ${packageName}`);
    logOutput(`[✓] Successfully enabled: ${packageName}`);
    popup(`✅ ${packageName} enabled`);
    await listAllApps();
  } catch (error) {
    logOutput(`[✗] Failed to enable ${packageName}: ${error}`);
    popup(`❌ Failed: ${error}`);
  }
}

async function disableAppFromList(packageName) {
  popup(`⏳ Disabling ${packageName}...`);
  clearOutput();
  logOutput(`[*] Disabling: ${packageName}`);

  try {
    await runShell(`pm disable-user --user 0 ${packageName}`);
    logOutput(`[✓] Successfully disabled: ${packageName}`);
    popup(`✅ ${packageName} disabled`);
    await listAllApps();
  } catch (error) {
    logOutput(`[✗] Failed to disable ${packageName}: ${error}`);
    popup(`❌ Failed: ${error}`);
  }
}

async function listAllApps() {
  const card = document.getElementById("apps-card");
  const listElement = document.getElementById("apps-list");
  const refreshBtn = document.getElementById("refresh-apps-btn");
  const searchInput = document.getElementById("search-input");
  
  refreshBtn.disabled = true;
  refreshBtn.innerHTML = '🔄 <span class="spinner"></span> Refresh';
  
  card.classList.add("show");
  listElement.innerHTML = '<div class="app-item">⏳ Loading...</div>';
  searchInput.value = '';

  try {
    const result = await runShell("pm list packages");
    const allPackages = result.trim().split('\n').filter(p => p.startsWith('package:'));
    
    const disabledResult = await runShell("pm list packages -d");
    const disabledPackages = new Set(
      disabledResult.trim().split('\n').filter(p => p.startsWith('package:')).map(p => p.replace('package:', ''))
    );
    
    if (allPackages.length === 0) {
      listElement.innerHTML = '<div class="app-item">ℹ️ No apps found</div>';
      return;
    }
    
    allApps = allPackages.map(pkgLine => {
      const packageName = pkgLine.replace('package:', '');
      return {
        packageName,
        isDisabled: disabledPackages.has(packageName)
      };
    });
    
    renderAppsList(allApps);
    
  } catch (error) {
    listElement.innerHTML = `<div class="app-item">[✗] Error: ${error}</div>`;
  } finally {
    setTimeout(() => {
      refreshBtn.disabled = false;
      refreshBtn.innerHTML = '🔄 Refresh';
    }, 600);
  }
}

function renderAppsList(apps) {
  const listElement = document.getElementById("apps-list");
  listElement.innerHTML = '';
  
  if (apps.length === 0) {
    listElement.innerHTML = '<div class="app-item">ℹ️ No apps found</div>';
    return;
  }
  
  apps.sort((a, b) => b.isDisabled - a.isDisabled);
  
  apps.forEach((app, index) => {
    const appItem = document.createElement('div');
    appItem.className = `app-item ${app.isDisabled ? 'disabled' : ''}`;
    appItem.style.animationDelay = `${index * 0.02}s`;
    
    const nameSpan = document.createElement('span');
    nameSpan.className = 'app-name';
    nameSpan.textContent = app.packageName;
    
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'app-actions';
    
    if (app.isDisabled) {
      const enableBtn = document.createElement('button');
      enableBtn.className = 'app-btn enable';
      enableBtn.textContent = 'Enable';
      enableBtn.onclick = () => enableAppFromList(app.packageName);
      actionsDiv.appendChild(enableBtn);
    } else {
      const disableBtn = document.createElement('button');
      disableBtn.className = 'app-btn disable';
      disableBtn.textContent = 'Disable';
      disableBtn.onclick = () => disableAppFromList(app.packageName);
      actionsDiv.appendChild(disableBtn);
    }
    
    appItem.appendChild(nameSpan);
    appItem.appendChild(actionsDiv);
    listElement.appendChild(appItem);
  });
}

function filterApps() {
  const searchTerm = document.getElementById("search-input").value.toLowerCase().trim();
  
  if (!searchTerm) {
    renderAppsList(allApps);
    return;
  }
  
  const filtered = allApps.filter(app => 
    app.packageName.toLowerCase().includes(searchTerm)
  );
  
  renderAppsList(filtered);
}

// 🔶 AGGRESSIVE MODE - Disable 200+ services
async function toggleGoogleAggressive() {
  const services = GOOGLE_AGGRESSIVE_SERVICES;
  popup(`⏳ Applying AGGRESSIVE mode to ${services.length} services...`);
  clearOutput();
  logOutput(`[*] Starting AGGRESSIVE mode - ${services.length} services`);
  
  let successCount = 0;
  let failCount = 0;
  
  for (const service of services) {
    try {
      logOutput(`[*] Disabling ${service}...`);
      await runShell(`pm disable-user --user 0 ${service}`);
      logOutput(`[✓] Disabled: ${service}`);
      successCount++;
    } catch (error) {
      logOutput(`[!] Failed to disable ${service}: ${error}`);
      failCount++;
    }
  }
  
  logOutput(`[✓] AGGRESSIVE mode complete: ${successCount} disabled, ${failCount} failed`);
  popup(`✅ AGGRESSIVE mode: ${successCount} disabled`);
}

// 🔷 SAFE MODE - Disable only safe services
async function toggleGoogleSafe() {
  const services = GOOGLE_SAFE_SERVICES;
  popup(`⏳ Applying SAFE mode to ${services.length} services...`);
  clearOutput();
  logOutput(`[*] Starting SAFE mode - ${services.length} services`);
  
  let successCount = 0;
  let failCount = 0;
  
  for (const service of services) {
    try {
      logOutput(`[*] Disabling ${service}...`);
      await runShell(`pm disable-user --user 0 ${service}`);
      logOutput(`[✓] Disabled: ${service}`);
      successCount++;
    } catch (error) {
      logOutput(`[!] Failed to disable ${service}: ${error}`);
      failCount++;
    }
  }
  
  logOutput(`[✓] SAFE mode complete: ${successCount} disabled, ${failCount} failed`);
  popup(`✅ SAFE mode: ${successCount} disabled`);
}

// 🔋 BATTERY SAVER - Restrict Google Play Services
async function restrictGoogleBattery() {
  const packageName = "com.google.android.gms";
  popup(`⏳ Applying battery restrictions to ${packageName}...`);
  clearOutput();
  logOutput(`[*] Applying battery restrictions to Google Play Services`);
  
  let successCount = 0;
  let failCount = 0;
  
  const commands = [
    { cmd: `pm disable-user --user 0 ${packageName}`, desc: "Disabling GMS temporarily" },
    { cmd: `pm enable ${packageName}`, desc: "Re-enabling GMS" },
    { cmd: `am set-standby-bucket ${packageName} 40`, desc: "Setting standby bucket to RARE" },
    { cmd: `cmd appops set ${packageName} RUN_IN_BACKGROUND ignore`, desc: "Restricting run-in-background" },
    { cmd: `cmd appops set ${packageName} BACKGROUND_ACTIVITY ignore`, desc: "Disabling background activity" },
    { cmd: `cmd appops set ${packageName} WAKE_LOCK ignore`, desc: "Disabling wakelocks" },
    { cmd: `cmd appops set ${packageName} AUTO_START ignore`, desc: "Disabling auto-start" },
    { cmd: `am force-stop ${packageName}`, desc: "Force stopping GMS" }
  ];
  
  for (const {cmd, desc} of commands) {
    try {
      logOutput(`[*] ${desc}...`);
      await runShell(cmd);
      logOutput(`[✓] Success: ${desc}`);
      successCount++;
    } catch (error) {
      logOutput(`[!] ${desc} - Skipped (not supported)`);
      failCount++;
    }
  }
  
  logOutput(`[✓] Battery restrictions applied: ${successCount} successful, ${failCount} skipped`);
  popup(`✅ Battery Saver: ${successCount} restrictions applied`);
}

// ✅ ENABLE ALL - Re-enable everything
async function enableAllGoogleServices() {
  popup(`⏳ Enabling ALL Google services...`);
  clearOutput();
  logOutput(`[*] Enabling ALL Google services`);
  
  const allServices = [...GOOGLE_AGGRESSIVE_SERVICES, ...GOOGLE_SAFE_SERVICES];
  let successCount = 0;
  let failCount = 0;
  
  for (const service of allServices) {
    try {
      logOutput(`[*] Enabling ${service}...`);
      await runShell(`pm enable ${service}`);
      logOutput(`[✓] Enabled: ${service}`);
      successCount++;
    } catch (error) {
      logOutput(`[!] Failed to enable ${service}: ${error}`);
      failCount++;
    }
  }
  
  logOutput(`[✓] Enable complete: ${successCount} enabled, ${failCount} failed`);
  popup(`✅ Google services: ${successCount} enabled`);
}

async function getModuleName() {
  try {
    const name = await runShell(`grep '^name=' ${PROP} | cut -d= -f2`);
    document.getElementById("module-name").textContent = name.trim();
    document.title = name.trim();
  } catch {
    document.getElementById("module-name").textContent = "CatBloat HOS";
  }
}

async function streamOutput(scriptPath) {
  const logPath = "/data/local/tmp/bloatlog";
  await runShell(`rm -f ${logPath}`);
  runShell(`sh ${scriptPath}`);

  let lastOutput = "";
  const interval = 500;

  const poll = setInterval(async () => {
    try {
      const content = await runShell(`cat ${logPath}`);
      if (content !== lastOutput) {
        const newLines = content.slice(lastOutput.length).trim();
        if (newLines) logOutput(newLines);
        lastOutput = content;
      }
    } catch (e) {
      clearInterval(poll);
      logOutput("[!] Error reading log.");
    }
  }, interval);

  setTimeout(() => clearInterval(poll), 60000);
}

function toggleTheme(isDark) {
  const html = document.documentElement;
  const body = document.body;
  
  body.classList.add('no-transition');
  
  if (isDark) {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
  
  void body.offsetHeight;
  
  setTimeout(() => {
    body.classList.remove('no-transition');
  }, 10);
}

document.addEventListener("DOMContentLoaded", () => {
  getModuleName();
  listAllApps();

  setTimeout(() => {
    document.getElementById("google-services-card").classList.add("show");
  }, 800);

  const disableBtn = document.getElementById("disable-btn");
  const enableBtn = document.getElementById("enable-btn");
  const refreshBtn = document.getElementById("refresh-apps-btn");
  const googleAggressiveBtn = document.getElementById("google-aggressive-btn");
  const googleSafeBtn = document.getElementById("google-safe-btn");
  const googleBatteryBtn = document.getElementById("google-battery-btn");
  const googleEnableBtn = document.getElementById("google-enable-btn");
  
  disableBtn.addEventListener("click", async () => {
    disableBtn.disabled = true;
    popup("⏳ Disabling all bloatware...");
    clearOutput();
    logOutput("[*] Running bulk disable script...");
    await streamOutput(DISABLE);
    setTimeout(() => {
      disableBtn.disabled = false;
      listAllApps();
    }, 1000);
  });

  enableBtn.addEventListener("click", async () => {
    enableBtn.disabled = true;
    popup("⏳ Re-enabling all bloatware...");
    clearOutput();
    logOutput("[*] Running bulk enable script...");
    await streamOutput(ENABLE);
    setTimeout(() => {
      enableBtn.disabled = false;
      listAllApps();
    }, 1000);
  });

  refreshBtn.addEventListener("click", () => {
    if (!refreshBtn.disabled) {
      listAllApps();
    }
  });

  // 🔶 AGGRESSIVE MODE
  googleAggressiveBtn.addEventListener("click", async () => {
    googleAggressiveBtn.disabled = true;
    await toggleGoogleAggressive();
    googleAggressiveBtn.disabled = false;
  });

  // 🔷 SAFE MODE
  googleSafeBtn.addEventListener("click", async () => {
    googleSafeBtn.disabled = true;
    await toggleGoogleSafe();
    googleSafeBtn.disabled = false;
  });

  // 🔋 BATTERY SAVER
  googleBatteryBtn.addEventListener("click", async () => {
    googleBatteryBtn.disabled = true;
    await restrictGoogleBattery();
    googleBatteryBtn.disabled = false;
  });

  // ✅ ENABLE ALL
  googleEnableBtn.addEventListener("click", async () => {
    googleEnableBtn.disabled = true;
    await enableAllGoogleServices();
    googleEnableBtn.disabled = false;
  });

  document.getElementById("clear-output").addEventListener("click", clearOutput);

  const toggle = document.getElementById("theme-toggle");
  const saved = localStorage.getItem("theme");

  if (saved === "dark") {
    document.documentElement.classList.add("dark");
    toggle.checked = true;
  }

  toggle.addEventListener("change", () => {
    toggleTheme(toggle.checked);
  });
  
  document.getElementById("search-input").addEventListener("input", filterApps);
});
