import Button from "components/ui/Button";

export default function CreatorPageSkeleton() {
  return (
    <>
      <div className="min-h-full">
        {/* Main column */}
        <div className="flex flex-col">
          <main className="flex-1">
            {/* Page title & actions */}
            <div className="px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8 sm:py-6 lg:py-8">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-medium leading-6 text-gray-900 sm:truncate">
                  Creator Discovery
                </h1>
                <p className="text-sm font-normal text-gray-500 mt-2">
                  Learn about creators currently signed up with the agency
                </p>
              </div>
              <div className="mt-4 hidden sm:flex sm:mt-0 sm:ml-4">
                <button
                  type="button"
                  className="ml-3 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-0 sm:ml-0"
                >
                  Sort
                </button>
                <Button text="Invite users" />
              </div>
            </div>
            {/* Toolbar */}
            <div className="px-4 mt-6 sm:px-6 lg:px-8 ">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="text-gray-500 text-sm font-normal">
                  x creators
                </h2>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="px-4 py-2  focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-200 rounded-md mr-4 w-80"
                  placeholder="Search for users"
                />
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="bg-white">
        <div className="max-w-4xl mx-auto py-8 sm:py-8 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"></div>
        </div>
      </div>
    </>
  );
}
