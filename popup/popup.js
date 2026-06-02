const TRANSLATIONS = {
  en: {
    noProxy:        'No active proxy',
    newProfile:     'New Profile',
    editProfile:    'Edit Profile',
    noProfilesTitle:'No profiles yet',
    noProfilesSub:  'Click {+} to add your first proxy',
    labelName:      'Name',
    labelProtocol:  'Protocol',
    labelColor:     'Color',
    labelHost:      'Host',
    labelPort:      'Port',
    labelUser:      'Username',
    labelPass:      'Password',
    optional:       'optional',
    placeholderName:'e.g. Work VPN',
    placeholderHost:'127.0.0.1',
    placeholderPort:'8080',
    placeholderUser:'username',
    placeholderPass:'••••••••',
    btnTest:        'Test',
    btnSave:        'Save',
    disconnect:     'Disconnect',
    connectedVia:   'Connected via',
    errName:        'Name is required',
    errHost:        'Host is required',
    errPort:        'Valid port (1–65535) is required',
    errSave:        'Failed to save profile',
    errConnect:     'Connection failed: ',
    testOk:         'Proxy reachable — {ms}ms',
    testFail:       'Test failed: ',
    titleAdd:       'New Profile',
    flagNext:       'ENG',
    settingsTitle:  'Site Tunneling',
    tunnelModeLabel:'Proxy Mode',
    modeAll:        'All sites',
    modeSpecific:   'Specific only',
    modeNote:       'When "Specific only" is selected, only the domains listed below will use the proxy. Other traffic goes direct.',
    domainsLabel:   'Tunneled Domains',
    domainPlaceholder: 'example.com',
    addDomainBtn:   '+ Add',
    domainNote:     'Exact hostname or subdomain matching. "example.com" matches any subdomain of example.com.',
    importBtn:      'Import .txt',
    importTitle:    'Import Domains',
    importSub:      'Preview before adding',
    importNew:      'New',
    importDupes:    'Dupes',
    importInvalid:  'Invalid',
    importCancel:   'Cancel',
    importConfirm:  'Add Domains',
    importEmpty:    'File is empty or has no valid domains',
    importDone:     'Imported {n} domain(s)',
    modeChangedAll:  'Mode: All sites',
    modeChangedSpec: 'Mode: Specific sites only',
    modeChangeFail:  'Failed to update mode',
    domainInvalid:   'Invalid domain format',
    domainAdded:     'Added: {domain}',
    domainAddFail:   'Failed to add domain',
    domainRemoved:   'Removed: {domain}',
    domainRemoveFail:'Failed to remove domain',
    testFailSuffix:  'Could not reach proxy',
  },
  ru: {
    noProxy:        'Нет активного прокси',
    newProfile:     'Новый профиль',
    editProfile:    'Редактировать',
    noProfilesTitle:'Нет профилей',
    noProfilesSub:  'Нажмите {+}, чтобы добавить прокси',
    labelName:      'Название',
    labelProtocol:  'Протокол',
    labelColor:     'Цвет',
    labelHost:      'Хост',
    labelPort:      'Порт',
    labelUser:      'Пользователь',
    labelPass:      'Пароль',
    optional:       'необязательно',
    placeholderName:'напр. Рабочий VPN',
    placeholderHost:'127.0.0.1',
    placeholderPort:'8080',
    placeholderUser:'имя пользователя',
    placeholderPass:'••••••••',
    btnTest:        'Тест',
    btnSave:        'Сохранить',
    disconnect:     'Отключить',
    connectedVia:   'Подключено через',
    errName:        'Введите название',
    errHost:        'Введите хост',
    errPort:        'Укажите корректный порт (1–65535)',
    errSave:        'Ошибка сохранения профиля',
    errConnect:     'Ошибка подключения: ',
    testOk:         'Прокси доступен — {ms}мс',
    testFail:       'Тест не удался: ',
    titleAdd:       'Новый профиль',
    flagNext:       'RU',
    settingsTitle:  'Туннелирование сайтов',
    tunnelModeLabel:'Режим прокси',
    modeAll:        'Все сайты',
    modeSpecific:   'Только указанные',
    modeNote:       'В режиме «Только указанные» прокси будет использоваться только для доменов из списка ниже. Остальной трафик идёт напрямую.',
    domainsLabel:   'Туннелируемые домены',
    domainPlaceholder: 'example.com',
    addDomainBtn:   '+ Добавить',
    domainNote:     'Точное имя хоста или поддомен. "example.com" соответствует любому поддомену example.com.',
    importBtn:      'Импорт .txt',
    importTitle:    'Импорт доменов',
    importSub:      'Предпросмотр перед добавлением',
    importNew:      'Новых',
    importDupes:    'Дубли',
    importInvalid:  'Неверных',
    importCancel:   'Отмена',
    importConfirm:  'Добавить',
    importEmpty:    'Файл пуст или не содержит доменов',
    importDone:     'Импортировано: {n}',
    modeChangedAll:  'Режим: Все сайты',
    modeChangedSpec: 'Режим: Только указанные',
    modeChangeFail:  'Не удалось изменить режим',
    domainInvalid:   'Неверный формат домена',
    domainAdded:     'Добавлен: {domain}',
    domainAddFail:   'Не удалось добавить домен',
    domainRemoved:   'Удалён: {domain}',
    domainRemoveFail:'Не удалось удалить домен',
    testFailSuffix:  'Прокси недоступен',
  }
};

