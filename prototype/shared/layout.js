/* ============================================================
   성과관리 플랫폼 프로토타입 — 공통 레이아웃
   각 HTML에서 PAGE_CONFIG를 설정한 후 initLayout()을 호출한다.

   PAGE_CONFIG = {
     role      : 'adm' | 'usr',
     gnbActive : 'dashboard' | 'programs' | 'upload' | 'activity',   // adm
                 'home' | 'programs' | 'pending',                     // usr
     sidebar   : 'dashboard' | 'programs' | 'upload' | 'activity'    // adm 사이드바 섹션
               | 'program-setting' + tabId                            // 사업 설정 탭
               | 'home' | 'programs' | 'pending'                      // usr
   }
============================================================ */

function initLayout() {
  const cfg = window.PAGE_CONFIG || {};
  const gnbEl = document.getElementById('gnb');
  const sidebarEl = document.getElementById('sidebar');
  if (gnbEl)      gnbEl.outerHTML = cfg.role === 'usr' ? renderUsrGNB(cfg) : renderAdmGNB(cfg);
  if (sidebarEl)  sidebarEl.innerHTML = cfg.role === 'usr' ? renderUsrSidebar(cfg) : renderAdmSidebar(cfg);
}

/* ── 관리자 GNB ── */
function renderAdmGNB(cfg) {
  const items = [
    { id: 'dashboard', label: '대시보드',   href: 'dashboard.html' },
    { id: 'programs',  label: '사업 관리',  href: 'programs.html'  },
    { id: 'upload',    label: '업로드 이력', href: 'upload.html'   },
    { id: 'activity',  label: '활동 로그',  href: 'activity.html'  },
  ];
  const nav = items.map(i =>
    `<a href="${i.href}"${i.id === cfg.gnbActive ? ' class="active"' : ''}>${i.label}</a>`
  ).join('');
  return `<div class="gnb">
    <span class="brand">성과관리</span>
    <nav>${nav}</nav>
    <div class="gnb-right">
      <span class="org-label">${APP.user.org}</span>
      <span class="user-label">${APP.user.name}</span>
      <span class="role-badge admin">관리자</span>
    </div>
  </div>`;
}

/* ── 담당자 GNB ── */
function renderUsrGNB(cfg) {
  const items = [
    { id: 'home',     label: '홈',        href: 'dashboard.html' },
    { id: 'programs', label: '담당 사업', href: 'items.html'     },
    { id: 'pending',  label: '미입력 항목', href: 'items.html?tab=pending' },
  ];
  const nav = items.map(i =>
    `<a href="${i.href}"${i.id === cfg.gnbActive ? ' class="active"' : ''}>${i.label}</a>`
  ).join('');
  return `<div class="gnb">
    <span class="brand">성과관리</span>
    <nav>${nav}</nav>
    <div class="gnb-right">
      <span class="org-label">${APP.user.org}</span>
      <span class="user-label">${APP.user.name}</span>
      <span class="role-badge">담당자</span>
    </div>
  </div>`;
}

