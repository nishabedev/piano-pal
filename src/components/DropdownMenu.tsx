import { useState, useRef, useEffect } from 'react';

interface MenuItem {
  label: string;
  onClick: () => void;
  danger?: boolean;
}

interface DropdownMenuProps {
  items: MenuItem[];
}

export default function DropdownMenu({ items }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handle = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [isOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={e => { e.stopPropagation(); e.preventDefault(); setIsOpen(!isOpen); }}
        className="p-1.5 rounded-full hover:bg-white/10 dark-hover transition-colors"
        title="More options"
      >
        <svg className="w-4 h-4 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
          <circle cx="10" cy="4" r="1.5" />
          <circle cx="10" cy="10" r="1.5" />
          <circle cx="10" cy="16" r="1.5" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 dark-surface-raised bg-slate-800 rounded-xl shadow-xl border border-slate-700/50 dark-border py-1 z-50">
          {items.map((item, i) => (
            <button
              key={i}
              onClick={e => { e.stopPropagation(); e.preventDefault(); setIsOpen(false); item.onClick(); }}
              className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                item.danger
                  ? 'text-red-400 hover:bg-red-500/10'
                  : 'text-slate-200 dark-text hover:bg-white/5 dark-hover'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