let lang = 'en';
function t(key, vars) {
  let str = (TRANSLATIONS[lang] || TRANSLATIONS.en)[key] || key;
  if (vars) Object.entries(vars).forEach(([k,v]) => { str = str.replace(`{${k}}`, v); });
  return str;
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (key) el.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.dataset.i18nPh;
    if (key) el.placeholder = t(key);
  });
  document.querySelectorAll('.optional').forEach(el => {
    el.textContent = t('optional');
  });
  if (!state.enabled || !state.activeProfileId) {
    document.getElementById('statusText').textContent = t('noProxy');
  } else {
    const activeProfile = (state.profiles || []).find(p => p.id === state.activeProfileId);
    document.getElementById('statusText').textContent = activeProfile ? activeProfile.name : t('connectedVia');
  }
  const testBtnText = document.querySelector('#testBtn .btn-text');
  if (testBtnText) testBtnText.textContent = t('btnTest');
  const saveBtn = document.getElementById('saveBtn');
  if (saveBtn) saveBtn.textContent = t('btnSave');
  const formView = document.getElementById('viewForm');
  if (formView && !formView.classList.contains('hidden')) {
    const profileId = document.getElementById('profileId').value;
    const formTitle = document.getElementById('formTitle');
    formTitle.textContent = profileId ? t('editProfile') : t('newProfile');
  }
  const emptyTitle = document.getElementById('emptyTitle');
  const emptySub = document.getElementById('emptySub');
  if (emptyTitle) emptyTitle.textContent = t('noProfilesTitle');
  if (emptySub) emptySub.innerHTML = t('noProfilesSub').replace('{+}', '<span>+</span>');
  document.getElementById('flagIcon').textContent = t('flagNext');
  document.getElementById('addBtn').title = t('newProfile');
  const settingsTitle = document.getElementById('viewSettings')?.querySelector('.form-title');
  if (settingsTitle) settingsTitle.textContent = t('settingsTitle');
  document.querySelectorAll('[data-i18n="modeAll"]').forEach(el => el.textContent = t('modeAll'));
  document.querySelectorAll('[data-i18n="modeSpecific"]').forEach(el => el.textContent = t('modeSpecific'));
  document.querySelectorAll('[data-i18n="modeNote"]').forEach(el => el.textContent = t('modeNote'));
  document.querySelectorAll('[data-i18n="domainsLabel"]').forEach(el => el.textContent = t('domainsLabel'));
  document.querySelectorAll('[data-i18n="addDomainBtn"]').forEach(el => el.textContent = t('addDomainBtn'));
  document.querySelectorAll('[data-i18n="domainNote"]').forEach(el => el.textContent = t('domainNote'));
  document.querySelectorAll('[data-i18n="importBtn"]').forEach(el => el.textContent = t('importBtn'));
}

let state = { enabled: false, activeProfileId: null, profiles: [], tunnelMode: 'all', tunnelDomains: [] };
let selectedType = 'http';
let selectedColor = '#00ff88';
let disconnectBar = null;

const PROFILE_COLORS = [
  '#00ff88',
  '#5b9dff',
  '#a78bfa',
  '#f0a500',
  '#ff3b5c',
  '#00d4ff',
  '#ff6b9d',
  '#c8ff00',
];

function showView(id) {
  ['viewList', 'viewForm', 'viewSettings'].forEach(v => {
    document.getElementById(v).classList.toggle('hidden', v !== id);
  });
}


const DRAFT_KEY = 'uniproxy_form_draft';

