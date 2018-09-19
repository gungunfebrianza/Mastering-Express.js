const fetch = require("node-fetch");

const r = async (url, method) =>
  await fetch(`http://localhost:9999${url}`, { method }).then(r => r.json());
const log = (...obj) => obj.forEach(o => console.dir(o, { colors: true }));

async function addUser() {
  const addUsr = await r(`/users/Smith`, "post");
  log(`[POST] a new user:`, addUsr);
  const getAll = await r("/users/all", "get");
  log(`[GET] users:`, getAll);
}

addUser();
