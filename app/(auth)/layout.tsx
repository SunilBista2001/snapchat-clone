const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-gradient-to-r from-slate-500 to-yellow-100">
      <div className="flex h-screen flex-col items-center justify-center bg-auth-layout">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
