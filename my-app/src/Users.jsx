
export default function Users() {
  return (
    <div className="table-parent" style={{ width: "100%" }}>
      <table class="table table-striped ">
        <thead>
          <tr>
            <th scope="col" className="table-head" style={{width:"10%"}}>ID</th>
            <th scope="col">UserName</th>
            <th scope="col">Email</th>
            <th scope="col">Joined at</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
