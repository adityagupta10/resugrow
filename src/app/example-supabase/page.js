import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: todos } = await supabase.from('todos').select()

  return (
    <div style={{ padding: '100px 24px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Supabase Test Page</h1>
      <p>Fetching 'todos' from Supabase...</p>
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
      {(!todos || todos.length === 0) && <p>No todos found or table doesn't exist yet.</p>}
    </div>
  )
}
