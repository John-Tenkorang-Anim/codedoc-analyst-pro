# from fastapi import FastAPI, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel, Field
# import httpx

# app = FastAPI(
#     title="CodeDoc Analyst API",
#     description="AI-powered code documentation using local Ollama",
#     version="3.0.0"
# )

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # Local Ollama configuration
# OLLAMA_URL = "http://localhost:11434/api/generate"
# MODEL_NAME = "qwen2.5-coder:1.5b" # Change to your local model name

# class CodeRequest(BaseModel):
#     code: str = Field(..., description="The code snippet to process")
#     language: str = Field(default="python", description="Programming language")

# class DocstringResponse(BaseModel):
#     docstring: str
#     success: bool
#     model_used: str

# class ExplanationResponse(BaseModel):
#     explanation: str
#     success: bool
#     model_used: str

# async def call_ollama(prompt: str) -> str:
#     """Call local Ollama API"""
#     async with httpx.AsyncClient(timeout=300) as client:
#         try:
#             response = await client.post(
#                 OLLAMA_URL,
#                 json={
#                     "model": MODEL_NAME,
#                     "prompt": prompt,
#                     "stream": False
#                 }
#             )
#             response.raise_for_status()
#             result = response.json()
#             return result["response"]
            
#         except Exception as e:
#             raise HTTPException(status_code=502, detail=f"Ollama error: {str(e)}")

# @app.get("/")
# async def root():
#     return {
#         "message": "CodeDoc Analyst API (Local Ollama)",
#         "status": "running",
#         "model": MODEL_NAME,
#         "endpoints": ["/api/v1/generate-docstring", "/api/v1/explain-code"]
#     }

# @app.post("/api/v1/generate-docstring", response_model=DocstringResponse)
# async def generate_docstring(request: CodeRequest):
#     prompt = f"""Generate a clean docstring for this {request.language} code.
# Only output the docstring.

# Code:
# {request.code}

# Docstring:"""
    
#     docstring = await call_ollama(prompt)
#     return DocstringResponse(
#         docstring=docstring.strip(),
#         success=True,
#         model_used=MODEL_NAME
#     )

# @app.post("/api/v1/explain-code", response_model=ExplanationResponse)
# async def explain_code(request: CodeRequest):
#     prompt = f"""Explain this {request.language} code step by step.

# Code:
# {request.code}

# Explanation:"""
    
#     explanation = await call_ollama(prompt)
#     return ExplanationResponse(
#         explanation=explanation.strip(),
#         success=True,
#         model_used=MODEL_NAME
#     )

# @app.get("/health")
# async def health_check():
#     return {"status": "healthy", "model": MODEL_NAME}

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
import httpx
import os
from dotenv import load_dotenv
from typing import Optional

load_dotenv()

app = FastAPI(
    title="CodeDoc Analyst Pro API",
    description="Advanced AI-powered code analysis with OpenAI GPT-4",
    version="5.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
OPENAI_API_URL = "https://api.openai.com/v1/chat/completions"
MODEL_NAME = "gpt-4o-mini"

if not OPENAI_API_KEY:
    raise RuntimeError("OPENAI_API_KEY not set")

class CodeRequest(BaseModel):
    code: str = Field(..., description="Code snippet")
    language: str = Field(default="python", description="Programming language")
    target_language: Optional[str] = Field(None, description="Target language for translation")

class AnalysisResponse(BaseModel):
    result: str
    success: bool
    model_used: str
    metadata: Optional[dict] = None

async def call_openai(system_prompt: str, user_prompt: str, max_tokens: int = 1000) -> str:
    async with httpx.AsyncClient(timeout=60.0) as client:
        try:
            response = await client.post(
                OPENAI_API_URL,
                headers={
                    "Authorization": f"Bearer {OPENAI_API_KEY}",
                    "Content-Type": "application/json"
                },
                json={
                    "model": MODEL_NAME,
                    "messages": [
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_prompt}
                    ],
                    "max_tokens": max_tokens,
                    "temperature": 0.7
                }
            )
            response.raise_for_status()
            result = response.json()
            return result["choices"][0]["message"]["content"]
        except httpx.HTTPError as e:
            raise HTTPException(status_code=502, detail=f"OpenAI API error: {str(e)}")

