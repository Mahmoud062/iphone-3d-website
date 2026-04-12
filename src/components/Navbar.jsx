import { appleImg, bagImg, searchImg } from '../utils';
import { navLists } from '../constants';

const Navbar = () => {
  return (
    <header
      className="w-full py-5 sm:px-10 px-5 flex justify-between items-center fixed top-0 z-50 bg-black"
      role="banner"
    >
      <nav
        className="flex w-full screen-max-width"
        role="navigation"
        aria-label="Main navigation"
      >
        <a href="#" className="flex-shrink-0">
          <img src={appleImg} alt="Apple Home" width={14} height={18} />
        </a>

        <div className="flex flex-1 justify-center max-sm:hidden" role="menubar">
          {navLists.map((nav) => (
            <a
              key={nav}
              href={`#${nav.toLowerCase()}`}
              className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all"
              role="menuitem"
              aria-label={`Navigate to ${nav} section`}
            >
              {nav}
            </a>
          ))}
        </div>

        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          <button
            aria-label="Open search"
            className="p-1 hover:opacity-80 transition"
          >
            <img src={searchImg} alt="" width={18} height={18} />
          </button>
          <button
            aria-label="Open shopping cart"
            className="p-1 hover:opacity-80 transition"
          >
            <img src={bagImg} alt="" width={18} height={18} />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
