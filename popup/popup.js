const TRANSLATIONS = {
  en: {
    noProxy:        'No active proxy',
    newProfile:     'New Profile',
    editProfile:    'Edit Profile',
    noProfilesTitle:'No profiles yet',
    noProfilesSub:  'Click {+} to add your first proxy',
    labelName:      'Name',
    labelProtocol:  'Protocol',
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
    domainNote:     'Exact hostname or subdomain matching. "example.com" matches any subdomain of example.com.'
  },
  ru: {
    noProxy:        'Нет активного прокси',
    newProfile:     'Новый профиль',
    editProfile:    'Редактировать',
    noProfilesTitle:'Нет профилей',
    noProfilesSub:  'Нажмите {+}, чтобы добавить прокси',
    labelName:      'Название',
    labelProtocol:  'Протокол',
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
    domainNote:     'Точное имя хоста или поддомен. "example.com" соответствует любому поддомену example.com.'
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
}

let state = { enabled: false, activeProfileId: null, profiles: [], tunnelMode: 'all', tunnelDomains: [] };
let selectedType = 'http';
let disconnectBar = null;

const DRAFT_KEY = 'uniproxy_form_draft';

function saveDraft() {
  const draft = {
    id:       document.getElementById('profileId').value || null,
    name:     document.getElementById('profileName').value,
    type:     selectedType,
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
  document.getElementById('viewList').classList.add('hidden');
  document.getElementById('viewForm').classList.remove('hidden');

  document.getElementById('profileId').value   = draft.id || '';
  document.getElementById('profileName').value = draft.name || '';
  document.getElementById('profileHost').value = draft.host || '';
  document.getElementById('profilePort').value = draft.port || '';
  document.getElementById('profileUser').value = draft.username || '';
  document.getElementById('profilePass').value = draft.password || '';
  document.getElementById('toast').className   = 'toast hidden';

  selectedType = draft.type || 'http';
  document.querySelectorAll('.type-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.type === selectedType);
  });

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
  const iconColor = typeColors[profile.type] || '#888';

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
      <div class="profile-name">${escHtml(profile.name)}</div>
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
  document.getElementById('viewList').classList.add('hidden');
  const formView = document.getElementById('viewForm');
  formView.classList.remove('hidden');

  document.getElementById('profileId').value   = '';
  document.getElementById('profileName').value = '';
  document.getElementById('profileHost').value = '';
  document.getElementById('profilePort').value = '';
  document.getElementById('profileUser').value = '';
  document.getElementById('profilePass').value = '';
  document.getElementById('toast').className   = 'toast hidden';
  document.getElementById('formTitle').textContent = t('newProfile');

  selectedType = 'http';
  document.querySelectorAll('.type-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.type === 'http');
  });

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
    document.querySelectorAll('.type-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.type === selectedType);
    });
  }
  saveDraft();
  applyTranslations();
}

function closeForm() {
  clearDraft();
  document.getElementById('viewForm').classList.add('hidden');
  document.getElementById('viewList').classList.remove('hidden');
}

function getFormProfile() {
  return {
    id:       document.getElementById('profileId').value || null,
    name:     document.getElementById('profileName').value.trim(),
    type:     selectedType,
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
      // Saved successfully — clear draft
      clearDraft();
      closeFormAfterSave();
      renderAll();
    } else {
      showToast(t('errSave'), 'error');
    }
  });
}

function closeFormAfterSave() {
  document.getElementById('viewForm').classList.add('hidden');
  document.getElementById('viewList').classList.remove('hidden');
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
      showToast(t('testFail') + (res?.error || 'Could not reach proxy'), 'error');
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
    document.getElementById('viewList').classList.add('hidden');
    document.getElementById('viewForm').classList.add('hidden');
    const settingsView = document.getElementById('viewSettings');
    settingsView.classList.remove('hidden');
    renderSettingsView();
    applyTranslations();
  });
}

function closeSettings() {
  document.getElementById('viewSettings').classList.add('hidden');
  document.getElementById('viewList').classList.remove('hidden');
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
      showSettingsToast(`Mode changed to ${mode === 'all' ? 'All sites' : 'Specific sites'}`, 'success');
    } else {
      showSettingsToast('Failed to update mode', 'error');
    }
  });
}

async function addDomainHandler() {
  const input = document.getElementById('newDomainInput');
  let domain = input.value.trim().toLowerCase();
  if (!domain) return;
  if (domain !== 'localhost' && (!domain.includes('.') || domain.startsWith('.') || domain.endsWith('.'))) {
    showSettingsToast('Invalid domain format', 'error');
    return;
  }
  try {
    const resp = await chrome.runtime.sendMessage({ action: 'addTunnelDomain', domain });
    if (resp && resp.success) {
      input.value = '';
      await renderSettingsView();
      showSettingsToast(`Added: ${domain}`, 'success');
    } else {
      showSettingsToast('Failed to add domain', 'error');
    }
  } catch (err) {
    console.error(err);
    showSettingsToast('Failed to add domain', 'error');
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
      showSettingsToast(`Removed: ${domain}`, 'success');
    } else {
      showSettingsToast('Failed to remove domain', 'error');
    }
  } catch (err) {
    console.error(err);
    showSettingsToast('Failed to remove domain', 'error');
  }
}

function showSettingsToast(message, type = 'success') {
  const toast = document.getElementById('settingsToast');
  if (!toast) return;
  toast.textContent = message;
  toast.className = `toast ${type}`;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => { toast.className = 'toast hidden'; }, 2000);
}

function togglePassword() {
  const input = document.getElementById('profilePass');
  input.type = input.type === 'password' ? 'text' : 'password';
}

function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast ${type}`;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => { toast.className = 'toast hidden'; }, 3000);
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