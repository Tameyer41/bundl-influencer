export default function Button(props) {
  return (
    <button
      type="button"
      className="ml-4 rounded border border-transparent bg-[#625DF5] hover:bg-[#342DF2] transition-colors duration-250 text-white  py-2 px-4 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      {props.text}
    </button>
  );
}
