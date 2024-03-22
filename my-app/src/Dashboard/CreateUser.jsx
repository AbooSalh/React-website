import Form from "../Forms/Form";

export default function CreateUser() {
  return (
    <Form
      endPoint="user/create"
      submitBtn="Create User"
      navigate="dashboard/users"
      enableRedirect={true}
    />
  );
}
