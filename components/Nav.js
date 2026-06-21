import { withRouter } from "next/router";

function Nav({ router, isTransition, onNavigate, onBack }) {
  const pathname = router.pathname;
  const isHome    = pathname === "/";
  const isContact = pathname === "/contact";

  return (
    <section className={isContact ? "layout-root on-dark" : "layout-root"}>
      <div className="layout-div">
        <h1>
          Cristian
          <br />
          Huijse
          <br />
          heise
        </h1>

        <div className="top-buttons-root right">
          {isHome ? (
            <button
              key="about"
              type="button"
              aria-label="About button"
              className={isTransition ? "disabled" : ""}
              onClick={() => onNavigate("/about")}
            >
              About
            </button>
          ) : (
            <button
              key="home"
              type="button"
              aria-label="Home button"
              className={isTransition ? "disabled" : ""}
              onClick={() => onNavigate("/")}
            >
              Home
            </button>
          )}
        </div>
      </div>

      <div className="layout-div">
        <div className="top-buttons-root left">
          {isContact ? (
            <button
              key="back"
              type="button"
              aria-label="Back button"
              className={isTransition ? "disabled" : ""}
              onClick={onBack}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6em"
                height="6em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m6.921 12.5l5.792 5.792L12 19l-7-7l7-7l.713.708L6.921 11.5H19v1z"
                />
              </svg>
            </button>
          ) : (
            <button
              key="contact"
              type="button"
              aria-label="Contact button"
              className={isTransition ? "disabled" : ""}
              onClick={() => onNavigate("/contact")}
            >
              Contact
            </button>
          )}
        </div>

        <div className="scrolling-bar" />
      </div>
    </section>
  );
}

export default withRouter(Nav);
