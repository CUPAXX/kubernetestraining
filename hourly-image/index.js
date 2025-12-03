const express = require("express");
const axios = require("axios");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;

const directory = path.join("/", "src", "app", "files"); // persistent volume path
// const directory = path.join("./", "images"); // local path for testing
const image_path = path.join(directory, "image.jpg");
const meta_path = path.join(directory, "meta.json");

const IMAGE_URL = "https://picsum.photos/1200";
// const TODO_SERVICE_URL = "http://localhost:3001"; //local testing
const TODO_SERVICE_URL = "http://todo-apps-svc:2345"; //kubernetes service URL

const expiredTime = 10 * 60 * 1000;
// const expiredTime = 10 * 1000; //testing

// Serve images folder
app.use("/images", express.static(directory));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const loadMeta = () => {
  if (!fs.existsSync(meta_path)) {
    return { lastDownloadedAt: 0, expiredServedOnce: false };
  }
  return JSON.parse(fs.readFileSync(meta_path, "utf8"));
};

const saveMeta = (meta) => {
  fs.writeFileSync(meta_path, JSON.stringify(meta, null, 2));
};

const downloadImage = async () => {
  await fs.promises.mkdir(directory, { recursive: true });

  const response = await axios.get(IMAGE_URL, { responseType: "stream" });

  await new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(image_path);
    response.data.pipe(writer);
    writer.on("finish", resolve);
    writer.on("error", reject);
  });

  const meta = {
    lastDownloadedAt: Date.now(),
    expiredServedOnce: false,
  };

  saveMeta(meta);
  console.log("New image downloaded");
};

const getTodos = async () => {
  const response = await axios.get(`${TODO_SERVICE_URL}/todos`);
  return response.data;
};

const addTodos = async (title) => {
  try {
    await axios.post(`${TODO_SERVICE_URL}/todos`, { title });
  } catch (error) {
    console.error("Error adding todo:", error.message);
  }
};

app.post("/add-todo", async (req, res) => {
  await addTodos(req.body.title);
  res.json({ success: true });
});

app.get("/", async (req, res) => {
  const meta = loadMeta();
  const now = Date.now();

  const imageExists = fs.existsSync(image_path);
  const isExpired = now - meta.lastDownloadedAt > expiredTime;

  if (!imageExists) {
    // First run
    await downloadImage();
  } else if (isExpired && !meta.expiredServedOnce) {
    // show expired once
    meta.expiredServedOnce = true;
    saveMeta(meta);
    console.log("Serving expired image once");
  } else if (isExpired && meta.expiredServedOnce) {
    // Next request refreshes
    await downloadImage();
  }

  const todo_list = await getTodos();

  res.send(`
    <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Hourly Image</title>
      </head>
      <body>
        <h1>Hourly Image</h1>
        <img src="/images/image.jpg?ts=${Date.now()}" width="400"/>
        <div style="margin-top:30px; margin-bottom:10px;">
            <input type="text" maxlength="140" id="todoinput" placeholder="Enter your todo"/>
            <button id="todobutton" onclick="submitTodo()" >Create todo</button>
        </div>
        <ul id="todolist" style="margin-top:10px; margin-bottom:30px;">
        ${todo_list.map((todo) => `<li>${todo}</li>`).join("")}
        </ul>
        <h3>DevOps with Kubernetes 2025</h3>

        <script>
          async function submitTodo() {
           const title = document.getElementById("todoinput").value.trim();
           if(!title) return;
           await fetch("/add-todo", {
             method: "POST",
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify({ title })
           });
           window.location.reload();
          }
        </script>
      </body>
      </html>
  `);
});

// ---------- Graceful shutdown (TESTING CRASH) ----------
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully.");
  process.exit(0);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
