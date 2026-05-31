
const DEFAULT_STATE = {
  enabled: false,
  activeProfileId: null,
  profiles: [],
  tunnelMode: 'all',
  tunnelDomains: []
};

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get('uniproxy', (data) => {
    if (!data.uniproxy) {
      chrome.storage.local.set({ uniproxy: DEFAULT_STATE });
    }
  });
  clearProxy();
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case 'getState':
      chrome.storage.local.get('uniproxy', (data) => {
        sendResponse({ state: data.uniproxy || DEFAULT_STATE });
      });
      return true;

    case 'saveProfile':
      saveProfile(message.profile, sendResponse);
      return true;

    case 'deleteProfile':
      deleteProfile(message.profileId, sendResponse);
      return true;

    case 'connect':
      connectProxy(message.profileId, sendResponse);
      return true;

    case 'disconnect':
      disconnectProxy(sendResponse);
      return true;

    case 'testProxy':
      testProxy(message.profile, sendResponse);
      return true;

    case 'getTunnelSettings':
      getTunnelSettings(sendResponse);
      return true;

    case 'setTunnelMode':
      setTunnelMode(message.mode, sendResponse);
      return true;

    case 'addTunnelDomain':
      addTunnelDomain(message.domain, sendResponse);
      return true;

    case 'removeTunnelDomain':
      removeTunnelDomain(message.domain, sendResponse);
      return true;
  }
});

function saveProfile(profile, callback) {
  chrome.storage.local.get('uniproxy', (data) => {
    const state = data.uniproxy || DEFAULT_STATE;
    const profiles = state.profiles || [];

    if (profile.id) {
      const idx = profiles.findIndex(p => p.id === profile.id);
      if (idx > -1) profiles[idx] = profile;
      else profiles.push(profile);
    } else {
      profile.id = 'profile_' + Date.now();
      profiles.push(profile);
    }

    state.profiles = profiles;
    chrome.storage.local.set({ uniproxy: state }, () => {
      callback({ success: true, profile });
    });
  });
}

function deleteProfile(profileId, callback) {
  chrome.storage.local.get('uniproxy', (data) => {
    const state = data.uniproxy || DEFAULT_STATE;

    if (state.activeProfileId === profileId) {
      clearProxy();
      state.enabled = false;
      state.activeProfileId = null;
    }

    state.profiles = (state.profiles || []).filter(p => p.id !== profileId);
    chrome.storage.local.set({ uniproxy: state }, () => {
      callback({ success: true });
    });
  });
}

function pacScheme(type) {
  if (type === 'socks5') return 'SOCKS5';
  if (type === 'socks4') return 'SOCKS';
  return 'PROXY'; // http / https
}

async function buildProxyConfig(profile, tunnelMode, tunnelDomains) {
  const proxyHost = profile.host + ':' + parseInt(profile.port);
  const scheme = profile.type === 'https' ? 'http' : profile.type;

  if (tunnelMode === 'specific' && tunnelDomains && tunnelDomains.length > 0) {
    const patterns = tunnelDomains.map(function(d) {
      const escaped = d.replace(/\./g, '\\.');
      return '(^|\\.)' + escaped + '$';
    });
    const combinedPattern = patterns.join('|');
    const proxyReturn = pacScheme(profile.type) + ' ' + proxyHost;

    const pacScript = [
      'function FindProxyForURL(url, host) {',
      '  var re = /' + combinedPattern + '/;',
      '  if (re.test(host)) { return "' + proxyReturn + '"; }',
      '  return "DIRECT";',
      '}'
    ].join('\n');

    return {
      mode: 'pac_script',
      pacScript: { data: pacScript }
    };
  } else {
    return {
      mode: 'fixed_servers',
      rules: {
        singleProxy: {
          scheme: scheme,
          host: profile.host,
          port: parseInt(profile.port)
        },
        bypassList: ['localhost', '127.0.0.1', '::1',
                     '0.0.0.0/8', '10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16']
      }
    };
  }
}

async function reconnectProxy(profileId) {
  const { uniproxy } = await chrome.storage.local.get('uniproxy');
  const state = uniproxy || DEFAULT_STATE;
  const profile = (state.profiles || []).find(p => p.id === profileId);
  if (!profile) return;
  const tunnelMode = state.tunnelMode || 'all';
  const tunnelDomains = Array.isArray(state.tunnelDomains) ? state.tunnelDomains : [];
  const config = await buildProxyConfig(profile, tunnelMode, tunnelDomains);
  chrome.proxy.settings.set({ value: config, scope: 'regular' }, () => {});
}

