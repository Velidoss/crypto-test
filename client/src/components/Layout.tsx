import { FC, ReactNode } from 'react';

import { Header } from './Header/Header';

type Props = {
  children: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-r from-violet-500 to-orange-500">
      <Header />
      <div className="h-full w-full flex grow-1 justify-center align-center">
        {children}
      </div>
    </div>
  );
};
