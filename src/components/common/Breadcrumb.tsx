import React from 'react';
import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`breadcrumb mb-4 sm:mb-6 flex items-center flex-wrap gap-2 text-xs sm:text-sm text-slate-400 no-min-touch ${className}`}
    >
      <Link
        to="/"
        className="inline-flex items-center text-slate-500 hover:text-brand-red font-medium transition-colors no-min-touch"
      >
        Home
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <span
              className="text-slate-300 font-normal select-none inline-flex items-center leading-none"
              aria-hidden="true"
            >
              /
            </span>
            {item.path && !isLast ? (
              <Link
                to={item.path}
                className="inline-flex items-center text-slate-500 hover:text-brand-red font-medium transition-colors no-min-touch"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className="inline-flex items-center text-slate-700 font-medium truncate no-min-touch"
                aria-current={isLast ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