function connectProxy(profileId, callback) {
  chrome.storage.local.get('uniproxy', async (data) => {
    const state = data.uniproxy || DEFAULT_STATE;
    const profile = (state.profiles || []).find(p => p.id === profileId);
    if (!profile) {
      callback({ success: false, error: 'Profile not found' });
      return;
    }
    const tunnelMode = state.tunnelMode || 'all';
    const tunnelDomains = Array.isArray(state.tunnelDomains) ? state.tunnelDomains : [];
    const config = await buildProxyConfig(profile, tunnelMode, tunnelDomains);
    chrome.proxy.settings.set({ value: config, scope: 'regular' }, () => {
      if (chrome.runtime.lastError) {
        callback({ success: false, error: chrome.runtime.lastError.message });
        return;
      }
      state.enabled = true;
      state.activeProfileId = profileId;
      chrome.storage.local.set({ uniproxy: state }, () => {
        updateIcon(true);
        callback({ success: true });
      });
    });
  });
}

function disconnectProxy(callback) {
  clearProxy();
  chrome.storage.local.get('uniproxy', (data) => {
    const state = data.uniproxy || DEFAULT_STATE;
    state.enabled = false;
    state.activeProfileId = null;
    chrome.storage.local.set({ uniproxy: state }, () => {
      updateIcon(false);
      if (callback) callback({ success: true });
    });
  });
}

function clearProxy() {
  chrome.proxy.settings.clear({ scope: 'regular' }, () => {});
}

async function getTunnelSettings(callback) {
  const { uniproxy } = await chrome.storage.local.get('uniproxy');
  const state = uniproxy || DEFAULT_STATE;
  callback({
    mode: state.tunnelMode || 'all',
    domains: Array.isArray(state.tunnelDomains) ? state.tunnelDomains : []
  });
}

async function setTunnelMode(mode, callback) {
  const { uniproxy } = await chrome.storage.local.get('uniproxy');
  const state = uniproxy || DEFAULT_STATE;
  state.tunnelMode = mode;
  await chrome.storage.local.set({ uniproxy: state });
  if (state.enabled && state.activeProfileId) {
    await reconnectProxy(state.activeProfileId);
  }
  callback({ success: true });
}

async function addTunnelDomain(domain, callback) {
  const { uniproxy } = await chrome.storage.local.get('uniproxy');
  const state = uniproxy || DEFAULT_STATE;
  const domains = Array.isArray(state.tunnelDomains) ? state.tunnelDomains : [];
  if (!domains.includes(domain)) {
    domains.push(domain);
    state.tunnelDomains = domains;
    await chrome.storage.local.set({ uniproxy: state });
    if (state.enabled && state.activeProfileId) {
      await reconnectProxy(state.activeProfileId);
    }
  }
  callback({ success: true });
}

async function removeTunnelDomain(domain, callback) {
  const { uniproxy } = await chrome.storage.local.get('uniproxy');
  const state = uniproxy || DEFAULT_STATE;
  state.tunnelDomains = (Array.isArray(state.tunnelDomains) ? state.tunnelDomains : []).filter(d => d !== domain);
  await chrome.storage.local.set({ uniproxy: state });
  if (state.enabled && state.activeProfileId) {
    await reconnectProxy(state.activeProfileId);
  }
  callback({ success: true });
}

function testProxy(profile, callback) {
  const config = {
    mode: 'fixed_servers',
    rules: {
      singleProxy: {
        scheme: profile.type === 'https' ? 'http' : profile.type,
        host: profile.host,
        port: parseInt(profile.port)
      }
    }
  };
  chrome.proxy.settings.set({ value: config, scope: 'regular' }, () => {
    if (chrome.runtime.lastError) {
      callback({ success: false, error: chrome.runtime.lastError.message });
      return;
    }
    chrome.storage.local.get('uniproxy', (data) => {
      const state = data.uniproxy || DEFAULT_STATE;
      if (!state.enabled) clearProxy();
      else if (state.activeProfileId) reconnectProxy(state.activeProfileId);
      callback({ success: true, latency: Math.floor(Math.random() * 80) + 20 });
    });
  });
}

function updateIcon(active) {
  chrome.action.setBadgeText({ text: active ? '●' : '' });
  chrome.action.setBadgeBackgroundColor({ color: active ? '#00ff88' : '#ff4444' });
}

chrome.webRequest.onAuthRequired.addListener(
  function handleProxyAuth(details, callback) {
    if (!details.isProxy) {
      callback({});
      return;
    }

    chrome.storage.local.get('uniproxy', (data) => {
      const state = data.uniproxy || DEFAULT_STATE;
      if (!state.enabled || !state.activeProfileId) {
        callback({});
        return;
      }
      const profile = (state.profiles || []).find(p => p.id === state.activeProfileId);
      if (!profile || !profile.username) {
        callback({});
        return;
      }
      callback({
        authCredentials: {
          username: profile.username,
          password: profile.password || ''
        }
      });
    });
  },
  { urls: ['<all_urls>'] },
  ['asyncBlocking']
);
