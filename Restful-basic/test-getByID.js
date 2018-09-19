const fetch = require("node-fetch");

const r = async (url, method) =>
  await fetch(`http://localhost:9999${url}`, { method }).then(r => r.json());
const log = (...obj) => obj.forEach(o => console.dir(o, { colors: true }));

async function getById() {
  const users = await r("/users/all", "get");
  const { id } = users[0];
  const getById = await r(`/users/${id}`, "get");
  const getAll = await r("/users/all", "get");

  log("[GET] users:", users);
  log(`[GET] a user with id="${id}":`, getById);
  log(`[GET] users:`, getAll);
}

getById();
