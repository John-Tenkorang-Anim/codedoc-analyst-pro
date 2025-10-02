# CodeDoc Analyst Pro

AI-powered code analysis platform providing comprehensive insights through 7 specialized features. Built with FastAPI backend and Next.js frontend, powered by OpenAI GPT-4.

## Features

- **Documentation Generation** - Comprehensive docstrings with complexity notes
- **Code Explanation** - Step-by-step breakdowns for learning
- **Quality Analysis** - Security vulnerabilities and best practices
- **Language Translation** - Convert between 12+ programming languages
- **Refactoring Suggestions** - SOLID principles-based improvements
- **Test Generation** - Automated unit tests with edge cases
- **Complexity Analysis** - Big O notation and optimization recommendations

## Tech Stack

**Backend:** FastAPI, Python 3.13, OpenAI GPT-4, Docker, Pydantic  
**Frontend:** Next.js 14, TypeScript, React, Tailwind CSS  
**Deployment:** Render (backend), Vercel (frontend)

---

## API Documentation

Base URL: `https://your-backend-url.onrender.com`

### Authentication

No authentication required. All endpoints are publicly accessible.

---

### Endpoints

#### 1. Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "model": "gpt-4o-mini"
}
```

---

#### 2. Service Info
```http
GET /
```

**Response:**
```json
{
  "name": "CodeDoc Analyst Pro",
  "version": "5.0.0",
  "model": "gpt-4o-mini",
  "features": [
    "documentation-generation",
    "code-explanation",
    "quality-analysis",
    "language-translation",
    "refactoring-suggestions",
    "test-generation",
    "complexity-analysis"
  ]
}
```

---

#### 3. Generate Documentation
```http
POST /api/v1/generate-docstring
```

Generate comprehensive documentation for code including parameters, returns, examples, and complexity notes.

**Request Body:**
```json
{
  "code": "def add(a, b):\n    return a + b",
  "language": "python"
}
```

**Response:**
```json
{
  "result": "Add two numbers together...",
  "success": true,
  "model_used": "gpt-4o-mini",
  "metadata": null
}
```

---

#### 4. Explain Code
```http
POST /api/v1/explain-code
```

Provide step-by-step explanation of code for learning purposes.

**Request Body:**
```json
{
  "code": "const nums = [1,2,3].map(x => x * 2)",
  "language": "javascript"
}
```

**Response:**
```json
{
  "result": "This code creates an array...",
  "success": true,
  "model_used": "gpt-4o-mini",
  "metadata": null
}
```

---

#### 5. Analyze Code Quality
```http
POST /api/v1/analyze-quality
```

Identify security vulnerabilities, performance issues, code smells, and best practice violations.

**Request Body:**
```json
{
  "code": "password = 'admin123'",
  "language": "python"
}
```

**Response:**
```json
{
  "result": "Security Issues:\n1. Hardcoded credentials...",
  "success": true,
  "model_used": "gpt-4o-mini",
  "metadata": null
}
```

---

#### 6. Translate Code
```http
POST /api/v1/translate-language
```

Convert code between programming languages while maintaining functionality.

**Request Body:**
```json
{
  "code": "def greet(name):\n    return f'Hello {name}'",
  "language": "python",
  "target_language": "javascript"
}
```

**Response:**
```json
{
  "result": "function greet(name) {\n  return `Hello ${name}`;\n}",
  "success": true,
  "model_used": "gpt-4o-mini",
  "metadata": {
    "from": "python",
    "to": "javascript"
  }
}
```

---

#### 7. Suggest Refactoring
```http
POST /api/v1/suggest-refactoring
```

Provide SOLID principles-based improvements with before/after comparisons.

**Request Body:**
```json
{
  "code": "def calc(x,y,op):\n    if op=='+':\n        return x+y\n    elif op=='-':\n        return x-y",
  "language": "python"
}
```

**Response:**
```json
{
  "result": "Refactoring Suggestions:\n1. Use strategy pattern...",
  "success": true,
  "model_used": "gpt-4o-mini",
  "metadata": null
}
```

---

#### 8. Generate Tests
```http
POST /api/v1/generate-tests
```

Create comprehensive unit tests including happy paths, edge cases, and error conditions.

**Request Body:**
```json
{
  "code": "function divide(a, b) {\n  return a / b;\n}",
  "language": "javascript"
}
```

**Response:**
```json
{
  "result": "describe('divide', () => {\n  test('divides two numbers'...",
  "success": true,
  "model_used": "gpt-4o-mini",
  "metadata": null
}
```

---

#### 9. Analyze Complexity
```http
POST /api/v1/complexity-analysis
```

Analyze time/space complexity, cyclomatic complexity, and provide optimization suggestions.

**Request Body:**
```json
{
  "code": "for i in range(n):\n    for j in range(n):\n        print(i*j)",
  "language": "python"
}
```

**Response:**
```json
{
  "result": "Time Complexity: O(n²)\nSpace Complexity: O(1)...",
  "success": true,
  "model_used": "gpt-4o-mini",
  "metadata": null
}
```

---

## Request Schema

All analysis endpoints accept the following request body:

```typescript
{
  code: string;           // Required: Code to analyze
  language: string;       // Required: Programming language (lowercase)
  target_language?: string; // Optional: Only for translation endpoint
}
```

## Response Schema

All endpoints return:

```typescript
{
  result: string;         // Analysis result
  success: boolean;       // Operation status
  model_used: string;     // AI model identifier
  metadata?: object;      // Optional additional data
}
```

## Supported Languages

Python, JavaScript, TypeScript, Java, C++, Go, Rust, PHP, Ruby, Swift, Kotlin, C#

---

## Error Handling

### 400 Bad Request
Missing required fields or invalid input.

```json
{
  "detail": "target_language required"
}
```

### 502 Bad Gateway
OpenAI API error or timeout.

```json
{
  "detail": "OpenAI API error: Connection timeout"
}
```

### 500 Internal Server Error
Unexpected server error.

```json
{
  "detail": "Internal server error"
}
```

---

## Rate Limits

Free tier on Render:
- No hard rate limits
- Cold start: 30-60 seconds after 15 minutes of inactivity
- Recommended: < 10 requests per minute

---

## Example Usage

### Python
```python
import requests

