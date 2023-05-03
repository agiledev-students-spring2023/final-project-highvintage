const token = localStorage.getItem("token");

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

module.exports = config;