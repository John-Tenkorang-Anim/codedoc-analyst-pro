export const LANGUAGES = [
  'Python',
  'JavaScript',
  'TypeScript',
  'Java',
  'C++',
  'Go',
  'Rust',
  'PHP',
  'Ruby',
  'Swift',
  'Kotlin',
  'C#',
  'Other'
]

export const EXAMPLES = {
  Python: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)`,
  
  JavaScript: `async function fetchUserData(userId) {
    const response = await fetch(\`/api/users/\${userId}\`);
    const data = await response.json();
    return data;
}`,
  
  TypeScript: `interface User {
    id: number;
    name: string;
    email: string;
}

function greetUser(user: User): string {
    return \`Hello, \${user.name}!\`;
}`
}