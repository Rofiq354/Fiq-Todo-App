module.exports = Seo = (req, title = "") => {
  return {
    title: `Todo App ${title}`,
    description:
      "Aplikasi Todo sederhana untuk mencatat aktifitas sehari-hari.",
    fullUrl: req.protocol + "://" + req.get("host") + req.originalUrl,
    ogImage: "/img/preview.jpg",
    favIcon: "/img/favicon.png",
  };
};
