import Link from "next/link";
import styles from "@/styles/footer.module.css";

const servicesList = [
  { title: "التدقيق والتحرير اللغوي والتأليف", path: "/services/academic-proofreading" },
  { title: "التواصل المؤسسي والكتابة المهنية", path: "/services/corporate-writing" },
  { title: "الدعاية والإعلان وصناعة المحتوى", path: "/services/content-marketing" },
  { title: "خدمات طلبة الجامعات والباحثين", path: "/services/student-services" },
  { title: "تحرير الكتب والروايات", path: "/services/book-editing" },
  { title: "المراجعة والنقد الأكاديمي", path: "/services/academic-review" },
  { title: "التفريغ الصوتي", path: "/services/audio-transcription" }
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          {/* Column 1: Services */}
          <div className={styles.column}>
            <h3>مجالات عملنا</h3>
            <ul className={styles.linkList}>
              {servicesList.map((service, index) => (
                <li key={index}>
                  <Link href={service.path} className={styles.linkItem}>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Quick Links */}
          <div className={styles.column}>
            <h3>روابط سريعة</h3>
            <ul className={styles.linkList}>
              <li><Link href="/about" className={styles.linkItem}>من نحن</Link></li>
              <li><Link href="/services" className={styles.linkItem}>كافة الخدمات</Link></li>
              <li><Link href="/methodology" className={styles.linkItem}>منهجيتنا</Link></li>
              <li><Link href="/portfolio" className={styles.linkItem}>نماذج أعمالنا</Link></li>
              <li><Link href="/faq" className={styles.linkItem}>الأسئلة الشائعة</Link></li>
              <li><Link href="/blog" className={styles.linkItem}>المدونة</Link></li>
              <li><Link href="/contact" className={styles.linkItem}>اتصل بنا</Link></li>
              <li><a href="https://wa.me/967770334448?text=%D9%85%D8%B1%D8%AD%D8%A8%D9%8B%D8%A7%20%D9%85%D9%86%D8%B5%D8%A9%20%D8%A7%D9%84%D8%AC%D9%84%D8%A7%D9%84%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D8%A7%D9%84%D8%AA%D8%AF%D9%82%D9%8A%D9%82%20%D8%A7%D9%84%D9%84%D8%BA%D9%88%D9%8A%20%D8%A7%D9%84%D9%85%D9%8F%D8%AD%D9%92%D9%83%D9%8E%D9%85:" target="_blank" rel="noopener noreferrer" className={styles.linkItem}>طلب عرض سعر</a></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className={styles.column}>
            <h3>الجلال — التدقيق اللغوي المُحْكَم</h3>
            <p style={{ color: "var(--copper-light)", fontSize: "0.88rem", marginBottom: "16px", lineHeight: "1.6" }}>
              الدقة في اللغة... والإحكام في الصياغة. نمنح النصوص قوة لغوية ووضوحًا فكريًا وتأثيرًا يُحدث الفرق.
            </p>
            <div className={styles.contactInfo}>
              <div className={styles.contactRow}>
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="var(--copper-light)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>الجمهورية اليمنية – صنعاء</span>
              </div>
              <div className={styles.contactRow}>
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="var(--copper-light)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a href="mailto:jalal611@gmail.com" className={styles.linkItem}>jalal611@gmail.com</a>
              </div>
              <div className={styles.contactRow}>
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="var(--copper-light)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a href="https://wa.me/967770334448" className={styles.linkItem} dir="ltr">+967 770 334 448</a>
              </div>
            </div>
          </div>
        </div>

        {/* Ethical commitment banner */}
        <div className={styles.ethicalBanner}>
          <p className={styles.ethicalText}>
            ✦ التزامنا بأخلاقيات البحث العلمي: لا نقدِّم خدمة كتابة البحوث أو الرسائل العلمية، وإنما نقتصر على التدقيق والتحرير والمراجعة والنقد الأكاديمي بما يحفظ أصالة العمل وملكية صاحبه.
          </p>
        </div>

        {/* Bottom copyright and legal links */}
        <div className={styles.bottom}>
          <p>© ٢٠٢٦ الجلال للتدقيق اللغوي المُحْكَم. جميع الحقوق محفوظة.</p>
          <div className={styles.legalLinks}>
            <Link href="/privacy" className={styles.legalLink}>سياسة الخصوصية</Link>
            <span>|</span>
            <Link href="/terms" className={styles.legalLink}>الشروط والأحكام</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
