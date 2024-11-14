// ** React Imports
import { useEffect, useState } from "react";

// ** Third Party Components
import PropTypes from "prop-types";

const ScrollTop = ({ showOffset, scrollBehaviour = "smooth", children, ...rest }) => {
  // ** State
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window) {
      const handleScroll = () => {
        setVisible(window.pageYOffset >= showOffset);
      };
      
      window.addEventListener("scroll", handleScroll);
      
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [showOffset]);

  const handleScrollToTop = () => {
    window.scroll({ top: 0, behavior: scrollBehaviour });
  };

  return (
    visible && (
      <div className="scroll-to-top" onClick={handleScrollToTop} {...rest}>
        {children}
      </div>
    )
  );
};

export default ScrollTop;

// ** PropTypes
ScrollTop.propTypes = {
  showOffset: PropTypes.number,
  children: PropTypes.any.isRequired,
  scrollBehaviour: PropTypes.oneOf(["smooth", "instant", "auto"]),
};
