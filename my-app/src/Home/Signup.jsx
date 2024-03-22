import Form from "../Forms/Form";
export function Signup() {
  return (
    <div className="parent">
      <Form endPoint={`register`} submitBtn="Register" hasLocalStorage={true} />
    </div>
  );
}
