import React from 'react';

type Props = {
  onClick?: () => void;
};

export const CustomButton: React.FC<Props> = ({ onClick }) => {
  return (
    <div className="pt-10">
      <button
        type="button"
        onClick={onClick}
        className="bg-white py-2 px-4 rounded-lg text-lg font-semibold shadow-md hover:shadow-lg"
      >
        Add Currency
      </button>
    </div>
  );
};
