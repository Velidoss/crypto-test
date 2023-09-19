import {FC, ReactNode} from 'react';

type Props = {
  children: ReactNode;
}

export const Layout: FC<Props> = ({children}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-violet-500 to-orange-500">
      {children}
    </div>
  )
}