function saveDraft() {
  const draft = {
    id:       document.getElementById('profileId').value || null,
    name:     document.getElementById('profileName').value,
    type:     selectedType,
    color:    selectedColor,
    host:     document.getElementById('profileHost').value,
    port:     document.getElementById('profilePort').value,
    username: document.getElementById('profileUser').value,
    password: document.getElementById('profilePass').value,
  };
  chrome.storage.local.set({ [DRAFT_KEY]: draft });
}

function clearDraft() {
  chrome.storage.local.remove(DRAFT_KEY);
}

function renderColorSelector(active) {
  let container = document.getElementById('colorSelector');
  if (!container) return;
  container.innerHTML = '';
  PROFILE_COLORS.forEach(color => {
    const btn = document.createElement('button');
    btn.className = 'color-swatch' + (color === active ? ' active' : '');
    btn.style.setProperty('--swatch-color', color);
    btn.dataset.color = color;
    btn.type = 'button';
    btn.title = color;
    btn.addEventListener('click', () => {
      selectedColor = color;
      renderColorSelector(color);
      saveDraft();
    });
    container.appendChild(btn);
  });
}

function bindDraftListeners() {
  ['profileName', 'profileHost', 'profilePort', 'profileUser', 'profilePass'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', saveDraft);
  });
  document.getElementById('typeSelector').addEventListener('click', () => {
    setTimeout(saveDraft, 0);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  loadState();
  bindEvents();
  bindDraftListeners();
});

function loadState() {
  chrome.runtime.sendMessage({ action: 'getState' }, (res) => {
    if (res && res.state) {
      state = res.state;
    }
    if (!state.profiles) state.profiles = [];
    if (!state.tunnelDomains) state.tunnelDomains = [];

    chrome.storage.local.get(['uniproxy_lang', DRAFT_KEY], (data) => {
      if (data.uniproxy_lang) lang = data.uniproxy_lang;
      applyTranslations();
      renderAll();

      const draft = data[DRAFT_KEY];
      if (draft) {
        restoreFormFromDraft(draft);
      }

      if (document.getElementById('viewSettings') && !document.getElementById('viewSettings').classList.contains('hidden')) {
        renderSettingsView();
      }
    });
  });
}

function restoreFormFromDraft(draft) {
  showView('viewForm');

  document.getElementById('profileId').value   = draft.id || '';
  document.getElementById('profileName').value = draft.name || '';
  document.getElementById('profileHost').value = draft.host || '';
  document.getElementById('profilePort').value = draft.port || '';
  document.getElementById('profileUser').value = draft.username || '';
  document.getElementById('profilePass').value = draft.password || '';

  selectedType = draft.type || 'http';
  selectedColor = draft.color || PROFILE_COLORS[0];
  document.querySelectorAll('.type-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.type === selectedType);
  });
  renderColorSelector(selectedColor);

  const formTitle = document.getElementById('formTitle');
  formTitle.textContent = draft.id ? t('editProfile') : t('newProfile');

  applyTranslations();
}

function renderAll() {
  if (!state.profiles) state.profiles = [];
  if (!state.tunnelDomains) state.tunnelDomains = [];
  renderProfiles();
  renderStatusBar();
}

function bindEvents() {
  document.getElementById('langBtn').addEventListener('click', () => {
    lang = lang === 'en' ? 'ru' : 'en';
    chrome.storage.local.set({ uniproxy_lang: lang });
    const flag = document.getElementById('flagIcon');
    flag.classList.remove('flip');
    void flag.offsetWidth;
    flag.classList.add('flip');
    setTimeout(() => {
      applyTranslations();
      renderAll();
      if (document.getElementById('viewSettings') && !document.getElementById('viewSettings').classList.contains('hidden')) {
        renderSettingsView();
      }
    }, 0);
  });

  document.getElementById('addBtn').addEventListener('click', () => openForm());
  document.getElementById('backBtn').addEventListener('click', () => closeForm());
  document.getElementById('saveBtn').addEventListener('click', saveProfile);
  document.getElementById('testBtn').addEventListener('click', testProxy);
  document.getElementById('pwToggle').addEventListener('click', togglePassword);
  document.getElementById('settingsBtn').addEventListener('click', () => openSettings());
  document.getElementById('settingsBackBtn').addEventListener('click', () => closeSettings());
  document.getElementById('importDomainsBtn').addEventListener('click', () => {
    document.getElementById('importFileInput').click();
  });
  document.getElementById('importFileInput').addEventListener('change', handleImportFile);

  document.getElementById('typeSelector').addEventListener('click', (e) => {
    const btn = e.target.closest('.type-btn');
    if (!btn) return;
    document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedType = btn.dataset.type;
  });
}

