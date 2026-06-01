export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  const { username, password } = req.body;

  console.log("FORM USERNAME:", username);
  console.log("FORM PASSWORD:", password);

  console.log("ENV USERNAME:", process.env.ADMIN_USERNAME);
  console.log("ENV PASSWORD:", process.env.ADMIN_PASSWORD);

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.status(200).json({
      success: true,
    });
  }

  return res.status(401).json({
    error: "Invalid username or password",
  });
}
