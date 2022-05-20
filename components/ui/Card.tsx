import Link from "next/link";

export default function Card(props) {
  const { user } = props;
  return (
    <>
      <Link href={`/creators/${user.id}`}>
        <div className="group px-4 space-y-4">
          <div className="aspect-[16/9] w-full cursor-pointer overflow-hidden rounded-md bg-gray-200">
            <img
              src="https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg"
              alt="Hand stitched, orange leather long wallet"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="space-y-2">
            <h2 className="text-base font-medium text-gray-700">
              {" "}
              {user.name}{" "}
            </h2>
            <p className="text-sm font-normal text-gray-500"> {user.name} </p>
          </div>
          <Link href={`/creators/${user.id}`}>
            <div className="w-full cursor-pointer">
              <a className="block w-full border border-gray-200 rounded px-4 py-1.5 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 text-center">
                {" "}
                View profile{" "}
              </a>
            </div>
          </Link>
        </div>
      </Link>
    </>
  );
}