function renderStatusBar() {
  const dot = document.getElementById('statusDot');
  const text = document.getElementById('statusText');
  const ip = document.getElementById('statusIp');

  if (state.enabled && state.activeProfileId) {
    const profile = (state.profiles || []).find(p => p.id === state.activeProfileId);
    dot.className = 'status-dot active';
    text.textContent = profile ? `${profile.name}` : t('connectedVia');
    ip.textContent = profile ? `${profile.host}:${profile.port}` : '';
  } else {
    dot.className = 'status-dot';
    text.textContent = t('noProxy');
    ip.textContent = '';
  }
}

function renderProfiles() {
  const profiles = state.profiles || [];
  const container = document.getElementById('profilesList');
  const empty = document.getElementById('emptyState');

  container.innerHTML = '';
  if (disconnectBar) { disconnectBar.remove(); disconnectBar = null; }

  if (profiles.length === 0) {
    empty.classList.add('visible');
    return;
  }

  empty.classList.remove('visible');

  if (state.enabled && state.activeProfileId) {
    const profile = profiles.find(p => p.id === state.activeProfileId);
    disconnectBar = createDisconnectBar(profile);
    container.before(disconnectBar);
  }

  profiles.forEach((profile, idx) => {
    const card = createProfileCard(profile, idx);
    container.appendChild(card);
  });
}

function createDisconnectBar(profile) {
  const bar = document.createElement('div');
  bar.className = 'disconnect-bar';
  bar.innerHTML = `
    <div class="disconnect-bar-text">
      <span class="status-dot active"></span>
      <span>${t('connectedVia')} <strong>${profile ? profile.name : ''}</strong></span>
    </div>
    <button class="disconnect-bar-btn">${t('disconnect')}</button>
  `;
  bar.querySelector('.disconnect-bar-btn').addEventListener('click', disconnectProxy);
  return bar;
}

function createProfileCard(profile, idx) {
  const isActive = state.enabled && state.activeProfileId === profile.id;
  const card = document.createElement('div');
  card.className = 'profile-card' + (isActive ? ' active' : '');
  card.style.animationDelay = `${idx * 40}ms`;

  const typeColors = { http: '#5b9dff', https: '#a78bfa', socks5: '#00ff88', socks4: '#f0a500' };
  const iconColor = profile.color || typeColors[profile.type] || '#888';

  card.innerHTML = `
    <div class="profile-icon">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7" stroke="${iconColor}" stroke-width="1.2"/>
        <path d="M8 4.5C6 4.5 4.5 6 4.5 8S6 11.5 8 11.5" stroke="${iconColor}" stroke-width="1.2" stroke-linecap="round"/>
        <path d="M8 4.5C10 4.5 11.5 6 11.5 8S10 11.5 8 11.5" stroke="${iconColor}" stroke-width="1.2" stroke-linecap="round" opacity="0.5"/>
        <line x1="1" y1="8" x2="15" y2="8" stroke="${iconColor}" stroke-width="1.2" opacity="0.3"/>
      </svg>
    </div>
    <div class="profile-info">
      <div class="profile-name">
        <span class="profile-color-dot" style="background:${iconColor}"></span>${escHtml(profile.name)}
      </div>
      <div class="profile-addr">${escHtml(profile.host)}:${escHtml(String(profile.port))}</div>
    </div>
    <span class="profile-type-badge">${escHtml(profile.type)}</span>
    <div class="profile-actions">
      <button class="icon-btn" title="Edit" data-action="edit">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M8.5 1.5L10.5 3.5L4 10H2V8L8.5 1.5Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
        </svg>
      </button>
      <button class="icon-btn danger" title="Delete" data-action="delete">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 3h8M4.5 3V1.5h3V3M5 5.5v3M7 5.5v3M2.5 3l.5 7h6l.5-7" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>
    <button class="connect-btn ${isActive ? 'active' : ''}" title="${isActive ? 'Disconnect' : 'Connect'}">
      ${isActive
        ? `<svg width="10" height="10" viewBox="0 0 10 10" fill="none">
             <rect x="2" y="2" width="2.5" height="6" rx="1" fill="currentColor"/>
             <rect x="5.5" y="2" width="2.5" height="6" rx="1" fill="currentColor"/>
           </svg>`
        : `<svg width="10" height="10" viewBox="0 0 10 10" fill="none">
             <path d="M3 2L8 5L3 8V2Z" fill="currentColor"/>
           </svg>`
      }
    </button>
  `;

  card.querySelector('.connect-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    if (isActive) disconnectProxy();
    else connectProxy(profile.id);
  });
  card.querySelector('[data-action="edit"]').addEventListener('click', (e) => {
    e.stopPropagation();
    openForm(profile);
  });
  card.querySelector('[data-action="delete"]').addEventListener('click', (e) => {
    e.stopPropagation();
    deleteProfile(profile.id);
  });
  return card;
}

