import { app } from './app.js'

const PORT = process.env.PORT || 3051

app.listen(PORT,() => console.log(`Server listening on http://localhost:${PORT}`))
