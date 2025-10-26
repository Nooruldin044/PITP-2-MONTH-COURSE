function UserCard({ name, email, age, role }) {
  return (
    <div className="user-card">
      <h2>User Profile</h2>
      <div className="user-info">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Age:</strong> {age}</p>
        <p><strong>Role:</strong> {role}</p>
      </div>
    </div>
  )
}

export default UserCard