function connectProxy(profileId) {
  const dot = document.getElementById('statusDot');
  dot.className = 'status-dot connecting';
  chrome.runtime.sendMessage({ action: 'connect', profileId }, (res) => {
    if (res && res.success) {
      state.enabled = true;
      state.activeProfileId = profileId;
      renderAll();
    } else {
      dot.className = 'status-dot';
      showNotification(t('errConnect') + (res?.error || 'Unknown error'));
    }
  });
}

function disconnectProxy() {
  chrome.runtime.sendMessage({ action: 'disconnect' }, (res) => {
    if (res && res.success) {
      state.enabled = false;
      state.activeProfileId = null;
      renderAll();
    }
  });
}

function deleteProfile(profileId) {
  const profiles = state.profiles || [];
  chrome.runtime.sendMessage({ action: 'deleteProfile', profileId }, (res) => {
    if (res && res.success) {
      state.profiles = profiles.filter(p => p.id !== profileId);
      if (state.activeProfileId === profileId) {
        state.enabled = false;
        state.activeProfileId = null;
      }
      renderAll();
    }
  });
}

function openForm(profile) {
  showView('viewForm');
  const formView = document.getElementById('viewForm');

  document.getElementById('profileId').value   = '';
  document.getElementById('profileName').value = '';
  document.getElementById('profileHost').value = '';
  document.getElementById('profilePort').value = '';
  document.getElementById('profileUser').value = '';
  document.getElementById('profilePass').value = '';
  document.getElementById('formTitle').textContent = t('newProfile');

  selectedType = 'http';
  document.querySelectorAll('.type-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.type === 'http');
  });
  selectedColor = PROFILE_COLORS[0];
  renderColorSelector(selectedColor);

  if (profile) {
    clearDraft();
    document.getElementById('formTitle').textContent = t('editProfile');
    document.getElementById('profileId').value   = profile.id || '';
    document.getElementById('profileName').value = profile.name || '';
    document.getElementById('profileHost').value = profile.host || '';
    document.getElementById('profilePort').value = profile.port || '';
    document.getElementById('profileUser').value = profile.username || '';
    document.getElementById('profilePass').value = profile.password || '';
    selectedType = profile.type || 'http';
    selectedColor = profile.color || PROFILE_COLORS[0];
    document.querySelectorAll('.type-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.type === selectedType);
    });
    renderColorSelector(selectedColor);
  }
  saveDraft();
  applyTranslations();
}

function closeForm() {
  clearDraft();
  showView('viewList');
}

function getFormProfile() {
  return {
    id:       document.getElementById('profileId').value || null,
    name:     document.getElementById('profileName').value.trim(),
    type:     selectedType,
    color:    selectedColor,
    host:     document.getElementById('profileHost').value.trim(),
    port:     document.getElementById('profilePort').value.trim(),
    username: document.getElementById('profileUser').value,
    password: document.getElementById('profilePass').value,
  };
}

function validateProfile(profile) {
  if (!profile.name) return t('errName');
  if (!profile.host) return t('errHost');
  if (!profile.port || isNaN(profile.port) || profile.port < 1 || profile.port > 65535)
    return t('errPort');
  return null;
}

function saveProfile() {
  const profiles = state.profiles || [];
  const profile = getFormProfile();
  const err = validateProfile(profile);
  if (err) { showToast(err, 'error'); return; }

  chrome.runtime.sendMessage({ action: 'saveProfile', profile }, (res) => {
    if (res && res.success) {
      const existing = profiles.findIndex(p => p.id === res.profile.id);
      if (existing > -1) profiles[existing] = res.profile;
      else profiles.push(res.profile);
      state.profiles = profiles;
      clearDraft();
      closeFormAfterSave();
      renderAll();
    } else {
      showToast(t('errSave'), 'error');
    }
  });
}

function closeFormAfterSave() {
  showView('viewList');
}

