'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { TbBulbOff, TbBulb } from 'react-icons/tb';

function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="backdrop-blur-[15px] bg-white/50 dark:bg-black/50 rounded-md shadow-[0_35px_60px_-15px_rgba(0,0,0,0.25)] p-1"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {mounted && resolvedTheme === 'dark' ? (
        <TbBulbOff size={24} />
      ) : (
        <TbBulb size={24} />
      )}
    </button>
  );
}

export default ThemeSwitch;
