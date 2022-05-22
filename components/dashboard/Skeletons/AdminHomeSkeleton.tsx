export default function AdminHomeSkeleton() {
  return (
    <>
      <div className="min-h-full">
        {/* Main column */}
        <div className="flex flex-col">
          <main className="flex-1">
            {/* Page title & actions */}
            <div className="border-b border-gray-200 px-4 py-4 flex items-center justify-between sm:px-6 lg:px-8">
              <div className="flex-1 min-w-0">
                <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
                  Home
                </h1>
              </div>
              <div className="flex">
                <button
                  type="button"
                  className="ml-4 rounded-l border border-transparent bg-[#EED5B0] text-[#7E623A]  py-2 px-4 text-sm font-medium shadow-sm"
                >
                  Create a project
                </button>
              </div>
            </div>
            {/* Pinned projects */}
            <div className="px-4 mt-6 sm:px-6 lg:px-8">
              <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                Pinned Projects
              </h2>
            </div>

            {/* Projects list (only on smallest breakpoint) */}
            <div className="mt-10 sm:hidden">
              <div className="px-4 sm:px-6">
                <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                  Projects
                </h2>
              </div>
            </div>

            {/* Projects table (small breakpoint and up) */}
            <div className="hidden mt-8 sm:block">
              <div className="align-middle inline-block min-w-full border-b border-gray-200">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-t border-gray-200">
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <span className="lg:pl-2">Project</span>
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Members
                      </th>
                      <th className="hidden md:table-cell px-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last updated
                      </th>
                      <th className="pr-6 py-3 border-b border-gray-200 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider" />
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
