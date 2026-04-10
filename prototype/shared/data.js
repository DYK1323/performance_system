/* ============================================================
   성과관리 플랫폼 프로토타입 — 공통 Mock 데이터
   모든 HTML 파일이 이 데이터를 참조한다.
============================================================ */
const APP = {

  /* 현재 로그인 사용자 */
  user: {
    name: '홍길동',
    org: '기획처 기획조정팀',
    role: 'admin'   // 'admin' | 'user'
  },

  /* 현재 선택된 사업 (관리자·담당자 공통) */
  currentProgram: {
    id: 'prog_2026_roadmap',
    name: '2026 중장기발전계획',
    version: '2026 운영본',
    period: '2026년 1차 점검',
    dueDate: '04/12',
    dDay: 'D-2'
  },

  /* 전체 사업 목록 */
  programs: [
    {
      id: 'prog_2026_roadmap',
      name: '2026 중장기발전계획',
      ownerOrg: '기획처 기획조정팀',
      status: 'active',
      versions: 3,
      period: '2026년 1차 점검',
      dDay: 'D-2',
      lastActivity: '2026-04-10'
    },
    {
      id: 'prog_2026_eval',
      name: '2026 자체평가',
      ownerOrg: '기획처 기획조정팀',
      status: 'active',
      versions: 1,
      period: '2026년 1차 점검',
      dDay: 'D-2',
      lastActivity: '2026-04-09'
    },
    {
      id: 'prog_2025_roadmap',
      name: '2025 중장기발전계획',
      ownerOrg: '기획처 기획조정팀',
      status: 'done',
      versions: 2,
      period: '2025년 최종 점검',
      dDay: null,
      lastActivity: '2025-12-20'
    }
  ],

  /* 관리자 대시보드 통계 */
  admStats: {
    totalItems: 142,
    pendingItems: 23,
    completionRate: 83.8,
    depts: [
      { name: '교무처',   total: 38, done: 28, pending: 10, rate: 73.7, lastAt: '2026-04-10 11:22' },
      { name: '학생처',   total: 24, done: 17, pending: 7,  rate: 70.8, lastAt: '2026-04-09 16:45' },
      { name: '연구처',   total: 31, done: 25, pending: 6,  rate: 80.6, lastAt: '2026-04-10 09:18' },
      { name: '기획처',   total: 18, done: 18, pending: 0,  rate: 100,  lastAt: '2026-04-08 14:33' },
      { name: '대외협력처', total: 31, done: 31, pending: 0, rate: 100,  lastAt: '2026-04-07 17:02' }
    ]
  },

  /* 담당자 통계 */
  usrStats: {
    totalItems: 24,
    doneItems: 17,
    pendingItems: 7,
    dueDate: '04/12',
    dDay: 'D-2'
  },

  /* 담당자 - 담당 사업 */
  usrPrograms: [
    {
      id: 'prog_2026_roadmap',
      name: '2026 중장기발전계획',
      version: '2026 운영본',
      period: '2026년 1차 점검',
      dDay: 'D-2',
      total: 14, done: 8, pending: 6, rate: 57,
      scope: '영역 1 · 영역 3'
    },
    {
      id: 'prog_2026_eval',
      name: '2026 자체평가',
      version: '2026 운영본',
      period: '2026년 1차 점검',
      dDay: 'D-2',
      total: 10, done: 9, pending: 1, rate: 90,
      scope: '전체 (program)'
    },
    {
      id: 'prog_2025_roadmap',
      name: '2025 중장기발전계획',
      version: '2025 운영본',
      period: '2025년 최종 점검',
      dDay: null,
      total: 14, done: 14, pending: 0, rate: 100,
      scope: '영역 1 · 영역 3'
    }
  ],

  /* 담당자 - 미입력 항목 */
  pendingItems: [
    { code: '01-01', name: '학부 정원 충원율', program: '2026 중장기발전계획', type: 'quant', plan: '98%',    dueDate: '04/12' },
    { code: '01-02', name: '신입생 충원율',     program: '2026 중장기발전계획', type: 'quant', plan: '95%',    dueDate: '04/12' },
    { code: '01-03', name: '교육과정 개선 추진 현황', program: '2026 중장기발전계획', type: 'qual', plan: '계획 서술', dueDate: '04/12' },
    { code: '02-01', name: '취업률',           program: '2026 중장기발전계획', type: 'quant', plan: '72%',    dueDate: '04/12' },
    { code: '02-02', name: '산학협력 협약 건수', program: '2026 중장기발전계획', type: 'quant', plan: '15건',   dueDate: '04/12' },
    { code: '03-01', name: '재정 자립도',       program: '2026 중장기발전계획', type: 'quant', plan: '65%',    dueDate: '04/12' },
    { code: 'E-01',  name: '교육 성과 종합 서술', program: '2026 자체평가',      type: 'qual', plan: '종합 서술', dueDate: '04/12' }
  ],

  /* 담당자 - 지표 목록 (현재 사업) */
  items: [
    { code: '01-01', name: '학부 정원 충원율',   type: 'quant', plan: '98%',  actual: null,    rate: null,   status: 'empty',  dueDate: '04/12' },
    { code: '01-02', name: '신입생 충원율',       type: 'quant', plan: '95%',  actual: null,    rate: null,   status: 'empty',  dueDate: '04/12' },
    { code: '01-03', name: '교육과정 개선 추진 현황', type: 'qual', plan: '계획 서술', actual: null, rate: null, status: 'empty', dueDate: '04/12' },
    { code: '02-01', name: '취업률',             type: 'quant', plan: '72%',  actual: '68.5%', rate: '95.1%', status: 'warn',  dueDate: '저장됨' }
  ]
};
