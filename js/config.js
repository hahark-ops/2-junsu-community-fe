// 배포 환경별 API 서버 주소를 이 파일에서 관리합니다.
// S3 정적 배포 시 이 값을 BE 주소로 설정하세요. 예) http://43.200.x.x:8000
window.RUNTIME_CONFIG = window.RUNTIME_CONFIG || {};
window.RUNTIME_CONFIG.API_BASE_URL = window.RUNTIME_CONFIG.API_BASE_URL || '';
