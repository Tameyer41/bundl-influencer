import Link from "next/link";

export default function Card(props) {
  const { user } = props;
  return (
    <>
      <Link href={`/creators/${user.id}`}>
        <div className="group">
          <div className="relative aspect-[9/12] w-full cursor-pointer overflow-hidden rounded-md bg-gray-200">
            <div className="h-20 w-full absolute bottom-0 bg-gradient-to-t from-[#805F0B] to-[#F7F7F7]"></div>
            <img
              src="https://tailwindui.com/img/ecommerce-images/home-page-04-trending-product-02.jpg"
              alt="Hand stitched, orange leather long wallet"
              className="h-full w-full object-cover object-center"
            />
            <h3 className="absolute bottom-6 left-4 z-10 mt-4 text-base font-medium text-white">
              {user.name}
            </h3>
            <h3 className="absolute bottom-2 left-4 z-10 mt-4 text-sm font-medium text-gray-200">
              {user.email}
            </h3>
          </div>
        </div>
      </Link>
    </>
  );
}
