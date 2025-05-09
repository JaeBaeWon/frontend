import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLinks}>
        <div className={styles.footerLink}>이용약관</div>
        <div className={styles.footerLink}>개인정보 처리방침</div>
        <div className={styles.footerLink}>디지털인증센터</div>
        <div className={styles.footerLink}>공지사항</div>
      </div>
      <div className={styles.footerInfo}>
        (주)재배원은 상품 거래를 중개하는 플랫폼 사업자이며, 상품과 관련된 모든
        책임은 판매자에게 있습니다.
        <br />
        (주)재배원의 모든 디지털 자산(웹사이트, 앱, UI, 콘텐츠 등)은 법적 보호를
        받으며, 무단 사용이나 데이터 수집은 법률에 따라 금지되어 있습니다.
        <br />ⓒ Podopicker. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