function testProxy() {
  const profile = getFormProfile();
  const err = validateProfile(profile);
  if (err) { showToast(err, 'error'); return; }

  const btn = document.getElementById('testBtn');
  const btnText = btn.querySelector('.btn-text');
  const loader = document.getElementById('testLoader');
  btnText.classList.add('hidden');
  loader.classList.remove('hidden');
  btn.disabled = true;

  chrome.runtime.sendMessage({ action: 'testProxy', profile }, (res) => {
    btnText.classList.remove('hidden');
    loader.classList.add('hidden');
    btn.disabled = false;
    if (res && res.success) {
      showToast(t('testOk', { ms: res.latency }), 'success');
    } else {
      showToast(t('testFail') + (res?.error || t('testFailSuffix')), 'error');
    }
  });
}

function openSettings() {
  chrome.runtime.sendMessage({ action: 'getState' }, (res) => {
    if (res && res.state) {
      state = res.state;
      if (!state.tunnelDomains) state.tunnelDomains = [];
      if (!state.tunnelMode) state.tunnelMode = 'all';
    }
    showView('viewSettings');
    renderSettingsView();
    applyTranslations();
  });
}

function closeSettings() {
  showView('viewList');
  renderAll();
}

async function renderSettingsView() {
  if (!state.tunnelDomains) state.tunnelDomains = [];
  let tunnelDomains = Array.isArray(state.tunnelDomains) ? [...state.tunnelDomains] : [];

  try {
    const resp = await chrome.runtime.sendMessage({ action: 'getTunnelSettings' });
    if (resp && typeof resp === 'object') {
      if (resp.mode !== undefined) state.tunnelMode = resp.mode;
      if (Array.isArray(resp.domains)) {
        tunnelDomains = [...resp.domains];
        state.tunnelDomains = tunnelDomains;
      } else {
        tunnelDomains = (tunnelDomains && tunnelDomains.length) ? tunnelDomains : [];
        state.tunnelDomains = tunnelDomains;
      }
    } else {
      tunnelDomains = (tunnelDomains && tunnelDomains.length) ? tunnelDomains : [];
      state.tunnelDomains = tunnelDomains;
    }
  } catch (err) {
    console.error('Failed to get tunnel settings', err);
    tunnelDomains = (tunnelDomains && tunnelDomains.length) ? tunnelDomains : [];
    state.tunnelDomains = tunnelDomains;
  }

  if (!tunnelDomains) tunnelDomains = [];
  if (!state.tunnelDomains) state.tunnelDomains = [];

  const modeBtns = document.querySelectorAll('.mode-btn');
  modeBtns.forEach(btn => {
    const mode = btn.dataset.mode;
    if (mode === state.tunnelMode) btn.classList.add('active');
    else btn.classList.remove('active');
  });

  const container = document.getElementById('domainList');
  if (!container) return;
  container.innerHTML = '';

  if (tunnelDomains.length === 0) {
    const emptyMsg = document.createElement('div');
    emptyMsg.className = 'domain-item';
    emptyMsg.style.justifyContent = 'center';
    emptyMsg.style.color = 'var(--text-muted)';
    emptyMsg.textContent = lang === 'en' ? 'No domains added' : 'Нет добавленных доменов';
    container.appendChild(emptyMsg);
  } else {
    tunnelDomains.forEach(domain => {
      const item = document.createElement('div');
      item.className = 'domain-item';
      item.innerHTML = `
        <span class="domain-name">${escHtml(domain)}</span>
        <button class="domain-delete" data-domain="${escHtml(domain)}">✕</button>
      `;
      item.querySelector('.domain-delete').addEventListener('click', () => removeDomain(domain));
      container.appendChild(item);
    });
  }

  modeBtns.forEach(btn => {
    btn.removeEventListener('click', modeClickHandler);
    btn.addEventListener('click', modeClickHandler);
  });
  const addBtn = document.getElementById('addDomainBtn');
  const input = document.getElementById('newDomainInput');
  if (addBtn) {
    addBtn.removeEventListener('click', addDomainHandler);
    addBtn.addEventListener('click', addDomainHandler);
  }
  if (input) {
    input.removeEventListener('keypress', domainKeyPress);
    input.addEventListener('keypress', domainKeyPress);
  }
}

function modeClickHandler(e) {
  const mode = e.currentTarget.dataset.mode;
  chrome.runtime.sendMessage({ action: 'setTunnelMode', mode }, (res) => {
    if (res && res.success) {
      state.tunnelMode = mode;
      renderSettingsView();
      showSettingsToast(t(mode === 'all' ? 'modeChangedAll' : 'modeChangedSpec'), 'success');
    } else {
      showSettingsToast(t('modeChangeFail'), 'error');
    }
  });
}

