export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  const { username, password } = req.body;

  console.log("USERNAME FROM FORM:", username);
  console.log("ENV USERNAME:", process.env.ADMIN_USERNAME);

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
