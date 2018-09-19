const fetch = require("node-fetch");

const r = async (url, method) =>
  await fetch(`http://localhost:9999${url}`, { method }).then(r => r.json());
const log = (...obj) => obj.forEach(o => console.dir(o, { colors: true }));

async function updtById() {
  const users = await r("/users/all", "get");
  const { id } = users[0];
  const updateById = await r(`/users/${id}=John`, "put");
  const getAll = await r("/users/all", "get");

  log("[GET] users:", users);
  log(`[PUT] a user with id="${id}":`, updateById);
  log(`[GET] users:`, getAll);
}

updtById();
