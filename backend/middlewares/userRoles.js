const verifyUserRoles = (allowedRoles) => {
  return (req, res, next) => {
    // console.log(req.roles);
    if (!req?.userRole) {
      res.status(401).json({ error: "Unauthorized access" });
      return;
    }
    const result = allowedRoles.includes(req?.userRole)
    // console.log(result)
    if (!result) {
      res.status(403).json({ error: "Permission Denied" });
      return;
    }
    next();
  };
};

module.exports = verifyUserRoles;
