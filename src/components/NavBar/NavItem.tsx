const NavItem = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="text-gray-800 hover:text-gray-600 block px-3 py-2 rounded-md text-base font-medium">
      {children}
    </span>
  );
};

export default NavItem;
