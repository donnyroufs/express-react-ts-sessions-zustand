/* obviously use hashed passwords blabla */
const data = {
  users: [{ id: 1, username: "admin", password: "admin" }],
  items: [
    {
      id: 1,
      name: "Guitar",
    },
  ],
};

function query(key: string) {
  return data[key];
}

export default query;
