export const Footer = () => {
  return (
    <footer>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="border-t border-slate-300 pt-8 text-center text-sm text-slate-500 sm:text-left">
          <span className="block sm:inline">&copy; 2023 Sylvain Corsini.</span>{" "}
          <span className="block sm:inline">All rights reserved.</span>
        </div>
        <div className="pb-8 text-center text-xs text-slate-400 sm:text-left">
          The assets comes from Satisfactory or from websites created and owned by Coffee Stain Studios, who hold the
          copyright of Satisfactory. All trademarks and registered trademarks present in the image are proprietary to
          Coffee Stain Studios.
        </div>
      </div>
    </footer>
  );
};