async function addDomainHandler() {
  const input = document.getElementById('newDomainInput');
  let domain = input.value.trim().toLowerCase();
  if (!domain) return;
  if (domain !== 'localhost' && (!domain.includes('.') || domain.startsWith('.') || domain.endsWith('.'))) {
    showSettingsToast(t('domainInvalid'), 'error');
    return;
  }
  try {
    const resp = await chrome.runtime.sendMessage({ action: 'addTunnelDomain', domain });
    if (resp && resp.success) {
      input.value = '';
      await renderSettingsView();
      showSettingsToast(t('domainAdded', { domain }), 'success');
    } else {
      showSettingsToast(t('domainAddFail'), 'error');
    }
  } catch (err) {
    console.error(err);
    showSettingsToast(t('domainAddFail'), 'error');
  }
}

function domainKeyPress(e) {
  if (e.key === 'Enter') addDomainHandler();
}

async function removeDomain(domain) {
  try {
    const resp = await chrome.runtime.sendMessage({ action: 'removeTunnelDomain', domain });
    if (resp && resp.success) {
      if (Array.isArray(state.tunnelDomains)) {
        state.tunnelDomains = state.tunnelDomains.filter(d => d !== domain);
      } else {
        state.tunnelDomains = [];
      }
      await renderSettingsView();
      showSettingsToast(t('domainRemoved', { domain }), 'success');
    } else {
      showSettingsToast(t('domainRemoveFail'), 'error');
    }
  } catch (err) {
    console.error(err);
    showSettingsToast(t('domainRemoveFail'), 'error');
  }
}

function showSettingsToast(message, type = 'success') {
  document.getElementById('floatNotif')?.remove();

  const notif = document.createElement('div');
  notif.id = 'floatNotif';
  notif.className = 'float-notif float-notif--' + type;

  const icon = type === 'success'
    ? '<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="6" stroke="currentColor" stroke-width="1.2"/><path d="M4 6.5l2 2 3-3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    : '<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="6" stroke="currentColor" stroke-width="1.2"/><path d="M6.5 4v3M6.5 9h.01" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>';

  notif.innerHTML = '<span class="float-notif__icon">' + icon + '</span><span class="float-notif__text">' + escHtml(message) + '</span>';

  document.getElementById('app').appendChild(notif);

  clearTimeout(showSettingsToast._timer);
  showSettingsToast._timer = setTimeout(() => {
    notif.classList.add('float-notif--out');
    setTimeout(() => notif.remove(), 350);
  }, 2000);
}

function togglePassword() {
  const input = document.getElementById('profilePass');
  input.type = input.type === 'password' ? 'text' : 'password';
}

function showToast(message, type = 'success') {
  document.getElementById('floatToast')?.remove();

  const notif = document.createElement('div');
  notif.id = 'floatToast';
  notif.className = 'float-notif float-notif--' + type;

  const icon = type === 'success'
    ? '<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="6" stroke="currentColor" stroke-width="1.2"/><path d="M4 6.5l2 2 3-3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    : '<svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="6.5" r="6" stroke="currentColor" stroke-width="1.2"/><path d="M6.5 4v3M6.5 9h.01" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>';

  notif.innerHTML = '<span class="float-notif__icon">' + icon + '</span><span class="float-notif__text">' + escHtml(message) + '</span>';

  document.getElementById('app').appendChild(notif);

  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    notif.classList.add('float-notif--out');
    setTimeout(() => notif.remove(), 350);
  }, 3000);
}

function showNotification(message) {
  if (chrome.notifications) {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: '../icons/icon48.png',
      title: 'UniProxy',
      message
    });
  }
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function isValidDomain(raw) {
  const d = raw.trim().toLowerCase();
  if (!d) return false;
  if (d === 'localhost') return true;
  const clean = d.startsWith('*.') ? d.slice(2) : d;
  if (/\s/.test(clean)) return false;
  if (clean.startsWith('.') || clean.endsWith('.')) return false;
  if (!/\./.test(clean)) return false;
  if (/[^\w.\-]/.test(clean)) return false;
  return true;
}

