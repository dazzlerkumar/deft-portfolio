import MobileMenu from '@components/Navbar/MobileMenu';
import NavItem from '@components/Navbar/NavItem';
import ThemeSwitch from '@components/Navbar/ThemeSwitch';

function NavBar() {
  return (
    <div className="fixed top-[20px] flex flex-col justify-center px-8 w-full z-30">
      <nav className="flex items-center justify-between w-full max-w-2xl mx-auto  sm:pb-16  text-gray-900 bg-transparent dark:text-gray-100">
        <a href="#skip" className="skip-nav">
          Skip to content
        </a>
        <div className="backdrop-blur-[15px] bg-white/50 dark:bg-black/50 rounded-md shadow-[0_35px_60px_-15px_rgba(0,0,0,0.25)] relative">
          <MobileMenu />
          <NavItem href="/" text="Home" />
          <NavItem href="/about" text="About Me" />
          <NavItem href="/projects" text="Projects" />
        </div>
        <ThemeSwitch />
      </nav>
    </div>
  );
}

export default NavBar;
