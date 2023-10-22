exports.displayAdminPage = (req, res) => {
  res.render("admin/admin-page", { pageTitle: "Admin page", path: "/admin" });
};
