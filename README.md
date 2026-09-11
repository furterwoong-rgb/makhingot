# 막힌곳 — 랜딩 페이지

Next.js 14 (App Router) 프로젝트. 로컬 개발, 접수 저장(구글시트), GitHub, Vercel, Cloudflare 순서로 세팅하면 됩니다.

## 0. 로컬에서 확인

```bash
npm install
npm run dev
```

http://localhost:3000 에서 확인. 이 상태에서 폼을 제출하면 서버 콘솔(터미널)에 `new lead (no webhook configured):` 로그가 찍힙니다. 아직 저장소가 안 붙어서 그런 거고, 정상입니다.

## 1. 신청 데이터를 구글시트에 쌓기 (선택이지만 강력 추천)

별도 백엔드 없이 무료로 접수 데이터를 쌓는 가장 쉬운 방법입니다.

1. 구글시트를 새로 만들고, 1행에 `received_at, name, phone, grade, where, pain, consent` 를 적습니다. (`received_at`은 한국 시간으로 기록됩니다.)
2. 시트 메뉴 **확장 프로그램 → Apps Script** 를 엽니다.
3. 아래 코드를 붙여넣습니다.

   ```javascript
   function doPost(e) {
     const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     const data = JSON.parse(e.postData.contents);
     const receivedKst = Utilities.formatDate(
       new Date(data.received_at), "Asia/Seoul", "yyyy-MM-dd HH:mm:ss"
     );
     sheet.appendRow([
       receivedKst, data.name, data.phone, data.grade, data.where, data.pain,
       data.consent === true ? "동의" : ""
     ]);
     return ContentService.createTextOutput(JSON.stringify({ ok: true }))
       .setMimeType(ContentService.MimeType.JSON);
   }
   ```

4. 우측 상단 **배포 → 새 배포** → 유형 "웹 앱" 선택.
   - 실행 권한: 나
   - 액세스 권한: **모든 사용자** (이게 핵심 — 아니면 우리 서버가 못 씁니다)
5. 배포하면 `https://script.google.com/macros/s/xxxx/exec` 형태의 URL이 나옵니다. 이걸 복사해두세요.

> 나중에 스크립트를 수정하면 **배포 → 배포 관리 → ✏️ 편집 → 버전: 새 버전 → 배포** 로 올려야 반영됩니다(URL 유지). "새 배포"를 누르면 URL이 바뀌니 주의.

이 URL을 3단계(Vercel)에서 `LEADS_WEBHOOK_URL` 환경변수로 넣으면, 신청이 들어올 때마다 시트에 한 줄씩 쌓입니다.

## 2. GitHub에 올리기

```bash
git init
git add .
git commit -m "init"
gh repo create makhingot --private --source=. --push
```

`gh` CLI가 없으면 GitHub 웹에서 새 저장소를 만들고 안내되는 명령어로 push하면 됩니다.

## 3. Vercel에 배포

1. https://vercel.com 에서 GitHub 계정으로 로그인 → **Add New → Project** → 방금 만든 저장소 선택.
2. 프레임워크는 Next.js로 자동 인식됩니다. 그대로 **Deploy**.
3. 배포 후 **Project → Settings → Environment Variables** 에서 추가:
   - `LEADS_WEBHOOK_URL` = 1단계에서 복사한 Apps Script URL
4. 환경변수 추가 후 **Deployments → 최신 배포 → Redeploy** 한 번 눌러줘야 반영됩니다.

여기까지 하면 `프로젝트명.vercel.app` 주소로 실제 접속·신청이 됩니다.

## 4. Cloudflare로 내 도메인 연결

도메인이 이미 있고 Cloudflare에서 네임서버를 관리 중이라는 전제입니다. 도메인이 없다면 Cloudflare Registrar나 가비아 등에서 먼저 구매하세요.

1. Vercel 프로젝트 → **Settings → Domains** → 원하는 도메인(예: `makhingot.com`) 입력 → Add.
2. Vercel이 안내하는 레코드를 그대로 적어둡니다. 보통 이 둘 중 하나입니다.
   - 루트 도메인(`makhingot.com`): `A` 레코드 → `76.76.21.21`
   - www 서브도메인: `CNAME` → `cname.vercel-dns.com`
3. Cloudflare 대시보드 → 해당 도메인 → **DNS** 탭 → 위 레코드를 그대로 추가.
   - **중요**: 각 레코드의 프록시 상태(구름 아이콘)를 **DNS only(회색)** 로 둡니다. 주황색(프록시 켜짐)으로 두면 Vercel의 자동 SSL 발급과 충돌할 수 있습니다.
4. 몇 분~몇십 분 뒤 Vercel Domains 탭에 초록 체크가 뜨면 연결 완료. `https://내도메인` 으로 접속됩니다.

## 다음에 할 일 (지금은 안 해도 됨)

- 접수 알림을 카카오톡/문자로 받고 싶으면 Apps Script에 `MessageApp` 또는 슬랙 웹훅을 얹으면 됩니다.
- 신청 폼 스팸 방지가 필요해지면 Cloudflare Turnstile(무료 캡차)을 붙이면 됩니다.
- 지금은 랜딩 페이지 하나뿐이라 이 정도 구성으로 충분합니다.