@app.get("/")
async def root():
    return {
        "name": "CodeDoc Analyst Pro",
        "version": "5.0.0",
        "model": MODEL_NAME,
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

@app.post("/api/v1/generate-docstring", response_model=AnalysisResponse)
async def generate_docstring(request: CodeRequest):
    system_prompt = "You are an expert technical writer specializing in code documentation."
    user_prompt = f"""Generate comprehensive documentation for this {request.language} code.
Include: description, parameters, returns, raises, examples, and complexity notes.

Code:
{request.code}"""
    
    result = await call_openai(system_prompt, user_prompt, max_tokens=500)
    return AnalysisResponse(result=result, success=True, model_used=MODEL_NAME)

@app.post("/api/v1/explain-code", response_model=AnalysisResponse)
async def explain_code(request: CodeRequest):
    system_prompt = "You are a patient programming teacher who explains code clearly."
    user_prompt = f"""Explain this {request.language} code step-by-step for someone learning to code.
Break down each part and explain the logic.

Code:
{request.code}"""
    
    result = await call_openai(system_prompt, user_prompt, max_tokens=800)
    return AnalysisResponse(result=result, success=True, model_used=MODEL_NAME)

@app.post("/api/v1/analyze-quality", response_model=AnalysisResponse)
async def analyze_quality(request: CodeRequest):
    system_prompt = "You are a senior code reviewer focusing on quality, security, and best practices."
    user_prompt = f"""Analyze this {request.language} code for:
1. Security vulnerabilities
2. Performance issues
3. Code smells and anti-patterns
4. Best practices violations
5. Maintainability concerns

Rate overall quality (1-10) and provide specific improvements.

Code:
{request.code}"""
    
    result = await call_openai(system_prompt, user_prompt, max_tokens=1000)
    return AnalysisResponse(result=result, success=True, model_used=MODEL_NAME)

@app.post("/api/v1/translate-language", response_model=AnalysisResponse)
async def translate_language(request: CodeRequest):
    if not request.target_language:
        raise HTTPException(status_code=400, detail="target_language required")
    
    system_prompt = "You are an expert programmer fluent in all programming languages."
    user_prompt = f"""Convert this {request.language} code to {request.target_language}.
Maintain the same functionality and add comments explaining any language-specific differences.

Original {request.language} code:
{request.code}

Provide only the translated {request.target_language} code with explanatory comments."""
    
    result = await call_openai(system_prompt, user_prompt, max_tokens=800)
    return AnalysisResponse(
        result=result, 
        success=True, 
        model_used=MODEL_NAME,
        metadata={"from": request.language, "to": request.target_language}
    )

@app.post("/api/v1/suggest-refactoring", response_model=AnalysisResponse)
async def suggest_refactoring(request: CodeRequest):
    system_prompt = "You are a code optimization expert focused on clean code principles."
    user_prompt = f"""Refactor this {request.language} code to improve:
1. Readability
2. Performance
3. Maintainability
4. Following SOLID principles

Show before/after comparison and explain each improvement.

Original code:
{request.code}"""
    
    result = await call_openai(system_prompt, user_prompt, max_tokens=1000)
    return AnalysisResponse(result=result, success=True, model_used=MODEL_NAME)

@app.post("/api/v1/generate-tests", response_model=AnalysisResponse)
async def generate_tests(request: CodeRequest):
    system_prompt = "You are a testing expert who writes comprehensive test suites."
    user_prompt = f"""Generate unit tests for this {request.language} code.
Include:
1. Happy path tests
2. Edge cases
3. Error conditions
4. Boundary value tests

Use appropriate testing framework (pytest, jest, junit, etc.).

Code to test:
{request.code}"""
    
    result = await call_openai(system_prompt, user_prompt, max_tokens=1000)
    return AnalysisResponse(result=result, success=True, model_used=MODEL_NAME)

@app.post("/api/v1/complexity-analysis", response_model=AnalysisResponse)
async def complexity_analysis(request: CodeRequest):
    system_prompt = "You are a computer science expert specializing in algorithm analysis."
    user_prompt = f"""Analyze the complexity of this {request.language} code:
1. Time complexity (Big O notation)
2. Space complexity
3. Cyclomatic complexity
4. Cognitive complexity
5. Maintainability index estimate

Explain your reasoning and suggest optimizations if possible.

Code:
{request.code}"""
    
    result = await call_openai(system_prompt, user_prompt, max_tokens=800)
    return AnalysisResponse(result=result, success=True, model_used=MODEL_NAME)

@app.get("/health")
async def health():
    return {"status": "healthy", "model": MODEL_NAME}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)