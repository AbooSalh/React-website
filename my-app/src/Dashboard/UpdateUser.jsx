import { useState, useEffect } from "react";
import Form from "../Forms/Form";
export default function UpdateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const id = window.location.pathname.split("/").slice(-1)[0];
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/user/showbyid/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setName(data[0].name);
          setEmail(data[0].email);
        } else {
          console.error("No user data found");
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);
  return (
    <Form
      endPoint={`user/update/${id}`}
      submitBtn="Update"
      name={name}
      email={email}
      userID={id}
      navigate="dashboard/users"
    />
  );
}
