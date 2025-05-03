const express = require('express');

const path = require('path');
const fs = require('fs'); // Ajouté pour le logging
const bodyParser = require('body-parser');
const app = express();
const logger = require('./middleware/logger.js'); // Ajoutez l'extension .js
const fileUpload = require('./middleware/fileUpload');
const PORT = 3000;

// Middlewares
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads'), {
  setHeaders: (res, path) => {
    const ext = path.extname(path);
    if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
      res.type(ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 
             ext === '.png' ? 'image/png' : 'image/gif');
    }
  }
}));
// Ajoutez ce middleware avant vos routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
// Middleware de logging personnalisé
function loggingMiddleware(req, res, next) {
    const now = new Date();
    const logData = {
        timestamp: now.toISOString(),
        method: req.method,
        url: req.originalUrl,
        ip: req.ip || req.connection.remoteAddress,
        headers: req.headers,
        body: req.body
    };
    
    const logString = JSON.stringify(logData) + '\n';
    
    fs.appendFile('server.log', logString, (err) => {
        if (err) console.error('Erreur d\'écriture dans le log:', err);
    });
    
    console.log(`[${now.toISOString()}] ${req.method} ${req.originalUrl} from ${req.ip}`);
    next();
}

// Importez les routeurs

const tasksRouter = require('./routes/tasks');
const blogRouter = require('./routes/blog'); 
const usersRouter = require('./routes/modules/users');
const productsRouter = require('./routes/modules/products');
const ordersRouter = require('./routes/modules/orders');
const authMiddleware = require('./middleware/authMiddleware');
const uploadRouter = require('./routes/upload');
const formatRouter = require('./routes/formatRouter');
app.use('/api', formatRouter);


// Configuration des middlewares
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(loggingMiddleware); // Ajout du middleware de logging
// Middleware pour initialiser les données
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    req.body = req.body || {};
    next();
});



app.get('/tasks', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'tasks.html'), {
      headers: {
          'Content-Type': 'text/html'
      }
  });
});
app.post('/tasks', (req, res) => {
  const newTask = req.body;
  if (!newTask.name || !newTask.status) {
    return res.status(400).json({ error: 'Task name and status are required' });
  }
  newTask.id = tasks.length + 1; // Assign a unique ID to the new task
  tasks.push(newTask); // Add task to the list
  res.status(201).json(newTask); // Respond with the added task
});
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== taskId);

  res.status(204).send(); // No content, just delete
});

app.get('/blog-page', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'blog.html'));
});



// Configuration de l'application
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Ajoutez cette ligne
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/upload', uploadRouter);

// Routes principales
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/users', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'users.html'));
});

app.get('/date', (req, res) => {
  const now = new Date();
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Date and Time</title>
      <style>
        body {
          font-family: 'Segoe UI', system-ui, sans-serif;
          background: linear-gradient(135deg, #d4e157 0%, #c6ff00 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .card {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 400px;
          width: 90%;
        }
        h1 {
          color: #388e3c;
          margin-bottom: 1rem;
        }
        p {
          font-size: 1.2rem;
          margin: 1rem 0;
          color: #555;
        }
        .btn {
          display: inline-block;
          margin-top: 1.5rem;
          padding: 0.7rem 1.5rem;
          background: linear-gradient(135deg, #66bb6a, #c6ff00);
          color: white;
          text-decoration: none;
          border-radius: 50px;
          transition: background 0.3s ease;
        }
        .btn:hover {
          background: linear-gradient(135deg, #c6ff00, #66bb6a);
        }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>Current Date and Time 🕒</h1>
        <p><strong>Date:</strong> ${now.toLocaleDateString()}</p>
        <p><strong>Time:</strong> ${now.toLocaleTimeString()}</p>
        <a href="/" class="btn">Back to Home</a>
      </div>
    </body>
    </html>
  `);
});

app.get('/admin-dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin-dashboard.html'));
});

app.get('/route-protegee', authMiddleware, (req, res) => {
  res.send('Contenu protégé');
});

// Route pour afficher le formulaire
app.get('/inscription', (req, res) => {
  res.render('form', { 
      errors: {}, // Toujours initialiser comme objet vide
      formData: {} // Idem pour formData
  });
});
app.get('/get-image/:name', (req, res) => {
  const file = path.join(__dirname, 'public', 'uploads', req.params.name);
  res.sendFile(file);
});
app.post('/inscription', (req, res) => {
  const { nom, email, password, confirmPassword } = req.body;
  const errors = {};
  const formData = { nom, email };

  // Validation des données
  if (!nom) errors.nom = 'Le nom est requis';
  
  if (!email) {
      errors.email = 'L\'email est requis';
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = 'L\'email n\'est pas valide';
  }
  
  if (!password) {
      errors.password = 'Le mot de passe est requis';
  } else if (password.length < 6) {
      errors.password = 'Le mot de passe doit contenir au moins 6 caractères';
  }
  
  if (!confirmPassword) {
      errors.confirmPassword = 'Veuillez confirmer votre mot de passe';
  } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Les mots de passe ne correspondent pas';
  }

  if (Object.keys(errors).length > 0) {
      return res.render('form', { 
          errors, 
          formData 
      });
  }

  res.render('confirmation', { nom });
});
app.use((req, res, next) => {
  res.status(404).json({ 
    error: "Page non trouvée",
    statusCode: 404
  });
});
// Gestion des erreurs serveur
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: err.message || 'Erreur serveur',
    statusCode: 500,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Modifiez la route GET /upload

// Route pour uploader un fichier



// Montez les routeurs
app.use('/tasks', tasksRouter);
app.use('/blog', blogRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/api', authMiddleware);
app.use('/upload', uploadRouter);

// Route pour afficher la date

app.listen(PORT, () => {
    console.log(`Serveur démarré:http://localhost:${PORT}`);
                    
    
    // Créer un message de démarrage dans le log
    const startupMessage = `\n\n=== Serveur démarré à ${new Date().toISOString()} ===\n`;
    fs.appendFile('server.log', startupMessage, (err) => {
        if (err) console.error('Erreur d\'écriture dans le log:', err);
    });
});