import { UserMenu } from './ui/UserMenu';

export const Header = async () => {
  return (
    <header className='border- fixed z-10 flex h-16 w-full border-b-2 border-border'>
      <div className='container flex items-center justify-end gap-4'>
        <UserMenu />
      </div>
    </header>
  );
};
