import Form from "../../components/Forms/Form";
export function Signup() {
  return (
    <div className="parent">
      <Form
        endPoint={`register`}
        submitBtn="Register"
        hasLocalStorage={true}
        navigate="/dashboard"
        enableCookie = {true}
      />
    </div>
  );
}
