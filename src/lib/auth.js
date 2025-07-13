export async function getSession() {
  return {
    user: {
      id: "mock-user-123",
      email: "mock@example.com",
      name: "Mock User",
    },
  };
}

// This is a mock implementation of the getSession function.
// export async function signIn() { /* ... */ }
// export async function signOut() { /* ... */ }
