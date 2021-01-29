function handler(req, res) {
  const { queueHost } = req.params;
  const { Queues } = req.app.locals;
  const queues = Queues.list(queueHost);
  const basePath = req.baseUrl;

  return res.render('dashboard/templates/queueList', { basePath, queueHost, queues });
}

module.exports = handler;