/* ── 관리자 사이드바 ── */
function renderAdmSidebar(cfg) {
  switch (cfg.sidebar) {
    case 'dashboard':
      return `
        <div class="sidebar-section-label">대시보드</div>
        <a href="dashboard.html" class="active">현황 대시보드</a>
        <span class="sidebar-static">미입력 모니터링 <span class="badge" style="float:right;font-size:10px;font-weight:700;background:#E65100;color:#fff;border-radius:10px;padding:1px 6px;">${APP.admStats.pendingItems}</span></span>
        <span class="sidebar-static">보고서 조회 <span class="badge-muted" style="float:right;font-size:10px;padding:1px 6px;background:#e0e0e0;color:#666;border-radius:10px;">준비 중</span></span>
        <div class="sidebar-divider"></div>
        <div class="sidebar-section-label">조회 기준</div>
        <div class="sidebar-current">${APP.currentProgram.name}</div>
        ${APP.programs.filter(p => p.id !== APP.currentProgram.id).map(p =>
          `<span class="sidebar-static">${p.name}${p.status === 'done' ? ' <span style="font-size:10px;color:#aaa">(완료)</span>' : ''}</span>`
        ).join('')}`;

    case 'programs':
      return `
        <div class="sidebar-section-label">사업 관리</div>
        <a href="programs.html" class="active">전체 사업 목록</a>`;

    case 'program-setting':
      const tabs = [
        { id: 'info',        label: '기본 정보'    },
        { id: 'version',     label: '운영본 관리'  },
        { id: 'schema',      label: '분류 체계'    },
        { id: 'statusset',   label: '상태 코드셋'  },
        { id: 'items',       label: '지표 관리'    },
        { id: 'formbuilder', label: '입력폼 구성'  },
        { id: 'periods',     label: '기간 관리'    },
        { id: 'permissions', label: '권한 배당'    },
      ];
      return `
        <div class="sidebar-section-label">사업 설정</div>
        ${tabs.map(t =>
          `<a href="program.html?tab=${t.id}"${t.id === cfg.tabActive ? ' class="active"' : ''}>${t.label}</a>`
        ).join('')}
        ${cfg.tabActive === 'items' ? `
        <div class="sidebar-divider"></div>
        <div class="sidebar-section-label">분류 필터</div>
        <div class="tree-node active">전체 (58)</div>
        <div class="tree-node">영역 1. 교육혁신 (24)</div>
        <div class="tree-node l2">전략 1-1. 교육과정 (12)</div>
        <div class="tree-node l2">전략 1-2. 학생지원 (12)</div>
        <div class="tree-node">영역 2. 연구역량 (18)</div>
        <div class="tree-node">영역 3. 대외협력 (16)</div>` : ''}`;

    case 'upload':
      return `
        <div class="sidebar-section-label">업로드 이력</div>
        <a href="upload.html" class="active">실적 업로드</a>
        <span class="sidebar-static">계획 업로드 <span style="float:right;font-size:10px;padding:1px 6px;background:#e0e0e0;color:#666;border-radius:10px;">준비 중</span></span>
        <span class="sidebar-static">전체 이력 <span style="float:right;font-size:10px;padding:1px 6px;background:#e0e0e0;color:#666;border-radius:10px;">준비 중</span></span>`;

    case 'activity':
      return `
        <div class="sidebar-section-label">활동 로그</div>
        <a href="activity.html" ${cfg.tabActive !== 'snapshot' ? 'class="active"' : ''}>값 확정 · 상태 확인</a>
        <a href="activity.html?tab=snapshot" ${cfg.tabActive === 'snapshot' ? 'class="active"' : ''}>기준일 집계 확정</a>
        <span class="sidebar-static">상세 활동 로그 <span style="float:right;font-size:10px;padding:1px 6px;background:#e0e0e0;color:#666;border-radius:10px;">준비 중</span></span>`;

    default: return '';
  }
}

/* ── 담당자 사이드바 ── */
function renderUsrSidebar(cfg) {
  const pendingCount = APP.usrStats.pendingItems;
  switch (cfg.sidebar) {
    case 'home':
      return `
        <div class="sidebar-section-label">대시보드</div>
        <a href="dashboard.html" class="active">내 현황</a>
        <a href="items.html?tab=pending">미입력 항목 <span class="badge">${pendingCount}</span></a>
        <a href="items.html">담당 사업 목록</a>`;

    case 'programs':
      return `
        <div class="sidebar-section-label">담당 사업</div>
        <a href="items.html" ${cfg.tabActive === 'programs' ? 'class="active"' : ''}>담당 사업 목록</a>
        <a href="items.html?tab=pending" ${cfg.tabActive === 'pending' ? 'class="active"' : ''}>미입력 항목 <span class="badge">${pendingCount}</span></a>
        <a href="items.html?tab=items" ${cfg.tabActive === 'items' ? 'class="active"' : ''}>지표 목록</a>
        ${cfg.tabActive === 'pending' ? `
        <div class="sidebar-divider"></div>
        <div class="sidebar-section-label">사업 필터</div>
        <div class="sidebar-current">전체 (${pendingCount})</div>
        <span class="sidebar-static">2026 중장기발전계획 (6)</span>
        <span class="sidebar-static">2026 자체평가 (1)</span>` : ''}
        ${cfg.tabActive === 'items' ? `
        <div class="sidebar-divider"></div>
        <div class="sidebar-section-label">분류체계</div>
        <div class="tree-node active">전체 <span class="tbadge">6</span></div>
        <div class="tree-node">영역 1. 교육혁신 <span class="tbadge">3</span></div>
        <div class="tree-node l2">전략 1-1. 교육과정 <span class="tbadge">2</span></div>
        <div class="tree-node l2">전략 1-2. 학생지원</div>
        <div class="tree-node">영역 2. 연구역량</div>` : ''}`;

    default: return '';
  }
}
