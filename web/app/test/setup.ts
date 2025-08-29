import '@testing-library/jest-dom'

// Mock environment variables for tests - temporarily disabled
// vi.mock('~/services/supabase/supabase.server', () => ({
//   supabase: {
//     auth: {
//       getUser: vi.fn(),
//     },
//     from: vi.fn(() => ({
//       select: vi.fn(),
//       insert: vi.fn(),
//       update: vi.fn(),
//       delete: vi.fn(),
//     })),
//   },
// }))