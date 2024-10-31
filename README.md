# Frontend

## Github Rules

### prefix
-   feat: 새로운 기능 구현
-   fix: 버그 수정
-   refactor: 코드 개선 및 리팩토링
-   docs: 문서화 작업, 문서 수정
-   chore: 비즈니스 로직과 어플리케이션 로직과 연관 없는 각종 작업들
-   style: 코드의 포맷 및 오타 수정 등 코드 자체의 변경이 없는 경우
-   design: 사용자 UI 디자인 변경
-   comment: 필요한 주석 추가 및 변경
-   rename: 파일 또는 폴더 명을 수정하거나 옮기는 작업만의 경우
-   remove: 파일을 삭제하는 작업만 수행한 경우
-   test: 테스트 코드, 리팩토링 테스트 코드 작성
-   perf: 성능 작업
-   ci: CI 작업
-   build: 빌드 및 패키지 관리 등
-   revert: 이전 변경 사항을 되돌리는 revert
-   !BREAKING CHANGE: 커다란 API 변경의 경우
-   !HOTFIX: 급하게 치명적인 버그를 고쳐야 하는 경우

### commit 이름 예시
> git commit -m 'category(field): do something'
> git commit -m 'feat(profile): add profile picture upload'

### Branch 이름 예시
> feat/T-123-new-login-system
> build/v2.0.1

### Others
-   PR이 Merge가 되면 사용했던 브랜치는 삭제한다.
-   코드 리뷰를 위해 팀원을 Reviewer 지정을 한다.