function parseTxtDomains(text) {
  const existing = Array.isArray(state.tunnelDomains) ? state.tunnelDomains : [];
  const seen = new Set(existing);
  const newDomains = [];
  const dupes = [];
  const invalid = [];

  const lines = text.split(/\r?\n/);
  for (let line of lines) {
    line = line.replace(/#.*$/, '').trim().toLowerCase();
    if (!line) continue;
    if (!isValidDomain(line)) { invalid.push(line); continue; }
    const domain = line.startsWith('*.') ? line.slice(2) : line;
    if (seen.has(domain)) { dupes.push(domain); continue; }
    seen.add(domain);
    newDomains.push(domain);
  }

  return { newDomains, dupes, invalid };
}

function handleImportFile(e) {
  const file = e.target.files[0];
  if (!file) return;
  e.target.value = '';

  const reader = new FileReader();
  reader.onload = (ev) => {
    const text = ev.target.result;
    const result = parseTxtDomains(text);
    showImportOverlay(result, file.name);
  };
  reader.readAsText(file, 'utf-8');
}

function showImportOverlay({ newDomains, dupes, invalid }, filename) {
  document.getElementById('importOverlay')?.remove();

  const totalNew = newDomains.length;
  const hasAnything = totalNew > 0;

  const overlay = document.createElement('div');
  overlay.className = 'import-overlay';
  overlay.id = 'importOverlay';

  const previewItems = [...newDomains.slice(0, 30).map(d =>
    `<div class="import-preview-item"><span>${escHtml(d)}</span></div>`
  )];
  if (newDomains.length > 30) {
    previewItems.push(`<div class="import-preview-more">+${newDomains.length - 30} ${lang === 'ru' ? 'ещё' : 'more'}</div>`);
  }
  if (newDomains.length === 0) {
    previewItems.push(`<div class="import-preview-item skipped"><span>${lang === 'ru' ? 'Нет новых доменов' : 'No new domains to add'}</span></div>`);
  }

  overlay.innerHTML = `
    <div class="import-card">
      <div class="import-card-header">
        <div class="import-card-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v8M5 8l3 3 3-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
          </svg>
        </div>
        <div>
          <div class="import-card-title">${escHtml(t('importTitle'))}</div>
          <div class="import-card-sub">${escHtml(filename)}</div>
        </div>
      </div>
      <div class="import-card-body">
        <div class="import-stats">
          <div class="import-stat">
            <div class="import-stat-value ${totalNew === 0 ? 'danger' : ''}">${totalNew}</div>
            <div class="import-stat-label">${escHtml(t('importNew'))}</div>
          </div>
          <div class="import-stat">
            <div class="import-stat-value ${dupes.length > 0 ? 'warn' : ''}">${dupes.length}</div>
            <div class="import-stat-label">${escHtml(t('importDupes'))}</div>
          </div>
          <div class="import-stat">
            <div class="import-stat-value ${invalid.length > 0 ? 'warn' : ''}">${invalid.length}</div>
            <div class="import-stat-label">${escHtml(t('importInvalid'))}</div>
          </div>
        </div>
        <div class="import-preview">${previewItems.join('')}</div>
      </div>
      <div class="import-card-actions">
        <button class="btn btn-ghost" id="importCancelBtn">${escHtml(t('importCancel'))}</button>
        <button class="btn btn-primary" id="importConfirmBtn" ${!hasAnything ? 'disabled style="opacity:.4;cursor:not-allowed"' : ''}>${escHtml(t('importConfirm'))}</button>
      </div>
    </div>
  `;

  document.getElementById('app').appendChild(overlay);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeImportOverlay();
  });
  document.getElementById('importCancelBtn').addEventListener('click', closeImportOverlay);
  document.getElementById('importConfirmBtn').addEventListener('click', () => {
    if (!hasAnything) return;
    confirmImport(newDomains);
  });
}

function closeImportOverlay() {
  const overlay = document.getElementById('importOverlay');
  if (overlay) {
    overlay.style.animation = 'none';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 150ms ease';
    setTimeout(() => overlay.remove(), 150);
  }
}

async function confirmImport(domains) {
  const btn = document.getElementById('importConfirmBtn');
  if (btn) { btn.disabled = true; btn.textContent = '...'; }

  let added = 0;
  for (const domain of domains) {
    try {
      const resp = await chrome.runtime.sendMessage({ action: 'addTunnelDomain', domain });
      if (resp && resp.success) {
        if (!Array.isArray(state.tunnelDomains)) state.tunnelDomains = [];
        if (!state.tunnelDomains.includes(domain)) {
          state.tunnelDomains.push(domain);
          added++;
        }
      }
    } catch (err) {
      console.error('Failed to add domain', domain, err);
    }
  }

  closeImportOverlay();
  await renderSettingsView();
  showSettingsToast(t('importDone', { n: added }), 'success');
}
