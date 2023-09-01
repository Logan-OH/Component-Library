import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// styles
import styles from "./LanguageSelect.module.scss";

// This is a quick fix for the
// subdomain we needed to implement
export default function LanguageSelect() {
  const [selectOpen, setSelectOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("English");

  const [englishPathname, setEnglishPathname] = useState();
  const [frenchPathname, setFrenchPathname] = useState();

  const router = useRouter();

  const handleLangSelect = (lang) => {
    // close the dorpdown
    setSelectOpen(false);
    // update the lang
    setActiveLang(lang);
  };

  useEffect(() => {
    // Special treatment is needed for the home page in
    // order for the `/fr` to not appear twice.
    // if we're on the home pages, or the request sample kit pages.
    if (router.pathname === "/" || router.pathname === "/fr") {
      // set the paths
      setEnglishPathname("/");
      setFrenchPathname("");

      if (router.pathname === "/") {
        setActiveLang("English");
      }

      if (router.pathname === "/fr") {
        setActiveLang("French");
      }
      return;
    }

    // split the pathname into an array.
    const pathnameArr = router.pathname.split("/");

    // get the current page name
    const currentPage = pathnameArr[pathnameArr.length - 1];

    // update the page links
    setEnglishPathname(currentPage);
    setFrenchPathname(currentPage);

    // Check for the current language on page load
    if (pathnameArr[1] === "fr") {
      setActiveLang("French");
      // fix the path for english
      // otherwise the link will show `/fr/ in the path`
      return;
    }

    setActiveLang("English");
  }, [router.pathname, englishPathname, frenchPathname]);

  return (
    <nav className={styles.lang}>
      <button
        type="button"
        className={`${styles.lang__current} ${styles.lang__a}`}
        onClick={(event) => setSelectOpen(!selectOpen)} // eslint-disable-line
      >
        {activeLang}

        <img
          src="/"
          alt="dropdown"
        />
      </button>

      {selectOpen && (
        <div className={styles.lang__dropdown}>
          <Link
            href={`/${frenchPathname}`}
            className={styles.lang__a}
            onClick={(event) => handleLangSelect("English")} // eslint-disable-line
          >
            {/* eslint-enable */}
            
          </Link>

          <Link
            href={`/fr/${frenchPathname}`}
            className={styles.lang__a}
            onClick={(event) => handleLangSelect("French")} // eslint-disable-line
          >
            
          </Link>
        </div>
      )}
    </nav>
  );
}
