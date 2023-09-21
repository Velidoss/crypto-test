import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

export const CustomButton: React.FC<Props> = ({ children, className, onClick }) => {
  return (
    <div className={className}>
      <button
        type="button"
        onClick={onClick}
        className="bg-white py-2 px-4 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg"
      >
        {children}
      </button>
    </div>
  );
};
