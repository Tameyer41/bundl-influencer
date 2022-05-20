export default function Button(props) {
  return (
    <button
      type="button"
      className="ml-4 rounded border border-transparent bg-[#EED5B0] text-[#7E623A]  py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      {props.text}
    </button>
  );
}
