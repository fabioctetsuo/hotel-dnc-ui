const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");

const app = jsonServer.create();
const router = jsonServer.router("db.json");

const MOCKED_SECRET = "your-secret-key";

// /!\ Bind the router db to the app
app.db = router.db;

// Middleware para parsing de JSON
app.use(jsonServer.bodyParser);

app.post("/auth/login", (req, res) => {
  const body = req.body;

  // Simulate user validation and JWT generation
  const user = app.db
    .get("users")
    .find({ email: body.email, password: body.password })
    .value();

  if (user) {
    const access_token = jwt.sign(
      { email: user.email, sub: user.id },
      MOCKED_SECRET,
      { expiresIn: "1h" }
    );

    // Customize the response here
    res.status(200).json({ access_token });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

app.post("/auth/register", (req, res, next) => {
  const body = req.body;

  const posts = app.db.get("users").value();
  const id = posts.length ? Math.max(...posts.map((post) => post.id)) + 1 : 1;

  // Adicionar o novo post ao banco de dados
  app.db
    .get("users")
    .push({
      ...body,
      id,
      avatar: null,
      createdAt: new Date().toISOString(),
    })
    .write();

  const token = jwt.sign({ email: body.email, sub: id }, MOCKED_SECRET, {
    expiresIn: "1h",
  });

  // Customize the response here
  res.status(201).json({
    access_token: token,
  });
});

app.post("/users/avatar", (req, res) => {
  res.status(201).json({
    id: 2,
    email: "felicia@teste.com",
    name: "Felicia Teste",
    role: "USER",
    avatar: "arquivo-mockado.jpg",
    createdAt: "2024-07-26T08:13:19.954Z",
  });
});

// You must apply the auth middleware before the router
app.use(router);
app.listen(3001);
