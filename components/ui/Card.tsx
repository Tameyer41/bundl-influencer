import Link from "next/link";

export default function Card(props) {
  const { user } = props;
  return (
    <>
      <Link href={`/creators/${user.id}`} className="group">
        <div>
          <div className="w-full h-56 bg-gray-200 rounded-md overflow-hidden cursor-pointer group-hover:opacity-75 lg:h-72 xl:h-80">
            <img
              src="https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg"
              alt="Hand stitched, orange leather long wallet"
              className="w-full h-full object-center object-cover"
            />
          </div>
          <h3 className="mt-4 text-sm text-gray-700">{user.name}</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">{user.email}</p>
        </div>
      </Link>
    </>
  );
}
