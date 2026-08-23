"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/styles/header.module.css";

const servicesList = [
  {
    title: "تدقيق الأبحاث والرسائل الجامعية",
    desc: "رسائل الماجستير والدكتوراه والأبحاث الأكاديمية.",
    path: "/services/academic-proofreading",
    icon: "🎓"
  },
  {
    title: "تحرير الكتب والمقالات",
    desc: "تحرير إبداعي وأسلوبي وتنسيق الروايات والكتب.",
    path: "/services/book-editing",
    icon: "📖"
  },
  {
    title: "الكتابة المؤسسية",
    desc: "ملفات الشركات والتقارير الرسمية والخطابات.",
    path: "/services/corporate-writing",
    icon: "🏢"
  },
  {
    title: "المحتوى التسويقي",
    desc: "كتابة وتدقيق محتوى المواقع ومواقع التواصل.",
    path: "/services/content-marketing",
    icon: "📱"
  },
  {
    title: "التفريغ الصوتي",
    desc: "تحويل الملفات الصوتية إلى نصوص عربية فصيحة.",
    path: "/services/audio-transcription",
    icon: "🎙️"
  },
  {
    title: "خدمات الطلاب",
    desc: "مساعدة الطلاب في الواجبات والمراجعات لغوياً.",
    path: "/services/student-services",
    icon: "🧑‍🎓"
  },
  {
    title: "المراجعة والنقد الأكاديمي",
    desc: "نقد وتفنيد الأطروحات العلمية وهيكلية البحث.",
    path: "/services/academic-review",
    icon: "📊"
  }
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeAll = () => {
    setIsMobileOpen(false);
    setIsMegaOpen(false);
  };

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : styles.notScrolled}`}>
        <div className={`container ${styles.navContainer}`}>
          
          {/* Logo */}
          <Link href="/" className={styles.logo} onClick={closeAll}>
            <span>الجلال</span>
            <span style={{ fontSize: "1.2rem", opacity: 0.8 }}>✦</span>
          </Link>

          {/* Nav Links (Desktop) */}
          <nav>
            <ul className={styles.navLinks}>
              <li>
                <Link href="/" className={`${styles.link} ${pathname === "/" ? styles.activeLink : ""}`}>
                  الرئيسية
                </Link>
              </li>
              
              <li 
                className={styles.navItem}
                onMouseEnter={() => setIsMegaOpen(true)}
                onMouseLeave={() => setIsMegaOpen(false)}
              >
                <span className={`${styles.link} ${pathname.startsWith("/services") ? styles.activeLink : ""}`}>
                  خدماتنا <span style={{ fontSize: "0.7rem" }}>▼</span>
                </span>
                
                {/* Mega Menu Dropdown */}
                <div className={`${styles.megaMenu} ${isMegaOpen ? styles.megaMenuVisible : ""}`}>
                  <ul className={styles.menuList}>
                    {servicesList.map((service, index) => (
                      <li key={index}>
                        <Link href={service.path} className={styles.menuLink} onClick={closeAll}>
                          <span style={{ fontSize: "1.2rem" }}>{service.icon}</span>
                          <div>
                            <span className={styles.menuTitle}>{service.title}</span>
                            <span className={styles.menuDesc}>{service.desc}</span>
                          </div>
                        </Link>
                      </li>
                    ))}
                    <li style={{ borderTop: "1px solid var(--border-color)", paddingTop: "8px", marginTop: "4px" }}>
                      <Link href="/services" className={styles.menuLink} style={{ justifyContent: "center", fontWeight: "bold" }} onClick={closeAll}>
                        عرض جميع الخدمات ←
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>

              <li>
                <Link href="/about" className={`${styles.link} ${pathname === "/about" ? styles.activeLink : ""}`}>
                  من نحن
                </Link>
              </li>
              
              <li>
                <Link href="/blog" className={`${styles.link} ${pathname.startsWith("/blog") ? styles.activeLink : ""}`}>
                  المدونة
                </Link>
              </li>
            </ul>
          </nav>

          {/* Quote Button (Desktop) */}
          <div className={styles.ctaButton}>
            <a href="https://wa.me/967770334448?text=%D9%85%D8%B1%D8%AD%D8%A8%D9%8B%D8%A7%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%D9%83%D9%85%20%D8%A7%D9%84%D9%84%D8%BA%D9%88%D9%8A%D8%A9" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              طلب عرض سعر
            </a>
          </div>

          {/* Hamburger (Mobile) */}
          <button 
            className={`${styles.hamburger} ${isMobileOpen ? styles.hamburgerOpen : ""}`} 
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="القائمة"
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div 
        className={`${styles.mobileOverlay} ${isMobileOpen ? styles.overlayVisible : ""}`} 
        onClick={closeAll}
      ></div>

      {/* Mobile Drawer Panel */}
      <div className={`${styles.mobileNav} ${isMobileOpen ? styles.mobileNavOpen : ""}`}>
        <ul className={styles.mobileLinks}>
          <li>
            <Link href="/" className={styles.link} style={{ fontSize: "1.1rem" }} onClick={closeAll}>
              الرئيسية
            </Link>
          </li>
          
          <li>
            <span className={styles.mobileServiceHeader}>خدماتنا</span>
            <ul className={styles.mobileSubLinks}>
              {servicesList.map((service, index) => (
                <li key={index}>
                  <Link href={service.path} className={styles.mobileSubLink} onClick={closeAll}>
                    {service.icon} {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/services" className={styles.mobileSubLink} style={{ fontWeight: "bold", color: "var(--copper)" }} onClick={closeAll}>
                  جميع الخدمات ←
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link href="/about" className={styles.link} style={{ fontSize: "1.1rem" }} onClick={closeAll}>
              من نحن
            </Link>
          </li>
          
          <li>
            <Link href="/blog" className={styles.link} style={{ fontSize: "1.1rem" }} onClick={closeAll}>
              المدونة
            </Link>
          </li>
          
          <li>
            <Link href="/methodology" className={styles.link} style={{ fontSize: "1.1rem" }} onClick={closeAll}>
              منهجيتنا
            </Link>
          </li>
          
          <li>
            <Link href="/faq" className={styles.link} style={{ fontSize: "1.1rem" }} onClick={closeAll}>
              الأسئلة الشائعة
            </Link>
          </li>

          <li style={{ marginTop: "20px" }}>
            <a href="https://wa.me/967770334448?text=%D9%85%D8%B1%D8%AD%D8%A8%D9%8B%D8%A7%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%D9%83%D9%85%20%D8%A7%D9%84%D9%84%D8%BA%D9%88%D9%8A%D8%A9" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              طلب عرض سعر
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