url = "https://your-backend-url.onrender.com/api/v1/explain-code"
data = {
    "code": "def factorial(n):\n    return 1 if n <= 1 else n * factorial(n-1)",
    "language": "python"
}

response = requests.post(url, json=data)
print(response.json()["result"])
```

### JavaScript
```javascript
const response = await fetch('https://your-backend-url.onrender.com/api/v1/generate-docstring', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    code: 'function add(a, b) { return a + b; }',
    language: 'javascript'
  })
});

const data = await response.json();
console.log(data.result);
```

### cURL
```bash
curl -X POST "https://your-backend-url.onrender.com/api/v1/complexity-analysis" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "for i in range(n):\n    for j in range(n):\n        arr[i][j] = i * j",
    "language": "python"
  }'
```

---

## Local Development

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
export OPENAI_API_KEY=your_key_here
uvicorn main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
npm run dev
```

---

## Environment Variables

### Backend
- `OPENAI_API_KEY` - Required. Your OpenAI API key

### Frontend
- `NEXT_PUBLIC_API_URL` - Required. Backend API URL

---

## Deployment

### Backend (Render)
1. Connect GitHub repository
2. Set root directory: `backend`
3. Build command: `pip install -r requirements.txt`
4. Start command: `uvicorn main:app --host 0.0.0.0 --port 8000`
5. Add environment variable: `OPENAI_API_KEY`

### Frontend (Vercel)
1. Import GitHub repository
2. Root directory: `frontend`
3. Framework preset: Next.js
4. Add environment variable: `NEXT_PUBLIC_API_URL`

---

## Contributing

Contributions welcome! Please open an issue or submit a pull request.

## License

MIT License - See LICENSE file for details

## Author

[Your Name] - [Your GitHub Profile]

---

## Live Demo

- **Frontend:** https://your-app.vercel.app
- **API:** https://your-backend.onrender.com
- **API Docs:** https://your-backend.onrender.com/docs
