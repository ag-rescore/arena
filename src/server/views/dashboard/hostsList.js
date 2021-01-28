function handler(req, res) {
  const { Queues } = req.app.locals;
  const hosts = Queues.listHosts();
  const basePath = req.baseUrl;

  return res.render('dashboard/templates/hostsList', { basePath, hosts });
}

module.exports = handler;
