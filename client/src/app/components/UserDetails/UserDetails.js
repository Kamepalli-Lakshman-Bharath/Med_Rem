export default function UserDetails(props) {
  const { name, id, email, mobile,type } = props;
  return (
    <div className=" xl: w-1/2 mx-auto my-auto p-6 break-all m-2 text-slate-500 font-semibold shadow-md">
      <div className="mb-2">
        <span className="text-green-600 ">ID: </span>
        {id}
      </div>
      <div className="mb-2">
        <span className="text-green-600">Name: </span> {name}
      </div>
      <div className="mb-2">
        <span className="text-green-600">E-mail: </span> {email}
      </div>
      <div className="mb-2">
        <span className="text-green-600">Mobile: </span>
        {mobile}
      </div>
      <div className="mb-2">
        <span className="text-green-600">Type: </span>
        {type}
      </div>
    </div>
  );
}
